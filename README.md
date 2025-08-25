# Wishper

A personal project to build a robust full-stack wishlist application using modern technologies.

## 🚀 Tech Stack

- **Frontend**: Next.js 15 with App Router, TypeScript, and Tailwind CSS
- **Backend**: NestJS with TypeScript and PostgreSQL
- **UI**: ShadCN UI components with Lucide React icons
- **Monorepo**: Turborepo for fast, incremental builds and caching
- **Package Manager**: pnpm with workspace support

## 📁 Project Structure

```
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # NestJS backend
├── packages/
│   ├── ui/           # ShadCN UI components
│   ├── api/          # Shared DTOs and entities
│   ├── eslint-config/ # Shared ESLint config
│   ├── typescript-config/ # Shared TypeScript config
│   └── jest-config/  # Shared Jest config
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 20+
- pnpm 8+
- Docker Engine 20.10+ (for containerized setup)
- Docker Compose 2.0+ (for containerized setup)

### Installation

#### Option 1: Local Development

```bash
# Install dependencies
pnpm install

# Start development servers
pnpm dev
```

#### Option 2: Docker Development (Recommended)

```bash
# Setup environment (first time only)
cp .env.example .env

# Start development environment
pnpm docker:dev

# View logs
pnpm docker:dev:logs

# Stop development environment
pnpm docker:dev:down
```

### Docker Commands

```bash
# Development
pnpm docker:dev          # Start development
pnpm docker:dev:logs     # View logs
pnpm docker:dev:down     # Stop development

# Production
pnpm docker:prod         # Start production
pnpm docker:prod:logs    # View logs
pnpm docker:prod:down    # Stop production

# Cleanup
pnpm docker:clean        # Remove containers and volumes
```

For detailed Docker documentation, see [DOCKER.md](./DOCKER.md).

### Development

```bash
# Start all apps in development mode
pnpm dev

# Build all apps and packages
pnpm build

# Lint all apps and packages
pnpm lint

# Type check all apps and packages
pnpm typecheck
```

## 📦 Packages

### `@repo/ui`

Shared UI components built with ShadCN and Tailwind CSS.

### `@repo/api`

Shared DTOs and entities for the NestJS backend.

## 🎯 Features

- Create and manage wishlists
- Share wishlists with family and friends
- Track gifts and who gave them
- Beautiful, responsive UI
- Full-stack TypeScript application

## 📝 License

MIT
