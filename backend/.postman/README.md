# Postman collection — rooms-management

Tests for all backend routes.

## Files

- `rooms-management.postman_collection.json` — the collection (all routes grouped by resource)
- `rooms-management.postman_environment.json` — the local environment (`baseUrl`, `token`, ids…)

## Import into Postman

1. Open Postman → **Import** → drop the 2 files.
2. In the top-right, select the **Rooms Management - Local** environment.
3. Start the backend: `npm run dev` (port `3000` by default, prefix `/api`).

## Suggested workflow

The `Create *` requests store the returned `id` into a collection variable (`roleId`, `buildingId`, etc.), so run them in this order so everything chains correctly:

1. **Roles → Create role** (fills `roleId`)
2. **Auth → Register** then **Auth → Login** (Login stores `token` automatically)
3. **Buildings → Create building** (fills `buildingId`)
4. **Floors → Create floor** (uses `buildingId`)
5. **Rooms → Create room** (uses `floorId`)
6. **Equipments → Create equipment** (fills `equipmentId`)
7. **Classroom Equipments → Create** (uses `roomId` + `equipmentId`)
8. **Users → Create user** (fills `userId`)
9. **Bookings → Create booking** (uses `userId` + `roomId`)

After that, the `Get / Update / Delete` requests reuse the ids already stored.

## Variables

| Variable      | Default                    | Notes                                       |
|---------------|----------------------------|---------------------------------------------|
| `baseUrl`     | `http://localhost:3000/api`| Update if you change `PORT` / `API_PREFIX`  |
| `token`       | _(empty)_                  | Filled automatically by `Login`             |
| `roleId` …    | `1`                        | Overwritten by the `Create *` requests      |
