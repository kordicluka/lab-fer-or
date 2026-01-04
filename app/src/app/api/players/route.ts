import { db } from '@/db';
import { igrac, klub } from '@/db/schema';
import { ilike, or, eq, SQL } from 'drizzle-orm';
import { successResponse, errorResponse } from '@/lib/apiResponse';
import { validatePlayerInput } from '@/lib/validation';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const filter = searchParams.get('filter');

    const conditions: (SQL | undefined)[] = [];

    if (query && filter) {
      if (filter === 'all') {
        conditions.push(
          or(
            ilike(igrac.ime, `%${query}%`),
            ilike(igrac.prezime, `%${query}%`),
            ilike(igrac.nacionalnost, `%${query}%`),
            ilike(igrac.pozicija, `%${query}%`),
            ilike(klub.ime, `%${query}%`),
          )
        );
      } else {
        const column = {
          ime: igrac.ime,
          prezime: igrac.prezime,
          nacionalnost: igrac.nacionalnost,
          pozicija: igrac.pozicija,
          klub: klub.ime,
        }[filter];

        if (column) {
          conditions.push(ilike(column, `%${query}%`));
        }
      }
    }

    const queryBuilder = db.select({
      id: igrac.id,
      ime: igrac.ime,
      prezime: igrac.prezime,
      nacionalnost: igrac.nacionalnost,
      pozicija: igrac.pozicija,
      broj_dresa: igrac.broj_dresa,
      vrijednost_eur: igrac.vrijednost_eur,
      klub: klub.ime,
    }).from(igrac).leftJoin(klub, eq(igrac.klub_id, klub.id)).where(or(...conditions.filter(c => c !== undefined) as SQL[]));

    const players = await queryBuilder;

    return successResponse(players, 'Players retrieved successfully');
  } catch (error) {
    console.error('Error fetching players:', error);
    return errorResponse('Internal server error', 500);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validation = validatePlayerInput(body);
    if (!validation.valid) {
      return errorResponse(`Validation failed: ${validation.errors.join(', ')}`, 400);
    }

    const [newPlayer] = await db.insert(igrac).values({
      ime: body.ime,
      prezime: body.prezime,
      nacionalnost: body.nacionalnost || null,
      datum_rodenja: body.datum_rodenja || null,
      pozicija: body.pozicija || null,
      broj_dresa: body.broj_dresa || null,
      vrijednost_eur: body.vrijednost_eur || null,
      datum_potpisa: body.datum_potpisa || null,
      klub_id: body.klub_id || null,
    }).returning();

    return successResponse(newPlayer, 'Player created successfully', 201);
  } catch (error) {
    console.error('Error creating player:', error);
    return errorResponse('Internal server error', 500);
  }
}