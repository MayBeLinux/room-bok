import cors from "cors";
import express, { type Request, type Response } from "express";
import { AppDataSource } from "./db/data-source";

// Import Routes
import rolesRoutes from "./routes/role.routes";
import floorRoutes from "./routes/floor.routes"
import roomRoutes from "./routes/room.routes";
import buildingRoutes from "./routes/building.routes";
import bookingRoutes from "./routes/booking.routes";
import equipmentRoutes from "./routes/equipment.routes";
import roomEquipmentRoutes from "./routes/roomEquipment.routes";
import userRoutes from "./routes/user.routes";

const app = express();
const port = 3000;

app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	}),
);
app.use(express.json());

// --------- ROUTES ----------
const prefix = "/api"
app.use(prefix, rolesRoutes);
app.use(prefix, floorRoutes)
app.use(prefix, roomRoutes);
app.use(prefix, buildingRoutes);
app.use(prefix, bookingRoutes);
app.use(prefix, equipmentRoutes);
app.use(prefix, roomEquipmentRoutes);
app.use(prefix, userRoutes);
//----------------------------


app.get("/", (_req: Request, res: Response) => {
	res.send("Test ready Josh ^^ !");
});

AppDataSource.initialize()
	.then(() => {
		app.listen(port, () => {
			console.log(`Server is running on http://localhost:${port}`);
		});
	})
	.catch((err) => {
		console.error("Error during Data Source initialization:", err);
	});

