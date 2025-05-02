import { createEventsService } from "@/services/events/create-event";
import { checkBase64MimeTypes } from "@/utils/check-base64-mimetypes";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const createEventBodySchema = z.object({
	title: z.string(),
	tag: z.string(),
	description: z.string(),
	event_date: z.coerce.date(),
	address: z.string(),
	max_participants: z.coerce
		.number()
		.min(1, "Number of participants must be bigger than 0")
		.optional(),
	image_url: z.string(),
});

export async function createEvent(req: FastifyRequest, rep: FastifyReply) {
	const parsed = createEventBodySchema.safeParse(req.body);

	if (!parsed.success) {
		return rep.status(400).send(parsed.error.format());
	}

	checkBase64MimeTypes(parsed.data.image_url, rep);

	const event = await createEventsService(parsed.data);

	return rep.status(201).send({ event });
}
