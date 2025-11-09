import { pgTable, serial, text, integer, date } from 'drizzle-orm/pg-core';

export const klub = pgTable('klub', {
  id: serial('id').primaryKey(),
  ime: text('ime').notNull(),
  stadion_domacin: text('stadion_domacin'),
  godina_osnutka: integer('godina_osnutka'),
});

export const igrac = pgTable('igrac', {
  id: serial('id').primaryKey(),
  ime: text('ime').notNull(),
  prezime: text('prezime').notNull(),
  nacionalnost: text('nacionalnost'),
  datum_rodenja: date('datum_rodenja'),
  pozicija: text('pozicija'),
  broj_dresa: integer('broj_dresa'),
  vrijednost_eur: integer('vrijednost_eur'),
  datum_potpisa: date('datum_potpisa'),
  klub_id: integer('klub_id').references(() => klub.id),
});
