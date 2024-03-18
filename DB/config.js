import pg from 'pg';
const { Pool } = pg;

export const config = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'dc_22',
  user: 'postgres',
  password: '123456',
});
