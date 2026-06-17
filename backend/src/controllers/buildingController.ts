// Building is a list of building name.
// ******************
// - name           *
// ******************
import { AppDataSource } from '../db/data-source';
import { Request , Response } from 'express';
import { Building } from '../entity/Building';
import { createBuildingSchema, updateBuildingSchema, buildingIdParamSchema } from '../dto/BuildingDto';

const buildingRepository = AppDataSource.getRepository(Building)

export const buildingController = {
    listBuildings: async (req: Request, res: Response) => {
        const buildings = await buildingRepository.find();
        res.json(buildings);
    },
    getBuilding: async (req: Request, res: Response) => {
        const parsedParams = buildingIdParamSchema.safeParse(req.params)
        if (!parsedParams.success) {
            return res.status(400).json({ errors: parsedParams.error.issues })
        }
        const { id } = parsedParams.data
        const building = await buildingRepository.findOne({
            where: { id },
            relations: { floors: true },
        })
        if (!building) {
            return res.status(404).json({ message: 'Building not found' })
        }
        res.json(building)
    },
    createBuildings: async (req: Request, res: Response) => {
        // The point of attention is when you create a building that is mandatory to define the number of floors exists inside.
        const parsed = createBuildingSchema.safeParse(req.body)
        if (!parsed.success) {
            return res.status(400).json({ errors: parsed.error.issues })
        } else {
            const { name } = parsed.data
            const createBuildings = buildingRepository.create({ name })
            await buildingRepository.save(createBuildings)
            res.status(201).json(createBuildings)
        }
    },
    deleteBuildings: async (req: Request, res: Response) => {
        const parsedParams = buildingIdParamSchema.safeParse(req.params)
        if (!parsedParams.success) {
            return res.status(400).json({ errors: parsedParams.error.issues })
        } else {
            const { id } = parsedParams.data
            const deleted = await buildingRepository.delete(id)

            if (deleted.affected === 0) {
                res.status(404).json(deleted)
            } else {
                res.status(204).json(deleted)
            }
        }
    },
    updateBuildings: async (req: Request, res: Response) => {
        const parsedParams = buildingIdParamSchema.safeParse(req.params)
        if (!parsedParams.success) {
            return res.status(400).json({ errors: parsedParams.error.issues })
        }
        const parsedBody = updateBuildingSchema.safeParse(req.body)
        if (!parsedBody.success) {
            return res.status(400).json({ errors: parsedBody.error.issues })
        }
        const { id } = parsedParams.data
        const { name } = parsedBody.data
        const update = await buildingRepository.update(id , { name })

        if (update.affected === 0) {
            res.status(404).json(update)
        } else {
            res.status(200).json(update)
        }
    }
}