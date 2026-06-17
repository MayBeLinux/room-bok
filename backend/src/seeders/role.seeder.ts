// This file create the initial roles in the Database to test the backend.

import { AppDataSource } from '../db/data-source';
import { Role } from '../entity/Role';

export async function seedRoles() {
    const roleRepository = AppDataSource.getRepository(Role);

    const rolesData = [
        { name: 'Administrator' },
        { name: 'Teacher' },
        { name: 'Student' },
    ];
    for (const roleData of rolesData) {
    const existingRole = await roleRepository.findOneBy({ name: roleData.name });
        if (existingRole) {
            console.log('Role already exists:', existingRole);
        } else {
        const role = roleRepository.create(roleData);
        await roleRepository.save(role);
        console.log('Role created:', role);
        }
    }
}