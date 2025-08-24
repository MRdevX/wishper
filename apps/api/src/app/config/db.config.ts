import { DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';
import { entities } from '../core/database/entities';

export default registerAs('db', (): DataSourceOptions => {
  const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;

  // Log environment variables for debugging (only in development)
  if (process.env.NODE_ENV === 'development') {
    console.log('Database Configuration Debug:');
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET');
    console.log('POSTGRES_URL:', process.env.POSTGRES_URL ? 'SET' : 'NOT SET');
    console.log('DB_HOST:', process.env.DB_HOST);
    console.log('DB_USERNAME:', process.env.DB_USERNAME);
    console.log('DB_DATABASE:', process.env.DB_DATABASE);
    console.log('NODE_ENV:', process.env.NODE_ENV);
  }

  if (databaseUrl) {
    console.log('Using DATABASE_URL for connection');
    return {
      type: 'postgres',
      url: databaseUrl,
      entities,
      synchronize: process.env.NODE_ENV === 'development',
      logging: process.env.NODE_ENV === 'development',
      ssl: {
        rejectUnauthorized: false,
      },
      extra: {
        connectionTimeoutMillis: 30000,
        query_timeout: 30000,
        statement_timeout: 30000,
      },
    };
  }

  // Fallback to individual parameters
  console.log('Using individual database parameters for connection');
  return {
    type: 'postgres',
    host: process.env.DB_HOST || process.env.PGHOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || process.env.PGUSER || 'postgres',
    password: process.env.DB_PASSWORD || process.env.PGPASSWORD || 'postgres',
    database: process.env.DB_DATABASE || process.env.PGDATABASE || 'wishper_dev',
    entities,
    synchronize: process.env.NODE_ENV === 'development',
    logging: process.env.NODE_ENV === 'development',
    ssl:
      process.env.NODE_ENV === 'production'
        ? {
            rejectUnauthorized: false,
          }
        : false,
    extra: {
      connectionTimeoutMillis: 30000,
      query_timeout: 30000,
      statement_timeout: 30000,
    },
  };
});
