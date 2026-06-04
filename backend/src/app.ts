import cors from "cors";
import express, { type Request, type Response } from "express";

const app = express();
const port = 3000;

app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	}),
);

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
	res.send("Bonjour, le backend rooms-management tourne !");
});

app.listen(port, () => {
	console.log(`Serveur démarré sur http://localhost:${port}`);
});
