## Introduction

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

| Method | URI                                              | data send                                                                                   | data receive                                                                                            | status code | why ?                                              |
| ------ | ------------------------------------------------ | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------- |
|        | **BUILDINGS**                                    | -----------                                                                                 | -----------                                                                                             | ----------- | -------------------------------------------        |
| GET    | /api/buildings                                   | `none`                                                                                      | `[{ id: number, name: string, floors: Floor[] }]`                                                       | 200         | Receive the list of buildings                      |
| GET    | /api/buildings/:id                               | `none`                                                                                      | `{ id: number, name: string, floors: Floor[] }`                                                         | 200 / 404   | Receive one building by id                         |
| POST   | /api/buildings                                   | `{ name: string }`                                                                          | `{ id: number, name: string }`                                                                          | 201 / 400   | Create a new building                              |
| PUT    | /api/buildings/:id                               | `{ name: string }`                                                                          | `{ id: number, name: string }`                                                                          | 200 / 404   | Replace a building                                 |
| PATCH  | /api/buildings/:id                               | `{ name?: string }`                                                                         | `{ id: number, name: string }`                                                                          | 200 / 404   | Partially update a building                        |
| DELETE | /api/buildings/:id                               | `none`                                                                                      | `none`                                                                                                  | 204 / 404   | Delete a building                                  |
|        | **FLOORS**                                       | -----------                                                                                 | -----------                                                                                             | ----------- | -------------------------------------------        |
| GET    | /api/floors                                      | `none`                                                                                      | `[{ id: number, level: number, building: Building }]`                                                   | 200         | Receive the list of floors                         |
| GET    | /api/floors/:id                                  | `none`                                                                                      | `{ id: number, level: number, building: Building }`                                                     | 200 / 404   | Receive one floor by id                            |
| POST   | /api/floors                                      | `{ level: number, idBuilding: number }`                                                     | `{ id: number, level: number, building: Building }`                                                     | 201 / 400   | Create a new floor                                 |
| PUT    | /api/floors/:id                                  | `{ level: number, idBuilding: number }`                                                     | `{ id: number, level: number, building: Building }`                                                     | 200 / 404   | Replace a floor                                    |
| PATCH  | /api/floors/:id                                  | `{ level?: number, idBuilding?: number }`                                                   | `{ id: number, level: number, building: Building }`                                                     | 200 / 404   | Partially update a floor                           |
| DELETE | /api/floors/:id                                  | `none`                                                                                      | `none`                                                                                                  | 204 / 404   | Delete a floor                                     |
|        | **ROOMS**                                        | -----------                                                                                 | -----------                                                                                             | ----------- | -------------------------------------------        |
| GET    | /api/rooms                                       | `none`                                                                                      | `[{ id: number, nameRoom: string, maintenance: boolean, floor: Floor }]`                                | 200         | Receive the list of rooms                          |
| GET    | /api/rooms/:id                                   | `none`                                                                                      | `{ id: number, nameRoom: string, maintenance: boolean, floor: Floor }`                                  | 200 / 404   | Receive one room by id                             |
| POST   | /api/rooms                                       | `{ nameRoom: string, idFloor: number, maintenance?: boolean }`                              | `{ id: number, nameRoom: string, maintenance: boolean, floor: Floor }`                                  | 201 / 400   | Create a new room                                  |
| PUT    | /api/rooms/:id                                   | `{ nameRoom: string, idFloor: number, maintenance: boolean }`                               | `{ id: number, nameRoom: string, maintenance: boolean, floor: Floor }`                                  | 200 / 404   | Replace a room                                     |
| PATCH  | /api/rooms/:id                                   | `{ nameRoom?: string, idFloor?: number, maintenance?: boolean }`                            | `{ id: number, nameRoom: string, maintenance: boolean, floor: Floor }`                                  | 200 / 404   | Partially update a room                            |
| DELETE | /api/rooms/:id                                   | `none`                                                                                      | `none`                                                                                                  | 204 / 404   | Delete a room                                      |
|        | **EQUIPMENTS**                                   | -----------                                                                                 | -----------                                                                                             | ----------- | -------------------------------------------        |
| GET    | /api/equipments                                  | `none`                                                                                      | `[{ id: number, name: string }]`                                                                        | 200         | Receive the list of equipments                     |
| GET    | /api/equipments/:id                              | `none`                                                                                      | `{ id: number, name: string }`                                                                          | 200 / 404   | Receive one equipment by id                        |
| POST   | /api/equipments                                  | `{ name: string }`                                                                          | `{ id: number, name: string }`                                                                          | 201 / 400   | Create a new equipment                             |
| PUT    | /api/equipments/:id                              | `{ name: string }`                                                                          | `{ id: number, name: string }`                                                                          | 200 / 404   | Replace an equipment                               |
| PATCH  | /api/equipments/:id                              | `{ name?: string }`                                                                         | `{ id: number, name: string }`                                                                          | 200 / 404   | Partially update an equipment                      |
| DELETE | /api/equipments/:id                              | `none`                                                                                      | `none`                                                                                                  | 204 / 404   | Delete an equipment                                |
|        | **CLASSROOM-EQUIPMENTS**                         | -----------                                                                                 | -----------                                                                                             | ----------- | -------------------------------------------        |
| GET    | /api/classroom-equipments                        | `none`                                                                                      | `[{ idClassroom: number, idEquipment: number, quantity: number, startedAt: Date, endedAt: Date }]`      | 200         | Receive the list of equipments inside a classroom  |
| GET    | /api/classroom-equipments/:idClassroom/:idEquip  | `none`                                                                                      | `{ idClassroom: number, idEquipment: number, quantity: number, startedAt: Date, endedAt: Date }`        | 200 / 404   | Receive one classroom-equipment link               |
| POST   | /api/classroom-equipments                        | `{ idClassroom: number, idEquipment: number, quantity: number, startedAt: Date, endedAt: Date }` | `{ idClassroom: number, idEquipment: number, quantity: number, startedAt: Date, endedAt: Date }`   | 201 / 400   | Link an equipment to a classroom                   |
| PATCH  | /api/classroom-equipments/:idClassroom/:idEquip  | `{ quantity?: number, startedAt?: Date, endedAt?: Date }`                                   | `{ idClassroom: number, idEquipment: number, quantity: number, startedAt: Date, endedAt: Date }`        | 200 / 404   | Update an equipment-classroom link                 |
| DELETE | /api/classroom-equipments/:idClassroom/:idEquip  | `none`                                                                                      | `none`                                                                                                  | 204 / 404   | Unlink an equipment from a classroom               |
|        | **BOOKINGS**                                     | -----------                                                                                 | -----------                                                                                             | ----------- | -------------------------------------------        |
| GET    | /api/bookings                                    | `none`                                                                                      | `[{ id: number, user: User, classroom: Classroom, startedAt: Date, endedAt: Date }]`                    | 200         | Receive the list of the reservations               |
| GET    | /api/bookings/:id                                | `none`                                                                                      | `{ id: number, user: User, classroom: Classroom, startedAt: Date, endedAt: Date }`                      | 200 / 404   | Receive one booking by id                          |
| POST   | /api/bookings                                    | `{ userId: number, classroomId: number, startedAt: Date, endedAt: Date }`                   | `{ id: number, user: User, classroom: Classroom, startedAt: Date, endedAt: Date }`                      | 201 / 400 / 409 | Create a new booking (409 if slot conflict)    |
| PUT    | /api/bookings/:id                                | `{ userId: number, classroomId: number, startedAt: Date, endedAt: Date }`                   | `{ id: number, user: User, classroom: Classroom, startedAt: Date, endedAt: Date }`                      | 200 / 404   | Replace a booking                                  |
| PATCH  | /api/bookings/:id                                | `{ classroomId?: number, startedAt?: Date, endedAt?: Date }`                                | `{ id: number, user: User, classroom: Classroom, startedAt: Date, endedAt: Date }`                      | 200 / 404   | Partially update a booking                         |
| DELETE | /api/bookings/:id                                | `none`                                                                                      | `none`                                                                                                  | 204 / 404   | Cancel/delete a booking                            |
|        | **USERS**                                        | -----------                                                                                 | --------------                                                                                          | ----------- | -------------------------------------------        |
| GET    | /api/users                                       | `none`                                                                                      | `[{ id: number, firstName: string, lastName: string, email: string, role: Role }]`                      | 200         | Receive the list of users                          |
| GET    | /api/users/:id                                   | `none`                                                                                      | `{ id: number, firstName: string, lastName: string, email: string, role: Role }`                        | 200 / 404   | Receive one user by id                             |
| POST   | /api/users                                       | `{ firstName: string, lastName: string, email: string, password: string, roleId: number }`  | `{ id: number, firstName: string, lastName: string, email: string, role: Role }`                        | 201 / 400 / 409 | Create a new user (409 if email already used)  |
| PUT    | /api/users/:id                                   | `{ firstName: string, lastName: string, email: string, roleId: number }`                    | `{ id: number, firstName: string, lastName: string, email: string, role: Role }`                        | 200 / 404   | Replace a user                                     |
| PATCH  | /api/users/:id                                   | `{ firstName?: string, lastName?: string, email?: string, roleId?: number }`                | `{ id: number, firstName: string, lastName: string, email: string, role: Role }`                        | 200 / 404   | Partially update a user                            |
| DELETE | /api/users/:id                                   | `none`                                                                                      | `none`                                                                                                  | 204 / 404   | Delete a user                                      |
|        | **ROLES**                                        | -----------                                                                                 | --------------                                                                                          | ----------- | -------------------------------------------        |
| GET    | /api/roles                                       | `none`                                                                                      | `[{ id: number, name: string }]`                                                                        | 200         | Return the list of available roles                 |
| GET    | /api/roles/:id                                   | `none`                                                                                      | `{ id: number, name: string }`                                                                          | 200 / 404   | Receive one role by id                             |
| POST   | /api/roles                                       | `{ name: string }`                                                                          | `{ id: number, name: string }`                                                                          | 201 / 400   | Create a new role                                  |
| PUT    | /api/roles/:id                                   | `{ name: string }`                                                                          | `{ id: number, name: string }`                                                                          | 200 / 404   | Replace a role                                     |
| PATCH  | /api/roles/:id                                   | `{ name?: string }`                                                                         | `{ id: number, name: string }`                                                                          | 200 / 404   | Partially update a role                            |
| DELETE | /api/roles/:id                                   | `none`                                                                                      | `none`                                                                                                  | 204 / 404   | Delete a role                                      |

> The column `data send` describes the request **body** (or `none` for GET / DELETE). The column `data receive` describes the response **body** shape returned by the API.

| Method | URI                       | data send ? | data receive ? | why ?                                             |
| ------ | ------------------------- | ----------- | -------------- | ------------------------------------------------- |
|        | **INFORMATIONS**          | ---         | ---            | ---                                               |
| GET    | /api/buildings            | `nothing`   | `json file`    | Receive the list of buildings                     |
| GET    | /api/rooms                | `nothing`   | `json file`    | Receive the list of rooms                         |
| GET    | /api/equipments           | `nothing`   | `json file`    | Receive the list of equipments                    |
| GET    | /api/floors               | `nothing`   | `json file`    | Receive the list of floors                        |
| GET    | /api/bookings             | `nothing`   | `json file`    | Receive the list of the reservation               |
| GET    | /api/users                | `nothing`   | `json file`    | Receive the list of User                          |
| GET    | /api/classroom-equipments | `nothing`   | `json file`    | Receive the list of equipments inside a classroom |
|        | **USERS**                 | ---         | ---            | ---                                               |
| GET    | /api/roles                | `nothing`   | `json file`    | Return the list of the role possible              |
