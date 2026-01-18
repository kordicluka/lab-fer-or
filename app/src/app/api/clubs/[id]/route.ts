import { db } from '@/db';
import { klub } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { successResponse, errorResponse } from '@/lib/apiResponse';
import { addClubJsonLd } from '@/lib/jsonld';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const clubId = parseInt(id, 10);

    if (isNaN(clubId)) {
      return errorResponse('Invalid club ID', 400);
    }

    const result = await db.select().from(klub).where(eq(klub.id, clubId));

    if (result.length === 0) {
      return errorResponse('Club not found', 404);
    }

    const clubWithJsonLd = addClubJsonLd(result[0]);
    return successResponse(clubWithJsonLd, 'Club retrieved successfully');
  } catch (error) {
    console.error('Error fetching club:', error);
    return errorResponse('Internal server error', 500);
  }
}
