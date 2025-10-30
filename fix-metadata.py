#!/usr/bin/env python3
"""
Fix course-metadata.ts type errors by:
1. Replacing 'title' with 'name' in projects and challenges
2. Replacing 'requirements' with 'successCriteria' in projects
3. Adding 'timeEstimate' to projects
4. Adding 'difficulty' to challenges
5. Removing 'type' from projects (not in Project interface)
"""

import re

# Read the file
with open('src/data/courses/react-unified/course-metadata.ts', 'r') as f:
    content = f.read()

# Function to fix a project object
def fix_project(match):
    project = match.group(0)
    # Replace title with name
    project = re.sub(r"title: '([^']+)'", r"name: '\1'", project)
    # Replace requirements with successCriteria
    project = re.sub(r'requirements:', 'successCriteria:', project)
    # Remove type: 'completion' or type: 'boss' from projects
    project = re.sub(r",?\s*type: '[^']+',?", '', project)
    # Add timeEstimate if not present and not a capstone
    if 'timeEstimate' not in project:
        if 'xp: 500' in project or 'xp: 600' in project:
            # Capstone projects get longer timeEstimate
            project = re.sub(r'(xp: \d+),', r'\1,\n          timeEstimate: \'8-12 hours\',', project)
        else:
            # Regular projects
            project = re.sub(r'(xp: \d+),', r'\1,\n          timeEstimate: \'2-4 hours\',', project)
    return project

# Function to fix a challenge object
def fix_challenge(match):
    challenge = match.group(0)
    # Replace title with name
    challenge = re.sub(r"title: '([^']+)'", r"name: '\1'", challenge)
    # Add difficulty if not present
    if 'difficulty:' not in challenge:
        # Determine difficulty based on XP
        if 'xp: 100' in challenge:
            difficulty = 'beginner'
        elif 'xp: 150' in challenge:
            difficulty = 'intermediate'
        elif 'xp: 200' in challenge:
            difficulty = 'advanced'
        else:
            difficulty = 'intermediate'
        challenge = re.sub(r'(xp: \d+),', rf'\1,\n          difficulty: \'{difficulty}\' as const,', challenge)
    return challenge

# Fix all projects (match entire project object)
content = re.sub(
    r'\{\s*id: \'project-[^}]+successCriteria: \[[^\]]+\][^}]*\}',
    fix_project,
    content,
    flags=re.DOTALL
)

# Alternative: fix line by line for projects
lines = content.split('\n')
result_lines = []
in_project = False
for i, line in enumerate(lines):
    # Detect if we're in a projects array
    if 'projects: [' in line:
        in_project = True
    elif in_project and '      ],' in line and 'challenges' not in lines[i+1] if i+1 < len(lines) else True:
        in_project = False

    # Fix title -> name in projects/challenges
    if in_project or (i > 0 and 'challenges: [' in lines[i-1]):
        if "          title: '" in line:
            line = line.replace("title:", "name:")
        elif "          requirements: [" in line:
            line = line.replace("requirements:", "successCriteria:")
        elif "          type: 'completion'," in line or "          type: 'boss'," in line:
            # Skip type lines in projects (but keep in challenges)
            if in_project:
                continue

    result_lines.append(line)

content = '\n'.join(result_lines)

# Write back
with open('src/data/courses/react-unified/course-metadata.ts', 'w') as f:
    f.write(content)

print("Fixed metadata type errors!")
