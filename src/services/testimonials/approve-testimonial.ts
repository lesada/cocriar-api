import { TestimonialNotFoundError } from "@/errors/testimonial-not-found";
import { prisma } from "@/lib/prisma";

interface ApproveTestimonialService {
	id: string;
}

export async function approveTestimonialService({
	id,
}: ApproveTestimonialService) {
	try {
		const testimonial = await prisma.testimonial.update({
			where: {
				id,
			},
			data: {
				approved: true,
			},
		});
		return testimonial;
	} catch {
		throw new TestimonialNotFoundError(id);
	}
}
