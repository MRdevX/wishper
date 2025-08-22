# Wishper

A modern full-stack application built with Next.js frontend and NestJS backend using Turborepo.

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development servers
pnpm dev
```

This will start:

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001/api

## Available Scripts

```bash
pnpm dev          # Start all apps in development mode
pnpm build        # Build all apps and packages
pnpm lint         # Lint all code
pnpm format       # Format all code with Prettier
pnpm check-types  # Type check all TypeScript code
```

## Project Structure

```
wishper/
├── apps/
│   ├── web/                 # Next.js frontend
│   │   ├── app/            # Next.js App Router
│   │   ├── components/     # React components
│   │   ├── lib/            # Utility functions & API client
│   │   └── types/          # TypeScript types
│   └── api/                 # NestJS backend
│       ├── src/
│       │   ├── app/
│       │   │   ├── core/   # Core modules (config, health)
│       │   │   └── config/ # Configuration files
│       │   └── main.ts     # Application entry point
├── packages/
│   ├── ui/                  # Shared UI components
│   ├── eslint-config/       # Shared ESLint configuration
│   └── typescript-config/   # Shared TypeScript configuration
└── package.json            # Root package configuration
```

## Development

- **Frontend**: Next.js 15 with App Router
- **Backend**: NestJS 11 with TypeORM
- **Package Manager**: pnpm
- **Monorepo**: Turborepo
- **Language**: TypeScript
