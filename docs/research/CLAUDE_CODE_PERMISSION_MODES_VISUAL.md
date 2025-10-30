# Claude Code Permission Modes - Visual Reference

## Mode Comparison Chart

```
┌─────────────────────────────────────────────────────────────────────┐
│                    CLAUDE CODE PERMISSION MODES                     │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐
│   acceptEdits        │
├──────────────────────┤
│ File operations only │
│ Read, Write, Edit    │
│ ✓ Auto-allow edits   │
│ ✗ NO Bash control    │
│ ✗ NO other tools     │
│                      │
│ Use: When you want   │
│ free file editing    │
│ but controlled Bash  │
└──────────────────────┘

┌──────────────────────┐
│ bypassPermissions    │
├──────────────────────┤
│ Everything allowed   │
│ All tools, all ops   │
│ ✓ No prompts ever    │
│ ✓ Except deny list   │
│ ✗ Least secure       │
│                      │
│ Use: When you fully  │
│ trust Claude in this │
│ directory            │
└──────────────────────┘

┌──────────────────────┐
│     default          │
├──────────────────────┤
│ Balanced security    │
│ Asks for what's      │
│ not explicitly       │
│ allowed/denied       │
│ ✓ Most control       │
│ ✗ Most prompts       │
│                      │
│ Use: When you want   │
│ maximum oversight    │
└──────────────────────┘

┌──────────────────────┐
│      plan            │
├──────────────────────┤
│ Show preview first   │
│ Claude plans before  │
│ acting               │
│ ✓ Overview of plan   │
│ ✗ Less interruption  │
│ ~ Balanced           │
│                      │
│ Use: When you want   │
│ to see the plan but  │
│ not per-op prompts   │
└──────────────────────┘
```

## Permission Decision Flow

### How Claude Code Evaluates Each Operation

```
Claude tries to execute an operation (e.g., "Bash(pnpm dev)")
│
├─ STEP 1: Check ALLOW list
│   ├─ Pattern matches? → ALLOW IT (no prompt)
│   └─ No match? → Continue
│
├─ STEP 2: Check DENY list
│   ├─ Pattern matches? → BLOCK IT (show error)
│   └─ No match? → Continue
│
├─ STEP 3: Check ASK list
│   ├─ Pattern matches? → ALWAYS ASK USER
│   └─ No match? → Continue
│
└─ STEP 4: Apply defaultMode
    ├─ acceptEdits? → For files: allow | For others: continue
    ├─ bypassPermissions? → ALLOW IT
    ├─ default? → PROMPT USER (ask)
    └─ plan? → SHOW PLAN, ask for approval
```

## Current Configuration Analysis

### Your Setup

```
What you have:
┌─────────────────────────────────┐
│ defaultMode: "acceptEdits"      │
├─────────────────────────────────┤
│ allow: [                        │
│   "Read(//home/coder/**)",      │
│   "Write(//home/coder/**)",     │
│   "Edit(//home/coder/**)",      │
│   "Bash(npm:*)",                │
│   "Bash(pnpm:*)",               │
│   ... (80+ more Bash patterns)  │
│ ]                               │
├─────────────────────────────────┤
│ deny: [                         │
│   "Bash(rm -rf /)",             │
│   "Bash(shutdown:*)",           │
│   ...                           │
│ ]                               │
└─────────────────────────────────┘

Problem Scenario:
User runs: "Bash(some-command-not-in-list)"
         ↓
Decision flow:
  1. "Bash(some-command-not-in-list)" in allow? NO
  2. "Bash(some-command-not-in-list)" in deny? NO
  3. "Bash(some-command-not-in-list)" in ask? NO
  4. defaultMode="acceptEdits" → This is for files, not Bash!
         ↓
RESULT: PROMPT USER ❌
```

## The Missing Piece

```
What's Missing:

┌─────────────────────────────────┐
│ "allow": [                      │
│   ...                           │
│   "Bash(npm:*)",                │
│   "Bash(pnpm:*)",               │
│   ...                           │
│   "Bash(some-cmd:*)",           │
│   ...                           │
│   [Missing: CATCH-ALL PATTERN]  │  ← YOUR PROBLEM
│ ]                               │
└─────────────────────────────────┘

The Fix:

Add this one line:
"Bash(*)"

┌─────────────────────────────────┐
│ "allow": [                      │
│   ...                           │
│   "Bash(npm:*)",                │
│   "Bash(pnpm:*)",               │
│   ...                           │
│   "Bash(*)"  ← CATCH-ALL        │  ← SOLUTION
│ ]                               │
└─────────────────────────────────┘
```

## Decision Tree

### For Any Given Operation

```
                    Operation
                        │
                        ├─ Read(path) ?
                        │   ├─ In allow list? → ALLOW
                        │   ├─ In deny list? → DENY
                        │   ├─ In ask list? → ASK
                        │   └─ defaultMode?
                        │       ├─ acceptEdits → ALLOW
                        │       ├─ bypassPermissions → ALLOW
                        │       ├─ default → ASK
                        │       └─ plan → PLAN
                        │
                        ├─ Write(path) ?
                        │   ├─ In allow list? → ALLOW
                        │   ├─ In deny list? → DENY
                        │   ├─ In ask list? → ASK
                        │   └─ defaultMode?
                        │       ├─ acceptEdits → ALLOW
                        │       ├─ bypassPermissions → ALLOW
                        │       ├─ default → ASK
                        │       └─ plan → PLAN
                        │
                        ├─ Edit(path) ?
                        │   ├─ In allow list? → ALLOW
                        │   ├─ In deny list? → DENY
                        │   ├─ In ask list? → ASK
                        │   └─ defaultMode?
                        │       ├─ acceptEdits → ALLOW ✓
                        │       ├─ bypassPermissions → ALLOW
                        │       ├─ default → ASK
                        │       └─ plan → PLAN
                        │
                        └─ Bash(cmd) ?
                            ├─ In allow list? → ALLOW
                            ├─ In deny list? → DENY
                            ├─ In ask list? → ASK
                            └─ defaultMode?
                                ├─ acceptEdits → ASK ❌
                                ├─ bypassPermissions → ALLOW
                                ├─ default → ASK
                                └─ plan → PLAN
```

## Mode Behavior Matrix

```
┌──────────────┬─────────────┬─────────────┬──────────────┬──────────┐
│ Operation    │ acceptEdits │ bypassPerms │    default   │   plan   │
├──────────────┼─────────────┼─────────────┼──────────────┼──────────┤
│ Read         │ Allow       │ Allow       │ Check rules  │ Show +   │
│ Write        │ Allow       │ Allow       │ Check rules  │ Show +   │
│ Edit         │ Allow       │ Allow       │ Check rules  │ Show +   │
│ Bash         │ Check rules │ Allow       │ Check rules  │ Show +   │
│ WebSearch    │ Check rules │ Allow       │ Check rules  │ Show +   │
├──────────────┼─────────────┼─────────────┼──────────────┼──────────┤
│ Prompts      │ Few (files) │ None        │ Many         │ Some     │
│ Security     │ Medium      │ Low         │ High         │ Medium   │
│ Convenience  │ High        │ High        │ Low          │ Medium   │
└──────────────┴─────────────┴─────────────┴──────────────┴──────────┘

Legend:
  Allow = Auto-approved
  Check rules = See allow/deny/ask lists
  Show + = Show plan then ask
```

## File vs Bash: The Critical Distinction

```
acceptEdits Mode ONLY Affects:
┌─────────────────────────────────┐
│ FILE OPERATIONS                 │
├─────────────────────────────────┤
│ • Read(path)                    │
│ • Write(path)                   │
│ • Edit(path)                    │
│ • Glob(pattern)                 │
│ • Grep(pattern)                 │
└─────────────────────────────────┘
        ↓ AUTO-ALLOWS ↓


acceptEdits Mode IGNORES:
┌─────────────────────────────────┐
│ OTHER OPERATIONS                │
├─────────────────────────────────┤
│ • Bash(command) ← NEEDS OWN    │
│ • WebSearch                     │    RULES!
│ • Task                          │
│ • Other tools                   │
└─────────────────────────────────┘
```

## Configuration Recommendations

### Scenario 1: Want Maximum Productivity

```json
{
  "permissions": {
    "defaultMode": "bypassPermissions",
    "deny": [
      "Bash(rm -rf /)",
      "Bash(rm -rf /*)",
      "Bash(shutdown:*)",
      "Bash(reboot:*)"
    ]
  }
}
```

### Scenario 2: Want Balance

```json
{
  "permissions": {
    "defaultMode": "acceptEdits",
    "allow": [
      "Read(//home/coder/**)",
      "Write(//home/coder/**)",
      "Edit(//home/coder/**)",
      "Bash(*)"
    ],
    "deny": [
      "Bash(rm -rf /)",
      "Bash(shutdown:*)"
    ]
  }
}
```

### Scenario 3: Want Maximum Security

```json
{
  "permissions": {
    "defaultMode": "default",
    "allow": [
      "Read(//home/coder/**)",
      "Bash(npm:*)",
      "Bash(pnpm:*)",
      "Bash(git:*)"
    ],
    "deny": [
      "Bash(rm -rf /)"
    ],
    "ask": [
      "Write(//home/coder/**)"
    ]
  }
}
```

---

## Key Takeaways

1. **4 modes exist**: acceptEdits, bypassPermissions, default, plan
2. **acceptEdits is file-only**: Doesn't help with Bash commands
3. **Explicit rules override defaultMode**: allow/deny take precedence
4. **Bash needs coverage**: Either catch-all `Bash(*)` or 80+ patterns
5. **No conflicts**: Multiple rules work together, not against each other
6. **Your config**: Good foundation, just needs catch-all Bash rule

