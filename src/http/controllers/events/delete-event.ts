import { EventNotFoundError } from "@/errors/event-not-found";
import { deleteEventService } from "@/services/events/delete-event";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const deleteEventParamsSchema = z.object({
	event_id: z.string().uuid(),
});

export async function deleteEvent(req: FastifyRequest, rep: FastifyReply) {
	const parsedParams = deleteEventParamsSchema.parse(req.params);

	try {
		await deleteEventService({ event_id: parsedParams.event_id });
		return rep.status(204).send();
	} catch (err) {
		if (err instanceof EventNotFoundError) {
			return rep
				.status(404)
				.send({ error: err.message, event_id: parsedParams.event_id });
		}

		return rep.status(500).send({ error: "Internal server error" });
	}
}
