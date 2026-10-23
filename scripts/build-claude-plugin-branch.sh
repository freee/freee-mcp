#!/usr/bin/env bash
# Builds the commit for the claude-plugin branch, which the Claude plugin
# directory tracks. Only allowlisted plugin files go in, so the directory never
# scans package.json, bun.lock, openapi/ or the development .mcp.json.
#
# Usage: build-claude-plugin-branch.sh <source-ref> <parent-commit> <out-dir>
#   Prints the new commit SHA, or nothing when the tree equals the parent's.
#   The built tree is also extracted to <out-dir> for inspection.
#   Nothing is pushed and no ref is updated.
set -euo pipefail

if [ "$#" -ne 3 ]; then
  echo "usage: $0 <source-ref> <parent-commit> <out-dir>" >&2
  exit 2
fi

source_sha=$(git rev-parse --verify "$1^{commit}")
parent=$(git rev-parse --verify "$2^{commit}")
out_dir=$3

work_dir=$(mktemp -d)
trap 'rm -rf "$work_dir"' EXIT
export GIT_INDEX_FILE="$work_dir/index"

add_blob() {
  git update-index --add --cacheinfo "100644,$(git rev-parse --verify "$source_sha:$2"),$1"
}

git read-tree --empty
git read-tree --prefix=skills/ "$source_sha:skills"
add_blob .claude-plugin/plugin.json .claude-plugin/plugin.json
add_blob README.md .claude-plugin/README.md
add_blob LICENSE LICENSE
if git cat-file -e "$source_sha:.claude-plugin/icon.png" 2>/dev/null; then
  add_blob .claude-plugin/icon.png .claude-plugin/icon.png
fi
# SKILL.md treats a missing VERSION.md as a development build; the npm job
# writes the same line into the released skill zip.
package_version=$(git cat-file blob "$source_sha:package.json" | jq -r .version)
version_blob=$(echo "freee-mcp version: $package_version" | git hash-object -w --stdin)
git update-index --add --cacheinfo "100644,$version_blob,skills/freee-api-skill/VERSION.md"
tree=$(git write-tree)

mkdir -p "$out_dir"
git archive "$tree" | tar -x -C "$out_dir"

# Directory limits: at most 512 files, and non-image files under 256 KiB.
failed=0
file_count=$(git ls-tree -r --name-only "$tree" | wc -l | tr -d ' ')
if [ "$file_count" -gt 512 ]; then
  echo "::error::claude-plugin tree has $file_count files (limit 512)" >&2
  failed=1
fi
large_files=$(git -c core.quotePath=false ls-tree -r -l "$tree" | awk -F'\t' '
  { split($1, meta, " ") }
  meta[4] + 0 >= 262144 && tolower($2) !~ /\.(png|jpe?g|gif|webp)$/ { print $2 " (" meta[4] " bytes)" }')
if [ -n "$large_files" ]; then
  echo "::error::claude-plugin tree has non-image files of 256 KiB or more:" >&2
  echo "$large_files" >&2
  failed=1
fi
plugin_version=$(git cat-file blob "$tree:.claude-plugin/plugin.json" | jq -r .version)
if [ "$plugin_version" != "$package_version" ]; then
  echo "::error::plugin.json version $plugin_version does not match package.json version $package_version" >&2
  failed=1
fi
if [ "$failed" -ne 0 ]; then
  exit 1
fi

if [ "$(git rev-parse "$parent^{tree}")" = "$tree" ]; then
  echo "claude-plugin tree unchanged; nothing to commit" >&2
  exit 0
fi

git commit-tree --no-gpg-sign "$tree" -p "$parent" \
  -m "chore(claude-plugin): v$plugin_version" \
  -m "Source: freee/freee-mcp@$source_sha"
