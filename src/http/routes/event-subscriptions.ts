import {
	subscribeBodySchema,
	subscribeParamsSchema,
} from "@/http/controllers/create-subscription";
import type { FastifyInstance } from "fastify";
import { createSubscription } from "../controllers/create-subscription";
import {
	UnsubscribeBodySchema,
	UnsubscribeParamsSchema,
	deleteSubscription,
} from "../controllers/delete-subscription";

export async function eventSubscriptions(app: FastifyInstance) {
	app.post(
		"/:event_id",
		{
			schema: {
				summary: "Subscribe to an event",
				description:
					"Subscribe a user to an event by providing event_id in the URL and user details in the body.",
				tags: ["Subscriptions"],
				params: subscribeParamsSchema,
				body: subscribeBodySchema,
				response: {
					201: subscribeBodySchema.merge(subscribeParamsSchema),
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
				description:
					"Unubscribe a user to an event by providing event_id and the email in the body",
				tags: ["Subscriptions"],
				params: UnsubscribeParamsSchema,
				body: UnsubscribeBodySchema,
				response: {
					204: UnsubscribeBodySchema.merge(UnsubscribeParamsSchema),
				},
			},
		},
		deleteSubscription,
	);
}
