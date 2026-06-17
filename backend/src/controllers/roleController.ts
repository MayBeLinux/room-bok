// Role define your level access of information.
// ******************
// - Administrator  *
// - Teacher        *
// - Student        *
// ******************
import { AppDataSource } from '../db/data-source';
import { Request , Response } from 'express';
import { Role } from '../entity/Role';
import { createRoleSchema, updateRoleSchema, roleIdParamSchema  } from '../dto/RoleDto';


const roleRepository = AppDataSource.getRepository(Role)
export const roleController = {
    listRoles: async (req: Request, res: Response) => {
        const roles = await roleRepository.find();
        res.json(roles);
    },
    getRole: async (req: Request, res: Response) => {
        const parsedParams = roleIdParamSchema.safeParse(req.params)
        if (!parsedParams.success) {
            return res.status(400).json({ errors: parsedParams.error.issues })
        }
        const { id } = parsedParams.data
        const role = await roleRepository.findOneBy({ id })
        if (!role) {
            return res.status(404).json({ message: 'Role not found' })
        }
        res.json(role)
    },
    createRole: async (req: Request, res: Response) => {
        const parsed = createRoleSchema.safeParse(req.body)   
        if (!parsed.success) {
            return res.status(400).json({ errors: parsed.error.issues })
        } else {
            const { name } = parsed.data
            const createRole = roleRepository.create({
                name,
            })
            await roleRepository.save(createRole)
            res.status(201).json(createRole)
        }
    },
    deleteRole: async (req: Request, res: Response) => {
        const parsedParams = roleIdParamSchema.safeParse(req.params)
        if (!parsedParams.success) {
            return res.status(400).json({ errors: parsedParams.error.issues })
        } else {
            const { id } = parsedParams.data
            const deleted = await roleRepository.delete(id)

            if (deleted.affected === 0) {
                res.status(404).json(deleted)
            } else {
                res.status(204).json(deleted)
            }
        }
    },
    updateRole: async (req: Request, res: Response) => {
        const parsedParams = roleIdParamSchema.safeParse(req.params)
        if (!parsedParams.success) {
            return res.status(400).json({ errors: parsedParams.error.issues })
        }
        const parsedBody = updateRoleSchema.safeParse(req.body)
        if (!parsedBody.success) {
            return res.status(400).json({ errors: parsedBody.error.issues })
        }
        const { id } = parsedParams.data
        const { name } = parsedBody.data
        const update = await roleRepository.update(id, { name })

        if (update.affected === 0) {
            res.status(404).json(update)
        } else {
            res.status(200).json(update)
        }
    }
}