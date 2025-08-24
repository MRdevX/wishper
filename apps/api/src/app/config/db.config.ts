import { DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';
import { entities } from '../core/database/entities';

export default registerAs('db', (): DataSourceOptions => {
  const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;

  if (databaseUrl) {
    return {
      type: 'postgres',
      url: databaseUrl,
      entities,
      synchronize: process.env.NODE_ENV === 'development',
      logging: process.env.NODE_ENV === 'development',
      ssl: {
        rejectUnauthorized: false,
      },
    };
  }

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
  };
});
