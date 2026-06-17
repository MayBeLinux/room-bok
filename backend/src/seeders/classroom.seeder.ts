// This file creates the initial classrooms to test the DB.

import { AppDataSource } from "../db/data-source";
import { Classroom } from "../entity/Classroom";
import { Floor } from "../entity/Floor";

export async function seedClassrooms() {
    const classroomRepository = AppDataSource.getRepository(Classroom);
    const floorRepository = AppDataSource.getRepository(Floor);

    const floors = await floorRepository.find({ relations: ["building"] });

    if (floors.length === 0) {
        console.warn("No floors found — skipping classroom seeding.");
        return;
    }

    const classroomNames = ["Salle 101", "Salle 102", "Salle 201", "Salle 202"];

    for (const floor of floors) {
        for (const name of classroomNames) {
            const existingClassroom = await classroomRepository.findOne({
                where: { nameRoom: name, floor: { id: floor.id } },
                relations: ["floor"],
            });
            if (existingClassroom) {
                console.log(`Classroom already exists: ${name} (floor ${floor.level})`);
            } else {
                const classroom = classroomRepository.create({
                    nameRoom: name,
                    floor,
                    maintenance: false,
                });
                await classroomRepository.save(classroom);
                console.log(`Classroom created: ${name} (floor ${floor.level})`);
            }
        }
    }
}
