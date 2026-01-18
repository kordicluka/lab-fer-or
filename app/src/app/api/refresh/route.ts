import { NextResponse } from 'next/server';
import { auth0 } from '@/lib/auth0';
import { db } from '@/db';
import { igrac, klub } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Parser } from 'json2csv';
import * as fs from 'fs';
import * as path from 'path';

export async function POST() {
  try {
    const session = await auth0.getSession();

    if (!session || !session.user) {
      return NextResponse.json(
        { status: 'Error', message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch all clubs
    const clubs = await db.select().from(klub);

    // Fetch all players with their club info
    const players = await db
      .select({
        id: igrac.id,
        ime: igrac.ime,
        prezime: igrac.prezime,
        nacionalnost: igrac.nacionalnost,
        datum_rodenja: igrac.datum_rodenja,
        pozicija: igrac.pozicija,
        broj_dresa: igrac.broj_dresa,
        vrijednost_eur: igrac.vrijednost_eur,
        datum_potpisa: igrac.datum_potpisa,
        klub_id: igrac.klub_id,
        klub: klub.ime,
        stadion: klub.stadion_domacin,
        godina_osnutka: klub.godina_osnutka,
      })
      .from(igrac)
      .leftJoin(klub, eq(igrac.klub_id, klub.id));

    // Generate hierarchical JSON (clubs with nested players)
    const hierarchicalData = clubs.map(club => ({
      klub: club.ime,
      stadion: club.stadion_domacin,
      godina_osnutka: club.godina_osnutka,
      igraci: players
        .filter(p => p.klub_id === club.id)
        .map(p => ({
          ime: p.ime,
          prezime: p.prezime,
          nacionalnost: p.nacionalnost,
          datum_rodenja: p.datum_rodenja,
          pozicija: p.pozicija,
          broj_dresa: p.broj_dresa,
          vrijednost_eur: p.vrijednost_eur,
          datum_potpisa: p.datum_potpisa,
        })),
    }));

    // Generate flat CSV data
    const flatData = players.map(p => ({
      id: p.id,
      ime: p.ime,
      prezime: p.prezime,
      nacionalnost: p.nacionalnost,
      datum_rodenja: p.datum_rodenja,
      pozicija: p.pozicija,
      broj_dresa: p.broj_dresa,
      vrijednost_eur: p.vrijednost_eur,
      datum_potpisa: p.datum_potpisa,
      klub: p.klub,
      stadion: p.stadion,
      godina_osnutka: p.godina_osnutka,
    }));

    // Write JSON file
    const publicDir = path.join(process.cwd(), 'public');

    // Ensure public directory exists
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const jsonPath = path.join(publicDir, 'hnl_igraci.json');
    fs.writeFileSync(jsonPath, JSON.stringify(hierarchicalData, null, 2), 'utf-8');

    // Write CSV file
    const csvParser = new Parser();
    const csvData = csvParser.parse(flatData);
    const csvPath = path.join(publicDir, 'hnl_igraci.csv');
    fs.writeFileSync(csvPath, csvData, 'utf-8');

    return NextResponse.json({
      status: 'OK',
      message: 'Preslike uspješno osvježene',
      response: {
        jsonFile: '/hnl_igraci.json',
        csvFile: '/hnl_igraci.csv',
        clubsCount: clubs.length,
        playersCount: players.length,
      },
    });
  } catch (error) {
    console.error('Error refreshing files:', error);
    return NextResponse.json(
      { status: 'Error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}
