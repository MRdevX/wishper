import { DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';
import { entities } from '../core/database/entities';

export default registerAs('db', (): DataSourceOptions => {
  const isProduction = process.env.NODE_ENV === 'production';
  const isCloudDatabase = process.env.DB_SSL === 'true' || process.env.PGSSLMODE === 'require';

  const config: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || process.env.PGHOST || 'localhost',
    port: parseInt(process.env.DB_PORT || process.env.PGPORT || '5432', 10),
    username: process.env.DB_USERNAME || process.env.PGUSER || 'postgres',
    password: process.env.DB_PASSWORD || process.env.PGPASSWORD || 'postgres',
    database: process.env.DB_DATABASE || process.env.PGDATABASE || 'wishper_dev',
    entities,
    synchronize: !isProduction,
    logging: !isProduction,
    ssl: isCloudDatabase || isProduction ? { rejectUnauthorized: false } : false,
    extra: {
      connectionTimeoutMillis: 30000,
      query_timeout: 30000,
      statement_timeout: 30000,
    },
  };

  return config;
});
