import { createEventService } from "@/services/events/create-event";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const createEventBodySchema = z.object({
	title: z.string(),
	content: z.string(),
	event_date: z.coerce.date(),
	address: z.string().optional(),
	max_participants: z.coerce
		.number()
		.min(1, "Number of participants must be bigger than 0")
		.optional(),
	image_url: z.string().nullable().optional(),
});

export async function createEvent(req: FastifyRequest, rep: FastifyReply) {
	try {
		const parsed = createEventBodySchema.parse(req.body);
		const event = await createEventService(parsed);
		return rep.status(201).send({ event });
	} catch (error) {
		console.error(error);
	}
}
