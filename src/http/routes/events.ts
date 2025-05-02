import type { FastifyInstance } from "fastify";
import {
	createEvent,
	createEventBodySchema,
} from "../controllers/create-event";
import {
	createSubscription,
	subscribeBodySchema,
	subscribeParamsSchema,
} from "../controllers/create-subscription";

export async function eventsRoutes(app: FastifyInstance) {
	app.post(
		"/",
		{
			schema: {
				body: createEventBodySchema,
			},
		},
		createEvent,
	);

	app.post(
		"/subscribe/:event_id",
		{
			schema: {
				body: subscribeBodySchema,
				params: subscribeParamsSchema,
			},
		},
		createSubscription,
	);
}
