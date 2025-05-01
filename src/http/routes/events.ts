import type { FastifyInstance } from "fastify";
import { createEvent } from "../controllers/create-event";

export async function eventsRoutes(app: FastifyInstance) {
	app.post("/", createEvent);
}
