import type { FastifyInstance } from "fastify";
import { createEvent } from "../controllers/create-event";
import { deleteEvent } from "../controllers/delete-event";

export async function eventsRoutes(app: FastifyInstance) {
	app.post("/", createEvent);
	app.delete("/:id", deleteEvent);
}
