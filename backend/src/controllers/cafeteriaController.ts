// Cafeteria is a read-only list: cafeterias are created in the DB by the seeder.
// ******************
// - capacity       *
// - opening_time   *
// - closing_time   *
// ******************
import { AppDataSource } from '../db/data-source';
import { Request , Response } from 'express';
import { Cafeteria } from '../entity/Cafeteria';
import { cafeteriaIdParamSchema } from '../dto/CafeteriaDto';

const cafeteriaRepository = AppDataSource.getRepository(Cafeteria)

// Load the room and its location so the frontend can display where the cafeteria is.
const cafeteriaRelations = { classroom: { floor: { building: true } } }

export const cafeteriaController = {
    listCafeterias: async (req: Request, res: Response) => {
        const cafeterias = await cafeteriaRepository.find({ relations: cafeteriaRelations });
        res.json(cafeterias);
    },
    getCafeteria: async (req: Request, res: Response) => {
        const parsedParams = cafeteriaIdParamSchema.safeParse(req.params)
        if (!parsedParams.success) {
            return res.status(400).json({ errors: parsedParams.error.issues })
        }
        const { id } = parsedParams.data
        const cafeteria = await cafeteriaRepository.findOne({
            where: { id },
            relations: cafeteriaRelations,
        })
        if (!cafeteria) {
            return res.status(404).json({ message: 'Cafeteria not found' })
        }
        res.json(cafeteria)
    },
}
