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
    createEquipment: async (req: Request, res: Response) => {
        const parsed = createEquipmentSchema.safeParse(req.body)
        if (!parsed.success) {
            return res.status(400).json({ errors: parsed.error.issues })
        } else {
            const { name } = parsed.data
            const createEquipment = equipmentRepository.create({ name })
            await equipmentRepository.save(createEquipment)
            res.status(201).json(createEquipment)
        }
    },
    deleteEquipment: async (req: Request, res: Response) => {
        const parsedParams = equipmentIdParamSchema.safeParse(req.params)
        if (!parsedParams.success) {
            return res.status(400).json({ errors: parsedParams.error.issues })
        } else {
            const { id } = parsedParams.data
            const deletedEquipment = await equipmentRepository.delete(id)
            if (deletedEquipment.affected === 0) {
                res.status(404).json(deletedEquipment)
            } else {
                res.status(204).json(deletedEquipment)
            }
        }
    },
    updateEquipment: async (req: Request, res: Response) => {
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
        const updateEquipment = await equipmentRepository.update(id, { name })
        if (updateEquipment.affected === 0) {
            res.status(404).json(updateEquipment)
        } else {
            res.status(200).json(updateEquipment)
        }
    }
}