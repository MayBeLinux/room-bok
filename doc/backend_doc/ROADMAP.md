# Roadmap Backend — Rooms Management

Suivi des étapes pour finaliser le backend avant de basculer sur le frontend.
Coche les cases au fur et à mesure pour visualiser l'avancement.

---

## Phase 1 — Compléter le CRUD

Pour chaque ressource: ajouter `create`, `read (one)`, `update`, `delete` en plus du `list` déjà en place. Brancher les routes correspondantes (`POST`, `GET /:id`, `PATCH /:id`, `DELETE /:id`).

- [X] Booking
- [X] Building
- [X] Floor
- [X] Classroom
- [X] Equipment
- [X] ClassroomEquipment
- [X] Role
- [X] User

## Phase 2 — Validation des entrées avec Zod

Créer un DTO par ressource dans `dto/` et un middleware générique `validate(schema)` pour parser `req.body` / `req.params`.

- [ ] Middleware générique `validate(schema)`
- [ ] DTO Booking
- [ ] DTO Building
- [ ] DTO Floor
- [ ] DTO Classroom
- [ ] DTO Equipment
- [ ] DTO ClassroomEquipment
- [ ] DTO Role
- [ ] DTO User

## Phase 3 — Couche service

Sortir la logique métier des controllers vers `services/`. Le controller ne fait que: valider → appeler service → répondre.

- [ ] Service Booking (avec check de chevauchement de créneaux)
- [ ] Service Building
- [ ] Service Floor
- [ ] Service Classroom
- [ ] Service Equipment
- [ ] Service ClassroomEquipment
- [ ] Service Role
- [ ] Service User

## Phase 4 — Authentification & autorisation

- [ ] Endpoint `POST /auth/register` (hash bcrypt)
- [ ] Endpoint `POST /auth/login` (génération JWT)
- [ ] Middleware `authenticate` (vérifie le token)
- [ ] Middleware `authorize(roles)` (basé sur l'entité `Role`)
- [ ] Appliquer les middlewares aux routes sensibles

## Phase 5 — Gestion d'erreurs centralisée

- [ ] Classes d'erreurs typées (`NotFoundError`, `ForbiddenError`, `ValidationError`)
- [ ] Middleware d'erreur Express en bout de chaîne
- [ ] Remplacer les `try/catch` ad hoc des controllers

## Phase 6 — Seeders

Peupler la base avec des données de test cohérentes.

- [X] Seed des rôles
- [X] Seed des bâtiments et étages
- [X] Seed des salles et équipements
- [X] Seed des utilisateurs de test
- [X] Seed de quelques bookings d'exemple

## Phase 7 — Préparation au frontend

- [ ] Documentation API (OpenAPI/Swagger ou `API.md` à jour)
- [ ] Types partagés exportables (réutilisables par le frontend Vue + TS)
- [ ] Vérification CORS et variables d'environnement
