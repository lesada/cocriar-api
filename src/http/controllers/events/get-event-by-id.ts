import { EventNotFoundError } from "@/errors/event-not-found";
import { getEventByIdService } from "@/services/events/get-event-by-id";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const getEventByIdResponseSchema = z.object({
	event: z.object({
		id: z.string().uuid(),
		title: z.string(),
		content: z.string(),
		event_date: z.any(),
		address: z.string().optional().nullable(),
		max_participants: z.any(),
		image_url: z.string().nullable().optional(),
	}),
});

export const getEventByIdParamsSchema = z.object({
	event_id: z.string(),
});

export async function getEventById(req: FastifyRequest, rep: FastifyReply) {
	try {
		const parsedParams = getEventByIdParamsSchema.parse(req.params);

		const event = await getEventByIdService({
			id: parsedParams.event_id,
		});

		return rep.status(200).send({ event });
	} catch (err) {
		if (err instanceof EventNotFoundError) {
			return rep
				.status(404)
				.send({ error: err.message, event_id: err.event_id });
		}
	}
}
