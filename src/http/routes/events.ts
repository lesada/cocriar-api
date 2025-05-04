import type { FastifyInstance } from "fastify";
import {
	createEvent,
	createEventBodySchema,
} from "../controllers/events/create-event";
import {
	deleteEvent,
	deleteEventParamsSchema,
} from "../controllers/events/delete-event";

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

	app.delete(
		"/:event_id",
		{
			schema: {
				params: deleteEventParamsSchema,
				tags: ["Events"],
			},
		},
		deleteEvent,
	);
}
