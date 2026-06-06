// Floor is the list to iterate on the number of floors inside a building.
// ******************
// - Id
// - Level
// - Id_Building
// ******************
import { AppDataSource } from '../db/data-source';
import { Request , Response } from 'express';
import { Floor } from '../entity/Floor';

export const floorController = {
    listFloors: async (req: Request, res: Response) => {
        const floors = await AppDataSource.getRepository(Floor).find();
        res.json(floors);
    }
}