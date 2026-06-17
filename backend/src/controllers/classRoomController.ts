// Room is the list of rooms inside a building.
// ******************
// - name_room      *
// - id_floor       *
// - maintenance    *
// ******************
import { AppDataSource } from '../db/data-source';
import { Request , Response } from 'express';
import { Classroom } from '../entity/Classroom';
import { createClassroomSchema, updateClassroomSchema, classroomIdParamSchema } from '../dto/ClassroomDto'

const roomRepository = AppDataSource.getRepository(Classroom)

export const roomController = {
    listRooms: async (req: Request, res: Response) => {
        const rooms = await roomRepository.find();
        res.json(rooms);
    },
    getRoom: async (req: Request, res: Response) => {
        const parsedParams = classroomIdParamSchema.safeParse(req.params)
        if (!parsedParams.success) {
            return res.status(400).json({ errors: parsedParams.error.issues })
        }
        const { id } = parsedParams.data
        const room = await roomRepository.findOne({
            where: { id },
            relations: { floor: true, equipments: true },
        })
        if (!room) {
            return res.status(404).json({ message: 'Room not found' })
        }
        res.json(room)
    },
    createRooms: async (req: Request, res: Response) => {
        const parsed = createClassroomSchema.safeParse(req.body)
        if (!parsed.success) {
            return res.status(400).json({ errors: parsed.error.issues })
        }
        const { name_room, floor_id, maintenance } = parsed.data
        const createRoom = roomRepository.create({
            nameRoom: name_room,
            floor: { id: floor_id },
            maintenance,
        })
        await roomRepository.save(createRoom)
        res.status(201).json(createRoom)
    },
    deleteRooms: async (req: Request, res: Response) => {
        const parsedParams = classroomIdParamSchema.safeParse(req.params)
        if (!parsedParams.success) {
            return res.status(400).json({ errors: parsedParams.error.issues })
        }
        const { id } = parsedParams.data
        const deleted = await roomRepository.delete(id)

        if (deleted.affected === 0) {
            res.status(404).json(deleted)
        } else {
            res.status(204).json(deleted)
        }
    },
    updateRooms: async (req: Request, res: Response) => {
        const parsedParams = classroomIdParamSchema.safeParse(req.params)
        if (!parsedParams.success) {
            return res.status(400).json({ errors: parsedParams.error.issues })
        }
        const parsedBody = updateClassroomSchema.safeParse(req.body)
        if (!parsedBody.success) {
            return res.status(400).json({ errors: parsedBody.error.issues })
        }
        const { id } = parsedParams.data
        const { name_room, floor_id, maintenance } = parsedBody.data
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
