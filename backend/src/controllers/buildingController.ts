// Building is a list of building name.
// ******************
// - name           *
// ******************
import { AppDataSource } from '../db/data-source';
import { Request , Response } from 'express';
import { Building } from '../entity/Building';

export const buildingController = {
    listBuildings: async (req: Request, res: Response) => {
        const buildings = await AppDataSource.getRepository(Building).find();
        res.json(buildings);
    }
}