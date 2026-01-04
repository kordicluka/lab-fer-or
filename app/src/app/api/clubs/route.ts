import { db } from '@/db';
import { klub } from '@/db/schema';
import { successResponse, errorResponse } from '@/lib/apiResponse';

export async function GET() {
  try {
    const clubs = await db.select().from(klub).orderBy(klub.ime);

    return successResponse(clubs, 'Clubs retrieved successfully');
  } catch (error) {
    console.error('Error fetching clubs:', error);
    return errorResponse('Internal server error', 500);
  }
}
