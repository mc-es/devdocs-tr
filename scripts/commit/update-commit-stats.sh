#!/usr/bin/env bash

# Bot filters (regex | separated)
BOT_RE='github-actions\[bot\]|dependabot\[bot\]|renovate\[bot\]'

# README file path
README=".husky/README.md"

# Section markers
SECTION_TITLE="## 📊 Weekly Commit Type Stats"
INSERT_BEFORE="## 📘 Resources"

# Temp files (safe mktemp usage)
TMP_STATS="$(mktemp)"
TMP_CHART="$(mktemp)"
TMP_OUTPUT="$(mktemp)"

cleanup() {
  rm -f "$TMP_STATS" "$TMP_CHART" "$TMP_OUTPUT"
}
trap cleanup EXIT

# 1) Extract commit types (exclude merges, exclude bots, capture the type prefix)
#    e.g. "chore(codebase): msg" -> "chore"
#         "feat: msg" -> "feat"
git log --pretty=format:'%an|%s' --no-merges \
  | grep -Ev "^($BOT_RE)\|" \
  | cut -d'|' -f2 \
  | sed -E 's/^([a-z]+)(\([^)]+\))?:.*/\1/i' \
  | grep -E '^[a-z]+' \
  | LC_ALL=C sort | uniq -c | LC_ALL=C sort -nr > "$TMP_STATS" || true

# 2) Calculate total number of commits
TOTAL=$(awk '{sum+=$1} END{print sum+0}' "$TMP_STATS")
if [[ "$TOTAL" -eq 0 ]]; then
  # If no commits, still update README with a placeholder
  CHART_CONTENT="(no commits in the last 7 days)"
  printf "%s\n" "$CHART_CONTENT" > "$TMP_CHART"
else
  # 3) Compute percentages (rounded), collect lines
  sum_percent=0
  mapfile -t lines < <(
    awk -v T="$TOTAL" '
      {
        pct = int(($1 * 100 / T) + 0.5); # round to nearest int
        printf "%s|%d|%d\n", $2, $1, pct
      }
    ' "$TMP_STATS"
  )

  # 4) Fix rounding so percentages sum to 100
  current_sum=0
  for L in "${lines[@]}"; do
    current_sum=$(( current_sum + ${L##*|} ))
  done
  if [[ "$current_sum" -ne 100 && "${#lines[@]}" -gt 0 ]]; then
    diff=$((100 - current_sum))
    # lines[0] has the highest count (because of sort -nr)
    IFS='|' read -r t c p <<< "${lines[0]}"
    p=$(( p + diff ))
    lines[0]="${t}|${c}|${p}"
  fi

  # 5) Format the chart lines
  : > "$TMP_CHART"
  for L in "${lines[@]}"; do
    IFS='|' read -r type count pct <<< "$L"
    plural="s"; [[ "$count" -eq 1 ]] && plural=""
    printf "%-8s : %2d commit%s (%d%%)\n" "$type" "$count" "$plural" "$pct" >> "$TMP_CHART"
  done
fi

# 6) Remove old stats section
awk -v title="$SECTION_TITLE" '
  BEGIN{skip=0}
  $0 ~ "^"title"$" {skip=1; next}
  skip==1 && /^## / {skip=0}
  skip==0 {print}
' "$README" > "$TMP_OUTPUT"

# 8) Build new stats section
STATS_SECTION="$(cat <<EOF
$SECTION_TITLE

\`\`\`
$(cat "$TMP_CHART")
\`\`\`

---
EOF
)"

# 9) Insert before marker, or append if not found
if grep -qx "$INSERT_BEFORE" "$TMP_OUTPUT"; then
  awk -v stats="$STATS_SECTION" -v marker="$INSERT_BEFORE" '
    $0 == marker { print stats; print ""; print; next }
    { print }
  ' "$TMP_OUTPUT" > "$README"
else
  printf "%s\n\n%s\n" "$TMP_OUTPUT" "$STATS_SECTION" > "$README"
fi
