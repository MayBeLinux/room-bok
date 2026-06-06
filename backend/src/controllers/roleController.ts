// Role define your level access of information.
// ******************
// - Administrator  *
// - Teacher        *
// - Student        *
// ******************
import { AppDataSource } from '../db/data-source';
import { Request , Response } from 'express';
import { Role } from '../entity/Role';

export const roleController = {
    listRoles: async (req: Request, res: Response) => {
        const roles = await AppDataSource.getRepository(Role).find();
        res.json(roles);
    }
}