import pg from 'pg';
import 'dotenv/config'

const { Pool } = pg;
console.log(process.env)

export const config = new Pool({
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  ssl: true,
});
