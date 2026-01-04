# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an academic project for the "Otvoreno računarstvo" (Open Computing) course at FER. It consists of a Next.js web application that manages and displays data about the Croatian Football League (HNL) - clubs, stadiums, and players.

The dataset is stored in PostgreSQL and exposed through a REST API with search, filtering, and export capabilities (CSV/JSON).

## Technology Stack

- **Frontend**: Next.js 16 (React 19, App Router)
- **Database**: PostgreSQL 18
- **ORM**: Drizzle ORM
- **Styling**: Tailwind CSS 4
- **Runtime**: Node.js with TypeScript

## Development Commands

All commands should be run from the `app/` directory:

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Database Setup

**Prerequisites**: PostgreSQL must be running. Use Docker Compose from the project root:

```bash
# From project root (not app/)
docker compose up -d
```

**Database credentials** (from docker-compose.yml):
- Host: localhost:5432
- User: admin
- Password: TestorOUsioNGELkstraGRisiVEsTOnErICIo
- Database: hnl_db

**Environment setup**: Create `app/.env` file with:
```
DATABASE_URL=postgresql://admin:TestorOUsioNGELkstraGRisiVEsTOnErICIo@localhost:5432/hnl_db
```

**Database management** (run from `app/` directory):

```bash
# Drop all tables
npm run db:drop

# Run migrations (create tables from schema)
npm run db:migrate

# Seed database with initial data
npm run db:seed

# Complete reset (drop, migrate, seed)
npm run db:drop && npm run db:migrate && npm run db:seed
```

## Architecture

### Database Schema

The database follows a simple relational model with two main tables:

- **klub** (clubs): id, ime, stadion_domacin, godina_osnutka
- **igrac** (players): id, ime, prezime, nacionalnost, datum_rodenja, pozicija, broj_dresa, vrijednost_eur, datum_potpisa, klub_id (foreign key)

Schema is defined in `app/src/db/schema.ts` using Drizzle ORM.

### Application Structure

```
app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/
│   │   │   └── players/        # REST API endpoints
│   │   │       ├── route.ts    # GET /api/players (search & filter)
│   │   │       └── download/route.ts  # GET /api/players/download (export)
│   │   ├── datatable/          # Data table page with search UI
│   │   ├── page.tsx            # Homepage
│   │   └── layout.tsx          # Root layout
│   └── db/
│       ├── schema.ts           # Database schema definitions
│       ├── index.ts            # Database connection
│       ├── migrate.ts          # Migration runner
│       ├── drop.ts             # Table drop utility
│       └── seed.ts             # Seeding from JSON
├── drizzle/                    # Generated migration files
├── hnl_igraci.json            # Source data for seeding
└── hnl_igraci.csv             # Alternative data format
```

### API Endpoints

**GET /api/players**
- Query params: `query` (search term), `filter` (field to search: all/ime/prezime/nacionalnost/pozicija/klub)
- Returns: JSON array of players with club names
- Used by: `/datatable` page for search functionality

**GET /api/players/download**
- Query params: `query`, `filter` (same as above), `format` (csv/json)
- Returns: File download (CSV or JSON)
- Used by: Download buttons on `/datatable` page

### Key Implementation Details

**Database Connection**: Uses `postgres` client with connection pooling. Database instance is created once in `app/src/db/index.ts` and imported throughout the app.

**Search Implementation**: Uses Drizzle's `ilike` operator for case-insensitive pattern matching. Supports filtering across multiple fields or a specific field.

**Data Seeding**: Reads from `app/hnl_igraci.json` which contains hierarchical data (clubs with nested players). The seeding script inserts clubs first, then associates players with their clubs via foreign key.

**Migrations**: Drizzle generates migration files in `app/drizzle/` based on schema changes. Migrations are applied via `npm run db:migrate`.

## Data Files

- **hnl_igraci.json**: Hierarchical format (clubs with nested players array) - used for seeding
- **hnl_igraci.csv**: Denormalized flat format (player rows with repeated club data)
- **dump.sql**: PostgreSQL dump file (project root)

## Important Notes

- The working directory structure has both root-level data files and `app/` subdirectory for Next.js
- Database scripts (migrate, seed, drop) must be run from the `app/` directory
- Docker Compose must be run from the project root
- All database operations require the `.env` file in `app/` directory with valid `DATABASE_URL`
- The seeding script expects `hnl_igraci.json` to be in the `app/` directory
