# Claude Code IAM/Permissions System - Comprehensive Research Report

## Executive Summary

Based on thorough research of the Claude Code settings schema, configuration guides, and official documentation, here's the complete analysis of the permission system and `defaultMode` configuration.

---

## Part 1: Permission Modes - Complete Reference

### Official Enum Values (from claude-code-settings.schema.json)

The `defaultMode` field in the permissions object accepts exactly **4 values**:

```json
"defaultMode": {
  "type": "string",
  "enum": [
    "acceptEdits",
    "bypassPermissions", 
    "default",
    "plan"
  ]
}
```

#### Mode 1: `acceptEdits`

**Definition**: When set to `acceptEdits`, Claude Code automatically accepts/allows file edits and modifications without prompting.

**Behavior**:
- Applies specifically to **file editing operations** (Read, Write, Edit tools)
- Skips permission prompts for file modifications
- Still respects explicit "deny" rules in the permissions object
- Does NOT affect Bash command permissions
- Does NOT affect other tool permissions (WebSearch, Bash, etc.)

**Use Case**: When you want Claude to freely modify files without asking, but still control other permissions.

**Expected Outcome**: You should NOT see permission prompts for Edit() operations.

#### Mode 2: `bypassPermissions`

**Definition**: Bypasses the entire permission system, allowing all operations without any prompts.

**Behavior**:
- Disables ALL permission checks
- No prompts for any tool or command
- Still respects explicit "deny" rules (they can't be bypassed)
- Most permissive mode
- Can be disabled via `disableBypassPermissionsMode: "disable"`

**Use Case**: When you trust Claude completely in a particular directory/context.

**Expected Outcome**: No permission prompts at all (except for explicitly denied operations).

#### Mode 3: `default`

**Definition**: Standard permission mode with allow/deny/ask lists.

**Behavior**:
- Operations check against `allow` list first
- If not allowed, checks `deny` list
- If neither, checks `ask` list
- If not in ask list, uses tool-specific defaults
- Requires explicit user approval for operations not in `allow` list

**Use Case**: Balanced security with flexibility - most common mode.

**Expected Outcome**: Prompts for operations not in the `allow` list.

#### Mode 4: `plan`

**Definition**: Claude shows a plan/preview before executing operations without prompting.

**Behavior**:
- Claude outlines what it will do before doing it
- May require approval before executing the plan
- Designed for safety-critical operations
- Less disruptive than per-operation prompts

**Use Case**: When you want oversight of Claude's actions but not constant interruptions.

**Expected Outcome**: Sees a plan/preview, fewer individual prompts.

---

## Part 2: Current Configuration Analysis

### What's in Your Files

**Global Settings** (`/home/coder/.claude/settings.json`):
```json
{
  "permissions": {
    "allow": ["mcp__coder__coder_report_task"],
    "deny": [],
    "ask": []
  },
  "model": "sonnet"
}
```

**Project Settings** (`/home/coder/coder-personal-project/.claude/settings.local.json`):
```json
{
  "permissions": {
    "defaultMode": "acceptEdits",
    "allow": [
      "WebSearch",
      "Read(//home/coder/**)",
      "Write(//home/coder/**)",
      "Edit(//home/coder/**)",
      // ... 80+ Bash patterns ...
    ],
    "deny": [
      "Bash(rm -rf /)",
      "Bash(rm -rf /*)",
      // ... other dangerous commands ...
    ],
    "ask": []
  }
}
```

### Issue Analysis

**Problem**: User says they set `"defaultMode": "acceptEdits"` but still sees permission prompts.

**Possible Causes**:

1. **Mode Scope Issue**: `acceptEdits` mode only applies to file editing (Read, Write, Edit operations)
   - If you're being prompted for Bash commands, `acceptEdits` won't help
   - You need broader allow rules or different defaultMode

2. **Bash Command Permissions**: You have `"Edit(//home/coder/**)"` but this doesn't cover Bash operations
   - Each Bash command needs explicit allow pattern
   - You have `"Bash(pnpm:*)"` but might be running commands not covered

3. **Permission Chain Issue**: If defaultMode conflicts with explicit rules:
   - Allow list takes precedence over defaultMode
   - If operation not in allow list, it might still be asked

4. **Version/Bug Possibility**: The user mentions "only seeing 3 modes (not 4)"
   - This suggests maybe their Claude Code version doesn't recognize `acceptEdits`
   - Or they're looking at documentation from an older version

---

## Part 3: How Permission Rules Actually Work

### Permission Resolution Order (from permissions-guide.md)

```
When Claude tries to perform an operation:

1. Check if operation pattern matches ALLOW list
   ├─ If YES → Operation allowed, no prompt
   └─ If NO → Continue

2. Check if operation pattern matches DENY list
   ├─ If YES → Operation denied, error shown
   └─ If NO → Continue

3. Check if operation pattern matches ASK list
   ├─ If YES → Always ask user
   └─ If NO → Continue

4. Apply defaultMode
   ├─ acceptEdits → Allow file edits without asking
   ├─ bypassPermissions → Allow everything without asking
   ├─ default → Use tool-specific defaults (usually "ask")
   └─ plan → Show plan before execution
```

### Why acceptEdits Might Not Work

**The Critical Issue**: `acceptEdits` is very specific:
- It only auto-approves **file editing operations**
- Bash commands are a DIFFERENT category
- They need their own allow patterns

**Example Scenario**:
```
User action: Run bash command "pnpm dev"
Resolution:
  1. Check: "Bash(pnpm dev)" in allow? NO
  2. Check: "Bash(pnpm dev)" in deny? NO
  3. Check: "Bash(pnpm dev)" in ask? NO
  4. defaultMode="acceptEdits" → This is for file edits, not Bash!
  5. Result: PROMPT USER (because no rule covers this command)
```

---

## Part 4: Conflicts and Interactions

### File Operations vs Edit() Rule

**Question**: Does having `"Edit(//home/coder/**)"` in allow list conflict with `"defaultMode": "acceptEdits"`?

**Answer**: NO, they work together:
- The allow rule pre-approves Edit operations matching that pattern
- defaultMode provides a fallback for operations not in allow list
- No conflict, just overlapping coverage

### Explicit Allow vs DefaultMode

**Rule**: Explicit allow/deny rules take precedence over defaultMode
- If something is in allow list, defaultMode doesn't matter
- If something is NOT in any list, defaultMode determines behavior

**Best Practice**:
- Use allow list for common, safe operations
- Use defaultMode as a fallback for edge cases
- Don't rely ONLY on defaultMode

---

## Part 5: Why "acceptEdits" Isn't Working as Expected

### Root Cause Analysis

The user probably expects `acceptEdits` to eliminate ALL permission prompts, but it only affects:
- Read operations
- Write operations
- Edit operations

It does NOT affect:
- Bash commands
- Tool permissions
- WebSearch
- Other operations

### Evidence from Current Config

The project has:
```json
"defaultMode": "acceptEdits"
```

But also has only these in allow list:
- WebSearch
- Read/Write/Edit patterns
- 80+ specific Bash patterns
- No catch-all Bash rule

**Conclusion**: If a Bash command isn't in the 80+ explicit allow patterns, it will be prompted, regardless of `acceptEdits` setting.

---

## Part 6: Solutions to Never Be Prompted

### Option 1: Use `bypassPermissions` (Nuclear Option)

```json
{
  "permissions": {
    "defaultMode": "bypassPermissions",
    "allow": [],
    "deny": [
      "Bash(rm -rf /)",
      "Bash(rm -rf /*)",
      "Bash(shutdown:*)",
      "Bash(reboot:*)"
    ],
    "ask": []
  }
}
```

**Pros**: Complete freedom, never prompted
**Cons**: Least secure, trusts Claude completely

### Option 2: Comprehensive Allow List

Keep `defaultMode: "acceptEdits"` and add catch-all patterns:

```json
{
  "permissions": {
    "defaultMode": "acceptEdits",
    "allow": [
      // File operations (covered by acceptEdits anyway)
      "Read(//home/coder/**)",
      "Write(//home/coder/**)",
      "Edit(//home/coder/**)",
      
      // Catch-all Bash patterns for common tools
      "Bash(npm:*)",
      "Bash(pnpm:*)",
      "Bash(git:*)",
      "Bash(gh:*)",
      "Bash(find:*)",
      "Bash(grep:*)",
      "Bash(ls:*)",
      "Bash(*)",  // This is the key: allow ANY bash command
      
      // Other tools
      "WebSearch"
    ],
    "deny": [
      "Bash(rm -rf /)",
      "Bash(rm -rf /*)",
      "Bash(shutdown:*)",
      "Bash(reboot:*)",
      "Bash(halt:*)",
      "Bash(poweroff:*)"
    ],
    "ask": []
  }
}
```

**Pros**: Balanced security with convenience
**Cons**: Allows almost anything except explicitly denied

### Option 3: Use `plan` Mode Instead

```json
{
  "permissions": {
    "defaultMode": "plan",
    "allow": [
      "Read(//home/coder/**)",
      "Write(//home/coder/**)",
      "Edit(//home/coder/**)",
      "Bash(npm:*)",
      "Bash(pnpm:*)",
      "Bash(git:*)"
    ],
    "deny": [
      "Bash(rm -rf /)",
      "Bash(rm -rf /*)"
    ],
    "ask": []
  }
}
```

**Pros**: Sees overview before action, fewer interruptions
**Cons**: Still shows plans/previews

---

## Part 7: Pattern Syntax and Edge Cases

### Understanding Pattern Matching

From the permissions guide, patterns work as:

```
"Bash(command:*)"      → Matches "command arg1 arg2 ..."
"Bash(command *)"      → May also match (space variant)
"Bash(cat <<:*)"       → Matches heredocs with any content
"Edit(//path/**)"      → Matches any file in path or subdirectories
"Bash(*)"              → Matches ANY bash command
```

### Critical Pattern: `"Bash(*)"`

The user's config doesn't have a catch-all `Bash(*)` pattern. This is likely why specific commands still prompt.

---

## Part 8: Version Check - The "Only 3 Modes" Issue

### What the User Reported
"User mentions only seeing 3 modes (not 4)"

### What We Found
The official schema shows 4 enum values:
1. `acceptEdits`
2. `bypassPermissions`
3. `default`
4. `plan`

### Possible Explanations

1. **Older Claude Code Version**: Previous versions might have had only 3 modes
   - User might be using an older extension version
   - Should update Claude Code extension

2. **Documentation Out of Sync**: User might be reading old docs
   - Check extension version: Settings > Extensions > Claude Code
   - Look for version 2.0.28 or later

3. **Mode Not Recognized**: If user tries to use `acceptEdits` in an old version
   - It might revert to `default` mode silently
   - This would explain why prompts still happen

### Check Your Version

Current installed version: **anthropic.claude-code-2.0.28-linux-x64**

This is fairly recent (Oct 2025) and should support all 4 modes.

---

## Part 9: Hooks and Configuration Overrides

### Hook System

Claude Code also supports hooks that can intercept tool executions:

```json
{
  "hooks": {
    "Write": [
      {
        "matcher": "*.md",
        "hooks": [
          {
            "type": "command",
            "command": "prettier --write"
          }
        ]
      }
    ]
  }
}
```

**Relevant to Permissions**: If hooks exist, they don't override permission checks. Permissions are checked BEFORE hooks run.

### StatusLine Config

```json
{
  "statusLine": {
    "type": "command",
    "command": "git status --short"
  }
}
```

This also doesn't affect permission prompting.

---

## Part 10: Recommended Configuration

### Best Practice Setup for "Never Ask"

```json
{
  "permissions": {
    "defaultMode": "bypassPermissions",
    "deny": [
      "Bash(rm -rf /)",
      "Bash(rm -rf /*)",
      "Bash(shutdown:*)",
      "Bash(reboot:*)",
      "Bash(halt:*)",
      "Bash(poweroff:*)"
    ]
  }
}
```

OR (more cautious):

```json
{
  "permissions": {
    "defaultMode": "acceptEdits",
    "allow": [
      "Read(//home/coder/**)",
      "Write(//home/coder/**)",
      "Edit(//home/coder/**)",
      "Glob(//home/coder/**)",
      "Grep(//home/coder/**)",
      "Read(//tmp/**)",
      "Read(///**)",
      "Bash(*)"
    ],
    "deny": [
      "Bash(rm -rf /)",
      "Bash(rm -rf /*)",
      "Bash(shutdown:*)",
      "Bash(reboot:*)",
      "Bash(halt:*)",
      "Bash(poweroff:*)"
    ]
  }
}
```

---

## Part 11: Troubleshooting Checklist

- [ ] Verify Claude Code version is 2.0.28 or later
- [ ] Check if prompts are for Bash commands or file operations
- [ ] Verify `defaultMode` is spelled correctly (case-sensitive)
- [ ] Check for typos in permission rules
- [ ] Verify pattern syntax matches actual command
- [ ] Test with simple command: `pnpm --version`
- [ ] Check if command matches any allow pattern
- [ ] Look at deny list - make sure operation isn't denied
- [ ] Try `bypassPermissions` to test if prompts disappear
- [ ] Check for hooks that might interact with permissions
- [ ] Restart Claude Code extension after config change
- [ ] Check both global and local settings files

---

## Part 12: Summary of Findings

### Current Situation

1. **Config is Correct**: File has valid JSON, correct field names
2. **defaultMode IS Set**: `"defaultMode": "acceptEdits"` is in place
3. **Partial Coverage**: Allow list covers many Bash commands but not all patterns
4. **Mode Limitation**: `acceptEdits` only applies to file operations, not all operations

### Why Prompts Still Appear

Most likely: A Bash command is being run that doesn't match the 80+ explicit allow patterns.

Examples of commands NOT covered:
- `basename`, `dirname`, `realpath`
- `jq` variations
- `sqlite3` without base name in pattern
- Piped commands with operators not in allow list
- Compound commands with operators like `;`, `||`, `&&`

### Immediate Fix

Add this to your allow list:
```json
"Bash(*)"
```

This catches ANY Bash command (combined with deny list for safety).

### Long-term Recommendations

1. Use `bypassPermissions` if you fully trust Claude in this codebase
2. OR maintain a comprehensive allow list with catch-all `Bash(*)`
3. Monitor deny list to ensure dangerous operations are blocked
4. Review monthly to catch any new patterns that cause prompts

---

## Part 13: Official Documentation References

Based on:
- `/home/coder/.vscode-server/extensions/anthropic.claude-code-2.0.28-linux-x64/claude-code-settings.schema.json`
- `/home/coder/coder-personal-project/.claude/PERMISSIONS_GUIDE.md`
- Claude Code settings structure

Authoritative source for latest docs: https://docs.claude.com/en/docs/claude-code/settings

---

## Conclusion

The `acceptEdits` mode is working as designed, but it's only part of the solution. To never be prompted:

1. Use `"defaultMode": "bypassPermissions"` OR
2. Add `"Bash(*)"` to the allow list along with `"defaultMode": "acceptEdits"`

The current configuration is good but incomplete - it needs a catch-all Bash pattern or a less restrictive defaultMode.
