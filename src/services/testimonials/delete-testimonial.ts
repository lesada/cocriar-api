import { TestimonialNotFoundError } from "@/errors/testimonial-not-found";
import { prisma } from "@/lib/prisma";

interface DeleteTestimonialService {
	id: string;
}

export async function deleteTestimonialService({
	id,
}: DeleteTestimonialService) {
	try {
		await prisma.testimonial.delete({
			where: {
				id,
			},
		});
	} catch {
		throw new TestimonialNotFoundError(id);
	}
}
