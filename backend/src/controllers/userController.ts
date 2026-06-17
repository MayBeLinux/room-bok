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
import bcrypt from 'bcryptjs';
import { User } from '../entity/User';
import {
    createUserSchema,
    updateUserSchema,
    userIdParamSchema,
    toUserResponse,
} from '../dto/UserDto';

const userRepository = AppDataSource.getRepository(User)
const BCRYPT_ROUNDS = 10

export const userController = {
    listUsers: async (req: Request, res: Response) => {
        const users = await userRepository.find({ relations: { role: true } });
        res.json(users.map(toUserResponse));
    },
    getUser: async (req: Request, res: Response) => {
        const parsedParams = userIdParamSchema.safeParse(req.params)
        if (!parsedParams.success) {
            return res.status(400).json({ errors: parsedParams.error.issues })
        }
        const { id } = parsedParams.data
        const user = await userRepository.findOne({
            where: { id },
            relations: { role: true },
        })
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.json(toUserResponse(user))
    },
    createUsers: async (req: Request, res: Response) => {
        const parsed = createUserSchema.safeParse(req.body)
        if (!parsed.success) {
            return res.status(400).json({ errors: parsed.error.issues })
        }
        const { first_name, last_name, email, password, role_id } = parsed.data
        const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS)
        const createUser = userRepository.create({
            firstName: first_name,
            lastName: last_name,
            email,
            password: hashedPassword,
            role: { id: role_id },
        })
        const saved = await userRepository.save(createUser)
        res.status(201).json(toUserResponse(saved))
    },
    deleteUsers: async (req: Request, res: Response) => {
        const parsedParams = userIdParamSchema.safeParse(req.params)
        if (!parsedParams.success) {
            return res.status(400).json({ errors: parsedParams.error.issues })
        }
        const { id } = parsedParams.data
        const deleted = await userRepository.delete(id)

        if (deleted.affected === 0) {
            res.status(404).json(deleted)
        } else {
            res.status(204).json(deleted)
        }
    },
    updateUsers: async (req: Request, res: Response) => {
        const parsedParams = userIdParamSchema.safeParse(req.params)
        if (!parsedParams.success) {
            return res.status(400).json({ errors: parsedParams.error.issues })
        }
        const parsedBody = updateUserSchema.safeParse(req.body)
        if (!parsedBody.success) {
            return res.status(400).json({ errors: parsedBody.error.issues })
        }
        const { id } = parsedParams.data
        const { first_name, last_name, email, password, role_id } = parsedBody.data
        const hashedPassword = password
            ? await bcrypt.hash(password, BCRYPT_ROUNDS)
            : undefined
        const update = await userRepository.update(id, {
            firstName: first_name,
            lastName: last_name,
            email,
            password: hashedPassword,
            role: role_id ? { id: role_id } : undefined,
        })

        if (update.affected === 0) {
            res.status(404).json(update)
        } else {
            res.status(200).json(update)
        }
    }
}
