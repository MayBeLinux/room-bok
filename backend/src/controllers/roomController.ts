// Room is the list of rooms inside a building.
// ******************
// - name_room      *
// - id_floor       *
// - maintenance    *
// ******************
import { AppDataSource } from '../db/data-source';
import { Request , Response } from 'express';
import { Classroom } from '../entity/Classroom';

const roomRepository = AppDataSource.getRepository(Classroom)

export const roomController = {
    listRooms: async (req: Request, res: Response) => {
        const rooms = await roomRepository.find();
        res.json(rooms);
    },
    createRooms: async (req: Request, res: Response) => {
        const { name_room, floor_id, maintenance } = req.body
        const createRoom = roomRepository.create({
            nameRoom: name_room,
            floor: { id: floor_id },
            maintenance,
        })
        await roomRepository.save(createRoom)
        res.status(201).json(createRoom)
    },
    deleteRooms: async (req: Request, res: Response) => {
        const id = req.params.id
        const deleted = await roomRepository.delete(id)

        if (deleted.affected === 0) {
            res.status(404).json(deleted)
        } else {
            res.status(204).json(deleted)
        }
    },
    updateRooms: async (req: Request, res: Response) => {
        const id = req.params.id
        const { name_room, floor_id, maintenance } = req.body
        const update = await roomRepository.update(id, {
            nameRoom: name_room,
            floor: floor_id ? { id: floor_id } : undefined,
            maintenance,
        })

        if (update.affected === 0) {
            res.status(404).json(update)
        } else {
            res.status(200).json(update)
        }
    }
}
