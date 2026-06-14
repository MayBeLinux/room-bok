// This file creates the initial buildings and floors to test the DB.

import { AppDataSource } from "../db/data-source";
import { Building } from "../entity/Building";
import { Floor } from "../entity/Floor";

export async function seedBuildings() {
    const buildingRepository = AppDataSource.getRepository(Building);
    const floorRepository = AppDataSource.getRepository(Floor);

    const buildingsData = [
        { name: "Bâtiment A", floors: [0, 1, 2] },
        { name: "Bâtiment B", floors: [0, 1] },
        { name: "Bâtiment C", floors: [0, 1, 2, 3] },
    ];

    for (const buildingData of buildingsData) {
        const building = buildingRepository.create({ name: buildingData.name });
        await buildingRepository.save(building);
        console.log("Building created:", building.name);

        for (const level of buildingData.floors) {
            const floor = floorRepository.create({ level, building });
            await floorRepository.save(floor);
            console.log(`  Floor created: level ${level} in ${building.name}`);
        }
    }
}
