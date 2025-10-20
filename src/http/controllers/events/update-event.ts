import { updateEventService } from "@/services/events/update-event";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const updateEventParamsSchema = z.object({
	event_id: z.string().uuid(),
});

export const updateEventBodySchema = z.object({
	title: z.string().optional(),
	image_url: z.string().nullable().optional(),
	content: z.string().optional(),
	event_date: z.coerce.date().optional(),
	address: z.string().optional(),
	max_participants: z.coerce.number().optional(),
});

export async function updateEvent(req: FastifyRequest, rep: FastifyReply) {
	const parsedParams = updateEventParamsSchema.parse(req.params);

	const { event_id } = parsedParams;

	const parsedBody = updateEventBodySchema.parse(req.body);

	const event = await updateEventService({
		id: event_id,
		...parsedBody,
	});

	return rep.status(200).send({
		event,
	});
}
