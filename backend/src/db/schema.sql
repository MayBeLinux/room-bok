CREATE SCHEMA IF NOT EXISTS "public";

CREATE TABLE "public"."building" (
    "id" serial NOT NULL,
    "name" varchar(100),
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."floor" (
    "id" serial NOT NULL,
    "level" int,
    "id_building" int,
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."classroom" (
    "id" serial NOT NULL,
    "name_room" varchar(100),
    "id_floor" int,
    "maintenance" boolean,
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."equipment" (
    "id" serial NOT NULL,
    "name" text,
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."classroom_equipment" (
    "id_classroom" int NOT NULL,
    "id_equipment" int NOT NULL,
    "started_at" timestamp,
    "ended_at" timestamp,
    "quantity" int,
    PRIMARY KEY ("id_classroom", "id_equipment")
);

CREATE TABLE "public"."role" (
    "id" serial NOT NULL,
    "name" varchar(50) UNIQUE,
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."user" (
    "id" serial NOT NULL,
    "first_name" varchar(100),
    "last_name" varchar(100),
    "email" varchar(255) UNIQUE,
    "password" varchar(255),
    "role_id" int,
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."booking" (
    "id" serial NOT NULL,
    "user_id" int,
    "classroom_id" int,
    "started_at" timestamp,
    "ended_at" timestamp,
    PRIMARY KEY ("id")
);

ALTER TABLE "public"."floor"
    ADD CONSTRAINT "fk_floor_building" FOREIGN KEY ("id_building") REFERENCES "public"."building"("id");

ALTER TABLE "public"."classroom"
    ADD CONSTRAINT "fk_classroom_floor" FOREIGN KEY ("id_floor") REFERENCES "public"."floor"("id");

ALTER TABLE "public"."classroom_equipment"
    ADD CONSTRAINT "fk_classroom_equipment_classroom" FOREIGN KEY ("id_classroom") REFERENCES "public"."classroom"("id");

ALTER TABLE "public"."classroom_equipment"
    ADD CONSTRAINT "fk_classroom_equipment_equipment" FOREIGN KEY ("id_equipment") REFERENCES "public"."equipment"("id");

ALTER TABLE "public"."user"
    ADD CONSTRAINT "fk_user_role" FOREIGN KEY ("role_id") REFERENCES "public"."role"("id");

ALTER TABLE "public"."booking"
    ADD CONSTRAINT "fk_booking_user" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id");

ALTER TABLE "public"."booking"
    ADD CONSTRAINT "fk_booking_classroom" FOREIGN KEY ("classroom_id") REFERENCES "public"."classroom"("id");
