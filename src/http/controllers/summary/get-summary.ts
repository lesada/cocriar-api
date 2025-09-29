import { getSummaryService } from "@/services/summary/get-summary";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const getSummaryResponseSchema = z.object({
	events: z.number(),
	articles: z.number(),
	testimonials: z.number(),
});

export async function getSummary(_: FastifyRequest, rep: FastifyReply) {
	const summary = await getSummaryService();
	return rep.status(200).send({ summary });
}
