import { prisma } from "@/lib/prisma";

export async function getApprovedTestimonialsService() {
	const testimonials = await prisma.testimonial.findMany({
		where: {
			approved: true,
		},
	});

	return testimonials;
}
