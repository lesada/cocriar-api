import {
	subscribeBodySchema,
	subscribeParamsSchema,
} from "@/http/controllers/create-subscription";
import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { createSubscription } from "../controllers/create-subscription";

export async function subscribeToEventRoutes(app: FastifyInstance) {
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
					400: z.object({
						error: z.string(),
					}),
					404: z.object({
						error: z.string(),
						event_id: z.string(),
					}),
					409: z.object({
						error: z.string(),
						event_id: z.string(),
						email: z.string(),
					}),
					500: z.object({
						error: z.string(),
					}),
				},
			},
		},
		createSubscription,
	);
}
