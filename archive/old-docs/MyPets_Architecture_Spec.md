# MyPets Architecture Specification

**Version:** 1.0
**Last Updated:** October 22, 2025
**Purpose:** Complete architectural specification for system recreation and understanding

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Technology Stack](#2-technology-stack)
3. [Monorepo Architecture](#3-monorepo-architecture)
4. [Frontend Architecture](#4-frontend-architecture)
5. [Backend Architecture](#5-backend-architecture)
6. [Database Design](#6-database-design)
7. [GraphQL Layer](#7-graphql-layer)
8. [Authentication & Authorization](#8-authentication--authorization)
9. [Testing Strategy](#9-testing-strategy)
10. [Mobile Architecture](#10-mobile-architecture)
11. [Development Workflow](#11-development-workflow)
12. [Build & Deployment](#12-build--deployment)
13. [Key Patterns & Conventions](#13-key-patterns--conventions)
14. [System Recreation Guide](#14-system-recreation-guide)

---

## 1. System Overview

### 1.1 Project Description

MyPets is a comprehensive pet services management platform designed for pet owners, facility staff, and administrators. The platform handles appointment scheduling, pet health records, facility management, and employee operations through a unified full-stack application.

### 1.2 Core Capabilities

- **Appointment Management**: Booking, rescheduling, and availability calculation
- **Pet Health Tracking**: Medical records, vaccination tracking, health history
- **Facility Operations**: Multi-facility support with resource management
- **Employee Management**: Staff scheduling, permissions, and operations
- **Client Portal**: Pet owner account management and appointment booking
- **Admin Dashboard**: System-wide administration and analytics

### 1.3 Architecture Philosophy

- **Monorepo Organization**: Unified codebase with workspace management
- **Type-Safe Full Stack**: TypeScript throughout with GraphQL code generation
- **Role-Based Architecture**: Hierarchical permissions (public → user → employee → admin)
- **Mobile-First Design**: Responsive web with native mobile capabilities
- **Serverless Backend**: Scalable function-based architecture
- **Test-Driven Quality**: Comprehensive unit and E2E testing

### 1.4 Key Statistics

- **Applications**: 7 (web, backend, mobile, devops, etc.)
- **Database Tables**: 50+ with 355+ migrations
- **Test Suites**: 30+ E2E tests, 97+ unit tests
- **GraphQL Roles**: 4 role-based type systems
- **Function Runtime**: Node.js 22
- **Database**: PostgreSQL 17.4

---

## 2. Technology Stack

### 2.1 Core Runtime

```yaml
Node.js: ">= 20.0.0"
Package Manager: pnpm >= 9.0.0
TypeScript: 5.9.3
```

### 2.2 Frontend Stack

**Framework & UI:**

```yaml
Next.js: 16.0.0-beta.0 (App Router)
React: 19.2.0
React DOM: 19.2.0
React Compiler: experimental
Turbopack: Built-in Next.js bundler
```

**Styling & Components:**

```yaml
Tailwind CSS: 4.1.15
shadcn/ui: Component library
Radix UI: Primitive components
Lucide React: 0.546.0 (icons)
Ant Design: 5.27.6
```

**State Management:**

```yaml
Jotai: 2.15.0 (atomic state)
Zustand: 5.0.8 (store)
React Hook Form: 7.65.0 (forms)
Apollo Client: 3.13.9 (GraphQL)
```

**Advanced Features:**

```yaml
PlateLabs: 49.x (Rich text editor)
React DnD: Drag and drop
React Leaflet: Maps integration
Recharts: Data visualization
Embla Carousel: Carousels
```

**Mobile:**

```yaml
Capacitor: 7.4.3
Capacitor Android: 7.4.3
```

### 2.3 Backend Stack

**Platform:**

```yaml
Nhost: 0.41.1 (serverless platform)
PostgreSQL: 17.4-20250530-1
Hasura GraphQL Engine: v2.48.5-ce
Node.js Functions: 22
```

**Services:**

```yaml
Authentication: Nhost Auth 0.41.1
Storage: MinIO (S3-compatible) 0.7.2
Email: SendGrid / Mailhog
Proxy: Traefik 2.x
```

**Backend Libraries:**

```yaml
Apollo Server: 4.11.3
Express: 4.18.1
GraphQL: 16.11.0 (locked version)
GraphQL Request: 7.3.1
Nodemailer: 7.0.9
Zod: 4.1.12 (validation)
```

### 2.4 Build & Development Tools

**Monorepo:**

```yaml
Turborepo: 2.5.6
pnpm Workspaces: 9.x
```

**Testing:**

```yaml
Vitest: 3.2.4 (unit tests)
Playwright: 1.56.1 (E2E tests)
React Testing Library: 16.3.0
MSW: 2.11.6 (API mocking)
```

**Code Quality:**

```yaml
ESLint: 9.38.0
Prettier: 3.6.2
Husky: Git hooks
```

**GraphQL Tools:**

```yaml
GraphQL Codegen: 6.0.0
graphql-ws: WebSocket support
```

### 2.5 Infrastructure & DevOps

**Containerization:**

```yaml
Docker: Latest
Docker Compose: v3.8+
```

**Deployment Platforms:**

```yaml
Frontend: Vercel
Backend: Nhost Cloud
Database: Nhost PostgreSQL
```

**Process Management:**

```yaml
PM2: Process manager
```

---

## 3. Monorepo Architecture

### 3.1 Repository Structure

```
MyPets/
├── apps/
│   ├── web/                  # Next.js web application
│   ├── backend/              # Nhost backend services
│   ├── devops/               # DevOps monitoring
│   ├── typesense/           # Search service (optional)
│   ├── coder-template/      # Development template
│   ├── nextjs-proxy/        # Proxy configuration
│   └── proxy/               # Additional proxy
├── packages/
│   └── eslint-config/       # Shared ESLint configuration
├── e2e/                     # End-to-end tests
├── scripts/                 # Utility scripts
├── .claude/                 # AI agent configurations
├── .github/                 # CI/CD workflows
├── .husky/                  # Git hooks
├── turbo.json              # Turborepo configuration
├── pnpm-workspace.yaml     # Workspace definition
├── package.json            # Root package
└── tsconfig.json           # Base TypeScript config
```

### 3.2 Workspace Configuration

**pnpm-workspace.yaml:**

```yaml
packages:
  - "apps/*"
  - "apps/backend/functions" # Separate workspace
  - "packages/*"

# Dependency catalog (60+ locked versions)
catalog:
  eslint: 9.38.0
  typescript: 5.9.3
  react: 19.2.0
  "react-dom": 19.2.0
  "tailwindcss": 4.1.15
  vitest: 3.2.4
  turbo: 2.5.6
  graphql: 16.11.0 # Critical lock
  # ... (additional catalog entries)
```

**Key Features:**

- Centralized version management via catalog
- GraphQL version locked to 16.11.0 across all apps
- Backend functions as separate workspace for isolation
- Shared packages for common configurations

### 3.3 Turborepo Configuration

**turbo.json - Task Pipeline:**

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"],
      "env": ["CODEGEN_HASURA_API_URL", "CODEGEN_HASURA_ADMIN_SECRET", "NEXT_PUBLIC_NHOST_SUBDOMAIN", "NEXT_PUBLIC_NHOST_REGION"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "codegen": {
      "cache": false,
      "dependsOn": ["^codegen"]
    },
    "lint": {
      "dependsOn": ["^build"]
    },
    "typecheck": {
      "dependsOn": ["^build"]
    },
    "test": {
      "dependsOn": ["^build"]
    }
  },
  "globalDependencies": ["**/.env.*local", "**/.env", "**/tsconfig.json"]
}
```

**Pipeline Principles:**

1. **Dependency-First**: Tasks run after dependencies complete (`^build`)
2. **Smart Caching**: Cache outputs except dev tasks
3. **Environment Aware**: Cache invalidation on env changes
4. **Parallel Execution**: Independent tasks run concurrently

### 3.4 Root Package Scripts

**Key Commands:**

```json
{
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "lint": "turbo lint",
    "typecheck": "turbo typecheck",
    "format": "prettier --write .",
    "test": "vitest",
    "test:e2e": "playwright test",
    "test:e2e:headed": "xvfb-run playwright test --headed",
    "codegen": "turbo codegen",
    "codegen:admin": "turbo codegen:admin",
    "codegen:user": "turbo codegen:user",
    "codegen:employee": "turbo codegen:employee",
    "codegen:public": "turbo codegen:public",
    "web:dev": "turbo dev --filter=web",
    "backend:dev": "turbo dev --filter=backend",
    "generate-env": "node generate-env.js"
  }
}
```

### 3.5 TypeScript Configuration

**Base tsconfig.json:**

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "allowJs": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "incremental": true
  }
}
```

**Inheritance Pattern:**

- Root `tsconfig.json` provides base configuration
- Each app extends with specific settings
- E2E tests have separate `tsconfig.e2e.json`

---

## 4. Frontend Architecture

### 4.1 Application Structure

```
apps/web/
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── (header-footer)/     # Layout: with header & footer
│   │   ├── (header-no-footer)/  # Layout: header only
│   │   ├── _components/         # Root-level components
│   │   │   ├── context/         # React Context providers
│   │   │   ├── hooks/           # Shared hooks
│   │   │   ├── forms/           # Form components
│   │   │   ├── header/          # Header components
│   │   │   ├── layouts/         # Layout wrappers
│   │   │   └── landing-dashboard/ # Dashboard UI
│   │   ├── api/                 # API routes
│   │   │   ├── ai/              # AI endpoints
│   │   │   ├── cron/            # Scheduled tasks
│   │   │   ├── search/          # Search API
│   │   │   └── uploadthing/     # File uploads
│   │   ├── editor/              # Rich text editor
│   │   └── sitemaps/            # SEO sitemaps
│   ├── components/              # Shared UI components
│   │   ├── ui/                  # shadcn/ui components
│   │   ├── admin/               # Admin-only components
│   │   ├── editor/              # Editor components
│   │   ├── form-input/          # Form inputs
│   │   └── __tests__/           # Component tests
│   ├── generated/               # Auto-generated files
│   │   └── graphql/             # GraphQL types (DO NOT EDIT)
│   ├── graphql/                 # GraphQL documents (*.role.graphql)
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                     # Core libraries
│   │   ├── apollo/              # Apollo Client setup
│   │   ├── nhost/               # Nhost configuration
│   │   ├── nhostClient.ts       # Nhost client instance
│   │   └── uploadthing.ts       # Upload configuration
│   ├── server-actions/          # Next.js Server Actions
│   │   └── auth/                # Auth server actions
│   ├── schema/                  # Zod validation schemas
│   ├── styles/                  # Global styles
│   ├── types/                   # TypeScript types
│   ├── @types/                  # Global type declarations
│   ├── utils/                   # Utility functions
│   │   ├── apollo/              # Apollo utilities
│   │   ├── auth-client.tsx      # Auth provider
│   │   ├── auth-guard.tsx       # Route protection
│   │   ├── auth-recovery-client.tsx # Session recovery
│   │   ├── session-manager-client.ts # Client session
│   │   └── session-manager-server.ts # Server session
│   └── __tests__/               # Test infrastructure
│       ├── integration/         # Integration tests
│       ├── mocks/               # MSW handlers
│       └── setup.ts             # Vitest setup
├── public/                      # Static assets
├── android/                     # Capacitor Android
├── next.config.ts               # Next.js configuration
├── capacitor.config.ts          # Mobile configuration
├── vitest.config.ts             # Unit test config
├── codegen.ts                   # Schema introspection
├── codegen.admin.ts             # Admin types
├── codegen.user.ts              # User types
├── codegen.employee.ts          # Employee types
├── codegen.public.ts            # Public types
└── package.json                 # Dependencies
```

### 4.2 Next.js Configuration

**next.config.ts:**

```typescript
import type {NextConfig} from "next";

const isDebugMode = process.env.NEXT_PUBLIC_DEBUG_MODE === "true";

const nextConfig: NextConfig = {
  // Separate build directories for dev/prod
  distDir: process.env.NODE_ENV === "production" ? ".next" : ".next-dev",

  // Enable React Compiler
  reactCompiler: true,

  // Prevent bundling GraphQL in serverless functions
  serverExternalPackages: ["graphql"],

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920],
    minimumCacheTTL: 60,
  },

  // Performance optimizations
  productionBrowserSourceMaps: isDebugMode,
  compress: !isDebugMode,

  // Module optimization
  modularizeImports: {
    lodash: {
      transform: "lodash/{{member}}",
    },
  },

  // React profiling in debug mode
  turbopack: {
    resolveAlias: isDebugMode ? {"react-dom": "react-dom/profiling"} : undefined,
  },

  // Analytics rewrites
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
};

export default nextConfig;
```

**Key Features:**

- Separate build output for dev/prod (faster dev rebuilds)
- React Compiler for automatic memoization
- Image optimization with modern formats (AVIF, WebP)
- Debug mode with React Profiling
- PostHog analytics proxying for ad-blocker bypass

### 4.3 GraphQL Code Generation

**Architecture:**

- 5 separate codegen configurations (schema + 4 roles)
- Role-based file naming: `*.role.graphql`
- Generated types in `src/generated/graphql/`

**codegen.admin.ts Example:**

```typescript
import type {CodegenConfig} from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: {
    [process.env.CODEGEN_HASURA_API_URL!]: {
      headers: {
        "x-hasura-admin-secret": process.env.CODEGEN_HASURA_ADMIN_SECRET!,
        "x-hasura-role": "admin",
      },
    },
  },
  documents: ["src/**/*.admin.graphql"],
  generates: {
    "src/generated/graphql/admin.types.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-react-apollo"],
      config: {
        withHooks: true,
        withComponent: false,
        withHOC: false,
      },
    },
  },
};

export default config;
```

**Code Generation Workflow:**

1. **Define GraphQL Documents**: Create `*.role.graphql` files
2. **Run Codegen**: `pnpm codegen` or role-specific
3. **Generated Output**: Type-safe hooks and types
4. **Use in Components**: Import generated hooks

**Example GraphQL Document:**

```graphql
# auth.user.graphql
query GetCurrentUser {
  users {
    id
    email
    displayName
    avatarUrl
  }
}

mutation UpdateUserProfile($id: uuid!, $input: users_set_input!) {
  update_users_by_pk(pk_columns: {id: $id}, _set: $input) {
    id
    displayName
  }
}
```

**Generated Hook Usage:**

```typescript
import {useGetCurrentUserQuery, useUpdateUserProfileMutation} from "@/generated/graphql/user.types";

function UserProfile() {
  const {data, loading} = useGetCurrentUserQuery();
  const [updateProfile] = useUpdateUserProfileMutation();

  // Component logic...
}
```

### 4.4 Apollo Client Configuration

**lib/apollo/apolloClient.ts:**

```typescript
import {ApolloClient, InMemoryCache, HttpLink, split} from "@apollo/client";
import {GraphQLWsLink} from "@apollo/client/link/subscriptions";
import {getMainDefinition} from "@apollo/client/utilities";
import {createClient} from "graphql-ws";
import {nhostClient} from "@/lib/nhostClient";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_NHOST_GRAPHQL_URL,
  headers: async () => ({
    authorization: `Bearer ${nhostClient.auth.getAccessToken()}`,
  }),
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: process.env.NEXT_PUBLIC_NHOST_GRAPHQL_WS_URL!,
    connectionParams: async () => ({
      headers: {
        authorization: `Bearer ${nhostClient.auth.getAccessToken()}`,
      },
    }),
  })
);

// Split based on operation type
const splitLink = split(
  ({query}) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  httpLink
);

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});
```

**Key Features:**

- HTTP for queries/mutations
- WebSocket for subscriptions
- Automatic token injection
- Cache-and-network strategy

### 4.5 Styling System

**Tailwind CSS Configuration:**

```typescript
// tailwind.config.ts
import type {Config} from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Custom color palette
      },
      fontFamily: {
        // Custom fonts
      },
    },
  },
  plugins: [require("tailwindcss-motion"), require("tailwind-scrollbar-hide")],
};

export default config;
```

**shadcn/ui Integration:**

- Components in `src/components/ui/`
- Built on Radix UI primitives
- Customizable via Tailwind classes
- Class variance authority for variants

### 4.6 State Management Patterns

**Jotai (Atomic State):**

```typescript
// atoms/userAtom.ts
import {atom} from "jotai";

export const userAtom = atom<User | null>(null);
export const isAuthenticatedAtom = atom(get => get(userAtom) !== null);
```

**Zustand (Global Store):**

```typescript
// stores/uiStore.ts
import {create} from "zustand";

interface UIStore {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIStore>(set => ({
  sidebarOpen: false,
  toggleSidebar: () => set(state => ({sidebarOpen: !state.sidebarOpen})),
}));
```

**React Hook Form (Forms):**

```typescript
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function LoginForm() {
  const form = useForm({
    resolver: zodResolver(schema),
  });

  // Form logic...
}
```

### 4.7 Component Organization

**Naming Conventions:**

- PascalCase for component files: `UserProfile.tsx`
- camelCase for utility files: `formatDate.ts`
- kebab-case for route segments: `user-profile/`

**Test Collocation:**

```
components/
├── UserProfile/
│   ├── UserProfile.tsx
│   ├── UserProfile.test.tsx
│   ├── index.ts
│   └── types.ts
```

**Barrel Exports:**

```typescript
// components/UserProfile/index.ts
export {UserProfile} from "./UserProfile";
export type {UserProfileProps} from "./types";
```

---

## 5. Backend Architecture

### 5.1 Nhost Project Structure

```
apps/backend/
├── nhost/
│   ├── config.yaml              # Service configuration
│   ├── nhost.toml               # Nhost settings
│   ├── metadata/                # Hasura metadata
│   │   ├── actions.yaml         # GraphQL Actions
│   │   ├── actions.graphql      # Action schemas
│   │   ├── databases/           # Database config
│   │   │   └── default/
│   │   │       └── tables/      # Table definitions (50+)
│   │   ├── cron_triggers.yaml   # Scheduled jobs
│   │   └── version.yaml         # Metadata version
│   ├── migrations/              # Database migrations
│   │   └── default/             # 355+ migration files
│   ├── seeds/                   # Seed data
│   └── emails/                  # Email templates
├── functions/                   # Serverless functions (separate workspace)
│   ├── actions/                 # Action handlers
│   ├── appointments/            # Appointment logic
│   ├── appointment-availability/ # Availability calculation
│   ├── pets/                    # Pet management
│   ├── pet-health/              # Health records
│   ├── users/                   # User operations
│   ├── _utils/                  # Shared utilities
│   │   ├── apollo/              # Apollo client
│   │   ├── email-components/    # Email templates (React)
│   │   ├── facilityAvailability/
│   │   ├── generated/           # Generated types
│   │   ├── log/                 # Logging utilities
│   │   └── @types/              # Type definitions
│   ├── package.json
│   └── tsconfig.json
├── docker-compose.yaml          # Local development stack
├── docker-compose.debug.yaml    # Debug configuration
├── initdb.d/                    # Database initialization
├── scripts/                     # Utility scripts
│   ├── backup-db.sh
│   ├── restore-db.sh
│   └── list-snapshots.sh
└── snapshots/                   # Database backups
```

### 5.2 Nhost Configuration

**nhost.toml:**

```toml
[hasura]
version = 'v2.48.5-ce'
adminSecret = '{{ secrets.HASURA_GRAPHQL_ADMIN_SECRET }}'
webhookSecret = '{{ secrets.NHOST_WEBHOOK_SECRET }}'

[hasura.settings]
corsDomain = ['*']
devMode = true
enableAllowList = false
enableConsole = true

[hasura.logs]
level = 'info'

[functions]
[functions.node]
version = 22

[auth]
version = '0.41.1'

[auth.session]
[auth.session.accessToken]
expiresIn = 900  # 15 minutes

[auth.session.refreshToken]
expiresIn = 2592000  # 30 days

[auth.user.roles]
default = 'user'
allowed = ['user', 'me', 'employee', 'admin']

[auth.user.email]
[auth.user.email.signin]
emailVerificationRequired = true

[auth.user.password]
minLength = 8
hibpEnabled = false

[auth.method.emailPassword]
enabled = true

[auth.method.webauthn]
enabled = false

[storage]
version = '0.7.2'

[postgres]
version = '17.4-20250530-1'

[provider.smtp]
host = 'mailhog'
port = 1025
secure = false
sender = 'noreply@MyPets.com'
method = 'PLAIN'
```

### 5.3 Docker Compose Stack

**docker-compose.yaml Services:**

```yaml
version: "3.8"

services:
  # PostgreSQL Database
  postgres:
    image: nhost/postgres:17.4-20250530-1
    restart: always
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./initdb.d:/docker-entrypoint-initdb.d
    environment:
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    ports:
      - "5432:5432"

  # Hasura GraphQL Engine
  graphql:
    image: hasura/graphql-engine:v2.48.5-ce
    depends_on:
      - postgres
    restart: always
    ports:
      - "8080:8080"
    environment:
      HASURA_GRAPHQL_DATABASE_URL: postgres://postgres:${POSTGRES_PASSWORD}@postgres:5432/postgres
      HASURA_GRAPHQL_ADMIN_SECRET: ${HASURA_GRAPHQL_ADMIN_SECRET}
      HASURA_GRAPHQL_JWT_SECRET: ${HASURA_GRAPHQL_JWT_SECRET}
      HASURA_GRAPHQL_ENABLE_CONSOLE: "true"
      HASURA_GRAPHQL_DEV_MODE: "true"
      HASURA_GRAPHQL_ENABLED_LOG_TYPES: startup, http-log, webhook-log, websocket-log, query-log

  # Nhost Authentication
  auth:
    image: nhost/auth:0.41.1
    depends_on:
      - postgres
      - graphql
    restart: always
    ports:
      - "4000:4000"
    environment:
      AUTH_DATABASE_URL: postgres://postgres:${POSTGRES_PASSWORD}@postgres:5432/postgres
      AUTH_HASURA_GRAPHQL_URL: http://graphql:8080/v1/graphql
      AUTH_HASURA_ADMIN_SECRET: ${HASURA_GRAPHQL_ADMIN_SECRET}
      AUTH_SMTP_HOST: mailhog
      AUTH_SMTP_PORT: 1025

  # MinIO Storage
  storage:
    image: nhost/storage:0.7.2
    depends_on:
      - postgres
      - graphql
    restart: always
    ports:
      - "9000:9000"
      - "9001:9001"
    environment:
      STORAGE_DATABASE_URL: postgres://postgres:${POSTGRES_PASSWORD}@postgres:5432/postgres
      STORAGE_HASURA_GRAPHQL_URL: http://graphql:8080/v1/graphql

  # Serverless Functions
  functions:
    build:
      context: ./functions
      dockerfile: Dockerfile
    depends_on:
      - postgres
      - graphql
    restart: always
    ports:
      - "3005:3005"
    volumes:
      - ./functions:/app
    environment:
      NHOST_GRAPHQL_URL: http://graphql:8080/v1/graphql
      NHOST_ADMIN_SECRET: ${HASURA_GRAPHQL_ADMIN_SECRET}

  # Mailhog (Email Testing)
  mailhog:
    image: mailhog/mailhog
    restart: always
    ports:
      - "1025:1025" # SMTP
      - "8025:8025" # Web UI

  # Traefik (Reverse Proxy)
  traefik:
    image: traefik:v2.10
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./traefik.yml:/etc/traefik/traefik.yml

volumes:
  postgres_data:
```

**Key Features:**

- All services networked via Docker Compose
- PostgreSQL as central data store
- Hasura for GraphQL API generation
- Nhost Auth for authentication
- MinIO for S3-compatible storage
- Mailhog for email testing
- Traefik for reverse proxying

### 5.4 Serverless Functions

**Function Structure:**

```typescript
// functions/appointments/book.ts
import {Request, Response} from "express";
import {gql} from "graphql-request";
import {getAdminClient} from "../_utils/apollo/adminClient";

export default async function handler(req: Request, res: Response) {
  try {
    const {userId, appointmentData} = req.body;

    // Validate request
    if (!userId || !appointmentData) {
      return res.status(400).json({error: "Missing required fields"});
    }

    // Execute GraphQL mutation
    const client = getAdminClient();
    const result = await client.mutate({
      mutation: gql`
        mutation CreateAppointment($input: appointments_insert_input!) {
          insert_appointments_one(object: $input) {
            id
            startTime
            endTime
          }
        }
      `,
      variables: {input: appointmentData},
    });

    // Send confirmation email
    await sendAppointmentConfirmation(result.data.insert_appointments_one);

    return res.status(200).json(result.data);
  } catch (error) {
    console.error("Appointment booking error:", error);
    return res.status(500).json({error: "Internal server error"});
  }
}
```

**Function Utilities:**

```typescript
// functions/_utils/apollo/adminClient.ts
import {ApolloClient, InMemoryCache, HttpLink} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";

const httpLink = new HttpLink({
  uri: process.env.NHOST_GRAPHQL_URL,
});

const authLink = setContext((_, {headers}) => ({
  headers: {
    ...headers,
    "x-hasura-admin-secret": process.env.NHOST_ADMIN_SECRET,
  },
}));

export function getAdminClient() {
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}
```

**Email Template System:**

```typescript
// functions/_utils/email-components/AppointmentConfirmation.tsx
import React from "react";

interface AppointmentConfirmationProps {
  customerName: string;
  appointmentDate: string;
  appointmentTime: string;
  facilityName: string;
}

export function AppointmentConfirmation({customerName, appointmentDate, appointmentTime, facilityName}: AppointmentConfirmationProps) {
  return (
    <html>
      <body>
        <h1>Appointment Confirmed</h1>
        <p>Hello {customerName},</p>
        <p>Your appointment has been confirmed:</p>
        <ul>
          <li>Date: {appointmentDate}</li>
          <li>Time: {appointmentTime}</li>
          <li>Facility: {facilityName}</li>
        </ul>
        <p>Thank you for choosing MyPets!</p>
      </body>
    </html>
  );
}
```

```typescript
// functions/_utils/jsxToHtml.ts
import {renderToStaticMarkup} from "react-dom/server";
import {ReactElement} from "react";

export function jsxToHtml(element: ReactElement): string {
  return renderToStaticMarkup(element);
}
```

### 5.5 GraphQL Actions

**Hasura Actions Configuration:**

**metadata/actions.yaml:**

```yaml
actions:
  - name: clientAddAppointment
    definition:
      kind: synchronous
      handler: https://functions:3005/actions/client-add-appointment
    permissions:
      - role: user
      - role: employee
      - role: admin
    comment: Allows clients to book appointments

  - name: getFacilityAvailabilitySlots
    definition:
      kind: synchronous
      handler: https://functions:3005/actions/get-facility-availability-slots
    permissions:
      - role: public
      - role: user
      - role: employee
      - role: admin
    comment: Returns available time slots for a facility

  - name: clientRescheduleAppointment
    definition:
      kind: synchronous
      handler: https://functions:3005/actions/client-reschedule-appointment
    permissions:
      - role: user
      - role: employee
      - role: admin
```

**metadata/actions.graphql:**

```graphql
type Mutation {
  clientAddAppointment(facilityId: uuid!, serviceId: uuid!, startTime: timestamptz!, petIds: [uuid!]!): AppointmentOutput
}

type Query {
  getFacilityAvailabilitySlots(facilityId: uuid!, serviceId: uuid!, date: date!): [TimeSlot!]!
}

type AppointmentOutput {
  id: uuid!
  startTime: timestamptz!
  endTime: timestamptz!
  status: String!
}

type TimeSlot {
  startTime: timestamptz!
  endTime: timestamptz!
  available: Boolean!
}
```

**Action Handler:**

```typescript
// functions/actions/client-add-appointment.ts
import {Request, Response} from "express";
import {validateWebhookRequest} from "../_utils/validateWebhook";

export default async function handler(req: Request, res: Response) {
  // Validate Nhost webhook signature
  if (!validateWebhookRequest(req)) {
    return res.status(401).json({error: "Unauthorized"});
  }

  const {input, session_variables} = req.body;
  const userId = session_variables["x-hasura-user-id"];

  // Action logic...

  return res.json({
    /* response */
  });
}
```

---

## 6. Database Design

### 6.1 Schema Organization

**355+ Migrations** tracked in `migrations/default/`

**Table Categories:**

1. **Authentication** (Nhost managed)

   - auth_users
   - auth_user_roles
   - auth_user_providers
   - auth_refresh_tokens

2. **Core Entities**

   - public_users (extended user profile)
   - public_facilities
   - public_services
   - public_pets
   - public_breeds
   - public_species

3. **Appointments**

   - public_appointments
   - public_appointment_types
   - public_appointment_pets (junction)
   - public_appointment_employee_resources
   - public_appointment_room_resources
   - public_appointment_notify
   - public_appointment_client_availability

4. **Calendar System**

   - public_calendar_events
   - public_calendar_recurrence_rules
   - public_calendar_facility_schedules
   - public_calendar_employee_schedules
   - public_calendar_team_schedules
   - public_calendar_month_occurrences
   - public_calendar_day_occurrences

5. **Facility Management**

   - public_facility_rooms
   - public_facility_team_resources
   - public_facility_employee_resources
   - public_facility_services

6. **Pet Health**
   - public_pet_health_records
   - public_vaccinations
   - public_medications

### 6.2 Key Relationships

**Example Schema:**

```sql
-- Users Table (Extended Profile)
CREATE TABLE public_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  phone_number text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Facilities Table
CREATE TABLE public_facilities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address_id uuid REFERENCES public_addresses(id),
  phone text,
  email text,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Pets Table
CREATE TABLE public_pets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid NOT NULL REFERENCES public_users(id) ON DELETE CASCADE,
  name text NOT NULL,
  species_id uuid REFERENCES public_species(id),
  breed_id uuid REFERENCES public_breeds(id),
  date_of_birth date,
  weight numeric,
  created_at timestamptz DEFAULT now()
);

-- Appointments Table
CREATE TABLE public_appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  facility_id uuid NOT NULL REFERENCES public_facilities(id),
  client_id uuid NOT NULL REFERENCES public_users(id),
  appointment_type_id uuid REFERENCES public_appointment_types(id),
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Appointment Pets Junction Table
CREATE TABLE public_appointment_pets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id uuid NOT NULL REFERENCES public_appointments(id) ON DELETE CASCADE,
  pet_id uuid NOT NULL REFERENCES public_pets(id) ON DELETE CASCADE,
  UNIQUE(appointment_id, pet_id)
);

-- Calendar Events (Polymorphic)
CREATE TABLE public_calendar_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL CHECK (event_type IN (
    'customer_appointment',
    'employee_schedule',
    'team_schedule',
    'facility_schedule',
    'meeting'
  )),
  title text NOT NULL,
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  all_day boolean DEFAULT false,
  recurrence_rule_id uuid REFERENCES public_calendar_recurrence_rules(id),
  created_at timestamptz DEFAULT now()
);
```

### 6.3 Row-Level Security (RLS)

**Example RLS Policies:**

```sql
-- Users can only see their own profile
CREATE POLICY "Users can view own profile"
  ON public_users
  FOR SELECT
  USING (auth.uid() = id);

-- Users can only update their own profile
CREATE POLICY "Users can update own profile"
  ON public_users
  FOR UPDATE
  USING (auth.uid() = id);

-- Users can only see their own pets
CREATE POLICY "Users can view own pets"
  ON public_pets
  FOR SELECT
  USING (auth.uid() = owner_id);

-- Employees can see all pets
CREATE POLICY "Employees can view all pets"
  ON public_pets
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM auth.user_roles
      WHERE user_id = auth.uid()
      AND role IN ('employee', 'admin')
    )
  );

-- Public can view active facilities
CREATE POLICY "Public can view active facilities"
  ON public_facilities
  FOR SELECT
  USING (active = true);
```

### 6.4 Indexes & Performance

**Key Indexes:**

```sql
-- Appointment queries
CREATE INDEX idx_appointments_facility_id ON public_appointments(facility_id);
CREATE INDEX idx_appointments_client_id ON public_appointments(client_id);
CREATE INDEX idx_appointments_start_time ON public_appointments(start_time);
CREATE INDEX idx_appointments_status ON public_appointments(status);

-- Pet queries
CREATE INDEX idx_pets_owner_id ON public_pets(owner_id);
CREATE INDEX idx_pets_species_id ON public_pets(species_id);

-- Calendar events
CREATE INDEX idx_calendar_events_start_time ON public_calendar_events(start_time);
CREATE INDEX idx_calendar_events_event_type ON public_calendar_events(event_type);
```

### 6.5 Migration Management

**Migration Workflow:**

1. **Create Migration**:

   ```bash
   nhost dev hasura migrate create <migration_name>
   ```

2. **Apply Migration**:

   ```bash
   nhost dev hasura migrate apply
   ```

3. **Track Changes**:
   - All migrations committed to version control
   - Numbered sequentially: `1663690282352_init`
   - Up and down migrations for rollback

**Example Migration:**

```sql
-- migrations/default/1234567890123_create_pets/up.sql
CREATE TABLE public_pets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid NOT NULL REFERENCES public_users(id) ON DELETE CASCADE,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_pets_owner_id ON public_pets(owner_id);

-- migrations/default/1234567890123_create_pets/down.sql
DROP TABLE IF EXISTS public_pets;
```

---

## 7. GraphQL Layer

### 7.1 Hasura Configuration

**Auto-Generated API:**

- Tables automatically exposed as GraphQL types
- CRUD operations generated from schema
- Relationships inferred from foreign keys
- Permissions enforced via role-based rules

**Example Generated Schema:**

```graphql
# Auto-generated from public_pets table
type Pets {
  id: uuid!
  ownerId: uuid!
  name: String!
  species: Species
  breed: Breed
  dateOfBirth: date
  weight: numeric
  createdAt: timestamptz!

  # Relationships
  owner: Users!
  appointments: [AppointmentPets!]!
  healthRecords: [PetHealthRecords!]!
}

# Queries
type Query {
  pets(where: PetsBoolExp, orderBy: [PetsOrderBy!], limit: Int, offset: Int): [Pets!]!

  petsByPk(id: uuid!): Pets

  petsAggregate(where: PetsBoolExp): PetsAggregate!
}

# Mutations
type Mutation {
  insertPets(objects: [PetsInsertInput!]!, onConflict: PetsOnConflict): PetsMutationResponse

  insertPetsOne(object: PetsInsertInput!, onConflict: PetsOnConflict): Pets

  updatePets(where: PetsBoolExp!, _set: PetsSetInput): PetsMutationResponse

  updatePetsByPk(pkColumns: PetsPkColumnsInput!, _set: PetsSetInput): Pets

  deletePets(where: PetsBoolExp!): PetsMutationResponse

  deletePetsByPk(id: uuid!): Pets
}

# Subscriptions
type Subscription {
  pets(where: PetsBoolExp, orderBy: [PetsOrderBy!], limit: Int, offset: Int): [Pets!]!

  petsByPk(id: uuid!): Pets
}
```

### 7.2 Permission System

**Role-Based Access:**

**admin Role:**

- Full access to all tables
- Can perform all CRUD operations
- No row-level restrictions

**employee Role:**

- Read access to all active facilities
- CRUD on appointments at their facility
- Read/write on pets for their facility's clients

**user Role:**

- Read/write on their own profile
- CRUD on their own pets
- CRUD on their own appointments
- Read-only on facilities and services

**public Role:**

- Read-only on active facilities
- Read-only on public services
- Can query availability slots

**Permission Configuration Example:**

```yaml
# metadata/databases/default/tables/public_pets.yaml
table:
  name: pets
  schema: public

select_permissions:
  - role: user
    permission:
      columns: "*"
      filter:
        owner_id:
          _eq: X-Hasura-User-Id

  - role: employee
    permission:
      columns: "*"
      filter:
        owner:
          appointments:
            facility:
              employees:
                employee_id:
                  _in: X-Hasura-Facility-Employee-Ids

  - role: admin
    permission:
      columns: "*"
      filter: {}

insert_permissions:
  - role: user
    permission:
      columns: [name, species_id, breed_id, date_of_birth, weight]
      check:
        owner_id:
          _eq: X-Hasura-User-Id

update_permissions:
  - role: user
    permission:
      columns: [name, species_id, breed_id, date_of_birth, weight]
      filter:
        owner_id:
          _eq: X-Hasura-User-Id

delete_permissions:
  - role: user
    permission:
      filter:
        owner_id:
          _eq: X-Hasura-User-Id
```

### 7.3 Custom JWT Claims

**JWT Token Structure:**

```json
{
  "sub": "user-uuid",
  "iat": 1234567890,
  "exp": 1234568790,
  "https://hasura.io/jwt/claims": {
    "x-hasura-allowed-roles": ["user", "employee", "admin"],
    "x-hasura-default-role": "user",
    "x-hasura-user-id": "user-uuid",
    "x-hasura-client-id": "client-uuid",
    "x-hasura-facility-employee-ids": ["emp-uuid-1", "emp-uuid-2"]
  }
}
```

**Custom Claims Configuration:**

```yaml
# nhost/config.yaml
auth:
  customClaims:
    - key: client-id
      value: client.id

    - key: facility-employee-ids
      value: |
        (
          SELECT array_agg(facility_employee_connection_id)
          FROM public_facility_employee_connections
          WHERE user_id = auth.users.id
        )
```

### 7.4 Relationships

**Hasura Relationship Types:**

1. **Object Relationships** (many-to-one)

```yaml
object_relationships:
  - name: owner
    using:
      foreign_key_constraint_on: owner_id
```

2. **Array Relationships** (one-to-many)

```yaml
array_relationships:
  - name: pets
    using:
      foreign_key_constraint_on:
        table:
          name: pets
          schema: public
        column: owner_id
```

3. **Manual Relationships**

```yaml
array_relationships:
  - name: employee_facilities
    using:
      manual_configuration:
        remote_table:
          name: facilities
          schema: public
        column_mapping:
          id: employee_id
        insertion_order: null
```

---

## 8. Authentication & Authorization

### 8.1 Authentication Flow

```
┌─────────────┐
│   Client    │
│  (Browser)  │
└──────┬──────┘
       │
       │ 1. Email/Password
       ↓
┌─────────────┐
│ Nhost Auth  │ ← 2. Validate credentials
│   Service   │ → 3. Generate JWT tokens
└──────┬──────┘
       │
       │ 4. Set HTTPOnly cookies
       ↓
┌─────────────┐
│   Client    │ ← 5. Store session
│   Session   │
└──────┬──────┘
       │
       │ 6. GraphQL requests with token
       ↓
┌─────────────┐
│   Hasura    │ ← 7. Validate JWT
│  GraphQL    │ → 8. Apply RLS based on role
└─────────────┘
```

### 8.2 Session Management

**Client-Side Session Manager:**

```typescript
// utils/session-manager-client.ts
import {nhostClient} from "@/lib/nhostClient";

export class SessionManager {
  private static instance: SessionManager;
  private refreshTimer: NodeJS.Timeout | null = null;

  static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }
    return SessionManager.instance;
  }

  async initialize() {
    // Check for existing session
    const session = nhostClient.auth.getSession();

    if (session) {
      this.startRefreshTimer();
    } else {
      await this.attemptRecovery();
    }
  }

  private async attemptRecovery() {
    try {
      await nhostClient.auth.refreshSession();
      this.startRefreshTimer();
    } catch (error) {
      console.error("Session recovery failed:", error);
      this.clearSession();
    }
  }

  private startRefreshTimer() {
    // Refresh 1 minute before expiration (14 minutes for 15-minute tokens)
    const refreshInterval = 14 * 60 * 1000;

    this.refreshTimer = setInterval(async () => {
      try {
        await nhostClient.auth.refreshSession();
      } catch (error) {
        console.error("Token refresh failed:", error);
        this.clearSession();
      }
    }, refreshInterval);
  }

  clearSession() {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
      this.refreshTimer = null;
    }
    nhostClient.auth.signOut();
  }
}
```

**Server-Side Session Manager:**

```typescript
// utils/session-manager-server.ts
import {cookies} from "next/headers";
import {nhostClient} from "@/lib/nhostClient";

export async function getServerSession() {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get("nhostRefreshToken")?.value;

  if (!refreshToken) {
    return null;
  }

  try {
    const session = await nhostClient.auth.refreshSession(refreshToken);
    return session;
  } catch (error) {
    console.error("Server session validation failed:", error);
    return null;
  }
}

export async function requireAuth() {
  const session = await getServerSession();

  if (!session) {
    throw new Error("Authentication required");
  }

  return session;
}
```

### 8.3 Auth Components

**Auth Provider:**

```typescript
// utils/auth-client.tsx
"use client";

import {NhostProvider} from "@nhost/react";
import {nhostClient} from "@/lib/nhostClient";
import {SessionManager} from "@/utils/session-manager-client";

export function AuthProvider({children}: {children: React.ReactNode}) {
  useEffect(() => {
    SessionManager.getInstance().initialize();
  }, []);

  return <NhostProvider nhost={nhostClient}>{children}</NhostProvider>;
}
```

**Auth Guard:**

```typescript
// utils/auth-guard.tsx
"use client";

import {useAuthenticationStatus} from "@nhost/react";
import {useRouter} from "next/navigation";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: "user" | "employee" | "admin";
}

export function AuthGuard({children, requiredRole}: AuthGuardProps) {
  const {isAuthenticated, isLoading} = useAuthenticationStatus();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return null;
  }

  // Check role if required
  if (requiredRole) {
    const user = nhostClient.auth.getUser();
    const hasRole = user?.roles.includes(requiredRole);

    if (!hasRole) {
      return <div>Access denied</div>;
    }
  }

  return <>{children}</>;
}
```

### 8.4 Role Hierarchy

```
┌─────────────────────────────────────┐
│            Admin Role               │
│  - Full system access               │
│  - Manage all facilities            │
│  - Manage all users                 │
│  - System configuration             │
└────────────────┬────────────────────┘
                 │
                 │ inherits
                 ↓
┌─────────────────────────────────────┐
│          Employee Role              │
│  - Manage facility operations       │
│  - View/edit appointments           │
│  - Access client/pet data           │
│  - Resource scheduling              │
└────────────────┬────────────────────┘
                 │
                 │ inherits
                 ↓
┌─────────────────────────────────────┐
│            User Role                │
│  - Manage own profile               │
│  - CRUD own pets                    │
│  - Book/manage appointments         │
│  - View facilities/services         │
└────────────────┬────────────────────┘
                 │
                 │ inherits
                 ↓
┌─────────────────────────────────────┐
│           Public Role               │
│  - View active facilities           │
│  - View services                    │
│  - Query availability               │
│  - Read-only access                 │
└─────────────────────────────────────┘
```

---

## 9. Testing Strategy

### 9.1 Testing Philosophy

- **Test Pyramid**: Unit tests (base) → Integration tests → E2E tests (top)
- **Coverage Targets**: 80% for branches, functions, lines, statements
- **Test Collocation**: Tests live near implementation
- **Type Safety**: All tests must pass TypeScript checking

### 9.2 Unit Testing (Vitest)

**Configuration:**

```typescript
// vitest.config.ts
import {defineConfig} from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/__tests__/setup.ts"],
    include: ["src/**/*.{test,spec}.{js,ts,jsx,tsx}"],
    exclude: ["**/node_modules/**", "**/dist/**", "src/generated/**", "**/e2e/**"],
  },
  coverage: {
    provider: "v8",
    reporter: ["text", "json", "html"],
    exclude: ["src/generated/**", "**/*.config.{js,ts}", "**/types.ts"],
    thresholds: {
      global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

**Test Setup:**

```typescript
// src/__tests__/setup.ts
import "@testing-library/jest-dom";
import {cleanup} from "@testing-library/react";
import {afterEach, vi} from "vitest";

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock Next.js router
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));
```

**Example Component Test:**

```typescript
// components/UserProfile/UserProfile.test.tsx
import {describe, it, expect, vi} from "vitest";
import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {UserProfile} from "./UserProfile";
import {useGetCurrentUserQuery} from "@/generated/graphql/user.types";

// Mock GraphQL hook
vi.mock("@/generated/graphql/user.types", () => ({
  useGetCurrentUserQuery: vi.fn(),
}));

describe("UserProfile", () => {
  it("renders user information", () => {
    // Arrange
    vi.mocked(useGetCurrentUserQuery).mockReturnValue({
      data: {
        users: [
          {
            id: "123",
            email: "test@example.com",
            displayName: "Test User",
          },
        ],
      },
      loading: false,
      error: undefined,
    });

    // Act
    render(<UserProfile />);

    // Assert
    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    vi.mocked(useGetCurrentUserQuery).mockReturnValue({
      data: undefined,
      loading: true,
      error: undefined,
    });

    render(<UserProfile />);

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("handles profile update", async () => {
    const user = userEvent.setup();
    const mockUpdate = vi.fn();

    vi.mocked(useGetCurrentUserQuery).mockReturnValue({
      data: {
        users: [
          {
            id: "123",
            displayName: "Test User",
          },
        ],
      },
      loading: false,
      error: undefined,
    });

    render(<UserProfile onUpdate={mockUpdate} />);

    const input = screen.getByLabelText("Display Name");
    await user.clear(input);
    await user.type(input, "New Name");
    await user.click(screen.getByRole("button", {name: "Save"}));

    await waitFor(() => {
      expect(mockUpdate).toHaveBeenCalledWith({displayName: "New Name"});
    });
  });
});
```

**API Mocking with MSW:**

```typescript
// src/__tests__/mocks/handlers.ts
import {graphql, HttpResponse} from "msw";

export const handlers = [
  graphql.query("GetCurrentUser", () => {
    return HttpResponse.json({
      data: {
        users: [
          {
            id: "123",
            email: "test@example.com",
            displayName: "Test User",
          },
        ],
      },
    });
  }),

  graphql.mutation("UpdateUserProfile", ({variables}) => {
    return HttpResponse.json({
      data: {
        update_users_by_pk: {
          id: variables.id,
          displayName: variables.input.displayName,
        },
      },
    });
  }),
];
```

### 9.3 E2E Testing (Playwright)

**Configuration:**

```typescript
// playwright.config.ts
import {defineConfig, devices} from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 6,
  timeout: 10 * 1000,
  expect: {
    timeout: 4 * 1000,
  },
  reporter: [["html", {outputFolder: "playwright-report-dev", port: 9323}], ["line"], ["json", {outputFile: "test-results/results.json"}]],
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: {...devices["Desktop Chrome"]},
    },
    {
      name: "firefox",
      use: {...devices["Desktop Firefox"]},
    },
    {
      name: "webkit",
      use: {...devices["Desktop Safari"]},
    },
  ],
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
```

**Example E2E Test:**

```typescript
// e2e/appointment-booking.spec.ts
import {test, expect} from "@playwright/test";

test.describe("Appointment Booking Flow", () => {
  test.beforeEach(async ({page}) => {
    // Login as user
    await page.goto("/auth/login");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="password"]', "password123");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL("/dashboard");
  });

  test("should book an appointment", async ({page}) => {
    // Navigate to booking page
    await page.click("text=Book Appointment");
    await expect(page).toHaveURL("/appointments/book");

    // Select facility
    await page.click('select[name="facility"]');
    await page.click('option:has-text("Downtown Vet Clinic")');

    // Select service
    await page.click('select[name="service"]');
    await page.click('option:has-text("Wellness Exam")');

    // Select pet
    await page.check('input[value="pet-123"]');

    // Select date
    await page.fill('input[type="date"]', "2025-11-01");

    // Wait for availability slots
    await expect(page.locator(".time-slot")).toBeVisible();

    // Select time slot
    await page.click('.time-slot:has-text("10:00 AM")');

    // Add notes
    await page.fill('textarea[name="notes"]', "First visit");

    // Submit booking
    await page.click('button:has-text("Book Appointment")');

    // Verify confirmation
    await expect(page.locator(".success-message")).toContainText("Appointment booked successfully");

    // Verify navigation to appointments page
    await expect(page).toHaveURL("/appointments");

    // Verify appointment appears in list
    await expect(page.locator(".appointment-card")).toContainText("Wellness Exam");
  });

  test("should show error for invalid booking", async ({page}) => {
    await page.goto("/appointments/book");

    // Submit without required fields
    await page.click('button:has-text("Book Appointment")');

    // Verify validation errors
    await expect(page.locator(".error-message")).toContainText("Please select a facility");
  });

  test("should handle reschedule", async ({page}) => {
    // Navigate to existing appointment
    await page.goto("/appointments");
    await page.click(".appointment-card:first-child .reschedule-button");

    // Select new time
    await page.click('.time-slot:has-text("2:00 PM")');
    await page.click('button:has-text("Confirm Reschedule")');

    // Verify success
    await expect(page.locator(".success-message")).toContainText("Appointment rescheduled");
  });
});
```

**Page Object Model:**

```typescript
// e2e/pages/AppointmentBookingPage.ts
import {Page, Locator} from "@playwright/test";

export class AppointmentBookingPage {
  readonly page: Page;
  readonly facilitySelect: Locator;
  readonly serviceSelect: Locator;
  readonly dateInput: Locator;
  readonly notesTextarea: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.facilitySelect = page.locator('select[name="facility"]');
    this.serviceSelect = page.locator('select[name="service"]');
    this.dateInput = page.locator('input[type="date"]');
    this.notesTextarea = page.locator('textarea[name="notes"]');
    this.submitButton = page.locator('button:has-text("Book Appointment")');
  }

  async goto() {
    await this.page.goto("/appointments/book");
  }

  async selectFacility(facilityName: string) {
    await this.facilitySelect.selectOption({label: facilityName});
  }

  async selectService(serviceName: string) {
    await this.serviceSelect.selectOption({label: serviceName});
  }

  async selectPet(petId: string) {
    await this.page.check(`input[value="${petId}"]`);
  }

  async selectDate(date: string) {
    await this.dateInput.fill(date);
  }

  async selectTimeSlot(time: string) {
    await this.page.click(`.time-slot:has-text("${time}")`);
  }

  async fillNotes(notes: string) {
    await this.notesTextarea.fill(notes);
  }

  async submit() {
    await this.submitButton.click();
  }

  async bookAppointment(options: {facility: string; service: string; petId: string; date: string; time: string; notes?: string}) {
    await this.selectFacility(options.facility);
    await this.selectService(options.service);
    await this.selectPet(options.petId);
    await this.selectDate(options.date);
    await this.page.waitForSelector(".time-slot");
    await this.selectTimeSlot(options.time);
    if (options.notes) {
      await this.fillNotes(options.notes);
    }
    await this.submit();
  }
}
```

### 9.4 Backend Function Tests

**Node.js Built-in Testing:**

```typescript
// functions/__tests__/appointments/book.test.ts
import {describe, it, before} from "node:test";
import {strict as assert} from "node:assert";
import bookAppointment from "../../appointments/book";

describe("Book Appointment Function", () => {
  let mockRequest: any;
  let mockResponse: any;

  before(() => {
    mockRequest = {
      body: {
        userId: "123",
        appointmentData: {
          facilityId: "facility-123",
          serviceId: "service-123",
          startTime: "2025-11-01T10:00:00Z",
          petIds: ["pet-123"],
        },
      },
    };

    mockResponse = {
      status: (code: number) => ({
        json: (data: any) => ({statusCode: code, body: data}),
      }),
    };
  });

  it("should book appointment successfully", async () => {
    const result = await bookAppointment(mockRequest, mockResponse);

    assert.equal(result.statusCode, 200);
    assert.ok(result.body.id);
    assert.equal(result.body.startTime, "2025-11-01T10:00:00Z");
  });

  it("should return 400 for missing fields", async () => {
    const invalidRequest = {body: {}};
    const result = await bookAppointment(invalidRequest, mockResponse);

    assert.equal(result.statusCode, 400);
    assert.equal(result.body.error, "Missing required fields");
  });
});
```

### 9.5 Test Organization

```
Testing Structure:
├── e2e/                        # E2E tests (Playwright)
│   ├── auth/                   # Authentication flows
│   ├── appointment-booking.spec.ts
│   ├── employee-flows/         # Employee workflows
│   ├── nav/                    # Navigation tests
│   └── pages/                  # Page Object Models
├── apps/web/src/__tests__/     # Unit tests (Vitest)
│   ├── integration/            # Integration tests
│   ├── mocks/                  # MSW handlers
│   ├── utils/                  # Test utilities
│   └── setup.ts                # Test setup
└── apps/web/src/components/    # Component tests (collocated)
    └── __tests__/
```

---

## 10. Mobile Architecture

### 10.1 Capacitor Configuration

**capacitor.config.ts:**

```typescript
import {CapacitorConfig} from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.MyPets.app",
  appName: "MyPets",
  webDir: ".next",
  server: {
    androidScheme: "https",
    cleartext: false,
  },
  android: {
    buildOptions: {
      keystorePath: process.env.ANDROID_KEYSTORE_PATH,
      keystoreAlias: process.env.ANDROID_KEYSTORE_ALIAS,
    },
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#ffffff",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  },
};

export default config;
```

### 10.2 Android Project Structure

```
apps/web/android/
├── app/
│   ├── src/
│   │   └── main/
│   │       ├── assets/
│   │       │   └── capacitor.config.json
│   │       ├── java/com/MyPets/app/
│   │       │   └── MainActivity.java
│   │       ├── res/
│   │       │   ├── drawable/
│   │       │   ├── layout/
│   │       │   ├── mipmap-*/
│   │       │   └── values/
│   │       └── AndroidManifest.xml
│   ├── build.gradle
│   └── proguard-rules.pro
├── gradle/
├── build.gradle
├── gradle.properties
└── settings.gradle
```

### 10.3 Native Plugins

**Device Detection:**

```typescript
import {Device} from "@capacitor/device";

export async function getDeviceInfo() {
  const info = await Device.getInfo();
  return {
    platform: info.platform,
    model: info.model,
    osVersion: info.osVersion,
  };
}
```

**Push Notifications:**

```typescript
import {PushNotifications} from "@capacitor/push-notifications";

export async function registerPushNotifications() {
  await PushNotifications.requestPermissions();
  await PushNotifications.register();

  PushNotifications.addListener("registration", token => {
    console.log("Push token:", token.value);
  });

  PushNotifications.addListener("pushNotificationReceived", notification => {
    console.log("Notification received:", notification);
  });
}
```

### 10.4 Mobile-Specific UI Patterns

**Responsive Design:**

```typescript
"use client";

import {useEffect, useState} from "react";
import {Device} from "@capacitor/device";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    Device.getInfo().then(info => {
      setIsMobile(info.platform === "android" || info.platform === "ios");
    });
  }, []);

  return isMobile;
}
```

**Touch Optimization:**

```css
/* Mobile touch targets */
.mobile-button {
  @apply min-h-[44px] min-w-[44px];
  -webkit-tap-highlight-color: transparent;
}

/* Prevent text selection on mobile */
.no-select {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}
```

---

## 11. Development Workflow

### 11.1 Environment Setup

**Required Tools:**

- Node.js >= 20.0.0
- pnpm >= 9.0.0
- Docker & Docker Compose
- Git

**Initial Setup:**

```bash
# Clone repository
git clone https://github.com/MyPets/MyPets.git
cd MyPets

# Install dependencies
pnpm install

# Generate environment files
pnpm generate-env

# Start backend services
cd apps/backend
docker compose up -d
cd ../..

# Generate GraphQL types
pnpm codegen

# Start development servers
pnpm dev
```

### 11.2 Development Commands

**Root-Level Scripts:**

```bash
# Development
pnpm dev              # Start all dev servers
pnpm web:dev          # Start only web app
pnpm backend:dev      # Start only backend

# Build
pnpm build            # Build all apps
pnpm web:build        # Build only web app

# Code Quality
pnpm lint             # Lint all workspaces
pnpm format           # Format with Prettier
pnpm typecheck        # TypeScript checking
pnpm check            # Lint + typecheck

# GraphQL Code Generation
pnpm codegen          # Generate all roles
pnpm codegen:admin    # Admin types only
pnpm codegen:user     # User types only
pnpm codegen:employee # Employee types only
pnpm codegen:public   # Public types only

# Testing
pnpm test             # Unit tests
pnpm test:watch       # Unit tests (watch mode)
pnpm test:coverage    # Coverage report
pnpm test:e2e         # E2E tests
pnpm test:e2e:headed  # E2E with visible browser
pnpm test:e2e:debug   # E2E with debugging

# Database
pnpm backend:db:backup  # Create database snapshot
pnpm backend:db:restore # Restore from snapshot
```

### 11.3 Git Workflow

**Branch Strategy:**

```
main
  ├── feat/appointment-booking
  ├── fix/session-recovery
  ├── refactor/calendar-component
  └── chore/update-dependencies
```

**Commit Convention:**

```
feat: Add appointment rescheduling feature
fix: Resolve session timeout issue
refactor: Simplify calendar event rendering
chore: Update dependencies to latest versions
docs: Update API documentation
test: Add E2E tests for booking flow
```

**Pre-commit Hooks:**

```bash
# .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

pnpm lint-staged
```

```json
// package.json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md,yml,yaml}": ["prettier --write"]
  }
}
```

### 11.4 Code Review Checklist

**Pre-Review:**

- [ ] All tests passing (`pnpm test`)
- [ ] E2E tests passing (`pnpm test:e2e`)
- [ ] No TypeScript errors (`pnpm typecheck`)
- [ ] No linting errors (`pnpm lint`)
- [ ] Code formatted (`pnpm format`)
- [ ] GraphQL types regenerated if schema changed

**Review Focus:**

- [ ] Code follows project patterns
- [ ] Proper error handling
- [ ] Adequate test coverage
- [ ] No sensitive data exposed
- [ ] Performance considerations
- [ ] Accessibility compliance
- [ ] Mobile responsiveness

---

## 12. Build & Deployment

### 12.1 Build Process

**Turborepo Build Pipeline:**

```
1. Backend Code Generation
   ↓
2. Backend Functions Build
   ↓
3. Web Code Generation (depends on backend schema)
   ↓
4. Web Application Build (Next.js)
   ↓
5. Mobile Application Build (Capacitor Android)
```

**Build Configuration:**

```json
// turbo.json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build", "codegen"],
      "outputs": [".next/**", "!.next/cache/**"]
    }
  }
}
```

**Build Commands:**

```bash
# Full build
pnpm build

# Workspace-specific builds
pnpm --filter=web build
pnpm --filter=backend build
```

### 12.2 Deployment Architecture

```
┌─────────────────────────────────────┐
│         Vercel (Web App)            │
│  - Next.js SSR/SSG                  │
│  - Edge Functions                   │
│  - Static Assets (CDN)              │
└────────────────┬────────────────────┘
                 │
                 │ GraphQL API
                 ↓
┌─────────────────────────────────────┐
│       Nhost Cloud (Backend)         │
│  - Hasura GraphQL                   │
│  - Authentication                   │
│  - Serverless Functions             │
│  - Storage (MinIO)                  │
└────────────────┬────────────────────┘
                 │
                 │ Database
                 ↓
┌─────────────────────────────────────┐
│     PostgreSQL (Managed)            │
│  - Primary database                 │
│  - Automated backups                │
│  - High availability                │
└─────────────────────────────────────┘
```

### 12.3 Deployment Environments

**Development:**

- Local Docker Compose stack
- Hot module reloading
- Debug mode enabled
- Mailhog for email testing

**Staging:**

- Nhost preview environment
- Vercel preview deployment
- Production-like configuration
- Test data populated

**Production:**

- Nhost production environment
- Vercel production deployment
- CDN caching enabled
- Monitoring and alerts active

### 12.4 Environment Variables

**Frontend (.env.local):**

```bash
NEXT_PUBLIC_NHOST_SUBDOMAIN=MyPets
NEXT_PUBLIC_NHOST_REGION=us-east-1
NEXT_PUBLIC_NHOST_GRAPHQL_URL=https://MyPets.nhost.run/v1/graphql
NEXT_PUBLIC_NHOST_AUTH_URL=https://MyPets.nhost.run/v1/auth
NEXT_PUBLIC_NHOST_STORAGE_URL=https://MyPets.nhost.run/v1/storage
NEXT_PUBLIC_DEBUG_MODE=false

UPLOADTHING_TOKEN=...
SENDGRID_API_KEY=...
```

**Backend (.env):**

```bash
POSTGRES_PASSWORD=...
HASURA_GRAPHQL_ADMIN_SECRET=...
HASURA_GRAPHQL_JWT_SECRET=...
NHOST_WEBHOOK_SECRET=...
SENDGRID_API_KEY=...
```

### 12.5 CI/CD Pipeline

**GitHub Actions Workflow:**

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "pnpm"

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Typecheck
        run: pnpm typecheck

      - name: Lint
        run: pnpm lint:ci

      - name: Unit tests
        run: pnpm test

      - name: E2E tests
        run: pnpm test:e2e

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "pnpm"

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build
        run: pnpm build

  deploy:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## 13. Key Patterns & Conventions

### 13.1 Naming Conventions

**Files & Folders:**

- Components: PascalCase (`UserProfile.tsx`)
- Utilities: camelCase (`formatDate.ts`)
- Routes: kebab-case (`user-profile/`)
- Constants: UPPER_SNAKE_CASE (`MAX_UPLOAD_SIZE`)

**GraphQL:**

- Documents: `*.role.graphql` (e.g., `auth.user.graphql`)
- Operations: PascalCase (`GetCurrentUser`, `UpdateUserProfile`)
- Roles: lowercase (`admin`, `user`, `employee`, `public`)

**Database:**

- Tables: snake*case with `public*` prefix (`public_users`, `public_pets`)
- Columns: snake_case (`created_at`, `owner_id`)
- Indexes: `idx_table_column` (`idx_appointments_start_time`)

### 13.2 Code Organization Patterns

**Component Structure:**

```
ComponentName/
├── ComponentName.tsx       # Main component
├── ComponentName.test.tsx  # Tests
├── index.ts                # Barrel export
├── types.ts                # TypeScript types
├── hooks.ts                # Component-specific hooks
└── utils.ts                # Component utilities
```

**Hook Pattern:**

```typescript
// useFeature.ts
import {useState, useEffect} from "react";

export function useFeature(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    // Effect logic
  }, [value]);

  return {value, setValue};
}
```

**Server Action Pattern:**

```typescript
// server-actions/auth/signIn.ts
"use server";

import {z} from "zod";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function signIn(formData: FormData) {
  const validatedFields = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {error: "Invalid fields"};
  }

  // Sign in logic
}
```

### 13.3 Error Handling

**Frontend Error Boundary:**

```typescript
// components/ErrorBoundary.tsx
"use client";

import React from "react";

export class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError() {
    return {hasError: true};
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>;
    }

    return this.props.children;
  }
}
```

**Backend Error Handling:**

```typescript
// functions/_utils/errors.ts
export class AppError extends Error {
  constructor(public message: string, public statusCode: number = 500, public code?: string) {
    super(message);
    this.name = "AppError";
  }
}

export function handleError(error: unknown, res: Response) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      error: error.message,
      code: error.code,
    });
  }

  console.error("Unexpected error:", error);
  return res.status(500).json({error: "Internal server error"});
}
```

### 13.4 Performance Patterns

**Memoization:**

```typescript
import {useMemo, useCallback} from "react";

function ExpensiveComponent({data}: {data: Item[]}) {
  const sortedData = useMemo(() => data.sort((a, b) => a.name.localeCompare(b.name)), [data]);

  const handleClick = useCallback((id: string) => {
    console.log("Clicked:", id);
  }, []);

  return <div>{/* Render sorted data */}</div>;
}
```

**Code Splitting:**

```typescript
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  loading: () => <div>Loading...</div>,
  ssr: false,
});
```

**Image Optimization:**

```typescript
import Image from "next/image";

function OptimizedImage() {
  return <Image src="/pet.jpg" alt="Pet" width={400} height={300} placeholder="blur" blurDataURL="data:image/..." />;
}
```

### 13.5 Accessibility Patterns

**Semantic HTML:**

```tsx
<nav aria-label="Main navigation">
  <ul>
    <li>
      <a href="/dashboard">Dashboard</a>
    </li>
    <li>
      <a href="/appointments">Appointments</a>
    </li>
  </ul>
</nav>
```

**ARIA Labels:**

```tsx
<button aria-label="Close dialog" aria-expanded={isOpen} onClick={handleClose}>
  <XIcon aria-hidden="true" />
</button>
```

**Keyboard Navigation:**

```tsx
function Menu() {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleClose();
    }
  };

  return (
    <div role="menu" onKeyDown={handleKeyDown}>
      {/* Menu items */}
    </div>
  );
}
```

---

## 14. System Recreation Guide

### 14.1 Prerequisites

**Software Requirements:**

- Node.js >= 20.0.0
- pnpm >= 9.0.0
- Docker >= 24.0.0
- Docker Compose >= 2.0.0
- Git >= 2.40.0

**Accounts Needed:**

- GitHub (for repository)
- Nhost (for backend hosting - optional for local dev)
- Vercel (for frontend hosting - optional)
- SendGrid (for email - optional, can use Mailhog locally)

### 14.2 Step-by-Step Recreation

**1. Initialize Repository:**

```bash
# Create new repository
mkdir MyPets
cd MyPets
git init

# Create monorepo structure
mkdir -p apps/web apps/backend packages/eslint-config e2e scripts .claude
```

**2. Setup Root Configuration:**

```bash
# Initialize pnpm workspace
cat > pnpm-workspace.yaml <<EOF
packages:
  - "apps/*"
  - "apps/backend/functions"
  - "packages/*"
EOF

# Create root package.json
pnpm init

# Install Turborepo
pnpm add -D turbo
```

**3. Configure Turborepo:**

```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "codegen": {
      "cache": false
    }
  }
}
```

**4. Setup Frontend Application:**

```bash
cd apps
npx create-next-app@latest web --typescript --tailwind --app --use-pnpm

cd web

# Install dependencies
pnpm add @nhost/react @nhost/nhost-js
pnpm add @apollo/client graphql graphql-ws
pnpm add @hookform/resolvers react-hook-form zod
pnpm add jotai zustand
pnpm add -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo
```

**5. Setup Backend:**

```bash
cd ../backend

# Initialize Nhost project
npx nhost init

# Create Docker Compose configuration
# (Copy docker-compose.yaml from specification)

# Create functions directory
mkdir functions
cd functions
pnpm init
pnpm add express @apollo/server graphql
pnpm add -D @types/express @types/node typescript
```

**6. Configure Database:**

```bash
# Initialize database with migrations
cd ../nhost

# Create initial migration
mkdir -p migrations/default/$(date +%s)_init

# Add schema SQL files
```

**7. Setup Testing:**

```bash
cd ../../..

# Install testing dependencies
pnpm add -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom
pnpm add -D playwright @playwright/test
pnpm add -D msw

# Initialize Playwright
npx playwright install
```

**8. Configure Code Quality:**

```bash
# Install ESLint & Prettier
pnpm add -D eslint prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin
pnpm add -D husky lint-staged

# Initialize Husky
npx husky init
```

**9. Generate Environment Files:**

```bash
# Create environment generation script
node generate-env.js
```

**10. Start Development:**

```bash
# Start backend
cd apps/backend
docker compose up -d

# Generate GraphQL types
cd ../..
pnpm codegen

# Start development servers
pnpm dev
```

### 14.3 Verification Checklist

After recreation, verify:

- [ ] All services start without errors
- [ ] Database migrations applied successfully
- [ ] GraphQL schema accessible at localhost:8080
- [ ] Web app loads at localhost:3000
- [ ] Authentication flow works
- [ ] GraphQL types generated correctly
- [ ] Tests pass (`pnpm test`)
- [ ] E2E tests pass (`pnpm test:e2e`)
- [ ] Build completes (`pnpm build`)
- [ ] Linting passes (`pnpm lint`)
- [ ] TypeScript checks pass (`pnpm typecheck`)

### 14.4 Common Issues & Solutions

**Issue: GraphQL version conflicts**
Solution: Lock GraphQL to 16.11.0 in root package.json:

```json
{
  "pnpm": {
    "overrides": {
      "graphql": "16.11.0"
    }
  }
}
```

**Issue: Database connection errors**
Solution: Ensure Docker services are running and ports not conflicting

**Issue: Next.js build errors**
Solution: Verify codegen ran before build, check for TypeScript errors

**Issue: Authentication not persisting**
Solution: Check session manager initialization and HTTPOnly cookie settings

---

## Appendix A: File Structure Reference

```
MyPets/
├── .claude/                     # AI agent configurations
├── .github/                     # GitHub workflows
├── .husky/                      # Git hooks
├── apps/
│   ├── backend/                 # Backend application
│   │   ├── functions/           # Serverless functions
│   │   ├── nhost/               # Nhost configuration
│   │   ├── scripts/             # Utility scripts
│   │   └── docker-compose.yaml
│   └── web/                     # Frontend application
│       ├── android/             # Capacitor Android
│       ├── public/              # Static assets
│       ├── src/                 # Source code
│       ├── capacitor.config.ts
│       ├── codegen.*.ts         # GraphQL codegen (5 files)
│       ├── next.config.ts
│       └── vitest.config.ts
├── e2e/                         # E2E tests
├── packages/
│   └── eslint-config/           # Shared ESLint
├── scripts/                     # Root scripts
├── package.json                 # Root package
├── pnpm-workspace.yaml          # Workspace config
├── turbo.json                   # Turborepo config
├── tsconfig.json                # Base TypeScript
└── playwright.config.ts         # E2E test config
```

---

## Appendix B: Technology Decision Rationale

**Why Next.js 15?**

- App Router for improved routing and layouts
- Server Components for better performance
- React 19 features (Server Actions, Suspense)
- Built-in image optimization
- Vercel deployment integration

**Why Nhost?**

- Unified backend platform (auth, database, storage, functions)
- Hasura GraphQL auto-generation
- PostgreSQL as primary database
- Local Docker development experience
- Easy scaling to production

**Why Turborepo?**

- Efficient monorepo builds with caching
- Task orchestration with dependencies
- Workspace management
- Parallel execution
- Build artifacts caching

**Why pnpm?**

- Efficient disk space usage
- Fast installation
- Workspace support
- Catalog for version management
- Strict dependency resolution

**Why GraphQL Code Generation?**

- Type-safe GraphQL operations
- Automatic hook generation
- Role-based type systems
- Schema synchronization
- Developer experience improvement

**Why Playwright for E2E?**

- Multi-browser support
- Powerful selectors
- Auto-waiting
- Debugging tools
- Parallel execution

---

## Appendix C: Glossary

**Terms & Definitions:**

- **Monorepo**: Single repository containing multiple applications and packages
- **Turborepo**: Build system for monorepos with intelligent caching
- **Workspace**: Individual application or package in a monorepo
- **Code Generation**: Automatic generation of TypeScript types from GraphQL schema
- **RLS**: Row-Level Security - database permissions based on user context
- **JWT**: JSON Web Token - authentication token format
- **SSR**: Server-Side Rendering - rendering on the server
- **SSG**: Static Site Generation - pre-rendering at build time
- **E2E**: End-to-End testing - testing complete user workflows
- **Hasura**: GraphQL Engine that auto-generates APIs from PostgreSQL
- **Nhost**: Backend platform built on Hasura, PostgreSQL, and serverless functions

---

## Document Information

**Document Status:** Complete
**Last Updated:** October 22, 2025
**Version:** 1.0
**Maintainers:** MyPets Development Team
**License:** Proprietary

**Feedback & Updates:**
For corrections or additions to this specification, please submit issues or pull requests to the repository.

---

_This specification provides complete architectural understanding for recreating the MyPets platform. All technical decisions, patterns, and configurations are documented for reference and implementation._
