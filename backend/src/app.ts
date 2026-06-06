import cors from "cors";
import express, { type Request, type Response } from "express";
import { AppDataSource } from "./db/data-source";

// Import Routes
import rolesRoutes from "./routes/role.routes";
import floorRoutes from "./routes/floor.routes"
import roomRoutes from "./routes/room.routes";
import buildingRoutes from "./routes/building.routes";

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
app.use("/api", rolesRoutes);
app.use("/api", floorRoutes)
app.use("/api", roomRoutes);
app.use("/api", buildingRoutes);
//----------------------------


app.get("/", (_req: Request, res: Response) => {
	res.send("Bonjour, le backend rooms-management tourne !");
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

