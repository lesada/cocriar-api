import { prisma } from "@/lib/prisma";

export async function getSummaryService() {
	const eventsCount = await prisma.event.count();
	const articlesCount = await prisma.article.count();
	const testimonialsCount = await prisma.testimonial.count();

	return {
		events: eventsCount,
		articles: articlesCount,
		testimonials: testimonialsCount,
	};
}
