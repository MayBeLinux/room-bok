// Room Equipment define the date start to end, and the quantity.
// ******************
// - id_classroom   *
// - id_equipment   *
// - started_at     *
// - ended_at       *
// - quantity       *
// ******************
import { AppDataSource } from '../db/data-source';
import { Request , Response } from 'express';
import { ClassroomEquipment } from '../entity/ClassroomEquipment';
import {
    createClassroomEquipmentSchema,
    updateClassroomEquipmentSchema,
    classroomEquipmentParamsSchema,
} from '../dto/ClassroomEquipmentDto';

const roomEquipmentRepository = AppDataSource.getRepository(ClassroomEquipment)

export const roomEquipmentController = {
    listRoomEquipment: async (req: Request, res: Response) => {
        const roomEquipment = await roomEquipmentRepository.find();
        res.json(roomEquipment);
    },
    getRoomEquipment: async (req: Request, res: Response) => {
        const parsedParams = classroomEquipmentParamsSchema.safeParse(req.params)
        if (!parsedParams.success) {
            return res.status(400).json({ errors: parsedParams.error.issues })
        }
        const { idClassroom, idEquipment } = parsedParams.data
        const link = await roomEquipmentRepository.findOne({
            where: { idClassroom, idEquipment },
            relations: { classroom: true, equipment: true },
        })
        if (!link) {
            return res.status(404).json({ message: 'Classroom-equipment link not found' })
        }
        res.json(link)
    },
    createRoomEquipment: async (req: Request, res: Response) => {
        const parsed = createClassroomEquipmentSchema.safeParse(req.body)
        if (!parsed.success) {
            return res.status(400).json({ errors: parsed.error.issues })
        } else {
            const { id_classroom, id_equipment, started_at, ended_at, quantity } = parsed.data
            const createRoomEquipment = roomEquipmentRepository.create({
                idClassroom: id_classroom,
                idEquipment: id_equipment,
                startedAt: started_at,
                endedAt: ended_at,
                quantity,
            })
            await roomEquipmentRepository.save(createRoomEquipment)
            res.status(201).json(createRoomEquipment)
        }
    },
    deleteRoomEquipment: async (req: Request, res: Response) => {
        const parsedParams = classroomEquipmentParamsSchema.safeParse(req.params)
        if (!parsedParams.success) {
            return res.status(400).json({ errors: parsedParams.error.issues })
        } else {
            const { idClassroom, idEquipment } = parsedParams.data
            const deleted = await roomEquipmentRepository.delete({ idClassroom, idEquipment })

            if (deleted.affected === 0) {
                res.status(404).json(deleted)
            } else {
                res.status(204).json(deleted)
            }
        }
    },
    updateRoomEquipment: async (req: Request, res: Response) => {
        const parsedParams = classroomEquipmentParamsSchema.safeParse(req.params)
        if (!parsedParams.success) {
            return res.status(400).json({ errors: parsedParams.error.issues })
        }
        const parsedBody = updateClassroomEquipmentSchema.safeParse(req.body)
        if (!parsedBody.success) {
            return res.status(400).json({ errors: parsedBody.error.issues })
        }
        const { idClassroom, idEquipment } = parsedParams.data
        const { started_at, ended_at, quantity } = parsedBody.data
        const update = await roomEquipmentRepository.update(
            { idClassroom, idEquipment },
            {
                startedAt: started_at,
                endedAt: ended_at,
                quantity,
            }
        )

        if (update.affected === 0) {
            res.status(404).json(update)
        } else {
            res.status(200).json(update)
        }
    }
}
