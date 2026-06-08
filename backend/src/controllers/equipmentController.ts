// Equipment return a list of equipment.
// ******************
// - name           *
// ******************
import { AppDataSource } from '../db/data-source';
import { Request , Response } from 'express';
import { Equipment } from '../entity/Equipment';

export const equipmentController = {
    listEquipments: async (req: Request, res: Response) => {
        const equipments = await AppDataSource.getRepository(Equipment).find();
        res.json(equipments);
    }
}