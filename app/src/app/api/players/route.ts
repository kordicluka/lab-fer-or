import { NextResponse } from 'next/server';
import { db } from '@/db';
import { igrac, klub } from '@/db/schema';
import { ilike, or, eq, SQL } from 'drizzle-orm';

export async function GET(request: Request) {
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

  return NextResponse.json(players);
}