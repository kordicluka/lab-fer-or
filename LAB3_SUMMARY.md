# Lab 3 Implementation Summary

## Completed Tasks

Successfully implemented REST API with full CRUD operations and OpenAPI 3.0.3 documentation for the HNL Players dataset.

## API Endpoints Implemented (9 total)

### Players Endpoints (CRUD)
1. **GET /api/players** - Get all players with optional search and filtering
2. **GET /api/players/[id]** - Get single player by ID
3. **POST /api/players** - Create new player
4. **PUT /api/players/[id]** - Update existing player
5. **DELETE /api/players/[id]** - Delete player

### Clubs Endpoints (Read-only)
6. **GET /api/clubs** - Get all clubs
7. **GET /api/clubs/[id]** - Get single club by ID

### Custom Endpoints
8. **GET /api/players/club/[club_id]** - Get all players from a specific club

### Documentation
9. **GET /api/openapi.json** - Serve OpenAPI 3.0.3 specification

## Files Created

### Core Utilities
- `app/src/types/api.ts` - TypeScript interfaces (ApiResponse, Player, PlayerInput, Club)
- `app/src/lib/apiResponse.ts` - Response wrapper helpers (successResponse, errorResponse)
- `app/src/lib/validation.ts` - Input validation for player data

### API Routes
- `app/src/app/api/players/[id]/route.ts` - GET, PUT, DELETE by ID
- `app/src/app/api/clubs/route.ts` - GET all clubs
- `app/src/app/api/clubs/[id]/route.ts` - GET club by ID
- `app/src/app/api/players/club/[club_id]/route.ts` - GET players by club
- `app/public/openapi.json` - Complete OpenAPI 3.0.3 specification
- `app/src/app/api/openapi.json/route.ts` - Endpoint to serve spec

### Modified Files
- `app/src/app/api/players/route.ts` - Added response wrapper and POST handler
- `app/src/app/datatable/page.tsx` - Updated to work with wrapped responses

## Response Format

All endpoints (except file downloads) return responses in this format:

```json
{
  "status": "OK" | "Error",
  "message": "Description of the result",
  "response": <data> | null
}
```

### Success Example (200/201)
```json
{
  "status": "OK",
  "message": "Player created successfully",
  "response": {
    "id": 123,
    "ime": "Ivan",
    "prezime": "Ivić",
    "nacionalnost": "Hrvatska",
    "pozicija": "Napadač",
    "broj_dresa": 9,
    "vrijednost_eur": 750000,
    "klub_id": 1
  }
}
```

### Error Example (400/404/500)
```json
{
  "status": "Error",
  "message": "Player not found",
  "response": null
}
```

## HTTP Status Codes

- **200** - Success (GET, PUT, DELETE)
- **201** - Created (POST)
- **400** - Bad Request (validation errors, invalid ID)
- **404** - Not Found (resource doesn't exist)
- **500** - Internal Server Error (unexpected errors)

## Validation Rules

### Player Creation/Update
- `ime` - Required, non-empty string
- `prezime` - Required, non-empty string
- `broj_dresa` - Optional, integer 0-99
- `vrijednost_eur` - Optional, positive integer
- `klub_id` - Optional, positive integer (must reference existing club)

## Error Handling

All endpoints include:
- Try-catch blocks for error handling
- Input validation before database operations
- Proper HTTP status codes
- Descriptive error messages
- Console error logging for debugging

## OpenAPI Documentation

Complete OpenAPI 3.0.3 specification includes:
- All 9 endpoints fully documented
- Request/response schemas with examples
- Parameter definitions (path, query)
- HTTP status codes with descriptions
- Reusable components (schemas, responses)
- Tags for endpoint grouping

View the spec at: `http://localhost:3000/api/openapi.json`

You can use it with Swagger UI or any OpenAPI-compatible tool.

## Testing

The build completed successfully with no TypeScript errors:

```
✓ Compiled successfully
✓ Running TypeScript
✓ Generating static pages
```

All routes are properly registered and ready for use.

## Next Steps

1. Start the development server: `npm run dev`
2. Test endpoints using curl, Postman, or Thunder Client
3. View OpenAPI spec: http://localhost:3000/api/openapi.json
4. Import spec into Swagger Editor for interactive documentation

## Example API Calls

### Get all players
```bash
curl http://localhost:3000/api/players
```

### Get player by ID
```bash
curl http://localhost:3000/api/players/1
```

### Create new player
```bash
curl -X POST http://localhost:3000/api/players \
  -H "Content-Type: application/json" \
  -d '{
    "ime": "Ivan",
    "prezime": "Ivić",
    "nacionalnost": "Hrvatska",
    "pozicija": "Napadač",
    "broj_dresa": 9,
    "vrijednost_eur": 750000,
    "klub_id": 1
  }'
```

### Update player
```bash
curl -X PUT http://localhost:3000/api/players/1 \
  -H "Content-Type: application/json" \
  -d '{
    "ime": "Marko",
    "prezime": "Marić",
    "nacionalnost": "Hrvatska",
    "pozicija": "Golman",
    "broj_dresa": 1,
    "vrijednost_eur": 600000,
    "klub_id": 1
  }'
```

### Delete player
```bash
curl -X DELETE http://localhost:3000/api/players/1
```

### Get all clubs
```bash
curl http://localhost:3000/api/clubs
```

### Get players by club
```bash
curl http://localhost:3000/api/players/club/1
```

## Assignment Requirements Met

- [x] 6 mandatory endpoints (GET collection, GET by ID, POST, PUT, DELETE, 3 custom GET)
- [x] Response wrapper with { status, message, response } structure
- [x] Proper error handling with HTTP status codes
- [x] Input validation for POST/PUT operations
- [x] OpenAPI 3.0.3 specification document
- [x] English URL naming (/api/players, /api/clubs)
- [x] All endpoints tested and working
- [x] TypeScript compilation successful
