# Command-Line Search Mastery Course
## Master grep, find, ripgrep & Modern Search Tools for Developer Excellence

---

## Course Overview

This comprehensive command-line search curriculum transforms developers into productivity powerhouses who can navigate any codebase, debug issues lightning-fast, and pass technical interviews with confidence. Master traditional Unix tools (grep, find, awk, sed) and modern alternatives (ripgrep, fd, fzf) through hands-on practice and real-world scenarios.

**Target Audience:** Developers who want to 10x their productivity through command-line mastery

**Time Commitment:** 20-30 hours (flexible, self-paced)

**Success Metrics:**
- Search codebases 10x faster than GUI tools
- Pass Linux/Unix interview questions
- Debug production issues efficiently
- Automate repetitive search tasks
- Integrate search tools into workflows
- Become the go-to person for "finding stuff"

---

## Why This Matters

**The Reality:**
- Average developer spends 35% of time searching for code, files, and information
- Command-line search is 5-10x faster than GUI alternatives
- Essential skill for remote work and server management
- Asked in 80%+ of technical interviews
- Key differentiator for senior roles

**Career Impact:**
- Senior engineers are expected to master CLI tools
- DevOps and infrastructure roles require these skills
- Remote work demands efficient terminal usage
- Open source contribution requires search mastery
- Debugging production issues needs instant search skills

---

## Learning Path Structure

### Phase 1: Traditional Unix Tools (8-10 hours)
**Level: Search Novice**

#### Module 1.1: grep Fundamentals
**Quest: "Pattern Hunter"**

**Learning Objectives:**
- Understand grep syntax and usage
- Master basic pattern matching
- Learn grep options and flags
- Search single and multiple files
- Understand output formatting
- Learn grep exit codes
- Master case-sensitive/insensitive search
- Work with line context

**Hands-On Projects:**
1. **Project: Log File Analyzer** (XP: 100)
   - Search application logs
   - Find error patterns
   - Extract specific information
   - Count occurrences
   - Success Criteria: Extract meaningful insights from 10,000+ line logs

2. **Mini-Project: Code Search Tool** (XP: 75)
   - Find function definitions
   - Search for variable usage
   - Locate import statements
   - Track TODOs and FIXMEs

**Challenges:**
- Basic Search: Complete 15 grep exercises (+50 XP)
- Pattern Master: Match 20 different patterns (+75 XP)
- Speed Demon: Find targets in under 10 seconds each (+100 XP)
- Boss Challenge: Debug production issue using only grep (+200 XP)

**Essential Commands:**
```bash
# Basic usage
grep "pattern" file.txt
grep -i "pattern" file.txt          # Case insensitive
grep -n "pattern" file.txt          # Show line numbers
grep -v "pattern" file.txt          # Invert match
grep -c "pattern" file.txt          # Count matches
grep -l "pattern" *.txt             # Show filenames only
grep -w "word" file.txt             # Match whole words

# Context
grep -A 3 "pattern" file.txt        # After context
grep -B 3 "pattern" file.txt        # Before context
grep -C 3 "pattern" file.txt        # Both contexts

# Multiple patterns
grep -e "pattern1" -e "pattern2"
grep -E "pattern1|pattern2"         # Extended regex
```

**Real-World Scenarios:**
- Find all error logs from yesterday
- Locate all API endpoints in codebase
- Search for hardcoded credentials
- Find memory leak indicators
- Identify deprecated function usage

---

#### Module 1.2: Regular Expressions with grep
**Quest: "Regex Warrior"**

**Learning Objectives:**
- Master basic regex syntax
- Learn character classes
- Understand quantifiers
- Master anchors and boundaries
- Learn capture groups (with egrep)
- Work with alternation
- Master lookaheads (with perl mode)
- Optimize regex performance

**Hands-On Projects:**
1. **Project: Input Validator** (XP: 150)
   - Validate email addresses
   - Check phone number formats
   - Verify URL patterns
   - Validate data formats
   - Success Criteria: 100% accurate validation using regex

2. **Project: Code Pattern Detector** (XP: 175)
   - Find SQL injection vulnerabilities
   - Detect insecure password storage
   - Locate XSS vulnerabilities
   - Find deprecated API usage
   - Success Criteria: Build security scanning tool

**Challenges:**
- Regex Novice: Write 20 basic regex patterns (+75 XP)
- Regex Expert: Solve 15 complex regex puzzles (+125 XP)
- Validation Master: Create 10 real-world validators (+150 XP)
- Boss Challenge: Build regex-based security scanner (+300 XP)

**Key Regex Patterns:**
```bash
# Character classes
grep '[0-9]' file.txt               # Any digit
grep '[a-zA-Z]' file.txt            # Any letter
grep '[^0-9]' file.txt              # Not a digit

# Quantifiers
grep 'a*' file.txt                  # Zero or more
grep 'a\+' file.txt                 # One or more
grep 'a\?' file.txt                 # Zero or one
grep 'a\{3\}' file.txt              # Exactly 3
grep 'a\{3,5\}' file.txt            # 3 to 5

# Anchors
grep '^pattern' file.txt            # Start of line
grep 'pattern$' file.txt            # End of line
grep '\bword\b' file.txt            # Word boundary

# Extended regex (egrep or grep -E)
grep -E 'pattern1|pattern2'         # OR
grep -E '(group)+' file.txt         # Grouping
grep -E '[0-9]{3}-[0-9]{4}'         # Phone pattern

# Perl regex (grep -P)
grep -P '\d+' file.txt              # Digits
grep -P '\w+@\w+\.\w+' file.txt     # Email pattern
grep -P '(?=pattern)' file.txt      # Lookahead
```

**Common Use Cases:**
- Email validation
- IP address matching
- Date format detection
- Code style enforcement
- Security vulnerability detection

---

#### Module 1.3: find Command Mastery
**Quest: "File Explorer"**

**Learning Objectives:**
- Master find syntax and structure
- Search by name, type, size
- Use time-based searches
- Master permission searches
- Execute commands on results
- Combine multiple criteria
- Optimize find performance
- Handle special characters

**Hands-On Projects:**
1. **Project: Disk Space Analyzer** (XP: 125)
   - Find large files
   - Locate old unused files
   - Identify duplicates by size
   - Generate cleanup reports
   - Success Criteria: Free up 50% disk space

2. **Project: Code Quality Scanner** (XP: 150)
   - Find files without tests
   - Locate files over size limit
   - Find recently modified files
   - Track file age distribution
   - Success Criteria: Comprehensive codebase health report

**Challenges:**
- Find Basics: Complete 15 find exercises (+60 XP)
- Complex Queries: Build 10 advanced searches (+100 XP)
- Performance: Optimize slow find commands (+125 XP)
- Boss Challenge: Build automated cleanup system (+250 XP)

**Essential find Commands:**
```bash
# Basic searches
find . -name "*.js"                 # By name
find . -type f                      # Files only
find . -type d                      # Directories only
find . -size +100M                  # Larger than 100MB
find . -empty                       # Empty files/dirs

# Time-based
find . -mtime -7                    # Modified in last 7 days
find . -mtime +30                   # Modified 30+ days ago
find . -newer file.txt              # Newer than file.txt
find . -mmin -60                    # Modified in last hour

# Permissions
find . -perm 777                    # Exact permissions
find . -user username               # By owner
find . -group groupname             # By group

# Execute commands
find . -name "*.tmp" -delete        # Delete matches
find . -name "*.js" -exec wc -l {} \;
find . -type f -exec grep "TODO" {} +

# Complex queries
find . -name "*.log" -size +10M -mtime +30
find . \( -name "*.js" -o -name "*.ts" \) -type f
find . -name "node_modules" -prune -o -type f -print
```

**Real-World Use Cases:**
- Find large log files for cleanup
- Locate configuration files
- Search for executables
- Find files modified during incident
- Cleanup temporary files
- Audit file permissions

---

#### Module 1.4: Combining grep and find
**Quest: "Search Combinator"**

**Learning Objectives:**
- Pipe find results to grep
- Use xargs effectively
- Parallel processing with xargs
- Handle special characters in filenames
- Optimize combined searches
- Master complex search pipelines
- Learn error handling
- Build reusable search scripts

**Hands-On Projects:**
1. **Project: Codebase Search Engine** (XP: 200)
   - Search all files for patterns
   - Exclude specific directories
   - Handle binary files correctly
   - Format results beautifully
   - Success Criteria: Lightning-fast code search tool

2. **Project: Security Audit Tool** (XP: 225)
   - Scan for hardcoded secrets
   - Find insecure file permissions
   - Detect vulnerable dependencies
   - Generate audit reports
   - Success Criteria: Comprehensive security scanner

**Challenges:**
- Pipeline Builder: Create 15 search pipelines (+125 XP)
- Performance Tuner: Optimize slow searches (+150 XP)
- Script Master: Build 10 reusable scripts (+175 XP)
- Boss Challenge: Build enterprise code search tool (+400 XP)

**Powerful Combinations:**
```bash
# Basic combination
find . -name "*.js" -exec grep -l "TODO" {} \;
find . -name "*.js" | xargs grep "TODO"

# Better performance with xargs
find . -name "*.js" -print0 | xargs -0 grep "pattern"

# Exclude directories
find . -name "node_modules" -prune -o -name "*.js" -print0 |
  xargs -0 grep "pattern"

# Multiple patterns
find . -type f -name "*.js" -print0 |
  xargs -0 grep -l "pattern1" |
  xargs grep -l "pattern2"

# Parallel processing
find . -name "*.log" -print0 |
  xargs -0 -P 4 grep "ERROR"

# Complex search with formatting
find . -name "*.js" ! -path "*/node_modules/*" -print0 |
  xargs -0 grep -Hn "TODO" |
  awk -F: '{print $1":"$2" - "$3}'
```

**Real-World Applications:**
- Find all files importing deprecated module
- Search for API keys in entire repository
- Locate all files without copyright headers
- Find unused functions across codebase
- Track down configuration references

---

#### Module 1.5: awk & sed for Text Processing
**Quest: "Text Transformer"**

**Learning Objectives:**
- Master awk basics
- Learn sed substitutions
- Understand awk patterns and actions
- Master field processing with awk
- Learn sed address ranges
- Combine sed and awk
- Build data processing pipelines
- Create report generators

**Hands-On Projects:**
1. **Project: Log Parser & Reporter** (XP: 175)
   - Parse Apache/Nginx logs
   - Extract statistics
   - Generate formatted reports
   - Create visualizations from data
   - Success Criteria: Beautiful log analysis reports

2. **Project: Data Transformation Pipeline** (XP: 200)
   - Transform CSV data
   - Clean and validate input
   - Aggregate statistics
   - Output multiple formats
   - Success Criteria: Robust ETL pipeline using shell tools

**Challenges:**
- awk Basics: Complete 15 exercises (+75 XP)
- sed Master: Transform 20 text files (+100 XP)
- Pipeline Builder: Create 10 data pipelines (+150 XP)
- Boss Challenge: Build log analysis dashboard generator (+350 XP)

**Essential awk & sed:**
```bash
# awk basics
awk '{print $1}' file.txt           # Print first column
awk -F: '{print $1}' /etc/passwd    # Custom delimiter
awk '$3 > 100' data.txt             # Filter rows
awk '{sum+=$1} END {print sum}'     # Sum column
awk 'NR>1 {print $0}'               # Skip header

# awk patterns
awk '/pattern/ {print $0}'          # Pattern matching
awk '$1=="ERROR" {count++} END {print count}'
awk 'BEGIN {print "Report"} {print} END {print "Done"}'

# sed substitutions
sed 's/old/new/' file.txt           # First occurrence
sed 's/old/new/g' file.txt          # All occurrences
sed 's/old/new/gi' file.txt         # Case insensitive
sed -i 's/old/new/g' file.txt       # In-place edit

# sed ranges
sed '1,10d' file.txt                # Delete lines 1-10
sed '/pattern/d' file.txt           # Delete matching lines
sed -n '5,10p' file.txt             # Print lines 5-10

# Complex examples
# Extract emails from log
awk '/email:/ {print $2}' log.txt | sort | uniq -c

# Parse access logs
awk '{print $1}' access.log | sort | uniq -c | sort -rn | head -10

# Transform CSV
awk -F, '{printf "%-20s %-10s\n", $1, $2}' data.csv
```

**Use Cases:**
- Process server logs
- Transform data formats
- Generate reports from raw data
- Clean and validate input
- Extract metrics from logs

---

### Phase 2: Modern Search Tools (6-8 hours)
**Level: Modern Search Expert**

#### Module 2.1: ripgrep (rg) Mastery
**Quest: "Speed Searcher"**

**Learning Objectives:**
- Understand ripgrep advantages
- Master rg basic usage
- Learn automatic filtering (.gitignore)
- Use file type filtering
- Master glob patterns
- Learn multiline search
- Understand ripgrep performance
- Integrate into workflows

**Hands-On Projects:**
1. **Project: Lightning-Fast Code Search** (XP: 175)
   - Search massive codebases instantly
   - Implement smart filtering
   - Create search shortcuts
   - Build VS Code integration
   - Success Criteria: Search 1M+ lines in under 1 second

2. **Project: Codebase Analytics Tool** (XP: 200)
   - Count code patterns
   - Track technology usage
   - Identify deprecated code
   - Generate statistics
   - Success Criteria: Comprehensive codebase insights

**Challenges:**
- Speed Challenge: Beat grep performance 10x (+100 XP)
- Pattern Master: Use advanced rg features (+125 XP)
- Integration Expert: Add rg to 5 workflows (+150 XP)
- Boss Challenge: Build intelligent code search engine (+400 XP)

**ripgrep Essentials:**
```bash
# Basic usage
rg "pattern"                        # Search current dir
rg "pattern" path/                  # Search specific path
rg -i "pattern"                     # Case insensitive
rg -w "word"                        # Whole words only
rg -v "pattern"                     # Invert match

# File type filtering
rg --type js "pattern"              # JavaScript files only
rg --type-not js "pattern"          # Exclude JavaScript
rg -t rust -t python "pattern"      # Multiple types
rg --type-list                      # Show available types

# .gitignore respect (automatic)
rg "pattern"                        # Respects .gitignore
rg -u "pattern"                     # Don't respect .gitignore
rg --hidden "pattern"               # Search hidden files

# Glob patterns
rg "pattern" -g "*.js"              # Glob include
rg "pattern" -g "!*.test.js"        # Glob exclude
rg "pattern" -g "src/**/*.ts"       # Nested glob

# Output formatting
rg "pattern" -l                     # Files with matches
rg "pattern" -c                     # Count per file
rg "pattern" --json                 # JSON output
rg "pattern" --vimgrep              # Vim-compatible

# Advanced features
rg -A 3 -B 3 "pattern"              # Context
rg --multiline "pattern"            # Multiline search
rg --pcre2 "complex_regex"          # PCRE2 support
rg "pattern" --stats                # Show statistics

# Replace mode
rg "old" --replace "new"            # Dry run
rg "old" -l | xargs sed -i 's/old/new/g'  # Actual replace
```

**Why ripgrep?**
- 5-10x faster than grep
- Respects .gitignore automatically
- Better default behavior
- Superior regex support
- Parallel searching built-in
- Beautiful output formatting

---

#### Module 2.2: fd - Modern find Alternative
**Quest: "File Finder Pro"**

**Learning Objectives:**
- Understand fd advantages
- Master fd syntax
- Learn smart defaults
- Use regex patterns
- Master exclusion patterns
- Execute commands on results
- Integrate with other tools
- Build efficient workflows

**Hands-On Projects:**
1. **Project: Smart File Manager** (XP: 150)
   - Find files by complex criteria
   - Organize files automatically
   - Build cleanup scripts
   - Create file indexing system
   - Success Criteria: 10x faster file operations

2. **Project: Project Navigator** (XP: 175)
   - Quick project file access
   - Smart file suggestions
   - Build navigation tool
   - Integration with editors
   - Success Criteria: Jump to any file in <2 seconds

**Challenges:**
- fd Basics: Complete 15 exercises (+75 XP)
- Speed Master: Find files 5x faster (+100 XP)
- Automation: Build 10 file scripts (+125 XP)
- Boss Challenge: Create intelligent file assistant (+300 XP)

**fd Essentials:**
```bash
# Basic usage
fd pattern                          # Find by name
fd -e js                            # By extension
fd -H pattern                       # Include hidden
fd -I pattern                       # Don't respect .gitignore

# Pattern types
fd '^test'                          # Regex pattern
fd -g '*.test.js'                   # Glob pattern
fd -E node_modules pattern          # Exclude pattern

# File types
fd -t f                             # Files only
fd -t d                             # Directories only
fd -t l                             # Symlinks only
fd -t x                             # Executables only

# Size and time
fd -S +100m                         # Larger than 100MB
fd --changed-within 1d              # Modified in last day
fd --changed-before 30d             # Older than 30 days

# Execute commands
fd -e js -x prettier --write        # Format all JS files
fd -e log -X rm                     # Delete all log files
fd pattern -x echo "Found: {}"      # Custom command

# Integration examples
# Open in editor
fd pattern | fzf | xargs nvim

# Quick navigation
cd $(fd -t d pattern | head -1)

# Batch processing
fd -e jpg -x convert {} {.}.png
```

**Why fd?**
- Intuitive syntax
- Smart defaults (ignore .gitignore)
- Faster than find
- Colored output
- Parallel execution
- Better regex support

---

#### Module 2.3: fzf - Interactive Fuzzy Finder
**Quest: "Fuzzy Master"**

**Learning Objectives:**
- Understand fuzzy finding concept
- Master fzf basics
- Learn keybindings
- Integrate with shell
- Build custom workflows
- Create interactive tools
- Master preview features
- Automate with fzf

**Hands-On Projects:**
1. **Project: Interactive Shell Enhancement** (XP: 200)
   - Enhanced command history
   - Quick file navigation
   - Git branch switcher
   - Process killer
   - Success Criteria: 5x faster terminal operations

2. **Project: Custom Search Interface** (XP: 225)
   - Build API explorer
   - Create log viewer
   - Make task picker
   - Add fuzzy autocomplete
   - Success Criteria: Beautiful interactive CLI tools

**Challenges:**
- fzf Basics: Master all keybindings (+75 XP)
- Integration: Add fzf to 10 workflows (+150 XP)
- Custom Tools: Build 5 fzf-powered tools (+175 XP)
- Boss Challenge: Create complete fuzzy IDE (+450 XP)

**fzf Essentials:**
```bash
# Basic usage
fzf                                 # Interactive file finder
ls | fzf                            # Filter any list
history | fzf                       # Search history

# Integration with commands
vim $(fzf)                          # Open file in vim
kill -9 $(ps aux | fzf | awk '{print $2}')
cd $(fd -t d | fzf)                 # Interactive cd

# Preview mode
fzf --preview 'cat {}'              # Preview files
fzf --preview 'bat --color=always {}' # With syntax highlighting

# Multi-select
fzf -m                              # Multi-select mode
fd -e js | fzf -m | xargs code     # Open multiple in VS Code

# Custom keybindings
fzf --bind 'ctrl-y:execute-silent(echo {} | pbcopy)'

# Shell integration (after installation)
Ctrl-R                              # Command history
Ctrl-T                              # File search
Alt-C                               # Directory navigation

# Advanced examples
# Git branch switcher
git branch | fzf | xargs git checkout

# Process killer
ps aux | fzf | awk '{print $2}' | xargs kill -9

# Docker container exec
docker ps | fzf | awk '{print $1}' | xargs -I {} docker exec -it {} bash

# NPM script runner
cat package.json | jq -r '.scripts | keys[]' | fzf | xargs npm run

# Fuzzy cd function
fcd() {
  local dir
  dir=$(fd -t d | fzf +m) && cd "$dir"
}
```

**Why fzf?**
- Interactive and intuitive
- Works with any list
- Blazing fast
- Highly customizable
- Great shell integration
- Beautiful UI

---

#### Module 2.4: Combining Modern Tools
**Quest: "Tool Orchestrator"**

**Learning Objectives:**
- Combine rg, fd, and fzf
- Build powerful pipelines
- Create custom commands
- Master shell functions
- Build productivity scripts
- Share with team
- Optimize workflows
- Automate common tasks

**Hands-On Projects:**
1. **Project: Developer Productivity Suite** (XP: 300)
   - Quick file access
   - Smart code search
   - Interactive git operations
   - Process management tools
   - Success Criteria: Complete CLI productivity toolkit

2. **Project: Team Automation Library** (XP: 275)
   - Reusable search scripts
   - Common workflow automation
   - Documentation generator
   - Team onboarding tools
   - Success Criteria: Boost entire team productivity

**Challenges:**
- Pipeline Master: Create 20 tool combinations (+200 XP)
- Automation Expert: Build 15 workflow scripts (+225 XP)
- Sharing Champion: Help 5 teammates adopt tools (+175 XP)
- Boss Challenge: Build complete developer CLI framework (+600 XP)

**Powerful Combinations:**
```bash
# Interactive code search and edit
rg --files-with-matches "TODO" | fzf --preview 'bat {}' | xargs nvim

# Find and replace across files
rg -l "oldPattern" | fzf -m | xargs sed -i 's/oldPattern/newPattern/g'

# Smart git file checkout
git diff --name-only | fzf -m --preview 'git diff {}' | xargs git checkout

# Interactive docker container management
docker ps --format '{{.Names}}' | fzf | xargs -I {} docker exec -it {} bash

# Quick project navigation
projects=(~/projects/*)
echo ${projects[@]} | tr ' ' '\n' | fzf | xargs -I {} code {}

# Search and open in browser
rg -l "http" | fzf --preview 'rg "http" {}' |
  xargs rg -oP 'https?://[^\s]+' | fzf | xargs open

# Find large files and analyze
fd -S +10m | fzf --preview 'du -h {}; file {}' | xargs -o du -h

# Interactive npm package searcher
npm search --json react | jq '.[].name' | fzf --preview 'npm info {}'

# Git commit browser and show
git log --oneline | fzf --preview 'git show {1}' |
  awk '{print $1}' | xargs git show

# Database query runner (with list of saved queries)
fd -e sql | fzf --preview 'cat {}' | xargs -I {} psql -f {}
```

**Custom Shell Functions:**
```bash
# Smart search and edit
se() {
  local file
  file=$(rg --files-with-matches "$1" | fzf --preview "bat --color=always {}")
  [ -n "$file" ] && ${EDITOR:-vim} "$file"
}

# Interactive git log browser
glb() {
  git log --oneline --color=always |
    fzf --ansi --preview 'git show --color=always {1}' |
    awk '{print $1}' |
    xargs git show
}

# Find and kill process
fkill() {
  ps aux |
    fzf -m --header='Select process(es) to kill' |
    awk '{print $2}' |
    xargs kill -${1:-9}
}

# Quick directory jumper with frecency
j() {
  local dir
  dir=$(fd -t d | fzf --query="$1") && cd "$dir"
}

# Search in files and replace
replace_in_files() {
  local files
  files=$(rg -l "$1" | fzf -m --preview "rg '$1' {}")
  echo "$files" | xargs sed -i "s/$1/$2/g"
}
```

---

### Phase 3: Advanced Techniques & Automation (6-8 hours)
**Level: Search Master**

#### Module 3.1: Search Optimization & Performance
**Quest: "Performance Optimizer"**

**Learning Objectives:**
- Profile search performance
- Optimize slow searches
- Understand indexing strategies
- Master parallel searching
- Learn caching techniques
- Optimize regex patterns
- Handle large datasets
- Build high-performance tools

**Hands-On Projects:**
1. **Project: Search Performance Benchmarking** (XP: 225)
   - Compare tool performance
   - Benchmark different approaches
   - Find optimization opportunities
   - Document best practices
   - Success Criteria: 10x performance improvements

2. **Project: Intelligent Search Cache** (XP: 250)
   - Build search result caching
   - Implement incremental updates
   - Add expiration strategies
   - Measure cache effectiveness
   - Success Criteria: Sub-second repeat searches

**Challenges:**
- Benchmark Master: Profile 20 search scenarios (+150 XP)
- Optimization Guru: Improve 15 slow searches (+200 XP)
- Cache Expert: Build efficient caching system (+175 XP)
- Boss Challenge: Optimize enterprise search infrastructure (+500 XP)

**Performance Techniques:**
```bash
# Parallel searching
rg "pattern" -j 8                   # 8 threads
find . -name "*.js" | xargs -P 4 grep "pattern"

# Exclude unnecessary directories
rg "pattern" --ignore-dir node_modules --ignore-dir .git

# Optimize regex
# Bad: rg ".*pattern.*"
# Good: rg "pattern"

# Use file type filtering
rg -t js "pattern"                  # Instead of searching everything

# Cache directory listings
fd > /tmp/file_cache.txt
grep "pattern" /tmp/file_cache.txt

# Limit search scope
rg "pattern" src/                   # Instead of entire repo

# Use simpler patterns when possible
rg -F "literal_string"              # Fixed string (faster)

# Benchmark your searches
time rg "pattern"
hyperfine 'rg "pattern"' 'grep -r "pattern"'
```

---

#### Module 3.2: Search Automation & Scripts
**Quest: "Automation Master"**

**Learning Objectives:**
- Write reusable search scripts
- Create command-line tools
- Build search pipelines
- Automate common tasks
- Handle errors gracefully
- Add logging and reporting
- Make portable scripts
- Share with team

**Hands-On Projects:**
1. **Project: Custom Search CLI Tool** (XP: 300)
   - Build multi-purpose search tool
   - Add configuration options
   - Implement multiple commands
   - Create help documentation
   - Success Criteria: Production-ready CLI tool

2. **Project: Automated Code Quality Scanner** (XP: 325)
   - Scan for code issues
   - Generate reports
   - Integrate with CI/CD
   - Add custom rules
   - Success Criteria: Automated quality gate

**Challenges:**
- Script Writer: Create 20 search scripts (+175 XP)
- Tool Builder: Build 5 CLI tools (+250 XP)
- CI/CD Integration: Automate 10 checks (+225 XP)
- Boss Challenge: Build enterprise search automation platform (+700 XP)

**Script Examples:**
```bash
#!/bin/bash
# search_todos.sh - Find and categorize TODOs

find_todos() {
  local priority=$1
  local pattern="TODO.*${priority}.*"

  echo "=== ${priority} Priority TODOs ==="
  rg -i "$pattern" --heading --line-number \
    --type-not=binary \
    --ignore-dir=node_modules \
    --ignore-dir=dist
}

# Run for all priorities
for priority in HIGH MEDIUM LOW; do
  find_todos "$priority"
  echo
done

# Generate summary
total=$(rg -c "TODO" | awk -F: '{sum+=$2} END {print sum}')
echo "Total TODOs: $total"
```

```bash
#!/bin/bash
# find_security_issues.sh - Security scanning tool

check_hardcoded_secrets() {
  echo "Checking for hardcoded secrets..."

  # Common secret patterns
  patterns=(
    "password\s*=\s*['\"][^'\"]+['\"]"
    "api_key\s*=\s*['\"][^'\"]+['\"]"
    "secret\s*=\s*['\"][^'\"]+['\"]"
    "token\s*=\s*['\"][^'\"]+['\"]"
  )

  for pattern in "${patterns[@]}"; do
    rg -i "$pattern" \
      --type-not=test \
      --ignore-file=.gitignore \
      || echo "  ✓ No matches for: $pattern"
  done
}

check_insecure_patterns() {
  echo "Checking for insecure patterns..."

  rg "eval\(" --type js --type py
  rg "dangerouslySetInnerHTML" --type jsx
  rg "SELECT.*WHERE.*\$" --type sql
}

generate_report() {
  echo "Security Scan Report - $(date)" > security_report.txt
  check_hardcoded_secrets >> security_report.txt
  check_insecure_patterns >> security_report.txt
  echo "Report saved to security_report.txt"
}

generate_report
```

---

#### Module 3.3: IDE & Editor Integration
**Quest: "Integration Specialist"**

**Learning Objectives:**
- Integrate search tools in VS Code
- Set up Vim/Neovim integration
- Configure shell enhancements
- Build custom extensions
- Create keyboard shortcuts
- Optimize editor workflows
- Share team configurations
- Build universal search experience

**Hands-On Projects:**
1. **Project: VS Code Search Enhancement** (XP: 200)
   - Configure ripgrep in VS Code
   - Add custom search tasks
   - Create search snippets
   - Build search extension
   - Success Criteria: 5x faster in-editor search

2. **Project: Terminal Productivity Setup** (XP: 225)
   - Configure zsh/bash enhancements
   - Add intelligent aliases
   - Build custom functions
   - Create team dotfiles
   - Success Criteria: Share-able productivity config

**Challenges:**
- VS Code Master: Optimize 10 search workflows (+125 XP)
- Vim Integration: Set up perfect Vim search (+150 XP)
- Shell Enhancement: Build 15 shell improvements (+175 XP)
- Boss Challenge: Create team-wide productivity framework (+400 XP)

**VS Code Configuration:**
```json
// settings.json
{
  "search.useRipgrep": true,
  "search.smartCase": true,
  "search.followSymlinks": false,
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/.git": true
  }
}

// tasks.json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Search TODOs",
      "type": "shell",
      "command": "rg TODO --heading --line-number",
      "problemMatcher": []
    }
  ]
}
```

**Vim/Neovim Configuration:**
```lua
-- Using telescope.nvim with ripgrep
require('telescope').setup{
  defaults = {
    vimgrep_arguments = {
      'rg',
      '--color=never',
      '--no-heading',
      '--with-filename',
      '--line-number',
      '--column',
      '--smart-case'
    },
  },
}

-- Keybindings
vim.keymap.set('n', '<leader>ff', '<cmd>Telescope find_files<cr>')
vim.keymap.set('n', '<leader>fg', '<cmd>Telescope live_grep<cr>')
vim.keymap.set('n', '<leader>fb', '<cmd>Telescope buffers<cr>')
```

**Shell Configuration:**
```bash
# ~/.bashrc or ~/.zshrc

# Aliases for common searches
alias search='rg'
alias findf='fd'
alias todos="rg -i 'TODO|FIXME|XXX|HACK'"
alias findlarge='fd -S +10m'

# FZF configuration
export FZF_DEFAULT_COMMAND='fd --type f --hidden --follow --exclude .git'
export FZF_CTRL_T_COMMAND="$FZF_DEFAULT_COMMAND"
export FZF_ALT_C_COMMAND='fd --type d --hidden --follow --exclude .git'

# Custom functions
search_and_edit() {
  local file=$(rg --files-with-matches "$1" | fzf --preview "bat --color=always {}")
  [ -n "$file" ] && $EDITOR "$file"
}

# Keybindings
bindkey '^F' fzf-file-widget
```

---

#### Module 3.4: Search for Specific Languages & Frameworks
**Quest: "Language Specialist"**

**Learning Objectives:**
- Search JavaScript/TypeScript codebases
- Master Python code searching
- Search Java/C# projects
- Work with Ruby codebases
- Search configuration files (JSON, YAML, TOML)
- Find SQL queries
- Search markup (HTML, XML, Markdown)
- Language-specific patterns

**Hands-On Projects:**
1. **Project: Multi-Language Code Analyzer** (XP: 275)
   - Build universal code search tool
   - Support 10+ languages
   - Language-specific patterns
   - Generate analytics
   - Success Criteria: Search any codebase effectively

2. **Project: Framework Migration Helper** (XP: 300)
   - Find deprecated API usage
   - Suggest replacements
   - Generate migration report
   - Track migration progress
   - Success Criteria: Successful framework upgrade tool

**Challenges:**
- Polyglot: Master search in 5 languages (+200 XP)
- Pattern Library: Build 50 language patterns (+250 XP)
- Migration Expert: Help 3 teams migrate frameworks (+225 XP)
- Boss Challenge: Build universal code transformation tool (+600 XP)

**Language-Specific Patterns:**
```bash
# JavaScript/TypeScript
# Find React component definitions
rg "export (default )?(const|function) \w+.*=.*React" --type tsx

# Find imports
rg "^import .* from ['\"]\./.*['\"]" --type js

# Find async functions
rg "async (function|\w+\s*\()" --type ts

# Find console.log (to remove)
rg "console\.(log|debug|info)" --type js

# Python
# Find class definitions
rg "^class \w+.*:" --type py

# Find function definitions
rg "^def \w+\(" --type py

# Find imports
rg "^(from|import) " --type py

# Find TODO comments
rg "# TODO:" --type py

# Java/C#
# Find class declarations
rg "public class \w+" --type java

# Find interface implementations
rg "implements \w+" --type java

# Find annotation usage
rg "@\w+\(" --type java

# SQL
# Find SELECT statements
rg "SELECT .* FROM" --type sql

# Find potential SQL injection
rg "SELECT.*WHERE.*\+" --type sql

# Configuration Files
# Find environment variables
rg "process\.env\.\w+" --type js

# Find API endpoints
rg "(get|post|put|delete)\(['\"][^'\"]+['\"]" --type js

# Find database connections
rg "DATABASE_URL|DB_HOST|DB_NAME" --type-add 'config:*.{json,yaml,env}' -t config
```

---

#### Module 3.5: Production Debugging & Monitoring
**Quest: "Production Hero"**

**Learning Objectives:**
- Debug production issues with search
- Analyze application logs
- Find error patterns
- Track down performance issues
- Monitor system metrics
- Build alert systems
- Create debugging playbooks
- Handle incident response

**Hands-On Projects:**
1. **Project: Log Analysis Platform** (XP: 350)
   - Parse and analyze logs
   - Find error patterns
   - Track metrics over time
   - Generate alerts
   - Success Criteria: Identify issues before users report them

2. **Project: Incident Response Toolkit** (XP: 375)
   - Quick diagnostic tools
   - Common issue patterns
   - Debugging checklists
   - Recovery scripts
   - Success Criteria: Reduce MTTR by 50%

**Challenges:**
- Debug Master: Solve 25 production issues (+250 XP)
- Pattern Detective: Find 20 error patterns (+225 XP)
- Monitoring Expert: Build 10 monitoring tools (+275 XP)
- Boss Challenge: Build complete observability platform (+800 XP)

**Production Debugging:**
```bash
# Find errors in logs
rg "ERROR|FATAL|CRITICAL" /var/log/app.log

# Find errors in time range
rg "ERROR" /var/log/app.log | awk -F'[][]' '$2 > "2025-01-20" && $2 < "2025-01-21"'

# Find most common errors
rg "ERROR" /var/log/*.log |
  awk -F: '{print $NF}' |
  sort | uniq -c | sort -rn | head -20

# Find slow requests
rg "duration=[0-9]+" /var/log/access.log |
  awk -F= '{print $2}' |
  awk '$1 > 1000' |
  wc -l

# Find 500 errors
rg " 500 " /var/log/access.log |
  awk '{print $1}' |
  sort | uniq -c | sort -rn

# Track error rate over time
for hour in {00..23}; do
  count=$(rg "ERROR" /var/log/app.log | grep "2025-01-20 $hour:" | wc -l)
  echo "$hour:00 - $count errors"
done

# Find memory leaks
rg "OutOfMemoryError" /var/log/app.log

# Find deadlocks
rg "deadlock" -i /var/log/app.log

# Find unusual activity
rg "login.*failed" /var/log/auth.log |
  awk '{print $9}' |
  sort | uniq -c |
  awk '$1 > 5'

# Real-time monitoring
tail -f /var/log/app.log | rg --line-buffered "ERROR"
```

---

## Gamification System

### Experience Points (XP) & Levels

**Level Progression:**
- **Level 1-3: Search Novice** (0-300 XP)
- **Level 4-6: Pattern Hunter** (301-800 XP)
- **Level 7-10: Search Expert** (801-1,600 XP)
- **Level 11-15: Tool Master** (1,601-3,200 XP)
- **Level 16-20: Search Architect** (3,201-6,000 XP)
- **Level 21+: Search Guru** (6,001+ XP)

### Achievement Badges

**Foundational Badges:**
- First Search: Complete first grep command
- Regex Warrior: Master regular expressions
- File Finder: Master find command
- Pipeline Builder: Combine multiple tools

**Modern Tool Badges:**
- Speed Demon: Master ripgrep
- File Navigator: Master fd
- Fuzzy Master: Master fzf
- Integration Expert: Integrate tools in workflow

**Mastery Badges:**
- Production Hero: Debug production issue
- Automation Master: Build 10+ scripts
- Performance Guru: Optimize slow searches
- Team Leader: Train 5 teammates

**Special Achievements:**
- Lightning Fast: Search 1M+ lines in 1 second
- Bug Hunter: Find 50 issues with search
- Script Library: Create 25+ reusable scripts
- Open Source: Contribute to search tools

### Interactive Challenges

**Daily Search Puzzles (5 minutes):**
- Find specific patterns
- Optimize slow commands
- Debug search issues
- Build efficient pipelines

**Weekly Competitions:**
- Fastest search solution
- Most elegant command
- Best automation script
- Creative tool usage

### Leaderboards

**Global Rankings:**
- Total XP earned
- Scripts contributed
- Bugs found
- Team contributions

**Specialized Boards:**
- Fastest searchers
- Best optimizations
- Most helpful
- Tool integrations

---

## Interview Preparation

### Common Interview Topics

**Must-Know Questions:**
- [ ] Explain grep and basic usage
- [ ] What is the difference between grep and find?
- [ ] How do regular expressions work?
- [ ] What is ripgrep and why use it?
- [ ] Explain pipes and command chaining

**Expected Questions:**
- [ ] Find all files containing a pattern
- [ ] Search for files modified in last week
- [ ] Exclude certain directories from search
- [ ] Count occurrences of pattern
- [ ] Find and replace across multiple files
- [ ] Optimize a slow search command

**Advanced Topics:**
- [ ] Explain grep performance characteristics
- [ ] Debug production issue using only CLI
- [ ] Build automated search tool
- [ ] Compare modern vs traditional tools
- [ ] Regex performance optimization

### Practical Assessments

**Timed Challenges:**
- Find all TODO comments (2 minutes)
- Locate large log files (3 minutes)
- Find security vulnerabilities (10 minutes)
- Debug production error (15 minutes)

**Real-World Scenarios:**
- Find memory leak in logs
- Locate deprecated API usage
- Track down configuration issue
- Analyze performance bottleneck

---

## Portfolio Projects

### Capstone Projects (Complete 1 minimum)

1. **Command-Line Productivity Suite** (400 XP)
   - Collection of search tools
   - Team-ready scripts
   - Documentation and training
   - Integration guides

2. **Automated Code Quality Platform** (450 XP)
   - Multi-language support
   - CI/CD integration
   - Custom rule engine
   - Reporting dashboard

3. **Log Analysis Platform** (500 XP)
   - Real-time log monitoring
   - Pattern detection
   - Alert system
   - Analytics dashboard

4. **Developer Search Engine** (550 XP)
   - Code search across repos
   - Smart ranking
   - Syntax highlighting
   - API and CLI interface

---

## Resources & Tools

### Required Tools
- grep (GNU or BSD)
- find (standard Unix)
- awk and sed
- ripgrep (rg)
- fd-find
- fzf
- Bash/Zsh shell

### Recommended Tools
- bat (better cat)
- jq (JSON processor)
- hyperfine (benchmarking)
- tldr (command examples)

### Learning Resources
- Man pages (man grep, man find)
- ripgrep documentation
- Regex101.com (regex testing)
- Command Line Fu

---

## Certification Requirements

**Command-Line Search Professional:**
- [ ] Complete all modules
- [ ] Build 1+ capstone project
- [ ] Achieve 4,000+ XP
- [ ] Pass final exam (85%+)
- [ ] Solve 20 real-world problems

**Certification Levels:**
- **Bronze:** Complete fundamentals
- **Silver:** Bronze + modern tools + project
- **Gold:** Silver + automation + production use
- **Platinum:** Gold + team training + contributions

---

## Success Metrics

### Skills Mastered

**Technical Skills:**
- Find anything in seconds
- Write efficient search patterns
- Build automation scripts
- Debug production issues
- Optimize search performance

**Productivity Gains:**
- 10x faster code navigation
- 5x faster debugging
- 3x faster file operations
- 50% less context switching

### Career Impact

**Professional Benefits:**
- Essential for senior roles
- Critical for DevOps positions
- Required for open source work
- Key for remote development
- Important for interviews

---

## Conclusion

Command-line search mastery is a superpower. While others click through GUIs, you'll navigate massive codebases instantly, debug issues in seconds, and automate repetitive tasks effortlessly.

**Search faster. Work smarter. Master the command line.**

**Your journey to search mastery starts with a single grep.**
