import { TestimonialNotFoundError } from "@/errors/testimonial-not-found";
import { deleteTestimonialService } from "@/services/testimonials/delete-testimonial";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const deleteTestimonialParamsSchema = z.object({
	testimonial_id: z.string().uuid(),
});

export async function deleteTestimonial(
	req: FastifyRequest,
	rep: FastifyReply,
) {
	try {
		const parsedParams = deleteTestimonialParamsSchema.safeParse(req.params);

		if (!parsedParams.success) {
			return rep.status(400).send({
				error: "Invalid params",
				issues: parsedParams.error.format(),
			});
		}

		await deleteTestimonialService({
			id: parsedParams.data.testimonial_id,
		});

		return rep.status(204).send();
	} catch (err) {
		if (err instanceof TestimonialNotFoundError) {
			return rep
				.status(404)
				.send({ error: err.message, testimonial_id: err.testimonial_id });
		}
	}
}
