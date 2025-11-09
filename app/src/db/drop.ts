import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import { sql } from 'drizzle-orm';

dotenv.config();

const runDrop = async () => {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set');
  }

  const pg = postgres(connectionString, { max: 1 });
  const db = drizzle(pg);

  console.log('Dropping tables...');
  await db.execute(sql`DROP TABLE IF EXISTS igrac CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS klub CASCADE`);
  console.log('Tables dropped.');

  await pg.end();
};

runDrop().catch((err) => {
  console.error('Error dropping tables:', err);
  process.exit(1);
});