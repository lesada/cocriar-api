import { getEventsService } from "@/services/events/get-events";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const eventsSchema = z.object({
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

export const getEventsResponseSchema = z.object({
	events: z.array(eventsSchema),
});

export async function getEvents(_: FastifyRequest, rep: FastifyReply) {
	const events = await getEventsService();
	return rep.status(200).send({ events });
}
