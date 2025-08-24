#!/usr/bin/env node

// Simple script to debug environment variables
console.log('=== Environment Variables Debug ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log(
  'DATABASE_URL:',
  process.env.DATABASE_URL ? 'SET (length: ' + process.env.DATABASE_URL.length + ')' : 'NOT SET'
);
console.log(
  'POSTGRES_URL:',
  process.env.POSTGRES_URL ? 'SET (length: ' + process.env.POSTGRES_URL.length + ')' : 'NOT SET'
);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_USERNAME:', process.env.DB_USERNAME);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? 'SET' : 'NOT SET');
console.log('DB_DATABASE:', process.env.DB_DATABASE);
console.log('HOST:', process.env.HOST);
console.log('PORT:', process.env.PORT);
console.log('===================================');
