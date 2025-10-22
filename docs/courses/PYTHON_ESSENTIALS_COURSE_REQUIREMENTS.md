# Python Essentials for Interviews & Work
## Master Python for Professional Development & Data Roles

---

## Course Overview

This focused Python curriculum covers exactly what you need to pass technical interviews and excel in professional Python development roles. Focus on practical skills, common interview patterns, and real-world problem-solving.

**Target Audience:** Developers targeting Python roles (backend, full-stack, data, ML)

**Time Commitment:** 20-30 hours

**Success Metrics:**
- Pass Python technical interviews
- Write production-quality Python code
- Solve coding problems efficiently
- Work with popular Python frameworks
- Handle data structures and algorithms in Python

---

## What You'll Learn

### Core Skills
- ✅ Python fundamentals & syntax
- ✅ Data structures (lists, dicts, sets, tuples)
- ✅ Object-oriented programming
- ✅ Functional programming concepts
- ✅ File I/O and error handling
- ✅ Common libraries (requests, pandas basics)
- ✅ Interview problem patterns

---

## Learning Path

### Module 1: Python Fundamentals (5-6 hours)
**Level: Python Novice**

#### 1.1: Basic Syntax & Data Types

**Essential Concepts:**
```python
# Variables and types
name = "John"                    # str
age = 30                         # int
height = 5.9                     # float
is_active = True                 # bool
nothing = None                   # NoneType

# Type checking and conversion
type(age)                        # <class 'int'>
isinstance(age, int)             # True
str(age)                         # "30"
int("42")                        # 42
float("3.14")                    # 3.14

# String operations
text = "Hello, World!"
text.lower()                     # "hello, world!"
text.upper()                     # "HELLO, WORLD!"
text.replace("World", "Python")  # "Hello, Python!"
text.split(", ")                 # ["Hello", "World!"]
", ".join(["a", "b", "c"])       # "a, b, c"

# String formatting (IMPORTANT)
name, age = "John", 30

# f-strings (Python 3.6+, preferred)
f"My name is {name} and I'm {age}"

# format method
"My name is {} and I'm {}".format(name, age)
"My name is {n} and I'm {a}".format(n=name, a=age)

# % formatting (old style)
"My name is %s and I'm %d" % (name, age)

# Multiple lines
text = """
Multiple line
string here
"""

# String methods (commonly asked)
s = "  hello world  "
s.strip()                        # "hello world"
s.startswith("hello")            # False (has spaces)
s.endswith("world")              # False (has spaces)
"hello" in s                     # True
s.find("world")                  # Returns index or -1
s.count("l")                     # 3
```

**Interview Questions (XP: 100):**
1. What's the difference between `==` and `is`?
2. How do you reverse a string?
3. What are f-strings?
4. Explain string immutability
5. How do you check if a string contains a substring?

---

#### 1.2: Lists (Critical for Interviews)

**Essential Operations:**
```python
# Creating lists
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", True, 3.14]
empty = []

# Accessing elements
numbers[0]                       # 1 (first element)
numbers[-1]                      # 5 (last element)
numbers[1:4]                     # [2, 3, 4] (slicing)
numbers[:3]                      # [1, 2, 3] (first 3)
numbers[2:]                      # [3, 4, 5] (from index 2)
numbers[::2]                     # [1, 3, 5] (every 2nd)
numbers[::-1]                    # [5, 4, 3, 2, 1] (reverse)

# Modifying lists
numbers.append(6)                # Add to end
numbers.insert(0, 0)             # Insert at index
numbers.extend([7, 8])           # Add multiple
numbers.remove(3)                # Remove first occurrence
numbers.pop()                    # Remove and return last
numbers.pop(0)                   # Remove and return at index
del numbers[0]                   # Delete by index
numbers.clear()                  # Remove all

# Searching and sorting
numbers = [3, 1, 4, 1, 5]
numbers.index(4)                 # 2 (first index of 4)
numbers.count(1)                 # 2 (count occurrences)
numbers.sort()                   # [1, 1, 3, 4, 5] (in-place)
sorted(numbers)                  # Returns new sorted list
numbers.reverse()                # Reverse in-place

# List comprehensions (IMPORTANT)
squares = [x**2 for x in range(5)]                    # [0, 1, 4, 9, 16]
evens = [x for x in range(10) if x % 2 == 0]         # [0, 2, 4, 6, 8]
matrix = [[i*j for j in range(3)] for i in range(3)] # 2D list

# Common patterns
max(numbers)                     # Maximum
min(numbers)                     # Minimum
sum(numbers)                     # Sum
len(numbers)                     # Length
any([True, False, False])        # True (any true)
all([True, True, False])         # False (all true)

# Unpacking
a, b, c = [1, 2, 3]
first, *rest = [1, 2, 3, 4]      # first=1, rest=[2,3,4]
```

**Interview Questions (XP: 150):**
1. How do you reverse a list in-place?
2. What's the difference between append() and extend()?
3. How do you remove duplicates from a list?
4. Explain list slicing
5. What are list comprehensions?

---

#### 1.3: Dictionaries (Critical for Interviews)

**Essential Operations:**
```python
# Creating dictionaries
person = {"name": "John", "age": 30, "city": "NYC"}
empty = {}
empty_2 = dict()

# Accessing values
person["name"]                   # "John"
person.get("name")               # "John"
person.get("phone", "N/A")       # "N/A" (default)

# Modifying
person["age"] = 31               # Update
person["phone"] = "123-456"      # Add new
del person["city"]               # Delete
person.pop("age")                # Remove and return
person.update({"age": 32, "country": "USA"})

# Dictionary methods
person.keys()                    # dict_keys(['name', 'age'])
person.values()                  # dict_values(['John', 30])
person.items()                   # dict_items([('name', 'John'), ...])

# Checking existence
"name" in person                 # True
"phone" not in person            # True

# Dictionary comprehension (IMPORTANT)
squares = {x: x**2 for x in range(5)}  # {0:0, 1:1, 2:4, 3:9, 4:16}
filtered = {k: v for k, v in person.items() if v != "John"}

# Common patterns
# Count frequency
text = "hello world"
freq = {}
for char in text:
    freq[char] = freq.get(char, 0) + 1

# Or using defaultdict
from collections import defaultdict
freq = defaultdict(int)
for char in text:
    freq[char] += 1

# Or using Counter
from collections import Counter
freq = Counter(text)

# Merge dictionaries (Python 3.9+)
dict1 = {"a": 1, "b": 2}
dict2 = {"b": 3, "c": 4}
merged = dict1 | dict2           # {"a": 1, "b": 3, "c": 4}

# Or using unpacking
merged = {**dict1, **dict2}
```

**Interview Questions (XP: 150):**
1. How do you merge two dictionaries?
2. What's the difference between dict[] and dict.get()?
3. How do you count character frequency in a string?
4. What happens if you access a non-existent key?
5. How do you iterate over a dictionary?

---

#### 1.4: Sets & Tuples

**Essential Operations:**
```python
# Sets (unordered, unique elements)
numbers = {1, 2, 3, 4, 5}
numbers.add(6)                   # Add element
numbers.remove(3)                # Remove (raises error if not found)
numbers.discard(3)               # Remove (no error if not found)

# Set operations (IMPORTANT for interviews)
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
a | b                            # Union: {1, 2, 3, 4, 5, 6}
a & b                            # Intersection: {3, 4}
a - b                            # Difference: {1, 2}
a ^ b                            # Symmetric difference: {1, 2, 5, 6}

# Remove duplicates from list
unique = list(set([1, 2, 2, 3, 3, 3]))  # [1, 2, 3]

# Tuples (immutable lists)
point = (3, 4)
x, y = point                     # Unpacking

# Tuple advantages
# - Immutable (hashable, can be dict keys)
# - Faster than lists
# - Use for fixed data

# Named tuples
from collections import namedtuple
Point = namedtuple('Point', ['x', 'y'])
p = Point(3, 4)
p.x, p.y                         # 3, 4
```

**XP Rewards:** 150 XP + "Data Structures" badge

---

### Module 2: Control Flow & Functions (5-6 hours)
**Level: Python Practitioner**

#### 2.1: Control Flow

**Essential Patterns:**
```python
# if/elif/else
x = 10
if x > 15:
    print("Greater")
elif x > 5:
    print("Medium")
else:
    print("Small")

# Ternary operator
result = "even" if x % 2 == 0 else "odd"

# For loops
for i in range(5):               # 0, 1, 2, 3, 4
    print(i)

for i in range(2, 10, 2):        # 2, 4, 6, 8 (start, stop, step)
    print(i)

for item in [1, 2, 3]:
    print(item)

for key, value in {"a": 1, "b": 2}.items():
    print(f"{key}: {value}")

# enumerate (IMPORTANT)
for index, value in enumerate(["a", "b", "c"]):
    print(f"{index}: {value}")

# zip (IMPORTANT)
names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]
for name, age in zip(names, ages):
    print(f"{name} is {age}")

# While loops
count = 0
while count < 5:
    print(count)
    count += 1

# Break and continue
for i in range(10):
    if i == 3:
        continue                 # Skip 3
    if i == 7:
        break                    # Stop at 7
    print(i)

# else with loops (rarely used)
for i in range(5):
    if i == 10:
        break
else:
    print("Loop completed")      # Runs if no break
```

#### 2.2: Functions (Critical for Interviews)

**Essential Concepts:**
```python
# Basic function
def greet(name):
    return f"Hello, {name}!"

# Default parameters
def greet(name="World"):
    return f"Hello, {name}!"

# Multiple parameters
def add(a, b):
    return a + b

# Variable arguments
def sum_all(*args):              # args is tuple
    return sum(args)

sum_all(1, 2, 3, 4)              # 10

# Keyword arguments
def create_user(**kwargs):       # kwargs is dict
    return kwargs

create_user(name="John", age=30) # {'name': 'John', 'age': 30}

# Type hints (increasingly common)
def greet(name: str) -> str:
    return f"Hello, {name}!"

# Lambda functions (IMPORTANT)
square = lambda x: x ** 2
square(5)                        # 25

numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, numbers))
evens = list(filter(lambda x: x % 2 == 0, numbers))

# Higher-order functions
def apply_operation(x, y, operation):
    return operation(x, y)

apply_operation(5, 3, lambda a, b: a + b)  # 8

# Closures
def multiplier(factor):
    def multiply(x):
        return x * factor
    return multiply

double = multiplier(2)
double(5)                        # 10

# Decorators (important concept)
def timing_decorator(func):
    def wrapper(*args, **kwargs):
        import time
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"Time: {end - start}")
        return result
    return wrapper

@timing_decorator
def slow_function():
    import time
    time.sleep(1)
    return "Done"
```

**Interview Questions (XP: 200):**
1. What are *args and **kwargs?
2. Explain lambda functions
3. What are decorators?
4. What's the difference between a function and a method?
5. Explain closures

**XP Rewards:** 200 XP + "Function Master" badge

---

### Module 3: Object-Oriented Programming (5-6 hours)
**Level: Python Developer**

**Essential Concepts:**
```python
# Basic class
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greet(self):
        return f"Hello, I'm {self.name}"

    def __str__(self):
        return f"Person({self.name}, {self.age})"

    def __repr__(self):
        return f"Person(name='{self.name}', age={self.age})"

person = Person("John", 30)
print(person.greet())            # Hello, I'm John
print(person)                    # Calls __str__

# Class variables vs instance variables
class Counter:
    count = 0                    # Class variable (shared)

    def __init__(self):
        self.instance_count = 0  # Instance variable
        Counter.count += 1

# Properties
class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("Radius must be positive")
        self._radius = value

    @property
    def area(self):
        import math
        return math.pi * self._radius ** 2

circle = Circle(5)
circle.radius = 10               # Uses setter
print(circle.area)               # Uses getter

# Inheritance
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        return f"{self.name} says Woof!"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says Meow!"

# Polymorphism
animals = [Dog("Buddy"), Cat("Whiskers")]
for animal in animals:
    print(animal.speak())

# Special methods (magic methods)
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Point(self.x + other.x, self.y + other.y)

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

    def __len__(self):
        return 2

    def __getitem__(self, index):
        if index == 0:
            return self.x
        elif index == 1:
            return self.y
        raise IndexError

p1 = Point(1, 2)
p2 = Point(3, 4)
p3 = p1 + p2                     # Calls __add__
p1 == p2                         # Calls __eq__
len(p1)                          # Calls __len__
p1[0]                            # Calls __getitem__

# Class methods and static methods
class MathUtils:
    @staticmethod
    def add(a, b):
        return a + b

    @classmethod
    def from_string(cls, string):
        a, b = map(int, string.split(','))
        return cls(a, b)

MathUtils.add(5, 3)              # No instance needed
```

**Interview Questions (XP: 250):**
1. Explain inheritance vs composition
2. What are magic methods?
3. What's the difference between @staticmethod and @classmethod?
4. Explain @property decorator
5. What is polymorphism?

**XP Rewards:** 250 XP + "OOP Master" badge

---

### Module 4: Important Libraries & Tools (5-6 hours)
**Level: Python Professional**

#### 4.1: Collections Module

**Essential Tools:**
```python
from collections import Counter, defaultdict, deque, namedtuple

# Counter (VERY common in interviews)
text = "hello world"
freq = Counter(text)
freq.most_common(3)              # [('l', 3), ('o', 2), ('h', 1)]

numbers = [1, 2, 2, 3, 3, 3]
Counter(numbers)                 # Counter({3: 3, 2: 2, 1: 1})

# defaultdict (avoid KeyError)
dd = defaultdict(list)
dd['fruits'].append('apple')     # No KeyError
dd['fruits'].append('banana')

dd = defaultdict(int)
for char in "hello":
    dd[char] += 1                # No need to check if key exists

# deque (double-ended queue)
from collections import deque
dq = deque([1, 2, 3])
dq.append(4)                     # Add to right
dq.appendleft(0)                 # Add to left
dq.pop()                         # Remove from right
dq.popleft()                     # Remove from left
# Efficient for queue operations (O(1) both ends)

# namedtuple (immutable, memory-efficient)
Point = namedtuple('Point', ['x', 'y'])
p = Point(3, 4)
p.x, p.y                         # Access by name
```

#### 4.2: Itertools (Interview Favorite)

**Essential Tools:**
```python
from itertools import (
    combinations, permutations,
    product, chain, groupby,
    accumulate, compress
)

# Combinations (no repeats, order doesn't matter)
list(combinations([1, 2, 3], 2)) # [(1,2), (1,3), (2,3)]

# Permutations (order matters)
list(permutations([1, 2, 3], 2)) # [(1,2), (1,3), (2,1), (2,3), (3,1), (3,2)]

# Product (cartesian product)
list(product([1, 2], ['a', 'b']))# [(1,'a'), (1,'b'), (2,'a'), (2,'b')]

# Chain (flatten iterables)
list(chain([1, 2], [3, 4]))      # [1, 2, 3, 4]

# Groupby (group consecutive items)
data = [('a', 1), ('a', 2), ('b', 3), ('b', 4)]
for key, group in groupby(data, lambda x: x[0]):
    print(key, list(group))

# Accumulate (running totals)
list(accumulate([1, 2, 3, 4]))   # [1, 3, 6, 10]
```

#### 4.3: File I/O & Context Managers

**Essential Operations:**
```python
# Reading files
with open('file.txt', 'r') as f:
    content = f.read()           # Read entire file
    lines = f.readlines()        # List of lines
    for line in f:               # Iterate lines
        print(line.strip())

# Writing files
with open('file.txt', 'w') as f:
    f.write('Hello\n')
    f.writelines(['Line 1\n', 'Line 2\n'])

# Appending
with open('file.txt', 'a') as f:
    f.write('Appended line\n')

# JSON
import json

# Write JSON
data = {'name': 'John', 'age': 30}
with open('data.json', 'w') as f:
    json.dump(data, f, indent=2)

# Read JSON
with open('data.json', 'r') as f:
    data = json.load(f)

# CSV
import csv

# Read CSV
with open('data.csv', 'r') as f:
    reader = csv.reader(f)
    for row in reader:
        print(row)

# Write CSV
with open('data.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(['Name', 'Age'])
    writer.writerows([['John', 30], ['Jane', 25]])

# Context managers (custom)
class FileManager:
    def __init__(self, filename):
        self.filename = filename

    def __enter__(self):
        self.file = open(self.filename, 'r')
        return self.file

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.file.close()

with FileManager('file.txt') as f:
    content = f.read()
```

#### 4.4: Error Handling

**Essential Patterns:**
```python
# Try/except
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero")

# Multiple exceptions
try:
    # code
    pass
except (ValueError, TypeError) as e:
    print(f"Error: {e}")

# Catch all (use sparingly)
try:
    # code
    pass
except Exception as e:
    print(f"Error: {e}")

# Finally (always runs)
try:
    f = open('file.txt')
    # process file
finally:
    f.close()                    # Always closes

# Else (runs if no exception)
try:
    result = int(input())
except ValueError:
    print("Invalid input")
else:
    print(f"You entered: {result}")

# Raising exceptions
def validate_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
    return age

# Custom exceptions
class InvalidEmailError(Exception):
    pass

def validate_email(email):
    if '@' not in email:
        raise InvalidEmailError(f"Invalid email: {email}")
```

**XP Rewards:** 300 XP + "Tools Master" badge

---

### Module 5: Interview Patterns (5-6 hours)
**Level: Interview Ready**

#### Common Python Interview Patterns

**Pattern 1: Two Pointers**
```python
def is_palindrome(s):
    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True

def two_sum_sorted(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        current_sum = arr[left] + arr[right]
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1
        else:
            right -= 1
    return None
```

**Pattern 2: Sliding Window**
```python
def max_sum_subarray(arr, k):
    window_sum = sum(arr[:k])
    max_sum = window_sum

    for i in range(len(arr) - k):
        window_sum = window_sum - arr[i] + arr[i + k]
        max_sum = max(max_sum, window_sum)

    return max_sum
```

**Pattern 3: Hash Map for O(1) Lookup**
```python
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return None

def first_unique_char(s):
    freq = Counter(s)
    for i, char in enumerate(s):
        if freq[char] == 1:
            return i
    return -1
```

**Pattern 4: Stack for Parentheses**
```python
def is_valid_parentheses(s):
    stack = []
    pairs = {'(': ')', '[': ']', '{': '}'}

    for char in s:
        if char in pairs:
            stack.append(char)
        elif not stack or pairs[stack.pop()] != char:
            return False

    return len(stack) == 0
```

**Pattern 5: BFS/DFS**
```python
from collections import deque

def bfs(graph, start):
    visited = set([start])
    queue = deque([start])
    result = []

    while queue:
        node = queue.popleft()
        result.append(node)

        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return result

def dfs(graph, node, visited=None):
    if visited is None:
        visited = set()

    visited.add(node)
    result = [node]

    for neighbor in graph[node]:
        if neighbor not in visited:
            result.extend(dfs(graph, neighbor, visited))

    return result
```

**Pattern 6: Dynamic Programming**
```python
# Fibonacci (memoization)
def fib(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n

    memo[n] = fib(n-1, memo) + fib(n-2, memo)
    return memo[n]

# Or using lru_cache
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)
```

**XP Rewards:** 400 XP + "Problem Solver" badge

---

## Common Interview Questions

### Basic Python
1. What's the difference between list and tuple?
2. Explain list comprehension
3. What are decorators?
4. What is `__init__` method?
5. Explain `*args` and `**kwargs`

### Data Structures
1. How do you remove duplicates from a list?
2. How do you merge two dictionaries?
3. What's the difference between `append()` and `extend()`?
4. How do you sort a dictionary by values?
5. When would you use a set vs a list?

### Advanced
1. Explain generators and yield
2. What are context managers?
3. Difference between deepcopy and copy?
4. What is GIL (Global Interpreter Lock)?
5. Explain list slicing notation

### Problem Solving
1. Reverse a string
2. Find duplicates in a list
3. Check if string is palindrome
4. Find second largest number
5. Anagram detection

---

## Gamification

### XP System
- Fundamentals: 100-150 XP per topic
- Functions & OOP: 200-250 XP per topic
- Libraries: 300 XP
- Interview patterns: 400 XP

### Badges
- **Data Structures**: Master lists, dicts, sets
- **Function Master**: Master functions and lambda
- **OOP Master**: Complete OOP module
- **Tools Master**: Learn key libraries
- **Problem Solver**: Master interview patterns
- **Interview Ready**: Pass mock interview

### Milestones
- [ ] Solve 50 basic problems
- [ ] Solve 25 LeetCode Easy problems in Python
- [ ] Build 3 small projects
- [ ] Read and understand 100 lines of real code
- [ ] Pass mock interview

---

## Practice Resources

### Coding Platforms
- [LeetCode](https://leetcode.com/) - Filter by Python
- [HackerRank Python](https://www.hackerrank.com/domains/python)
- [Codewars](https://www.codewars.com/) - Python katas
- [Exercism Python Track](https://exercism.org/tracks/python)

### Documentation
- [Python Official Docs](https://docs.python.org/3/)
- [Real Python](https://realpython.com/)
- [Python Tutor](http://pythontutor.com/) - Visualize code

### Projects to Build
1. CLI Todo App
2. Web Scraper (BeautifulSoup)
3. REST API (Flask/FastAPI)
4. Data Analysis Script (Pandas)
5. Automation Scripts

---

## Certification

**Python Professional Certificate:**
- [ ] Complete all modules
- [ ] Solve 100+ practice problems
- [ ] Build 3 projects
- [ ] Pass mock interview (80%+)
- [ ] Write clean, Pythonic code

---

## Conclusion

Python is one of the most in-demand programming languages. With 20-30 hours of focused practice on these essentials, you'll be ready for interviews and real-world Python development.

**Master Python fundamentals. Solve problems efficiently. Get hired!**
