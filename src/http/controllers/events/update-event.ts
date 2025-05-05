import { updateEventService } from "@/services/events/update-event";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const updateEventParamsSchema = z.object({
	event_id: z.string().uuid(),
});

export const updateEventBodySchema = z.object({
	title: z.string().optional(),
	image_url: z.string().optional(),
	tag: z.string().optional(),
	description: z.string().optional(),
	event_date: z.coerce.date().optional(),
	address: z.string().optional(),
	max_participants: z.number().optional(),
});

export async function updateEvent(req: FastifyRequest, rep: FastifyReply) {
	const parsedParams = updateEventParamsSchema.safeParse(req.params);

	if (!parsedParams.success) {
		return rep.status(400).send({
			error: "Invalid params",
			issues: parsedParams.error.format(),
		});
	}

	const { event_id } = parsedParams.data;

	const parsedBody = updateEventBodySchema.safeParse(req.body);
	if (!parsedBody.success) {
		return rep.status(400).send({
			error: "Invalid body schema",
			issues: parsedBody.error.format(),
		});
	}

	const event = await updateEventService({
		id: event_id,
		...parsedBody.data,
	});

	return rep.status(200).send({
		event,
	});
}
