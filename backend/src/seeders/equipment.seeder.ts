// This file creates the initial equipments to test the DB.

import { AppDataSource } from "../db/data-source";
import { Equipment } from "../entity/Equipment";

export async function seedEquipments() {
    const equipmentRepository = AppDataSource.getRepository(Equipment);

    const equipmentsData = [
        { name: "Vidéoprojecteur" },
        { name: "Tableau blanc" },
        { name: "Ordinateur" },
        { name: "Imprimante" },
        { name: "Écran" },
    ];

    for (const equipmentData of equipmentsData) {
        const existingEquipment = await equipmentRepository.findOneBy({ name: equipmentData.name });
        if (existingEquipment) {
            console.log("Equipment already exists:", existingEquipment.name);
        } else {
            const equipment = equipmentRepository.create(equipmentData);
            await equipmentRepository.save(equipment);
            console.log("Equipment created:", equipment.name);
        }
    }
}
