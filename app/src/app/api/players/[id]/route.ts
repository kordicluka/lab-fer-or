import { db } from '@/db';
import { igrac, klub } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { successResponse, errorResponse } from '@/lib/apiResponse';
import { validatePlayerInput } from '@/lib/validation';
import { addPlayerJsonLd } from '@/lib/jsonld';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const playerId = parseInt(id, 10);

    if (isNaN(playerId)) {
      return errorResponse('Invalid player ID', 400);
    }

    const result = await db
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
      .where(eq(igrac.id, playerId));

    if (result.length === 0) {
      return errorResponse('Player not found', 404);
    }

    const playerWithJsonLd = addPlayerJsonLd(result[0]);
    return successResponse(playerWithJsonLd, 'Player retrieved successfully');
  } catch (error) {
    console.error('Error fetching player:', error);
    return errorResponse('Internal server error', 500);
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const playerId = parseInt(id, 10);

    if (isNaN(playerId)) {
      return errorResponse('Invalid player ID', 400);
    }

    const body = await request.json();

    const validation = validatePlayerInput(body);
    if (!validation.valid) {
      return errorResponse(`Validation failed: ${validation.errors.join(', ')}`, 400);
    }

    const existingPlayer = await db
      .select()
      .from(igrac)
      .where(eq(igrac.id, playerId));

    if (existingPlayer.length === 0) {
      return errorResponse('Player not found', 404);
    }

    const [updatedPlayer] = await db
      .update(igrac)
      .set({
        ime: body.ime,
        prezime: body.prezime,
        nacionalnost: body.nacionalnost || null,
        datum_rodenja: body.datum_rodenja || null,
        pozicija: body.pozicija || null,
        broj_dresa: body.broj_dresa || null,
        vrijednost_eur: body.vrijednost_eur || null,
        datum_potpisa: body.datum_potpisa || null,
        klub_id: body.klub_id || null,
      })
      .where(eq(igrac.id, playerId))
      .returning();

    return successResponse(updatedPlayer, 'Player updated successfully');
  } catch (error) {
    console.error('Error updating player:', error);
    return errorResponse('Internal server error', 500);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const playerId = parseInt(id, 10);

    if (isNaN(playerId)) {
      return errorResponse('Invalid player ID', 400);
    }

    const existingPlayer = await db
      .select()
      .from(igrac)
      .where(eq(igrac.id, playerId));

    if (existingPlayer.length === 0) {
      return errorResponse('Player not found', 404);
    }

    await db.delete(igrac).where(eq(igrac.id, playerId));

    return successResponse(null, 'Player deleted successfully');
  } catch (error) {
    console.error('Error deleting player:', error);
    return errorResponse('Internal server error', 500);
  }
}
