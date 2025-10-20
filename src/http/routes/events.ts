import type { FastifyInstance } from "fastify";
import { z } from "zod";
import {
	createEvent,
	createEventBodySchema,
} from "../controllers/events/create-event";
import {
	deleteEvent,
	deleteEventParamsSchema,
} from "../controllers/events/delete-event";
import {
	updateEvent,
	updateEventBodySchema,
	updateEventParamsSchema,
} from "../controllers/events/update-event";

import {
	getEventById,
	getEventByIdResponseSchema,
} from "../controllers/events/get-event-by-id";
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

	app.patch(
		"/:event_id",
		{
			schema: {
				summary: "Update Event",
				tags: ["Events"],
				params: updateEventParamsSchema,
				body: updateEventBodySchema,
				response: {
					200: z.object({
						event: updateEventBodySchema.merge(
							z.object({
								id: z.string(),
							}),
						),
					}),
				},
			},
		},
		updateEvent,
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
	app.get(
		"/:event_id",
		{
			schema: {
				summary: "Search by event id",
				tags: ["Events"],
				response: {
					200: getEventByIdResponseSchema,
				},
			},
		},
		getEventById,
	);
}
