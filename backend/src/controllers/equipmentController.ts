// Equipment return a list of equipment.
// ******************
// - name           *
// ******************
import { AppDataSource } from '../db/data-source';
import { Request , Response } from 'express';
import { Equipment } from '../entity/Equipment';

const equipmentRepository = AppDataSource.getRepository(Equipment)

export const equipmentController = {
    listEquipments: async (req: Request, res: Response) => {
        const equipments = await equipmentRepository.find();
        res.json(equipments);
    },
    createEquipments: async (req: Request, res: Response) => {
        const {name} = req.body
        const createEquipments = equipmentRepository.create({
            name
        })
    await equipmentRepository.save(createEquipments)
    res.status(201).json(createEquipments)
    },
    deleteEquipments: async (req: Request, res: Response) => {
        const id = req.params.id
        const deletedEquipments = await equipmentRepository.delete(id)    
        if (deletedEquipments.affected === 0) {
            res.status(404).json(deletedEquipments)
        } else {
            res.status(204).json(deletedEquipments)
        }
    },
    updateEquipments: async (req: Request, res: Response) => {
        const id = req.params.id
        const { name } = req.body
        const updateEquipments = await equipmentRepository.update(id, {
            name
        })
        if (updateEquipments.affected === 0) {
            res.status(404).json(updateEquipments)
        } else {
            res.status(200).json(updateEquipments)
        }
    }
}