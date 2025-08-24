FROM node:20-alpine AS base

# Install system dependencies
RUN apk update && apk add --no-cache libc6-compat

# Install global packages
RUN npm install -g pnpm@10.4.1 turbo@^2.5.6

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/
COPY packages/schemas/package.json ./packages/schemas/

# Install all dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build stage
FROM base AS builder

# Debug environment variables (optional - remove in production)
RUN node debug-env.js

# Build schemas package first
RUN cd packages/schemas && pnpm run build

# Build API app
RUN cd apps/api && pnpm run build

# Production stage
FROM node:20-alpine AS runner

# Install system dependencies
RUN apk update && apk add --no-cache libc6-compat

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
RUN npm install -g pnpm@10.4.1 && \
    pnpm install --frozen-lockfile --prod

# Copy built application from builder stage
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/dist ./apps/api/dist
COPY --from=builder --chown=nestjs:nodejs /app/packages/schemas/dist ./packages/schemas/dist

# Switch to non-root user
USER nestjs

# Expose port
EXPOSE 3001

# Start the application
CMD ["node", "apps/api/dist/main"]
