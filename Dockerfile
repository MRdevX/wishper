FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install turbo globally
RUN npm install -g turbo@^2.5.6

# Copy the entire monorepo
COPY . .

# Generate a partial monorepo with a pruned lockfile for the api workspace
RUN turbo prune api --docker

# Install dependencies based on the pruned lockfile
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package.json files from the pruned output
COPY --from=deps /app/out/json/ .
COPY --from=deps /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# Install dependencies using pnpm
RUN npm install -g pnpm@10.4.1
RUN pnpm install --frozen-lockfile

# Build the application
FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy dependencies from installer stage
COPY --from=installer /app/node_modules ./node_modules
COPY --from=installer /app/pnpm-lock.yaml ./pnpm-lock.yaml

# Copy source code from the pruned output
COPY --from=deps /app/out/full/ .

# Build the schemas package first, then the API app
RUN npm install -g pnpm@10.4.1
RUN pnpm --filter=@repo/schemas build
RUN pnpm --filter=api build

# Production stage
FROM base AS runner
WORKDIR /app

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

# Copy built application
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/dist ./apps/api/dist
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/package.json ./apps/api/package.json

# Copy node_modules for production dependencies only
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules

# Switch to non-root user
USER nestjs

# Expose the port the app runs on
EXPOSE 3001

# Start the application
CMD ["node", "apps/api/dist/main"]
