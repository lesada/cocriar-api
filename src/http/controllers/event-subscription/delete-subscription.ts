import { EventNotFoundError } from "@/errors/event-not-found";
import { UserNotSubscribedError } from "@/errors/user-not-subscribed";
import { deleteSubscriptionService } from "@/services/event-subscription/delete-subscription";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const UnsubscribeBodySchema = z.object({
	email: z.string().email(),
});

export const UnsubscribeParamsSchema = z.object({
	event_id: z.string().uuid(),
});

export async function deleteSubscription(
	req: FastifyRequest,
	rep: FastifyReply,
) {
	const parsedParams = UnsubscribeParamsSchema.parse(req.params);

	const { event_id } = parsedParams;

	const parsedBody = UnsubscribeBodySchema.parse(req.body);

	try {
		await deleteSubscriptionService({
			email: parsedBody.email,
			event_id,
		});

		return rep.status(204).send();
	} catch (err) {
		if (err instanceof EventNotFoundError) {
			return rep.status(404).send({ error: err.message, event_id });
		}

		if (err instanceof UserNotSubscribedError) {
			return rep.status(404).send({
				error: err.message,
				email: err.email,
				event_id: err.event_id,
			});
		}
		return rep.status(500).send({ error: "Intern server error" });
	}
}
