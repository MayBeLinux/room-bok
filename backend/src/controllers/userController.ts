// User define all the different information relative of a user.
// ******************
// - first_name     *
// - last_name      *
// - email          *
// - password       *
// - role_id        *
// ******************
import { AppDataSource } from '../db/data-source';
import { Request , Response } from 'express';
import { User } from '../entity/User';

export const userController = {
    listUsers: async (req: Request, res: Response) => {
        const users = await AppDataSource.getRepository(User).find();
        res.json(users);
    }
}