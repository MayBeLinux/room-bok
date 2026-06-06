// Room is the list of rooms inside a building.
// ******************
// - name_room       *
// - id_floor        *
// - maintenance     *
// ******************
import { AppDataSource } from '../db/data-source';
import { Request , Response } from 'express';
import { Classroom } from '../entity/Classroom';

export const roomController = {
    listRooms: async (req: Request, res: Response) => {
        const rooms = await AppDataSource.getRepository(Classroom).find();
        res.json(rooms);
    }
}