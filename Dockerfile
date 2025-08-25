# Use Node.js 20 Alpine as base image
FROM node:20-alpine AS base

# Install system dependencies
RUN apk update && apk add --no-cache libc6-compat

# Enable corepack for pnpm
RUN corepack enable

# Set working directory
WORKDIR /app

# Copy package files for better layer caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/
COPY packages/schemas/package.json ./packages/schemas/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build stage
FROM base AS builder

# Build schemas package first
RUN pnpm --filter=@repo/schemas build

# Build API app
RUN pnpm --filter=api build

# Production stage
FROM node:20-alpine AS runner

# Set runtime environment variables
ENV NODE_ENV=production
ENV HOST=0.0.0.0

# Install system dependencies
RUN apk update && apk add --no-cache libc6-compat

# Enable corepack for pnpm
RUN corepack enable

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs

# Set working directory
WORKDIR /app

# Copy package files for production install
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/
COPY packages/schemas/package.json ./packages/schemas/

# Install only production dependencies
RUN pnpm install --frozen-lockfile --prod

# Copy built application from builder stage
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/dist ./apps/api/dist
COPY --from=builder --chown=nestjs:nodejs /app/packages/schemas/dist ./packages/schemas/dist

# Switch to non-root user
USER nestjs

# Expose port (will be overridden by environment variable)
EXPOSE 3001

# Start the application
CMD ["node", "apps/api/dist/main"]
