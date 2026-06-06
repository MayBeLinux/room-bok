// Room Equipment define the date start to end, and the quantity.
// ******************
// - id_equipment   *
// - started_at     *
// - ended_at       *
// - quantity       *
// ******************
import { AppDataSource } from '../db/data-source';
import { Request , Response } from 'express';
import { ClassroomEquipment } from '../entity/ClassroomEquipment';

export const roomEquipmentController = {
    listRoomEquipment: async (req: Request, res: Response) => {
        const roomEquipment = await AppDataSource.getRepository(ClassroomEquipment).find();
        res.json(roomEquipment);
    }
}