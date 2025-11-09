CREATE TABLE "igrac" (
	"id" serial PRIMARY KEY NOT NULL,
	"ime" text NOT NULL,
	"prezime" text NOT NULL,
	"nacionalnost" text,
	"datum_rodenja" date,
	"pozicija" text,
	"broj_dresa" integer,
	"vrijednost_eur" integer,
	"datum_potpisa" date,
	"klub_id" integer
);
--> statement-breakpoint
CREATE TABLE "klub" (
	"id" serial PRIMARY KEY NOT NULL,
	"ime" text NOT NULL,
	"stadion_domacin" text
);
--> statement-breakpoint
ALTER TABLE "igrac" ADD CONSTRAINT "igrac_klub_id_klub_id_fk" FOREIGN KEY ("klub_id") REFERENCES "public"."klub"("id") ON DELETE no action ON UPDATE no action;