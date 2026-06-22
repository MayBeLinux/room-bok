import cors from "cors";
import express, { type Express, type Request, type Response } from "express";
import { readFileSync } from "fs";
import { join } from "path";
import { AppDataSource } from "./db/data-source";

import authRoutes from "./routes/auth.routes";
import bookingRoutes from "./routes/booking.routes";
import buildingRoutes from "./routes/building.routes";
import equipmentRoutes from "./routes/equipment.routes";
import floorRoutes from "./routes/floor.routes";
import roleRoutes from "./routes/role.routes";
import roomEquipmentRoutes from "./routes/roomEquipment.routes";
import roomRoutes from "./routes/room.routes";
import userRoutes from "./routes/user.routes";

const corsOrigin = process.env.CORS_ORIGIN ?? "http://localhost:5173";
const prefix = process.env.API_PREFIX ?? "/api";

export const createApp = (): Express => {
	const app = express();

	app.use(cors({ origin: corsOrigin, credentials: true }));
	app.use(express.json());

	app.use(prefix, authRoutes);
	app.use(prefix, roleRoutes);
	app.use(prefix, floorRoutes);
	app.use(prefix, roomRoutes);
	app.use(prefix, buildingRoutes);
	app.use(prefix, bookingRoutes);
	app.use(prefix, equipmentRoutes);
	app.use(prefix, roomEquipmentRoutes);
	app.use(prefix, userRoutes);

	app.get("/", (_req: Request, res: Response) => {
		res.send("Test ready Josh ^^ !");
	});

	return app;
};

if (require.main === module) {
	const pkg = JSON.parse(
		readFileSync(join(__dirname, "..", "package.json"), "utf-8"),
	);
	const port = Number(process.env.PORT) || 3000;
	const app = createApp();

	AppDataSource.initialize()
		.then(() => {
			app.listen(port, () => {
				console.log(
					`Server ${pkg.name}@${pkg.version} (${process.env.NODE_ENV ?? "development"}) is running on http://localhost:${port}`,
				);
			});
		})
		.catch((err) => {
			console.error("Error during Data Source initialization:", err);
		});
}
