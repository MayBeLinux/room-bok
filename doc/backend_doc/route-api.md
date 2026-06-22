# Introduction

This document allows to explain you, and to give you the different ```route``` in the backend project. Please update it when you have a new ```route```.

To add a new ```route``` please insert the (Method, URI, Data Send, Data Receive, Status Code, Why).

---

## HTTP Verbs (CRUD)

REST uses HTTP verbs to express the **action** performed on a resource. Each verb maps to a CRUD operation:

| Verb       | CRUD     | Purpose                                            | Idempotent ? | Body in request ? |
| ---------- | -------- | -------------------------------------------------- | ------------ | ----------------- |
| **GET**    | Read     | Retrieve a resource or a list of resources         | Yes          | No                |
| **POST**   | Create   | Create a new resource                              | No           | Yes               |
| **PUT**    | Update   | Replace an existing resource entirely              | Yes          | Yes               |
| **PATCH**  | Update   | Partially modify an existing resource              | No           | Yes               |
| **DELETE** | Delete   | Remove a resource                                  | Yes          | No (usually)      |

> **Idempotent** = calling the same request several times produces the same result on the server. `POST` is not idempotent because it creates a new resource each time.

### Examples

| Verb     | URI                | Purpose                              |
| -------- | ------------------ | ------------------------------------ |
| `GET`    | `/api/rooms`       | List all rooms                       |
| `GET`    | `/api/rooms/:id`   | Get one room by its id               |
| `POST`   | `/api/rooms`       | Create a new room                    |
| `PUT`    | `/api/rooms/:id`   | Replace the whole room               |
| `PATCH`  | `/api/rooms/:id`   | Update some fields of the room       |
| `DELETE` | `/api/rooms/:id`   | Delete the room                      |

> **Plural convention** — collection URIs are always plural (`/api/users`, `/api/rooms`), even when the operation targets a single resource (`/api/users/:id`). The route never switches between `/api/user` and `/api/users` depending on the verb.

---

## HTTP Response Status Codes

The server **always** replies with a status code. It tells the client whether the request succeeded, failed, and why.

### 2xx — Success

| Code | Name       | When to use                                                     |
| ---- | ---------- | --------------------------------------------------------------- |
| 200  | OK         | Request succeeded (typical for `GET`, `PUT`, `PATCH`)           |
| 201  | Created    | A new resource has been created (typical for `POST`)            |
| 204  | No Content | Success but no body returned (typical for `DELETE`)             |

### 4xx — Client error (the request is wrong)

| Code | Name         | When to use                                                                  |
| ---- | ------------ | ---------------------------------------------------------------------------- |
| 400  | Bad Request  | The body or query params are invalid (validation failed)                     |
| 401  | Unauthorized | No token provided, or token is invalid / expired                             |
| 403  | Forbidden    | The user is authenticated but does not have the rights for this action       |
| 404  | Not Found    | The resource does not exist (`/api/rooms/9999`)                              |
| 409  | Conflict     | The request conflicts with the current state (e.g. duplicate email)          |

### 5xx — Server error (the server failed)

| Code | Name                  | When to use                                                       |
| ---- | --------------------- | ----------------------------------------------------------------- |
| 500  | Internal Server Error | Unexpected error on the server (uncaught exception, DB down, etc.) |

---

## Routes

Only routes that are actually wired in `src/routes/` and exposed by `src/app.ts` are listed below. Bodies match the Zod DTOs in `src/dto/`. All routes are mounted under the `API_PREFIX` env variable (default: `/api`).

| Method | URI | data send | data receive | status code | why ? |
| ------ | --- | --------- | ------------ | ----------- | ----- |
| | **AUTH** | --- | --- | --- | --- |
| POST | /api/auth/register | `{ first_name?: string, last_name?: string, email: string, password: string, role_id: number }` | `{ token: string, user: UserResponse }` | 201 / 400 / 409 | Register a new user and return a JWT |
| POST | /api/auth/login | `{ email: string, password: string }` | `{ token: string, user: UserResponse }` | 200 / 400 / 401 | Authenticate and return a JWT |
| | **BOOKINGS** | --- | --- | --- | --- |
| GET | /api/bookings | `none` | `Booking[]` | 200 | List bookings |
| GET | /api/bookings/:id | `none` | `Booking` | 200 / 400 / 404 | Get one booking by id |
| POST | /api/bookings | `{ user_id: number, classroom_id: number, started_at: Date, ended_at: Date }` | `Booking` | 201 / 400 | Create a booking (`ended_at` must be after `started_at`) |
| PUT | /api/bookings/:id | `{ user_id?: number, classroom_id?: number, started_at?: Date, ended_at?: Date }` | `{ affected: number }` | 200 / 400 / 404 | Update a booking |
| DELETE | /api/bookings/:id | `none` | `none` | 204 / 400 / 404 | Delete a booking |
| | **BUILDINGS** | --- | --- | --- | --- |
| GET | /api/buildings | `none` | `Building[]` | 200 | List buildings |
| GET | /api/buildings/:id | `none` | `Building` | 200 / 400 / 404 | Get one building by id |
| POST | /api/buildings | `{ name: string }` | `Building` | 201 / 400 | Create a building |
| PUT | /api/buildings/:id | `{ name?: string }` | `{ affected: number }` | 200 / 400 / 404 | Update a building |
| DELETE | /api/buildings/:id | `none` | `none` | 204 / 400 / 404 | Delete a building |
| | **EQUIPMENTS** | --- | --- | --- | --- |
| GET | /api/equipments | `none` | `Equipment[]` | 200 | List equipments |
| GET | /api/equipments/:id | `none` | `Equipment` | 200 / 400 / 404 | Get one equipment by id |
| POST | /api/equipments | `{ name: string }` | `Equipment` | 201 / 400 | Create an equipment |
| PUT | /api/equipments/:id | `{ name?: string }` | `{ affected: number }` | 200 / 400 / 404 | Update an equipment |
| DELETE | /api/equipments/:id | `none` | `none` | 204 / 400 / 404 | Delete an equipment |
| | **FLOORS** | --- | --- | --- | --- |
| GET | /api/floors | `none` | `Floor[]` | 200 | List floors |
| GET | /api/floors/:id | `none` | `Floor` | 200 / 400 / 404 | Get one floor by id |
| POST | /api/floors | `{ level: number, building_id: number }` | `Floor` | 201 / 400 | Create a floor |
| PUT | /api/floors/:id | `{ level?: number, building_id?: number }` | `{ affected: number }` | 200 / 400 / 404 | Update a floor |
| DELETE | /api/floors/:id | `none` | `none` | 204 / 400 / 404 | Delete a floor |
| | **ROLES** | --- | --- | --- | --- |
| GET | /api/roles | `none` | `Role[]` | 200 | List roles |
| GET | /api/roles/:id | `none` | `Role` | 200 / 400 / 404 | Get one role by id |
| POST | /api/roles | `{ name: string }` | `Role` | 201 / 400 | Create a role |
| PUT | /api/roles/:id | `{ name?: string }` | `{ affected: number }` | 200 / 400 / 404 | Update a role |
| DELETE | /api/roles/:id | `none` | `none` | 204 / 400 / 404 | Delete a role |
| | **ROOMS (Classroom)** | --- | --- | --- | --- |
| GET | /api/rooms | `none` | `Classroom[]` | 200 | List rooms |
| GET | /api/rooms/:id | `none` | `Classroom` | 200 / 400 / 404 | Get one room by id |
| POST | /api/rooms | `{ name_room: string, floor_id: number, maintenance?: boolean }` | `Classroom` | 201 / 400 | Create a room |
| PUT | /api/rooms/:id | `{ name_room?: string, floor_id?: number, maintenance?: boolean }` | `{ affected: number }` | 200 / 400 / 404 | Update a room |
| DELETE | /api/rooms/:id | `none` | `none` | 204 / 400 / 404 | Delete a room |
| | **CLASSROOM-EQUIPMENTS** | --- | --- | --- | --- |
| GET | /api/classroom-equipments | `none` | `ClassroomEquipment[]` | 200 | List classroom ↔ equipment links |
| GET | /api/classroom-equipments/:idClassroom/:idEquipment | `none` | `ClassroomEquipment` | 200 / 400 / 404 | Get one classroom ↔ equipment link |
| POST | /api/classroom-equipments | `{ id_classroom: number, id_equipment: number, started_at?: Date, ended_at?: Date, quantity?: number }` | `ClassroomEquipment` | 201 / 400 | Link an equipment to a classroom |
| PUT | /api/classroom-equipments/:idClassroom/:idEquipment | `{ started_at?: Date, ended_at?: Date, quantity?: number }` | `{ affected: number }` | 200 / 400 / 404 | Update a classroom ↔ equipment link |
| DELETE | /api/classroom-equipments/:idClassroom/:idEquipment | `none` | `none` | 204 / 400 / 404 | Unlink an equipment from a classroom |
| | **USERS** | --- | --- | --- | --- |
| GET | /api/users | `none` | `UserResponse[]` | 200 | List users (password stripped from the response) |
| GET | /api/users/:id | `none` | `UserResponse` | 200 / 400 / 404 | Get one user by id |
| POST | /api/users | `{ first_name?: string, last_name?: string, email: string, password: string, role_id: number }` | `UserResponse` | 201 / 400 | Create a user (password hashed before save) |
| PUT | /api/users/:id | `{ first_name?: string, last_name?: string, email?: string, password?: string, role_id?: number }` | `{ affected: number }` | 200 / 400 / 404 | Update a user |
| DELETE | /api/users/:id | `none` | `none` | 204 / 400 / 404 | Delete a user |

> The `data send` column is the request **body** (or `none` for `GET` / `DELETE`). The `data receive` column is the response **body** shape. `400` is returned whenever Zod validation of the body or `:id` URL param fails.

### Authentication

- `POST /api/auth/register` and `POST /api/auth/login` return a JWT signed with `JWT_SECRET` (TTL = `JWT_EXPIRES_IN`, default `1d`).
- Authenticated routes will expect the token in the `Authorization: Bearer <token>` header once the auth middleware is wired in on protected resources.

### Response shapes — quick reference

```ts
// UserResponse — what the API returns whenever a user is exposed
type UserResponse = {
  id: number;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  role?: Role;
};

// Generic "affected rows" payload used by PUT routes
type UpdateResult = { affected: number };
```

### Adding a new route

When you add a route, append a row to the table above with: **Method, URI, data send, data receive, status code, why**. Keep entries grouped by resource and ordered by `GET` → `POST` → `PUT` → `DELETE`.
