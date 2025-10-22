# SQL Essentials for Interviews & Work
## Master SQL for Professional Development Success

---

## Course Overview

This focused SQL curriculum covers exactly what you need to pass technical interviews and excel in professional development roles. Skip the database theory—focus on practical queries, optimization, and real-world scenarios that companies actually ask about.

**Target Audience:** Developers who need SQL for interviews and day-to-day work

**Time Commitment:** 15-20 hours

**Success Metrics:**
- Pass SQL technical interviews
- Write efficient production queries
- Debug and optimize slow queries
- Work confidently with databases
- Handle real-world data problems

---

## What You'll Learn

### Core Skills
- ✅ SELECT, WHERE, JOIN mastery
- ✅ Aggregate functions and GROUP BY
- ✅ Subqueries and CTEs
- ✅ Window functions
- ✅ Query optimization
- ✅ Index usage
- ✅ Real-world scenarios

### What We Skip
- ❌ Deep database theory
- ❌ Database administration
- ❌ Extensive normalization theory
- ❌ Stored procedures (unless job-specific)
- ❌ Vendor-specific features

---

## Learning Path

### Module 1: SQL Fundamentals (4-5 hours)
**Level: SQL Novice**

#### 1.1: SELECT & Filtering Basics

**Must-Know Concepts:**
```sql
-- Basic SELECT
SELECT column1, column2 FROM table_name;

-- WHERE clause
SELECT * FROM users WHERE age > 25;

-- Multiple conditions
SELECT * FROM orders
WHERE status = 'completed' AND total > 100;

-- LIKE pattern matching
SELECT * FROM users
WHERE email LIKE '%@gmail.com';

-- IN operator
SELECT * FROM products
WHERE category IN ('Electronics', 'Books', 'Toys');

-- BETWEEN
SELECT * FROM orders
WHERE order_date BETWEEN '2025-01-01' AND '2025-12-31';

-- IS NULL / IS NOT NULL
SELECT * FROM customers WHERE phone IS NOT NULL;

-- ORDER BY
SELECT * FROM products
ORDER BY price DESC, name ASC;

-- LIMIT (pagination)
SELECT * FROM users
ORDER BY created_at DESC
LIMIT 10 OFFSET 20;
```

**Interview Questions (XP: 100):**
1. Find all users who signed up in the last 30 days
2. Get top 10 most expensive products
3. Find customers with email ending in specific domains
4. List orders with null shipping addresses
5. Find products in specific price range

---

#### 1.2: Aggregate Functions & GROUP BY

**Must-Know Concepts:**
```sql
-- COUNT
SELECT COUNT(*) FROM users;
SELECT COUNT(DISTINCT country) FROM users;

-- SUM, AVG, MIN, MAX
SELECT
    COUNT(*) as total_orders,
    SUM(total) as revenue,
    AVG(total) as avg_order_value,
    MIN(total) as min_order,
    MAX(total) as max_order
FROM orders;

-- GROUP BY
SELECT
    category,
    COUNT(*) as product_count,
    AVG(price) as avg_price
FROM products
GROUP BY category;

-- HAVING (filter after aggregation)
SELECT
    customer_id,
    COUNT(*) as order_count,
    SUM(total) as total_spent
FROM orders
GROUP BY customer_id
HAVING COUNT(*) > 5;

-- Multiple GROUP BY columns
SELECT
    DATE(order_date) as order_day,
    status,
    COUNT(*) as count
FROM orders
GROUP BY DATE(order_date), status
ORDER BY order_day DESC;
```

**Interview Questions (XP: 150):**
1. Find average salary by department
2. Count orders per customer
3. Find categories with more than 100 products
4. Calculate monthly revenue
5. Find top 5 customers by total spend

---

#### 1.3: JOINs - The Critical Skill

**Must-Know Concepts:**
```sql
-- INNER JOIN (most common)
SELECT
    orders.id,
    users.name,
    orders.total
FROM orders
INNER JOIN users ON orders.user_id = users.id;

-- LEFT JOIN (all from left table)
SELECT
    users.name,
    COUNT(orders.id) as order_count
FROM users
LEFT JOIN orders ON users.id = orders.user_id
GROUP BY users.id, users.name;

-- RIGHT JOIN (rarely used, know it exists)
SELECT *
FROM orders
RIGHT JOIN users ON orders.user_id = users.id;

-- Multiple JOINs
SELECT
    orders.id,
    users.name as customer_name,
    products.name as product_name,
    order_items.quantity,
    order_items.price
FROM orders
INNER JOIN users ON orders.user_id = users.id
INNER JOIN order_items ON orders.id = order_items.order_id
INNER JOIN products ON order_items.product_id = products.id;

-- Self JOIN
SELECT
    e.name as employee,
    m.name as manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;
```

**Interview Questions (XP: 200):**
1. Find all users and their order counts (including users with 0 orders)
2. List products and their categories (if category exists)
3. Find employees and their managers
4. Get customer names with their most recent order
5. Find users who have never placed an order

**Common JOIN Interview Patterns:**
- Users with/without orders
- Finding relationships between tables
- Counting across relationships
- Latest/first records per group

---

### Module 2: Intermediate SQL (5-6 hours)
**Level: SQL Practitioner**

#### 2.1: Subqueries

**Must-Know Concepts:**
```sql
-- Subquery in WHERE
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- Subquery with IN
SELECT name
FROM users
WHERE id IN (
    SELECT user_id
    FROM orders
    WHERE total > 1000
);

-- Subquery in SELECT
SELECT
    name,
    salary,
    (SELECT AVG(salary) FROM employees) as avg_salary,
    salary - (SELECT AVG(salary) FROM employees) as diff_from_avg
FROM employees;

-- Subquery in FROM (derived table)
SELECT
    dept,
    AVG(salary) as dept_avg
FROM (
    SELECT department as dept, salary
    FROM employees
    WHERE active = true
) active_employees
GROUP BY dept;

-- Correlated subquery
SELECT
    e1.name,
    e1.department,
    e1.salary
FROM employees e1
WHERE salary > (
    SELECT AVG(salary)
    FROM employees e2
    WHERE e2.department = e1.department
);
```

**Interview Questions (XP: 200):**
1. Find employees earning more than department average
2. Get products with above-average prices in their category
3. Find users with more orders than average
4. List departments with the highest average salary
5. Find second highest salary by department

---

#### 2.2: Common Table Expressions (CTEs)

**Must-Know Concepts:**
```sql
-- Basic CTE
WITH high_value_customers AS (
    SELECT
        user_id,
        SUM(total) as total_spent
    FROM orders
    GROUP BY user_id
    HAVING SUM(total) > 10000
)
SELECT
    users.name,
    high_value_customers.total_spent
FROM high_value_customers
JOIN users ON high_value_customers.user_id = users.id
ORDER BY total_spent DESC;

-- Multiple CTEs
WITH
monthly_sales AS (
    SELECT
        DATE_TRUNC('month', order_date) as month,
        SUM(total) as revenue
    FROM orders
    GROUP BY DATE_TRUNC('month', order_date)
),
avg_monthly AS (
    SELECT AVG(revenue) as avg_revenue
    FROM monthly_sales
)
SELECT
    ms.month,
    ms.revenue,
    am.avg_revenue,
    ms.revenue - am.avg_revenue as diff_from_avg
FROM monthly_sales ms
CROSS JOIN avg_monthly am
ORDER BY ms.month;

-- Recursive CTE (know it exists)
WITH RECURSIVE subordinates AS (
    SELECT id, name, manager_id, 0 as level
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    SELECT e.id, e.name, e.manager_id, s.level + 1
    FROM employees e
    INNER JOIN subordinates s ON e.manager_id = s.id
)
SELECT * FROM subordinates;
```

**Interview Questions (XP: 250):**
1. Calculate month-over-month revenue growth
2. Find customers in top 10% of spending
3. Build employee hierarchy
4. Calculate running totals by category
5. Find products contributing to 80% of revenue

---

#### 2.3: Window Functions (High-Value Skill)

**Must-Know Concepts:**
```sql
-- ROW_NUMBER (numbering within groups)
SELECT
    department,
    name,
    salary,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) as rank_in_dept
FROM employees;

-- RANK and DENSE_RANK
SELECT
    name,
    score,
    RANK() OVER (ORDER BY score DESC) as rank,
    DENSE_RANK() OVER (ORDER BY score DESC) as dense_rank
FROM test_scores;

-- Running totals
SELECT
    order_date,
    total,
    SUM(total) OVER (ORDER BY order_date) as running_total
FROM orders;

-- Moving average
SELECT
    date,
    revenue,
    AVG(revenue) OVER (
        ORDER BY date
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) as seven_day_avg
FROM daily_revenue;

-- LAG and LEAD
SELECT
    order_date,
    revenue,
    LAG(revenue, 1) OVER (ORDER BY order_date) as prev_day,
    revenue - LAG(revenue, 1) OVER (ORDER BY order_date) as day_over_day_change
FROM daily_revenue;

-- NTILE (quartiles, percentiles)
SELECT
    customer_id,
    total_spent,
    NTILE(4) OVER (ORDER BY total_spent) as quartile
FROM customer_spending;
```

**Interview Questions (XP: 300):**
1. Find top 3 earners in each department
2. Calculate month-over-month growth
3. Find users' first and last purchases
4. Calculate running total of sales
5. Identify top 25% of customers by revenue

**Why Window Functions Matter:**
- Asked in 70%+ of data-related SQL interviews
- Critical for analytics and reporting
- Cleaner than self-joins
- Essential for FAANG interviews

---

### Module 3: Advanced Topics (5-6 hours)
**Level: SQL Expert**

#### 3.1: Query Optimization

**Must-Know Concepts:**

**1. Indexes:**
```sql
-- Create index
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_user_date ON orders(user_id, order_date);

-- When indexes help:
-- ✅ WHERE clauses on indexed columns
-- ✅ JOIN conditions
-- ✅ ORDER BY on indexed columns
-- ✅ GROUP BY on indexed columns

-- When indexes DON'T help:
-- ❌ Small tables (full scan is faster)
-- ❌ Columns with low cardinality
-- ❌ Functions on columns: WHERE LOWER(email) = ...
-- ✅ Better: WHERE email = LOWER(...)
```

**2. Explain Plans:**
```sql
-- Analyze query performance
EXPLAIN ANALYZE
SELECT * FROM orders
WHERE user_id = 123
ORDER BY order_date DESC;

-- Look for:
-- - Sequential Scan (bad on large tables)
-- - Index Scan (good)
-- - Nested Loop vs Hash Join
-- - High execution time
```

**3. Common Optimizations:**
```sql
-- BAD: Using NOT IN with subquery
SELECT * FROM users
WHERE id NOT IN (SELECT user_id FROM orders);

-- GOOD: Using LEFT JOIN
SELECT users.* FROM users
LEFT JOIN orders ON users.id = orders.user_id
WHERE orders.id IS NULL;

-- BAD: SELECT *
SELECT * FROM large_table;

-- GOOD: Select only needed columns
SELECT id, name, email FROM users;

-- BAD: Multiple subqueries
SELECT
    (SELECT COUNT(*) FROM orders WHERE user_id = users.id),
    (SELECT SUM(total) FROM orders WHERE user_id = users.id)
FROM users;

-- GOOD: Single JOIN
SELECT
    users.id,
    COUNT(orders.id) as order_count,
    COALESCE(SUM(orders.total), 0) as total_spent
FROM users
LEFT JOIN orders ON users.id = orders.user_id
GROUP BY users.id;
```

**Interview Questions (XP: 300):**
1. Why is this query slow? How to fix?
2. When should you add an index?
3. Explain the difference between index scan and sequential scan
4. Optimize a given slow query
5. When would you NOT use an index?

---

#### 3.2: Real-World Scenarios

**Scenario 1: Finding Nth Highest Value**
```sql
-- Second highest salary
SELECT MAX(salary) as second_highest
FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);

-- Or using window functions
SELECT DISTINCT salary as second_highest
FROM (
    SELECT salary,
    DENSE_RANK() OVER (ORDER BY salary DESC) as rank
    FROM employees
) ranked
WHERE rank = 2;

-- Nth highest (generic)
SELECT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET N-1;
```

**Scenario 2: Finding Duplicates**
```sql
-- Find duplicate emails
SELECT email, COUNT(*) as count
FROM users
GROUP BY email
HAVING COUNT(*) > 1;

-- Get all records with duplicate emails
SELECT u.*
FROM users u
WHERE email IN (
    SELECT email
    FROM users
    GROUP BY email
    HAVING COUNT(*) > 1
);
```

**Scenario 3: Date Handling**
```sql
-- Users who signed up this month
SELECT * FROM users
WHERE DATE_TRUNC('month', created_at) = DATE_TRUNC('month', CURRENT_DATE);

-- Calculate age or duration
SELECT
    id,
    name,
    created_at,
    EXTRACT(YEAR FROM AGE(CURRENT_DATE, created_at)) as years_active
FROM users;

-- Group by date parts
SELECT
    EXTRACT(YEAR FROM order_date) as year,
    EXTRACT(MONTH FROM order_date) as month,
    SUM(total) as revenue
FROM orders
GROUP BY
    EXTRACT(YEAR FROM order_date),
    EXTRACT(MONTH FROM order_date)
ORDER BY year, month;
```

**Scenario 4: Pivoting Data**
```sql
-- Simple pivot with CASE
SELECT
    user_id,
    SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
    SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled,
    SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending
FROM orders
GROUP BY user_id;
```

**Scenario 5: Cohort Analysis**
```sql
-- Monthly cohort retention
WITH first_purchase AS (
    SELECT
        user_id,
        DATE_TRUNC('month', MIN(order_date)) as cohort_month
    FROM orders
    GROUP BY user_id
),
purchase_months AS (
    SELECT
        user_id,
        DATE_TRUNC('month', order_date) as purchase_month
    FROM orders
)
SELECT
    fp.cohort_month,
    pm.purchase_month,
    COUNT(DISTINCT pm.user_id) as users
FROM first_purchase fp
JOIN purchase_months pm ON fp.user_id = pm.user_id
GROUP BY fp.cohort_month, pm.purchase_month
ORDER BY fp.cohort_month, pm.purchase_month;
```

**Interview Questions (XP: 400):**
1. Find the second highest salary
2. Identify and remove duplicate records
3. Calculate user retention by cohort
4. Pivot data from rows to columns
5. Find users who made purchases in consecutive months

---

### Module 4: Interview Prep (3-4 hours)
**Level: Interview Ready**

#### Common Interview Questions by Category

**Basic (Easy):**
1. Select all customers from California
2. Count total orders
3. Find products with price > 100
4. Get top 10 customers by order count
5. Find average order value

**Joins (Medium):**
1. List all customers with their order count (including 0 orders)
2. Find products that have never been ordered
3. Get each customer's most recent order
4. Find managers with more than 5 direct reports
5. List users and their total spending

**Aggregation (Medium):**
1. Calculate monthly revenue for the past year
2. Find departments with average salary > $80,000
3. Get top 3 products by revenue in each category
4. Calculate the percentage of orders by status
5. Find customers in the top 10% by spending

**Subqueries (Medium):**
1. Find employees earning more than their department's average
2. Get products with above-average prices in their category
3. List users with more than 5 orders
4. Find the second highest price in each category
5. Identify customers who bought specific products

**Window Functions (Hard):**
1. Calculate running total of daily sales
2. Find top 3 products each month
3. Calculate month-over-month growth rate
4. Identify users' first and last purchases
5. Determine customer lifetime value over time

**Optimization (Hard):**
1. Why is this query slow? (Given slow query)
2. How would you index this table for these queries?
3. Rewrite this subquery as a JOIN
4. Explain this EXPLAIN plan
5. Optimize this query using window functions instead of subqueries

---

## Common Interview Patterns

### Pattern 1: Find Top N Per Group
```sql
-- Top 3 earners per department
WITH ranked AS (
    SELECT
        department,
        name,
        salary,
        ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) as rn
    FROM employees
)
SELECT department, name, salary
FROM ranked
WHERE rn <= 3;
```

### Pattern 2: Latest Record Per Group
```sql
-- Each customer's most recent order
WITH ranked_orders AS (
    SELECT
        *,
        ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY order_date DESC) as rn
    FROM orders
)
SELECT * FROM ranked_orders WHERE rn = 1;
```

### Pattern 3: Growth Calculations
```sql
-- Month-over-month revenue growth
WITH monthly_revenue AS (
    SELECT
        DATE_TRUNC('month', order_date) as month,
        SUM(total) as revenue
    FROM orders
    GROUP BY DATE_TRUNC('month', order_date)
)
SELECT
    month,
    revenue,
    LAG(revenue) OVER (ORDER BY month) as prev_month_revenue,
    (revenue - LAG(revenue) OVER (ORDER BY month)) / LAG(revenue) OVER (ORDER BY month) * 100 as growth_pct
FROM monthly_revenue;
```

### Pattern 4: Self-Join for Comparisons
```sql
-- Find employees earning more than their managers
SELECT
    e.name as employee,
    e.salary as emp_salary,
    m.name as manager,
    m.salary as mgr_salary
FROM employees e
JOIN employees m ON e.manager_id = m.id
WHERE e.salary > m.salary;
```

### Pattern 5: Finding Gaps and Islands
```sql
-- Find date ranges where something was active
SELECT
    MIN(date) as start_date,
    MAX(date) as end_date
FROM (
    SELECT
        date,
        ROW_NUMBER() OVER (ORDER BY date) -
        ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY date) as grp
    FROM user_activity
) grouped
GROUP BY user_id, grp;
```

---

## Database Design Basics

### Normal Forms (Know the Concepts)

**1NF (First Normal Form):**
- Each column contains atomic values
- No repeating groups
- Each row is unique

**2NF (Second Normal Form):**
- Already in 1NF
- All non-key columns depend on the entire primary key

**3NF (Third Normal Form):**
- Already in 2NF
- No transitive dependencies

**Why It Matters:**
- Reduces data redundancy
- Prevents update anomalies
- Improves data integrity

**When to Denormalize:**
- For read-heavy applications
- When joins are too expensive
- For reporting/analytics tables

### Keys & Constraints

**Primary Key:**
- Uniquely identifies each row
- Cannot be NULL
- One per table

**Foreign Key:**
- References primary key in another table
- Maintains referential integrity

**Unique Constraint:**
- Ensures column values are unique
- Can be NULL (unlike primary key)

**Check Constraint:**
- Validates data meets condition
- `CHECK (age >= 18)`

---

## SQL for Different Databases

### PostgreSQL
```sql
-- ILIKE (case-insensitive)
SELECT * FROM users WHERE email ILIKE '%@gmail.com';

-- Array operations
SELECT * FROM posts WHERE tags @> ARRAY['sql', 'database'];

-- JSON operations
SELECT data->>'name' FROM users WHERE data->>'age' > '25';
```

### MySQL
```sql
-- LIMIT syntax
SELECT * FROM users LIMIT 10 OFFSET 20;

-- Date functions
SELECT DATE_FORMAT(created_at, '%Y-%m') as month FROM users;

-- String functions
SELECT CONCAT(first_name, ' ', last_name) as full_name FROM users;
```

### SQL Server
```sql
-- TOP instead of LIMIT
SELECT TOP 10 * FROM users ORDER BY created_at DESC;

-- Pagination
SELECT * FROM users
ORDER BY id
OFFSET 20 ROWS
FETCH NEXT 10 ROWS ONLY;
```

---

## Gamification & Progress

### XP System
- Basic queries: 100 XP
- Joins: 200 XP
- Aggregations: 150 XP
- Subqueries: 200 XP
- CTEs: 250 XP
- Window Functions: 300 XP
- Optimization: 300 XP
- Real scenarios: 400 XP

### Badges
- **Query Master**: Complete all basic queries
- **Join Expert**: Master all join types
- **Window Wizard**: Master window functions
- **Optimizer**: Improve 10 slow queries
- **Interview Ready**: Pass 20 interview questions

### Progress Milestones
- [ ] Complete 50 basic queries
- [ ] Master all join types
- [ ] Write 20 aggregation queries
- [ ] Use window functions in 15 queries
- [ ] Optimize 5 slow queries
- [ ] Pass mock SQL interview

---

## Interview Tips

### Do's:
- ✅ Think out loud
- ✅ Ask clarifying questions
- ✅ Consider edge cases (NULL, empty sets)
- ✅ Discuss performance
- ✅ Use table aliases for clarity
- ✅ Format queries readable
- ✅ Test your query logic

### Don'ts:
- ❌ Jump straight to code
- ❌ Forget about NULL values
- ❌ Use SELECT * in production
- ❌ Ignore performance
- ❌ Make assumptions about data
- ❌ Write unreadable queries

### Communication Framework:
1. **Understand**: Repeat requirements
2. **Clarify**: Ask about edge cases, data volumes
3. **Plan**: Sketch table relationships
4. **Code**: Write query incrementally
5. **Test**: Walk through with example data
6. **Optimize**: Discuss indexes, alternatives

---

## Resources

### Practice Platforms
- [LeetCode SQL](https://leetcode.com/problemset/database/) - 50+ problems
- [HackerRank SQL](https://www.hackerrank.com/domains/sql) - Structured path
- [SQLZoo](https://sqlzoo.net/) - Interactive tutorials
- [Mode Analytics SQL Tutorial](https://mode.com/sql-tutorial/) - Real datasets

### Cheat Sheets
- Window functions reference
- Join types visual guide
- Date function examples
- Performance optimization checklist

### Mock Interviews
- Practice 20+ interview questions
- Time yourself (20-30 min per question)
- Explain your approach
- Review solutions

---

## Certification

**SQL Professional Certificate:**
- [ ] Complete all modules
- [ ] Solve 100+ practice problems
- [ ] Pass mock interview (80%+)
- [ ] Optimize 10 slow queries
- [ ] Write 5 complex analytical queries

---

## Conclusion

SQL is one of the highest-ROI skills you can learn. With 15-20 hours of focused practice on these topics, you'll be ready for 90% of SQL interviews and day-to-day work.

**Master these skills:**
- JOINs (especially LEFT JOIN)
- GROUP BY and aggregations
- Window functions (critical for analytics)
- Query optimization basics
- Common interview patterns

**Your SQL journey starts now. Write queries, solve problems, get hired!**
