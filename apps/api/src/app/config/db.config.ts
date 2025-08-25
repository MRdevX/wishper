import { DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';
import { entities } from '../core/database/entities';

export default registerAs('db', (): DataSourceOptions => {
  const isProduction = process.env.NODE_ENV === 'production';
  const databaseUrl = process.env.DATABASE_URL || process.env.DB_URL;

  if (!databaseUrl) {
    throw new Error('DATABASE_URL or DB_URL environment variable is required');
  }

  const isLocalDatabase = databaseUrl.includes('localhost') || databaseUrl.includes('127.0.0.1');
  const isCloudDatabase =
    process.env.DB_SSL === 'true' ||
    process.env.PGSSLMODE === 'require' ||
    (!isLocalDatabase && (isProduction || databaseUrl.includes('://')));

  const config: DataSourceOptions = {
    type: 'postgres',
    url: databaseUrl,
    entities,
    synchronize: !isProduction,
    logging: !isProduction,
    ssl: isCloudDatabase || isProduction ? { rejectUnauthorized: false } : false,
    extra: {
      connectionTimeoutMillis: 30000,
      query_timeout: 30000,
      statement_timeout: 30000,
      ...(isCloudDatabase && {
        ssl: { rejectUnauthorized: false },
        sslmode: 'require',
      }),
    },
  } as DataSourceOptions;

  return config;
});
