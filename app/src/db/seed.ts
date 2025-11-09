import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { klub, igrac } from './schema';

dotenv.config();

const runSeed = async () => {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set');
  }

  const sql = postgres(connectionString, { max: 1 });
  const db = drizzle(sql);

  const jsonFilePath = path.join(__dirname, '../../hnl_igraci.json');
  const fileContent = fs.readFileSync(jsonFilePath, 'utf-8');
  const clubsData = JSON.parse(fileContent);

  for (const clubData of clubsData) {
    const [klubEntry] = await db.insert(klub).values({
      ime: clubData.klub,
      stadion_domacin: clubData.stadion,
      godina_osnutka: clubData.godina_osnutka,
    }).returning();

    for (const playerData of clubData.igraci) {
      await db.insert(igrac).values({
        ime: playerData.ime,
        prezime: playerData.prezime,
        pozicija: playerData.pozicija,
        broj_dresa: playerData.broj_dresa,
        nacionalnost: playerData.nacionalnost,
        vrijednost_eur: playerData.vrijednost_eur,
        klub_id: klubEntry.id,
      });
    }
  }

  console.log('Seeding completed.');
  await sql.end();
};

runSeed().catch((err) => {
  console.error('Error seeding database:', err);
  process.exit(1);
});
