# New Agents Quick Reference

**Full Plan:** [NEW_AGENTS_BUILD_PLAN.md](/home/coder/coder-personal-project/plans/NEW_AGENTS_BUILD_PLAN.md)

---

## Priority Overview

### P1 - Critical (Build First) - 40-50 hours

| Priority | Agent | Time | Key Value | Research Support |
|----------|-------|------|-----------|------------------|
| #1 | **execution-agent** | 12-15h | Systematic plan execution | Foundation for all builds |
| #2 | **code-review-agent** | 8-10h | Quality enforcement | 96% positive feedback |
| #3 | **security-scanner-agent** | 10-12h | Vulnerability detection | 94.5% fix accuracy |
| #4 | **debugging-agent** | 8-10h | Error resolution | 30% faster resolution |
| #5 | **refactoring-agent** | 8-10h | Code quality | Maintains clean code |

### P2 - High Value - 45-60 hours

| Priority | Agent | Time | Key Value | Research Support |
|----------|-------|------|-----------|------------------|
| #6 | **migration-agent** | 10-12h | Modernization | 40% time savings |
| #7 | **architecture-agent** | 8-10h | Design decisions | Better architecture |
| #8 | **dependency-agent** | 8-10h | Package management | 50% vuln reduction |
| #9 | **sql-optimizer-agent** | 8-10h | Database performance | 25% query improvement |
| #10 | **explanation-agent** | 8-10h | Educational content | 60% faster onboarding |

### P3 - Enhancement - 30-40 hours

| Priority | Agent | Time | Key Value | Research Support |
|----------|-------|------|-----------|------------------|
| #11 | **ci-cd-agent** | 8-10h | DevOps automation | 35% deploy time reduction |
| #12 | **monitoring-agent** | 8-10h | Observability | 40% faster detection |
| #13 | **incident-agent** | 10-12h | Rapid response | 45% faster MTTR |

---

## Agent Capabilities Summary

### execution-agent
**Purpose:** Systematically execute PRPs created by master-planner
**Key Capabilities:** Plan parsing, dependency resolution, atomic execution, progress tracking, error handling, validation, reporting, rollback
**Use Cases:** Execute PRPs, coordinate multi-agent workflows, implement features with phase gates

### code-review-agent
**Purpose:** Comprehensive code reviews following industry best practices
**Key Capabilities:** Pattern detection, code smells, style enforcement, best practices, performance review, security review, educational feedback, severity tagging
**Use Cases:** Review course code examples, review API routes, review component architecture

### security-scanner-agent
**Purpose:** Deep security analysis and vulnerability detection
**Key Capabilities:** Dependency scanning, code analysis (XSS, injection), config audit, API security, database security, secrets detection, CVE tracking, remediation guidance
**Use Cases:** Scan course examples, audit API routes, check dependencies, validate auth logic

### debugging-agent
**Purpose:** Systematic debugging of errors and test failures
**Key Capabilities:** Error analysis, root cause identification, reproduction, fix suggestions, test failure analysis, regression detection, prevention strategies
**Use Cases:** Debug test failures, analyze runtime errors, troubleshoot API errors, fix flaky tests

### refactoring-agent
**Purpose:** Improve code structure without changing behavior
**Key Capabilities:** Smell detection, extract methods/components, rename, simplify logic, DRY enforcement, type safety, pattern application, behavior preservation
**Use Cases:** Refactor complex lessons, extract reusable components, improve type coverage, break down monoliths

### migration-agent
**Purpose:** Migrate code to modern patterns and versions
**Key Capabilities:** Deprecation detection, version upgrades, syntax modernization, API updates, dependency updates, breaking change handling, documentation, testing
**Use Cases:** Migrate to React 19, update TypeScript examples, modernize API routes, convert class → hooks

### architecture-agent
**Purpose:** Architectural guidance and system design
**Key Capabilities:** Pattern recognition, trade-off analysis, scalability review, coupling analysis, layer validation, pattern suggestions, technical debt assessment
**Use Cases:** Review course architecture, design component hierarchy, evaluate state management, assess database schema

### dependency-agent
**Purpose:** Manage dependencies and track updates
**Key Capabilities:** Vulnerability scanning, update tracking, compatibility checking, breaking change detection, update prioritization, testing, changelog analysis, bundle size tracking
**Use Cases:** Update dependencies monthly, patch security vulnerabilities, upgrade major versions, remove unused deps

### sql-optimizer-agent
**Purpose:** Optimize database queries and performance
**Key Capabilities:** Query analysis, index recommendations, N+1 detection, query plan analysis, schema review, data access patterns, caching opportunities, performance metrics
**Use Cases:** Optimize enrollment queries, fix N+1 queries, add indexes, review Prisma patterns

### explanation-agent
**Purpose:** Generate educational explanations and learning content
**Key Capabilities:** Code explanation, concept teaching, pattern recognition, "why" focus, multiple difficulty levels, analogy generation, example creation, interactive content
**Use Cases:** Generate course explanations, create concept intros, add educational comments, generate quizzes

### ci-cd-agent
**Purpose:** Automate CI/CD pipeline tasks
**Key Capabilities:** Workflow generation, pipeline optimization, test integration, deployment automation, environment management, failure analysis, security scanning integration
**Use Cases:** Generate GitHub Actions, automate migrations in CI, configure deployments, optimize builds

### monitoring-agent
**Purpose:** Implement monitoring and observability
**Key Capabilities:** Metric definition, log analysis, anomaly detection, alert configuration, dashboard creation, performance tracking, error aggregation, incident detection
**Use Cases:** Monitor lesson completions, track API response times, detect auth failures, monitor database performance

### incident-agent
**Purpose:** Coordinate incident response
**Key Capabilities:** Incident triage, root cause analysis, hotfix generation, rollback coordination, communication, post-mortem creation, prevention, runbook execution
**Use Cases:** Respond to crashes, debug outages, investigate performance issues, coordinate security incidents

---

## Build Timeline (6 Weeks)

### Week 1: Foundation
- Days 1-2: execution-agent (12-15h)
- Days 3-4: code-review-agent (8-10h)
- Day 5: security-scanner-agent start

### Week 2: Security & Debugging
- Days 1-2: security-scanner-agent complete
- Days 3-4: debugging-agent (8-10h)
- Day 5: refactoring-agent start

### Week 3: Refactoring & Modernization
- Days 1-2: refactoring-agent complete
- Days 2-3: migration-agent (10-12h)
- Days 4-5: architecture-agent (8-10h)

### Week 4: Dependencies & Database
- Days 1-2: dependency-agent (8-10h)
- Days 3-4: sql-optimizer-agent (8-10h)
- Day 5: explanation-agent start

### Week 5: Education & Operations
- Days 1-2: explanation-agent complete
- Days 2-3: ci-cd-agent (8-10h)
- Days 4-5: monitoring-agent (8-10h)

### Week 6: Incident & Integration
- Days 1-2: incident-agent (10-12h)
- Days 3-5: Integration & testing (20-30h)

---

## Agent Differentiation Matrix

| Agent | Focus | Timing | Depth | Output |
|-------|-------|--------|-------|--------|
| code-review-agent | Quality | Proactive | Medium | Suggestions |
| critical-auditor | Truth | Final check | Deep | Problems |
| code-validator | Syntax | Pre-commit | Surface | Pass/Fail |
| security-scanner | Security | Continuous | Deep | Vulnerabilities |
| debugging-agent | Errors | Reactive | Deep | Root cause |
| refactoring-agent | Structure | Scheduled | Medium | Better code |
| performance-auditor | Speed | Profiling | Deep | Bottlenecks |
| migration-agent | Modernization | Major updates | Medium | Migrated code |
| architecture-agent | Design | Planning | High-level | Recommendations |

---

## Expected Outcomes

### Development Velocity
- 30-40% faster development cycles
- 50% reduction in debugging time
- 60% faster onboarding

### Quality Improvements
- 50% fewer bugs in production
- 94.5%+ security fix accuracy
- Modern patterns consistently applied

### Operational Excellence
- 45% faster incident response
- 40% faster deployments
- 25% better database performance

---

## Integration Patterns

### Code Quality Workflow
```
code-review-agent identifies issues
  → refactoring-agent applies fixes
  → code-validator validates
  → test-generator ensures coverage
  → critical-auditor final verification
```

### Security Workflow
```
security-scanner-agent identifies vulns
  → dependency-agent updates packages
  → migration-agent handles breaking changes
  → test-generator validates
  → security-scanner-agent re-scans
```

### Debugging Workflow
```
monitoring-agent detects issue
  → incident-agent triages
  → debugging-agent identifies root cause
  → code-review-agent suggests fix
  → execution-agent applies fix
```

### Content Creation Workflow
```
course-content-creator drafts lesson
  → explanation-agent adds explanations
  → code-validator validates examples
  → interview-qa-generator adds questions
  → critical-auditor final review
```

---

## Success Metrics Per Agent

| Agent | Primary Metric | Target |
|-------|---------------|--------|
| execution-agent | Plan completion rate | 95%+ |
| code-review-agent | Review accuracy | 90%+ |
| security-scanner | Fix accuracy | 94.5%+ |
| debugging-agent | Resolution time reduction | 30% |
| refactoring-agent | Zero behavior changes | 100% |
| migration-agent | Time savings | 40% |
| dependency-agent | Vulnerability reduction | 50% |
| sql-optimizer-agent | Query performance improvement | 25% |
| explanation-agent | Onboarding speed improvement | 60% |
| ci-cd-agent | Deploy time reduction | 35% |
| monitoring-agent | Incident detection improvement | 40% |
| incident-agent | MTTR improvement | 45% |
| architecture-agent | Recommendation adoption | 80% |

---

## Risk Mitigation

### High Risks
1. **Agent Overlap** → Clear scope definition, integration testing
2. **Poor Prompts** → Research best practices, iterate based on failures
3. **Tool Access** → Verify during build, test all tools

### Medium Risks
4. **Integration Complexity** → Build integration tests, define clear interfaces
5. **Performance Issues** → Benchmark, optimize prompts, use appropriate model
6. **Maintenance Burden** → Excellent documentation, consistent patterns

---

## Next Actions

1. **Review & Approve Plan** → Verify specs, confirm priorities
2. **Build Execution Agent First** → Use existing implementation plan
3. **Establish Testing Infrastructure** → Agent testing harness
4. **Begin P1 Development** → Follow week-by-week roadmap

---

**Total Time Investment:** 160-215 hours (4-5 weeks)
**Expected ROI:** 3-5x productivity improvement within 90 days
**Confidence Level:** 80-90% (P1), 70-80% (P2/P3)

**Status:** Ready for Execution
**Created:** 2025-10-30
