// Building is a list of building name.
// ******************
// - name           *
// ******************
import { AppDataSource } from '../db/data-source';
import { Request , Response } from 'express';
import { Building } from '../entity/Building';

const buildingRepository = AppDataSource.getRepository(Building)

export const buildingController = {
    listBuildings: async (req: Request, res: Response) => {
        const buildings = await buildingRepository.find();
        res.json(buildings);
    },
    createBuildings: async (req: Request, res: Response) => {
        // The point of attention is when you create a building that is mandatory to define the number of floors exists inside.
        const { name } = req.body
        const createBuildings = buildingRepository.create({
            name
        })
        await buildingRepository.save(createBuildings)
        res.status(201).json(createBuildings)
    },
    deleteBuildings: async (req: Request, res: Response) => {
        const id = req.params.id
        const deleted = await buildingRepository.delete(id)

        if (deleted.affected === 0) {
            res.status(404).json(deleted)
        } else {
            res.status(204).json(deleted)
        }
    },
    updateBuildings: async (req: Request, res: Response) => {
        const id = req.params.id
        const { name } = req.body
        const update = await buildingRepository.update(id , { name })
        
        if (update.affected === 0) {
            res.status(404).json(update) 
        } else {
            res.status(200).json(update)
        }
    }
}