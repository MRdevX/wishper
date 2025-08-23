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

### Installation

```bash
# Install dependencies
pnpm install

# Start development servers
pnpm dev
```

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
