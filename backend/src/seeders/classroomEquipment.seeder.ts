// This file creates the initial classroom/equipment associations to test the DB.

import { AppDataSource } from "../db/data-source";
import { ClassroomEquipment } from "../entity/ClassroomEquipment";
import { Classroom } from "../entity/Classroom";
import { Equipment } from "../entity/Equipment";

export async function seedClassroomEquipments() {
    const classroomEquipmentRepository = AppDataSource.getRepository(ClassroomEquipment);
    const classroomRepository = AppDataSource.getRepository(Classroom);
    const equipmentRepository = AppDataSource.getRepository(Equipment);

    const classrooms = await classroomRepository.find();
    const equipments = await equipmentRepository.find();

    if (classrooms.length === 0 || equipments.length === 0) {
        console.warn("No classrooms or equipments found — skipping classroom_equipment seeding.");
        return;
    }

    const now = new Date();

    for (const classroom of classrooms) {
        for (let i = 0; i < equipments.length; i++) {
            const equipment = equipments[i];
            const existingCE = await classroomEquipmentRepository.findOneBy({
                idClassroom: classroom.id,
                idEquipment: equipment.id,
            });
            if (existingCE) {
                console.log(
                    `ClassroomEquipment already exists: ${equipment.name} in ${classroom.nameRoom}`,
                );
            } else {
                const ce = classroomEquipmentRepository.create({
                    idClassroom: classroom.id,
                    idEquipment: equipment.id,
                    classroom,
                    equipment,
                    startedAt: now,
                    endedAt: null,
                    quantity: 1 + (i % 3),
                });
                await classroomEquipmentRepository.save(ce);
                console.log(
                    `ClassroomEquipment created: ${equipment.name} x${ce.quantity} in ${classroom.nameRoom}`,
                );
            }
        }
    }
}
