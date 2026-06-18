// Auth handles register + login (JWT).
// ******************
// - register       *
// - login          *
// ******************
import { AppDataSource } from '../db/data-source';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { User } from '../entity/User';
import { registerSchema, loginSchema } from '../dto/AuthDto';
import { toUserResponse } from '../dto/UserDto';

const userRepository = AppDataSource.getRepository(User)
const BCRYPT_ROUNDS = 10    

const signToken = (payload: { userId: number; roleId: number }): string => {
    const secret = process.env.JWT_SECRET
    if (!secret) {
        throw new Error('JWT_SECRET missing')
    }
    const options: SignOptions = {
        expiresIn: (process.env.JWT_EXPIRES_IN ?? '1d') as SignOptions['expiresIn'],
    }
    return jwt.sign(payload, secret, options)
}

export const authController = {
    register: async (req: Request, res: Response) => {
        const parsed = registerSchema.safeParse(req.body)
        if (!parsed.success) {
            return res.status(400).json({ errors: parsed.error.issues })
        }
        const { first_name, last_name, email, password, role_id } = parsed.data
        const existing = await userRepository.findOneBy({ email })
        if (existing) {
            return res.status(409).json({ message: 'Email already in use' })
        }
        const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS)
        const user = userRepository.create({
            firstName: first_name,
            lastName: last_name,
            email,
            password: hashedPassword,
            role: { id: role_id },
        })
        const saved = await userRepository.save(user)
        const token = signToken({ userId: saved.id, roleId: role_id })
        res.status(201).json({ token, user: toUserResponse(saved) })
    },
    login: async (req: Request, res: Response) => {
        const parsed = loginSchema.safeParse(req.body)
        if (!parsed.success) {
            return res.status(400).json({ errors: parsed.error.issues })
        }
        const { email, password } = parsed.data
        const user = await userRepository.findOne({
            where: { email },
            relations: { role: true },
        })
        if (!user || !user.password) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }
        const ok = await bcrypt.compare(password, user.password)
        if (!ok) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }
        const token = signToken({ userId: user.id, roleId: user.role?.id ?? 0 })
        res.json({ token, user: toUserResponse(user) })
    },
}
