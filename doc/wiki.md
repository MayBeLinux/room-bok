# Specifications — Rooms Management (AFTEC)

## 1. Context

Following the construction of a new building, AFTEC wants to modernize the management of its meeting and teaching rooms. Each room may be equipped (videoprojector, interactive board, etc.).

Users must be able to:

- Browse available rooms
- Book a time slot
- Physically access the rooms

Doors are equipped with magnetic locks, unlocked via a digicode located in front of each door. The code is sent to the person who booked the room.

## 2. Goals

- **Internal** application for the school — users prefer a **dedicated desktop application** over a web application
- Database: **PostgreSQL or MariaDB** hosted in the school's technical room
- The IT department will provide username/password **after acceptance**
- The IT department wants a **planning** to prepare network infrastructure and provisioning
- The IT department **will not provide** a preproduction machine

Functional goals:

- Consistent data model (users, rooms, equipments, bookings)
- Clear interface for users and administrators

## 3. Expected Features

### 3.1 Authentication

- Account creation and modification
- Role management (user / administrator)
- Login via **JWT** token
- Logout
- Backend route protection
- **Hashed** passwords

### 3.2 User Management

- List of users with their role
- Create / update / delete

### 3.3 Room Management

Context: rooms spread across **two buildings**, **three floors**. Some courses may take place in other buildings. Some rooms have **removable partitions** allowing a duplex setup.

- Create and update rooms
- Manage **capacity** and **equipments**
- Ability to **temporarily disable** a room

### 3.4 Reservation Management

- Only authorized users (teachers, administration) can book
- **Confirmation email** after booking
- **4 hours before** the booking starts: an access code is sent (email or SMS), valid from **30 minutes before** to **30 minutes after** the reservation, then invalidated
- The code disables the magnetic lock; the door stays unlocked for the entire booking duration
- Minimum:
  - Booking by time slot
  - Conflict management
  - Booking history

### 3.5 Equipment Management

(Section present in the spec without additional details.)

### 3.6 Access Code Management

- Generation of a **unique temporary 4-digit code** per reservation
- Code lifecycle: issued 4h before, active 30 min before the booking, invalidated 30 min after

### 3.7 Logging

Every important action generates a log:

- Login
- Creation
- Deletion
- Reservation

Ideally in **CLF (Common Log Format)**, produced by a **middleware**, processable by ELK / Grafana.

### 3.8 Administration

- Global view of reservations
- Simple statistics (bookings per day / per room)
- Incident and maintenance management

## 4. Technical Constraints

- Language: **TypeScript**
- Database: **PostgreSQL** or **MariaDB**

## 5. Minimum Deliverables

AFTEC will be especially attentive to **clear and up-to-date documentation**.

- Planning
- Functional thin client with a graphical interface
- Database with tables and relations
- Documentation:
  - Conceptual and logical data schema (MCD/MLD)
  - Software architecture schema
  - User guide
  - Installation guide

## 6. Session 1 — 3h30 (preparation / design)

**Goal: do not code.**

- **UML / MCD** diagram
- Tables and **SQL schema**
- **Mockups**: login, dashboard, room list, booking
- **API documentation** (e.g. `POST /login`, `GET /rooms`, `POST /bookings`) with exchanged data and format

## 7. Following Sessions

- **Block 1** — Backend: auth, DB, REST API
- **Block 2** — Frontend: login, data display
- **Block 3** — Reservations + security
- **Block 4** — Finishing touches + tests

## 8. Grading (/20)

| Category             | Criteria                                                                   | Points |
| -------------------- | -------------------------------------------------------------------------- | ------ |
| **Design** /4        | Consistent MCD/UML (2), Mockups (1), API documentation (1)                 | 4      |
| **Backend** /6       | Clean architecture (2), Functional API (2), ORM / DB relations (2)         | 6      |
| **Frontend** /4      | Navigation (1), API communication (2), Usable interface (1)                | 4      |
| **Security** /4      | Secure authentication (2), Permissions management (1), Data validation (1) | 4      |
| **Quality / pro** /2 | Clean code (1), Git / organization / logs (1)                              | 2      |

**Bonus**: refresh token, logs, dashboard, filters, pagination, websocket, PDF/CSV export.
