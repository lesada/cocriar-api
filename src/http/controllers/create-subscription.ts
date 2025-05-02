import { EventNotFoundError } from "@/errors/event-not-found";
import { createSubscriptionService } from "@/services/event-subscription/create-subscription";
import type { FastifyReply, FastifyRequest } from "fastify";
import { ZodError, z } from "zod";

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
	if (!parsedParams.success) {
		return rep.status(400).send({
			error: "Invalid params",
			issues: parsedParams.error.format(),
		});
	}

	const { event_id } = parsedParams.data;

	const parsedBody = subscribeBodySchema.safeParse(req.body);
	if (!parsedBody.success) {
		return rep.status(400).send({
			error: "Invalid body schema",
			issues: parsedBody.error.format(),
		});
	}

	try {
		const subscription = await createSubscriptionService({
			...parsedBody.data,
			event_id,
		});

		return rep.status(201).send({ subscription });
	} catch (err) {
		if (err instanceof ZodError) {
			return rep.status(400).send({
				error: "Validation error",
				issues: err.format(),
			});
		}

		if (err instanceof EventNotFoundError) {
			return rep.status(404).send({ error: err.message, event_id });
		}

		return rep.status(500).send({ error: "Intern server error" });
	}
}
