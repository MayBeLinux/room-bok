// Equipment return a list of equipment.
// ******************
// - name           *
// ******************
import { AppDataSource } from '../db/data-source';
import { Request , Response } from 'express';
import { Equipment } from '../entity/Equipment';
import { createEquipmentSchema, updateEquipmentSchema, equipmentIdParamSchema } from '../dto/EquipmentDto';

const equipmentRepository = AppDataSource.getRepository(Equipment)

export const equipmentController = {
    listEquipments: async (req: Request, res: Response) => {
        const equipments = await equipmentRepository.find();
        res.json(equipments);
    },
    getEquipment: async (req: Request, res: Response) => {
        const parsedParams = equipmentIdParamSchema.safeParse(req.params)
        if (!parsedParams.success) {
            return res.status(400).json({ errors: parsedParams.error.issues })
        }
        const { id } = parsedParams.data
        const equipment = await equipmentRepository.findOneBy({ id })
        if (!equipment) {
            return res.status(404).json({ message: 'Equipment not found' })
        }
        res.json(equipment)
    },
    createEquipments: async (req: Request, res: Response) => {
        const parsed = createEquipmentSchema.safeParse(req.body)
        if (!parsed.success) {
            return res.status(400).json({ errors: parsed.error.issues })
        } else {
            const { name } = parsed.data
            const createEquipments = equipmentRepository.create({ name })
            await equipmentRepository.save(createEquipments)
            res.status(201).json(createEquipments)
        }
    },
    deleteEquipments: async (req: Request, res: Response) => {
        const parsedParams = equipmentIdParamSchema.safeParse(req.params)
        if (!parsedParams.success) {
            return res.status(400).json({ errors: parsedParams.error.issues })
        } else {
            const { id } = parsedParams.data
            const deletedEquipments = await equipmentRepository.delete(id)
            if (deletedEquipments.affected === 0) {
                res.status(404).json(deletedEquipments)
            } else {
                res.status(204).json(deletedEquipments)
            }
        }
    },
    updateEquipments: async (req: Request, res: Response) => {
        const parsedParams = equipmentIdParamSchema.safeParse(req.params)
        if (!parsedParams.success) {
            return res.status(400).json({ errors: parsedParams.error.issues })
        }
        const parsedBody = updateEquipmentSchema.safeParse(req.body)
        if (!parsedBody.success) {
            return res.status(400).json({ errors: parsedBody.error.issues })
        }
        const { id } = parsedParams.data
        const { name } = parsedBody.data
        const updateEquipments = await equipmentRepository.update(id, { name })
        if (updateEquipments.affected === 0) {
            res.status(404).json(updateEquipments)
        } else {
            res.status(200).json(updateEquipments)
        }
    }
}