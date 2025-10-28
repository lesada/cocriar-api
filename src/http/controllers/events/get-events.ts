import { getEventsService } from "@/services/events/get-events";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const eventsSchema = z.object({
	id: z.string().uuid(),
	title: z.string(),
	content: z.string(),
	event_date: z.any(),
	address: z.string().optional().nullable(),
	max_participants: z.any(),
	image_url: z.string().nullable().optional(),
});

export const getEventsResponseSchema = z.object({
	events: z.array(eventsSchema),
});

export async function getEvents(_: FastifyRequest, rep: FastifyReply) {
	const events = await getEventsService();
	return rep.status(200).send({ events });
}
