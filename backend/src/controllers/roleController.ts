// Role define your level access of information.
// ******************
// - Administrator  *
// - Teacher        *
// - Student        *
// ******************
import { AppDataSource } from '../db/data-source';
import { Request , Response } from 'express';
import { Role } from '../entity/Role';

const roleRepository = AppDataSource.getRepository(Role)
export const roleController = {
    listRoles: async (req: Request, res: Response) => {
        const roles = await roleRepository.find();
        res.json(roles);
    },
    createRoles: async (req: Request, res: Response) => {
        const { name } = req.body
        const createRole = roleRepository.create({
            name
        })
        await roleRepository.save(createRole)
        res.status(201).json(createRole)
    },
    deleteRoles: async (req: Request, res: Response) => {
        const id = req.params.id
        const deleted = await roleRepository.delete(id)

        if (deleted.affected === 0) {
            res.status(404).json(deleted)
        } else {
            res.status(204).json(deleted)
        }
    },
    updateRoles: async (req: Request, res: Response) => {
        const id = req.params.id
        const { name } = req.body
        const update = await roleRepository.update(id, { name })

        if (update.affected === 0) {
            res.status(404).json(update)
        } else {
            res.status(200).json(update)
        }
    }
}