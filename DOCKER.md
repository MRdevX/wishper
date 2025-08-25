# Docker Setup for Wishper

This document provides instructions for running Wishper using Docker and Docker Compose.

## 🐳 Overview

The project includes two Docker Compose configurations:

- `docker-compose.yml` - Production setup
- `docker-compose.dev.yml` - Development setup with hot reloading

## 🚀 Quick Start

### Development Environment

```bash
# Start development environment
pnpm docker:dev

# View logs
pnpm docker:dev:logs

# Stop development environment
pnpm docker:dev:down
```

### Production Environment

```bash
# Start production environment
pnpm docker:prod

# View logs
pnpm docker:prod:logs

# Stop production environment
pnpm docker:prod:down
```

## 📋 Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+
- At least 2GB of available RAM
- Ports 3001 (API) and 5432 (PostgreSQL) available

## 🔧 Configuration

### Environment Variables

The following environment variables are automatically set by Docker Compose:

#### Application

- `NODE_ENV` - Environment (development/production)
- `HOST` - API host (0.0.0.0)
- `PORT` - API port (3001)

#### Port Configuration

- `API_PORT` - External API port (default: 3001)
- `POSTGRES_PORT` - External PostgreSQL port (default: 5432)

**Note:** Change these ports if you encounter port conflicts in your deployment environment.

#### Database

- `DB_HOST` - PostgreSQL host (postgres)
- `DB_PORT` - PostgreSQL port (5432)
- `DB_USERNAME` - Database user (wishper_user)
- `DB_PASSWORD` - Database password
- `DB_DATABASE` - Database name (wishper_dev/wishper_db)

**Note:** These same variables are used for both PostgreSQL initialization and application connection.

#### JWT (Authentication)

- `JWT_SECRET` - JWT signing secret
- `JWT_EXPIRES_IN` - JWT expiration time
- `JWT_REFRESH_SECRET` - Refresh token secret
- `JWT_REFRESH_EXPIRES_IN` - Refresh token expiration

### Environment Files

The project uses environment files for secure configuration:

#### Development

```bash
# Copy the example file
cp .env.example .env

# Edit with your values
nano .env
```

#### Production

```bash
# Copy the production example file
cp .env.production.example .env.production

# Edit with your secure production values
nano .env.production
```

**⚠️ Security Notes:**

- Never commit `.env` or `.env.production` files to version control
- Use strong, unique passwords for production
- JWT secrets should be at least 32 characters long
- Consider using a secrets management service in production

## 🏗️ Architecture

### Services

1. **PostgreSQL (postgres)**
   - Version: 16-alpine
   - Database: wishper_db (prod) / wishper_dev (dev)
   - User: wishper_user
   - Port: 5432

2. **API (api)**
   - Framework: NestJS
   - Language: TypeScript
   - Port: 3001
   - Health endpoint: `/api/health`

### Networks

- **wishper_network** (production)
- **wishper_dev_network** (development)

### Volumes

- **postgres_data** - PostgreSQL data persistence
- **postgres_dev_data** - Development PostgreSQL data

## 🛠️ Development Workflow

### Starting Development

```bash
# Build and start all services
pnpm docker:dev

# Watch API logs
pnpm docker:dev:logs

# Access API
curl http://localhost:3001/api/health
```

### Code Changes

The development setup includes volume mounts for hot reloading:

- Source code changes are automatically reflected
- No need to rebuild containers for code changes
- Node modules are cached in named volumes

### Database Access

```bash
# Connect to PostgreSQL
docker-compose -f docker-compose.dev.yml exec postgres psql -U wishper_user -d wishper_dev

# View database logs
docker-compose -f docker-compose.dev.yml logs postgres
```

## 🚀 Production Deployment

### Building for Production

```bash
# Build production image
docker-compose build

# Start production services
docker-compose up -d

# Verify health
curl http://localhost:3001/api/health
```

### Production Considerations

1. **Environment Variables**: Update JWT secrets and database passwords
2. **SSL/TLS**: Configure reverse proxy (nginx/traefik) for HTTPS
3. **Backup**: Set up automated database backups
4. **Monitoring**: Add monitoring and logging solutions
5. **Scaling**: Consider using Docker Swarm or Kubernetes

## 🔍 Troubleshooting

### Common Issues

#### Port Already in Use

```bash
# Check what's using the port
lsof -i :3001
lsof -i :5432

# Stop conflicting services
sudo systemctl stop postgresql  # If running locally

# Alternative: Change ports in your .env file
API_PORT=3002
POSTGRES_PORT=5433
```

#### Database Connection Issues

```bash
# Check database health
docker-compose exec postgres pg_isready -U wishper_user -d wishper_db

# View database logs
docker-compose logs postgres
```

#### API Not Starting

```bash
# Check API logs
docker-compose logs api

# Rebuild API container
docker-compose build api
docker-compose up -d api
```

### Health Checks

Both services include health checks:

- **PostgreSQL**: Uses `pg_isready` to verify database connectivity
- **API**: Uses HTTP health check at `/api/health`

### Logs

```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs api
docker-compose logs postgres

# Follow logs in real-time
docker-compose logs -f api
```

## 🧹 Cleanup

### Remove All Data

```bash
# Stop and remove containers, networks, and volumes
pnpm docker:clean
```

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [NestJS Documentation](https://nestjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 🔐 Security Notes

1. **Never commit sensitive data** to version control
2. **Use strong passwords** for database and JWT secrets
3. **Keep images updated** with security patches
4. **Limit container permissions** in production
5. **Use secrets management** for sensitive environment variables

## 📝 License

This Docker setup is part of the Wishper project and follows the same license terms.
