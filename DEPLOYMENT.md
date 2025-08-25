# Deployment Guide

## Option 1: Nixpacks (Recommended for API)

Nixpacks provides a simpler deployment experience with automatic optimizations.

### Prerequisites

- Your deployment server supports Nixpacks
- PostgreSQL database (managed or separate container)

### Deployment Steps

1. **Set up your environment variables** on your deployment platform:

   ```bash
   # Required
   DB_PASSWORD=your_secure_password
   JWT_SECRET=your_jwt_secret
   JWT_REFRESH_SECRET=your_refresh_secret

   # Optional (with defaults)
   API_PORT=3001
   DB_HOST=your_db_host
   DB_USERNAME=wishper_user
   DB_DATABASE=wishper_db
   ```

2. **Deploy using Nixpacks**:
   - Push your code to your repository
   - Nixpacks will automatically detect your Node.js/pnpm setup
   - It will use the `nixpacks.toml` configuration for build steps

3. **Connect to your PostgreSQL database**:
   - Ensure your database is accessible from your API
   - Update `DB_HOST` environment variable if needed

### Advantages

- ✅ Automatic dependency detection
- ✅ Optimized builds
- ✅ Smaller deployment size
- ✅ Better caching
- ✅ No Docker image management

## Option 2: Docker Compose (Full Control)

Use this if you need full control over the deployment or want to run everything together.

### Prerequisites

- Docker and Docker Compose on your deployment server

### Deployment Steps

1. **Create your `.env` file**:

   ```bash
   cp .env.example .env
   # Edit .env with your production values
   ```

2. **Deploy with Docker Compose**:
   ```bash
   docker-compose up -d
   ```

### Advantages

- ✅ Full control over the build process
- ✅ Easy local development
- ✅ Complete service orchestration
- ✅ Complex networking support

## Frontend Deployment

### Environment Configuration

The frontend needs to know where to send API requests. Configure the following environment variable:

```bash
# Production
NEXT_PUBLIC_API_URL=https://api.wishper.link/api

# Local development
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Deployment Options

1. **Vercel** (Recommended):
   - Connect your repository
   - Set environment variables in Vercel dashboard
   - Automatic deployments on push

2. **Netlify**:
   - Connect your repository
   - Set environment variables in Netlify dashboard
   - Build command: `pnpm --filter=web build`

3. **Self-hosted**:
   - Build the app: `pnpm --filter=web build`
   - Serve the `.next` directory with a Node.js server

### Environment Variables

Both deployment methods use the same environment variables:

| Variable                 | Required | Default      | Description              |
| ------------------------ | -------- | ------------ | ------------------------ |
| `DB_PASSWORD`            | ✅       | -            | Database password        |
| `JWT_SECRET`             | ✅       | -            | JWT signing secret       |
| `JWT_REFRESH_SECRET`     | ✅       | -            | JWT refresh secret       |
| `API_PORT`               | ❌       | 3001         | API port                 |
| `DB_HOST`                | ❌       | postgres     | Database host            |
| `DB_USERNAME`            | ❌       | wishper_user | Database username        |
| `DB_DATABASE`            | ❌       | wishper_db   | Database name            |
| `JWT_EXPIRES_IN`         | ❌       | 1d           | JWT expiration           |
| `JWT_REFRESH_EXPIRES_IN` | ❌       | 7d           | Refresh token expiration |

### Frontend Environment Variables

| Variable              | Required | Default                      | Description      |
| --------------------- | -------- | ---------------------------- | ---------------- |
| `NEXT_PUBLIC_API_URL` | ❌       | https://api.wishper.link/api | API endpoint URL |

## Recommendation

**Use Nixpacks** if:

- You want simpler deployment
- Your deployment platform supports it
- You have a separate PostgreSQL database

**Use Docker Compose** if:

- You need full control over the build process
- You want to run PostgreSQL alongside your API
- You need complex networking or volume mounts
