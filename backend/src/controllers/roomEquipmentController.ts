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

const roomEquipmentRepository = AppDataSource.getRepository(ClassroomEquipment)

export const roomEquipmentController = {
    listRoomEquipment: async (req: Request, res: Response) => {
        const roomEquipment = await roomEquipmentRepository.find();
        res.json(roomEquipment);
    },
    createRoomEquipment: async (req: Request, res: Response) => {
        const { id_classroom, id_equipment, started_at, ended_at, quantity } = req.body
        const createRoomEquipment = roomEquipmentRepository.create({
            idClassroom: id_classroom,
            idEquipment: id_equipment,
            startedAt: started_at,
            endedAt: ended_at,
            quantity,
        })
        await roomEquipmentRepository.save(createRoomEquipment)
        res.status(201).json(createRoomEquipment)
    },
    deleteRoomEquipment: async (req: Request, res: Response) => {
        const idClassroom = Number(req.params.idClassroom)
        const idEquipment = Number(req.params.idEquipment)
        const deleted = await roomEquipmentRepository.delete({ idClassroom, idEquipment })

        if (deleted.affected === 0) {
            res.status(404).json(deleted)
        } else {
            res.status(204).json(deleted)
        }
    },
    updateRoomEquipment: async (req: Request, res: Response) => {
        const idClassroom = Number(req.params.idClassroom)
        const idEquipment = Number(req.params.idEquipment)
        const { started_at, ended_at, quantity } = req.body
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
