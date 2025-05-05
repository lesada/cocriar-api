import { approveTestimonialService } from "@/services/testimonials/approve-testimonial";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const approveTestimonialParamsSchema = z.object({
	testimonial_id: z.string().uuid(),
});

export const approveTestimonialResponseSchema = z.object({
	testimonial: z.object({
		id: z.string().uuid(),
		approved: z.boolean(),
		created_at: z.coerce.date(),
		company: z.string(),
		content: z.string(),
		job_description: z.string(),
		name: z.string(),
		rating: z.coerce.number().min(1).max(5),
	}),
});

export async function approveTestimonial(
	req: FastifyRequest,
	rep: FastifyReply,
) {
	const parsedParams = approveTestimonialParamsSchema.safeParse(req.params);

	if (!parsedParams.success) {
		return rep.status(400).send({
			error: "Invalid params",
			issues: parsedParams.error.format(),
		});
	}

	const { testimonial_id } = parsedParams.data;

	const testimonial = await approveTestimonialService({
		id: testimonial_id,
	});

	return rep.status(200).send({
		testimonial,
	});
}
