import { EventNotFoundError } from "@/errors/event-not-found";
import { UserNotSubscribedError } from "@/errors/user-not-subscribed";
import { deleteSubscriptionService } from "@/services/event-subscription/delete-subscription";
import type { FastifyReply, FastifyRequest } from "fastify";
import { ZodError, z } from "zod";

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
	const parsedParams = UnsubscribeParamsSchema.safeParse(req.params);
	if (!parsedParams.success) {
		return rep.status(400).send({
			error: "Invalid params",
			issues: parsedParams.error.format(),
		});
	}

	const { event_id } = parsedParams.data;

	const parsedBody = UnsubscribeBodySchema.safeParse(req.body);
	if (!parsedBody.success) {
		return rep.status(400).send({
			error: "Invalid body schema",
			issues: parsedBody.error.format(),
		});
	}

	try {
		await deleteSubscriptionService({
			email: parsedBody.data.email,
			event_id,
		});

		return rep.status(204).send();
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
