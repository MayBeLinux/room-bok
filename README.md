# Rooms Management

![Logo](assets/rb-logo.svg)

## Introduction

This project allows to do some reservations of room inside the school.

The purpose is to have a correct UI/UX to see what room are currently book and to make quickly and easily a reservation.

### Backend Structure

![Backend structure](assets/backend-structure.svg)

### Stack Technique

The stack are describe in two different parts:

- Frontend
- Backend

#### Frontend

| Language   | Why ?                                                              |
| ---------- | ------------------------------------------------------------------ |
| Typescript | Use for the conception of the frontend                             |
| React      | Framework able to create component and organize for each page view |
| Vite       | Development server fast for the compilation and optimize           |

#### Backend

| Language   | Why ?                                                          |
| ---------- | -------------------------------------------------------------- |
| Typescript | Allows to create all the backend logic                         |
| ORM        | Library use to make SQL request, without to write manually SQL |

#### Third software

| Tool     | Why ?                                       |
| -------- | ------------------------------------------- |
| Postmann | To test different http verb for the backend |

#### Base De Donnée

Use of "Supabase" with PostgreSQL.

#### Sketchup

Sketchup is to create the 2D school diagram.

#### Figma

Figma for the modeling UI/UX and to create and iterate for each component.

And to export to SVG extension file the plan of the school.

### Log Format

Is the log format expected **CLF Common Log Format**.

Some tools are available to fetch the date **Grafana & ELK** who allows to do some graphical chart from the data.

## RoadMAP

- [ ] Conception (MCD / UML)
- [ ] Documentation (Style Guide / Postmann)
- [ ] Backend (Architecture / ORM Relation BDD / API REST)
- [ ] Frontend (Communication / Navigation / Interfacage)
- [ ] Reservation + Security (Authentification / Users Access etc.)
