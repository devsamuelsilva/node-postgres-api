import pg from 'pg';
const { Pool } = pg;

export const config = new Pool({
  host: 'dpg-cok2ign79t8c73a4g440-a.oregon-postgres.render.com',
  port: 5432,
  database: 'dcf22',
  user: 'samuel',
  password: 'p1nRFjxppzXtQgig8y4YDjtGK9qhh7m4',
  ssl: true,
});
