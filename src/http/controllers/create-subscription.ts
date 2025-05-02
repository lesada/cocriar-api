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
	const parsedParams = subscribeParamsSchema.safeParse(req.params);
	if (parsedParams.error) return;

	const { event_id } = parsedParams.data;
	const parsed = subscribeBodySchema.parse(req.body);
	const event = await createSubscriptionService({
		...parsed,
		event_id,
	});
	return rep.status(201).send({ event });
}
