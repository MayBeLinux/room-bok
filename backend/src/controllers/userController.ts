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
import { createUserSchema } from '../dto/UserDto';

const userRepository = AppDataSource.getRepository(User)

export const userController = {
    listUsers: async (req: Request, res: Response) => {
        const users = await userRepository.find();
        res.json(users);
    },
    createUsers: async (req: Request, res: Response) => {
        const parsed = createUserSchema.safeParse(req.body)
        if (!parsed.success) {
            return res.status(400).json({ errors: parsed.error.issues })
        }
        const { first_name, last_name, email, password, role_id } = parsed.data
        const createUser = userRepository.create({
            firstName: first_name,
            lastName: last_name,
            email,
            password,
            role: { id: role_id },
        })
        await userRepository.save(createUser)
        res.status(201).json(createUser)
    },
    deleteUsers: async (req: Request, res: Response) => {
        const id = req.params.id
        const deleted = await userRepository.delete(id)

        if (deleted.affected === 0) {
            res.status(404).json(deleted)
        } else {
            res.status(204).json(deleted)
        }
    },
    updateUsers: async (req: Request, res: Response) => {
        const id = req.params.id
        const { first_name, last_name, email, password, role_id } = req.body
        const update = await userRepository.update(id, {
            firstName: first_name,
            lastName: last_name,
            email,
            password,
            role: role_id ? { id: role_id } : undefined,
        })

        if (update.affected === 0) {
            res.status(404).json(update)
        } else {
            res.status(200).json(update)
        }
    }
}
