# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Eureka Editor Proto is a monorepo containing a full-stack application with Next.js frontend, Go backend, and PostgreSQL database. The project uses Dev Containers for isolated development environments.

**Tech Stack:**
- Frontend: Next.js 15 (TypeScript, React 19) with TipTap editor
- Backend: Go with Gin framework
- Database: PostgreSQL 17
- Migration: golang-migrate/migrate
- Dev Environment: Docker Compose with Dev Containers

## Environment Setup & Commands

### Local Development (Non-DevContainer)

Start all services with Docker Compose:
```bash
docker compose -f compose.local.yml up -d --build
```

Service URLs:
- Frontend: http://localhost:3001
- Backend: http://localhost:8081 (health check: `GET /health`)
- Database: localhost:5432 (DB: app, USER: admin, PASS: Passw0rd!)

Stop services:
```bash
docker compose -f compose.local.yml down -v
```

Rollback and reapply migrations:
```bash
docker compose -f compose.local.yml run --rm migrate go run . down all
docker compose -f compose.local.yml run --rm migrate go run . migrate
```

### DevContainer Development

The project supports two separate DevContainer environments:

1. **Backend DevContainer**: For Go backend development
   - Workspace: `/workspace` (mounted from `backend/`)
   - Runs migration automatically on startup via `docker-compose.backend.override.yml`
   - Backend runs on port 8080
   - Delve debugger on port 2345

2. **Frontend DevContainer**: For Next.js frontend development
   - Workspace: `/workspace` (mounted from `frontend/`)
   - Automatically starts backend service via `docker-compose.frontend.override.yml`
   - Frontend runs on port 3000
   - Node.js debugger on port 9229

### Environment Variables

This project uses 1Password CLI (`op`) to inject secrets from `.devcontainer/.env.tpl`:
- The `initializeCommand` in devcontainer.json runs: `rm -f .devcontainer/.env && /opt/homebrew/bin/op inject -i .devcontainer/.env.tpl -o .devcontainer/.env`
- Required vars: `NEXT_PUBLIC_API_URL`, `GITHUB_USERNAME`

### Frontend Commands

From `frontend/` directory:
```bash
npm run dev          # Start Next.js dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Backend Commands

From `backend/` directory:
```bash
go mod tidy                                    # Install/clean dependencies
go run .                                       # Start backend server
go install -v github.com/go-delve/delve/cmd/dlv@latest  # Install debugger
```

### Migration Commands

From `migrate/` directory or via docker compose:
```bash
go run . migrate              # Apply all pending migrations
go run . up                   # Same as migrate
go run . rollback             # Rollback 1 migration
go run . rollback 2           # Rollback 2 migrations
go run . down all             # Rollback all migrations
```

Migration files are in `migrate/migrations/` with naming pattern: `{version}_{name}.up.sql` / `{version}_{name}.down.sql`

## Architecture

### Monorepo Structure

The project is organized as a monorepo with three main modules:
- `backend/`: Go API server (module: `backend`)
- `frontend/`: Next.js application (package: `eureka-editor-proto`)
- `migrate/`: Database migration tool (module: `example.com/migrate`)

Each module has its own dependencies (`go.mod` or `package.json`) and can be developed independently.

### Backend Architecture

The Go backend follows a layered architecture:

```
backend/
├── main.go                    # Entry point, CORS middleware, server init
├── database/database.go       # DB connection management (InitDB, CloseDB)
├── models/post.go             # Data models
├── repository/posts_repository.go  # Database access layer
├── handlers/posts.go          # HTTP request handlers
└── routes/routes.go           # Route definitions
```

**Key patterns:**
- Database connection is initialized once in `main.go` via `database.InitDB()` and closed on shutdown
- Repository pattern separates database logic from HTTP handlers
- All routes use CORS middleware for cross-origin requests
- Server runs on port 8080 by default

### Frontend Architecture

Next.js application using App Router:

```
frontend/src/
├── app/
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page (post list)
│   └── globals.css           # Global styles
├── components/
│   ├── layout/               # Layout components
│   ├── posts/                # Post-related components
│   └── ui/                   # Reusable UI components
├── types/                    # TypeScript type definitions
├── utils/                    # Utility functions
└── styles/                   # Additional styles
```

**Key patterns:**
- Uses TipTap rich text editor for content editing
- API calls to backend via `NEXT_PUBLIC_API_URL` environment variable
- Components organized by feature (posts, layout, ui)

### Database Schema

Primary table: `posts`
- `id`: UUID (primary key, auto-generated)
- `content`: TEXT (post content)
- `username`: TEXT (display name)
- `user_handle`: TEXT (handle/username)
- `timestamp`: TIMESTAMPTZ (post creation time)
- `likes`, `reposts`, `replies`: INTEGER counters
- `created_at`, `updated_at`: TIMESTAMPTZ (auto-managed)

Indexes:
- `idx_posts_timestamp` on timestamp DESC (for timeline queries)
- `idx_posts_username` on username
- `idx_posts_user_handle` on user_handle

Auto-update trigger: `updated_at` is automatically set on UPDATE via `update_posts_updated_at` trigger

### DevContainer Orchestration

The DevContainer setup uses Docker Compose with override files for different scenarios:

1. **Base**: `.devcontainer/docker-compose.yml` defines all services (db, migrate, backend, frontend)
2. **Backend override**: `docker-compose.backend.override.yml` runs migration on startup
3. **Frontend override**: `docker-compose.frontend.override.yml` runs migration AND backend on startup

This allows:
- Backend developers to work on API without frontend
- Frontend developers to have a fully running backend automatically
- Shared PostgreSQL instance across both environments

### API Endpoints

Backend API (assumed from repository and handlers structure):
- Health check endpoint available
- Post CRUD operations via REST API
- CORS enabled for all origins (development setup)

## Testing & Debugging

### Backend Debugging
Delve debugger port 2345 is exposed in DevContainer. Install with:
```bash
go install -v github.com/go-delve/delve/cmd/dlv@latest
```

### Frontend Debugging
Node.js debugger port 9229 is exposed in DevContainer.

## Important Notes

- The `.devcontainer/.env` file is generated from `.env.tpl` using 1Password CLI - never commit this file
- When working in DevContainer, choose the appropriate container (backend or frontend) based on what you're developing
- Database port differs between local (5432) and DevContainer (5432 internal, exposed as 5432)
- Frontend in local mode uses port 3001, backend uses 8081 (to avoid conflicts with DevContainer ports)
- All Go services use `DATABASE_URL` environment variable for database connection
