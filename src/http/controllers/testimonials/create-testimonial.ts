import { createTestimonialService } from "@/services/testimonials/create-testimonial";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const createTestimonialBodySchema = z.object({
	company: z.string(),
	content: z.string(),
	job_description: z.string(),
	name: z.string(),
	rating: z.coerce.number().min(1).max(5),
});

export const createTestimonialResponseSchema = z.object({
	testimonial: z
		.object({
			id: z.string().uuid(),
			approved: z.boolean(),
			created_at: z.coerce.date(),
		})
		.merge(createTestimonialBodySchema),
});

export async function createTestimonial(
	req: FastifyRequest,
	rep: FastifyReply,
) {
	const parsed = createTestimonialBodySchema.safeParse(req.body);

	if (!parsed.success) {
		return rep.status(400).send({
			error: "Invalid body schema",
			issues: parsed.error.format(),
		});
	}

	const testimonial = await createTestimonialService(parsed.data);

	return rep.status(201).send({ testimonial });
}
