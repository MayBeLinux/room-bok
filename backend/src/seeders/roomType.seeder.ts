// This file creates the initial room types to test the DB.

import { AppDataSource } from "../db/data-source";
import { RoomType } from "../entity/RoomType";

export async function seedRoomTypes() {
    const roomTypeRepository = AppDataSource.getRepository(RoomType);

    const roomTypesData = [
        { name: "classroom" },
        { name: "cafeteria" },
    ];

    for (const roomTypeData of roomTypesData) {
        const existingRoomType = await roomTypeRepository.findOneBy({ name: roomTypeData.name });
        if (existingRoomType) {
            console.log("Room type already exists:", existingRoomType.name);
        } else {
            const roomType = roomTypeRepository.create(roomTypeData);
            await roomTypeRepository.save(roomType);
            console.log("Room type created:", roomType.name);
        }
    }
}
