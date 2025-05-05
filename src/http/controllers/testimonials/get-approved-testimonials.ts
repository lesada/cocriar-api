import { getApprovedTestimonialsService } from "@/services/testimonials/get-approved-testimonials";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const testimonialSchema = z.object({
	id: z.string().uuid(),
	approved: z.boolean(),
	created_at: z.coerce.date(),
	company: z.string(),
	content: z.string(),
	job_description: z.string(),
	name: z.string(),
	rating: z.coerce.number(),
});

export const getApprovedTestimonialsResponseSchema = z.object({
	testimonials: z.array(testimonialSchema),
});

export async function getApprovedTestimonials(
	_: FastifyRequest,
	rep: FastifyReply,
) {
	const testimonials = await getApprovedTestimonialsService();
	return rep.status(200).send({ testimonials });
}
