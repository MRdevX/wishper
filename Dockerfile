FROM node:20-alpine AS base

# Accept build arguments for database configuration
ARG DATABASE_URL
ARG DB_HOST
ARG DB_PORT=5432
ARG DB_USERNAME
ARG DB_PASSWORD
ARG DB_DATABASE

# Set database environment variables from build args
ENV DATABASE_URL=$DATABASE_URL
ENV DB_HOST=$DB_HOST
ENV DB_PORT=$DB_PORT
ENV DB_USERNAME=$DB_USERNAME
ENV DB_PASSWORD=$DB_PASSWORD
ENV DB_DATABASE=$DB_DATABASE

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

# Set runtime environment variables
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3001

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
COPY --from=builder --chown=nestjs:nodejs /app/debug-env.js ./debug-env.js

# Switch to non-root user
USER nestjs

# Expose port
EXPOSE 3001

# Start the application with debug info
CMD ["sh", "-c", "node debug-env.js && node apps/api/dist/main"]
