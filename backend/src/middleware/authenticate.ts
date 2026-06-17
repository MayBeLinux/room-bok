import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthPayload {
    userId: number;
    roleId: number;
}

declare global {
    namespace Express {
        interface Request {
            auth?: AuthPayload;
        }
    }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Missing or malformed Authorization header' });
    }
    const token = header.slice('Bearer '.length);
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        return res.status(500).json({ message: 'Server misconfigured: JWT_SECRET missing' });
    }
    try {
        const payload = jwt.verify(token, secret) as AuthPayload;
        req.auth = payload;
        next();
    } catch {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
