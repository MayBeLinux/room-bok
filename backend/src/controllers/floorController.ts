// Floor is the list to iterate on the number of floors inside a building.
// ******************
// - Id
// - Level
// - Id_Building
// ******************
import { AppDataSource } from '../db/data-source';
import { Request , Response } from 'express';
import { Floor } from '../entity/Floor';

const floorRepository = AppDataSource.getRepository(Floor)

export const floorController = {
    listFloors: async (req: Request, res: Response) => {
        const floors = await floorRepository.find();
        res.json(floors);
    },
    createFloors: async (req: Request, res: Response) => {
        const { level, building_id } = req.body
        const createFloor = floorRepository.create({
            level,
            building: { id: building_id },
        })
        await floorRepository.save(createFloor)
        res.status(201).json(createFloor)
    },
    deleteFloors: async (req: Request, res: Response) => {
        const id = req.params.id
        const deletedFloor = await floorRepository.delete(id)

        if (deletedFloor.affected === 0) {
            res.status(404).json(deletedFloor)
        } else {
            res.status(204).json(deletedFloor)
        }
    },
    updateFloors: async (req: Request, res: Response) => {
        const id = req.params.id
        const { level, building_id } = req.body
        const updateFloor = await floorRepository.update(id, {
            level,
            building: building_id ? { id: building_id } : undefined,
        })
        if (updateFloor.affected === 0) {
            res.status(404).json(updateFloor)
        } else {
            res.status(200).json(updateFloor)
        }
    }
}