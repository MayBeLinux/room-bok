// Floor is the list to iterate on the number of floors inside a building.
// ******************
// - Id
// - Level
// - Id_Building
// ******************
import { AppDataSource } from '../db/data-source';
import { Request , Response } from 'express';
import { Floor } from '../entity/Floor';
import { createFloorSchema, updateFloorSchema, floorIdParamSchema } from '../dto/FloorDto';

const floorRepository = AppDataSource.getRepository(Floor)

export const floorController = {
    listFloors: async (req: Request, res: Response) => {
        const floors = await floorRepository.find();
        res.json(floors);
    },
    getFloor: async (req: Request, res: Response) => {
        const parsedParams = floorIdParamSchema.safeParse(req.params)
        if (!parsedParams.success) {
            return res.status(400).json({ errors: parsedParams.error.issues })
        }
        const { id } = parsedParams.data
        const floor = await floorRepository.findOne({
            where: { id },
            relations: { building: true, classrooms: true },
        })
        if (!floor) {
            return res.status(404).json({ message: 'Floor not found' })
        }
        res.json(floor)
    },
    createFloor: async (req: Request, res: Response) => {
        const parsed = createFloorSchema.safeParse(req.body)
        if (!parsed.success) {
            return res.status(400).json({ errors: parsed.error.issues })
        } else {
            const { level, building_id } = parsed.data
            const createFloor = floorRepository.create({
                level,
                building: { id: building_id },
            })
            await floorRepository.save(createFloor)
            res.status(201).json(createFloor)
        }
    },
    deleteFloor: async (req: Request, res: Response) => {
        const parsedParams = floorIdParamSchema.safeParse(req.params)
        if (!parsedParams.success) {
            return res.status(400).json({ errors: parsedParams.error.issues })
        } else {
            const { id } = parsedParams.data
            const deletedFloor = await floorRepository.delete(id)

            if (deletedFloor.affected === 0) {
                res.status(404).json(deletedFloor)
            } else {
                res.status(204).json(deletedFloor)
            }
        }
    },
    updateFloor: async (req: Request, res: Response) => {
        const parsedParams = floorIdParamSchema.safeParse(req.params)
        if (!parsedParams.success) {
            return res.status(400).json({ errors: parsedParams.error.issues })
        }
        const parsedBody = updateFloorSchema.safeParse(req.body)
        if (!parsedBody.success) {
            return res.status(400).json({ errors: parsedBody.error.issues })
        }
        const { id } = parsedParams.data
        const { level, building_id } = parsedBody.data
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