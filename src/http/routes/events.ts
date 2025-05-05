import type { FastifyInstance } from "fastify";
import {
	createEvent,
	createEventBodySchema,
} from "../controllers/events/create-event";
import {
	deleteEvent,
	deleteEventParamsSchema,
} from "../controllers/events/delete-event";
import {
	getEvents,
	getEventsResponseSchema,
} from "../controllers/events/get-events";

export async function eventsRoutes(app: FastifyInstance) {
	app.post(
		"/",
		{
			schema: {
				body: createEventBodySchema,
				tags: ["Events"],
				summary: "List all events",
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
				summary: "Delete an event",
			},
		},
		deleteEvent,
	);

	app.get(
		"/",
		{
			schema: {
				summary: "List all events",
				tags: ["Events"],
				response: {
					200: getEventsResponseSchema,
				},
			},
		},
		getEvents,
	);
}
