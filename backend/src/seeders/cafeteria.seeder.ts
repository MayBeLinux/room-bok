// This file creates one cafeteria on the ground floor of each building to test the DB.

import { AppDataSource } from "../db/data-source";
import { Building } from "../entity/Building";
import { Cafeteria } from "../entity/Cafeteria";
import { Classroom } from "../entity/Classroom";
import { RoomType } from "../entity/RoomType";

export async function seedCafeterias() {
    const buildingRepository = AppDataSource.getRepository(Building);
    const classroomRepository = AppDataSource.getRepository(Classroom);
    const cafeteriaRepository = AppDataSource.getRepository(Cafeteria);
    const roomTypeRepository = AppDataSource.getRepository(RoomType);

    const cafeteriaType = await roomTypeRepository.findOneBy({ name: "cafeteria" });
    if (!cafeteriaType) {
        console.warn("No 'cafeteria' room type found — skipping cafeteria seeding.");
        return;
    }

    const cafeteriasData = [
        { building: "Bâtiment A", capacity: 120, openingTime: "07:30:00", closingTime: "15:00:00" },
        { building: "Bâtiment B", capacity: 60, openingTime: "11:30:00", closingTime: "14:00:00" },
        { building: "Bâtiment C", capacity: 80, openingTime: "11:00:00", closingTime: "14:30:00" },
    ];

    for (const cafeteriaData of cafeteriasData) {
        const building = await buildingRepository.findOne({
            where: { name: cafeteriaData.building },
            relations: ["floors"],
        });
        const groundFloor = building?.floors.find((floor) => floor.level === 0);
        if (!building || !groundFloor) {
            console.warn(`No ground floor found for ${cafeteriaData.building} — skipping.`);
            continue;
        }

        const name = `Cafétéria ${building.name}`;
        let classroom = await classroomRepository.findOne({
            where: { nameRoom: name, floor: { id: groundFloor.id } },
            relations: ["floor"],
        });
        if (classroom) {
            console.log("Cafeteria room already exists:", name);
        } else {
            classroom = classroomRepository.create({
                nameRoom: name,
                floor: groundFloor,
                roomType: cafeteriaType,
                maintenance: false,
            });
            await classroomRepository.save(classroom);
            console.log("Cafeteria room created:", name);
        }

        const existingCafeteria = await cafeteriaRepository.findOne({
            where: { classroom: { id: classroom.id } },
            relations: ["classroom"],
        });
        if (existingCafeteria) {
            console.log("  Cafeteria details already exist:", name);
        } else {
            const cafeteria = cafeteriaRepository.create({
                classroom,
                capacity: cafeteriaData.capacity,
                openingTime: cafeteriaData.openingTime,
                closingTime: cafeteriaData.closingTime,
            });
            await cafeteriaRepository.save(cafeteria);
            console.log(`  Cafeteria details created: ${name} (${cafeteriaData.capacity} places)`);
        }
    }
}
