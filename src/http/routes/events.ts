import type { FastifyInstance } from "fastify";
import {
	createEvent,
	createEventBodySchema,
} from "../controllers/events/create-event";

export async function eventsRoutes(app: FastifyInstance) {
	app.post(
		"/",
		{
			schema: {
				body: createEventBodySchema,
				tags: ["Events"],
			},
		},
		createEvent,
	);
}
