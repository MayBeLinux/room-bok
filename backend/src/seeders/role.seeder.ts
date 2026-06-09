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
        const role = roleRepository.create(roleData);
        await roleRepository.save(role);
        console.log('Role created:', role);
    }
}