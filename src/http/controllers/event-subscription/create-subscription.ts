import { EventNotFoundError } from "@/errors/event-not-found";
import { UserAlreadySubscribedError } from "@/errors/user-already-subscribed";
import { createSubscriptionService } from "@/services/event-subscription/create-subscription";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const subscribeBodySchema = z.object({
	birthdate: z.coerce.date(),
	cellphone: z.string(),
	email: z.string().email(),
	entity: z.string(),
	name: z.string(),
});

export const subscribeParamsSchema = z.object({
	event_id: z.string().uuid(),
});

export async function createSubscription(
	req: FastifyRequest,
	rep: FastifyReply,
) {
	const parsedParams = subscribeParamsSchema.parse(req.params);

	const { event_id } = parsedParams;

	const parsedBody = subscribeBodySchema.parse(req.body);

	try {
		const subscription = await createSubscriptionService({
			...parsedBody,
			event_id,
		});

		return rep.status(201).send({ subscription });
	} catch (err) {
		if (err instanceof EventNotFoundError) {
			return rep.status(404).send({ error: err.message, event_id });
		}

		if (err instanceof UserAlreadySubscribedError) {
			return rep.status(409).send({
				error: err.message,
				email: err.email,
				event_id: err.event_id,
			});
		}

		return rep.status(500).send({ error: "Intern server error" });
	}
}
