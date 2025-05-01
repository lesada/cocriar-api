import { deleteEventsService } from "@/services/events/delete-event";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteEvent(req: FastifyRequest, rep: FastifyReply) {
  const deleteEventParamsSchema = z.object({
    id: z.string().uuid()
  })

  const parsed = deleteEventParamsSchema.safeParse(req.params)

  if (!parsed.success)  { 
    return rep.status(400).send(parsed.error.format())
  }

  try {
		await deleteEventsService({ id: parsed.data.id });
		return rep.status(204).send(); 
	} catch (error) {
		return rep.status(404).send({ error: "Evento não encontrado" });
	}
}