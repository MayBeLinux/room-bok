import { AppDataSource } from "../../src/db/data-source";

export const initTestDb = async (): Promise<void> => {
	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize();
	}
};

export const resetTestDb = async (): Promise<void> => {
	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize();
		return;
	}
	await AppDataSource.synchronize(true);
};

export const closeTestDb = async (): Promise<void> => {
	if (AppDataSource.isInitialized) {
		await AppDataSource.destroy();
	}
};
