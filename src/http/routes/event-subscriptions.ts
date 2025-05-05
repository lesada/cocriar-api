import {
	subscribeBodySchema,
	subscribeParamsSchema,
} from "@/http/controllers/event-subscription/create-subscription";
import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { createSubscription } from "../controllers/event-subscription/create-subscription";
import {
	UnsubscribeBodySchema,
	UnsubscribeParamsSchema,
	deleteSubscription,
} from "../controllers/event-subscription/delete-subscription";

export async function eventSubscriptionsRoutes(app: FastifyInstance) {
	app.post(
		"/:event_id",
		{
			schema: {
				summary: "Subscribe to an event",
				tags: ["Subscriptions"],
				params: subscribeParamsSchema,
				body: subscribeBodySchema,
				response: {
					201: z.object({
						subscription: subscribeBodySchema.merge(subscribeParamsSchema),
					}),
				},
			},
		},
		createSubscription,
	);

	app.delete(
		"/:event_id",
		{
			schema: {
				summary: "Unsubscribe to an event",
				tags: ["Subscriptions"],
				params: UnsubscribeParamsSchema,
				body: UnsubscribeBodySchema,
				response: {
					204: z.object({}),
				},
			},
		},
		deleteSubscription,
	);
}
