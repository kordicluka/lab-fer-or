import { db } from '@/db';
import { igrac, klub } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { successResponse, errorResponse } from '@/lib/apiResponse';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ club_id: string }> }
) {
  try {
    const { club_id } = await params;
    const clubId = parseInt(club_id, 10);

    if (isNaN(clubId)) {
      return errorResponse('Invalid club ID', 400);
    }

    const clubExists = await db.select().from(klub).where(eq(klub.id, clubId));

    if (clubExists.length === 0) {
      return errorResponse('Club not found', 404);
    }

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
      })
      .from(igrac)
      .leftJoin(klub, eq(igrac.klub_id, klub.id))
      .where(eq(igrac.klub_id, clubId));

    return successResponse(players, 'Players retrieved successfully');
  } catch (error) {
    console.error('Error fetching players by club:', error);
    return errorResponse('Internal server error', 500);
  }
}
