import { prisma } from "@/lib/prisma";

export async function getTestimonialsService() {
	const testimonials = await prisma.testimonial.findMany();

	return testimonials;
}
