import { prisma } from "@/lib/prisma";

interface CreateTestimonialService {
	company: string;
	content: string;
	job_description: string;
	name: string;
	rating: number;
}

export async function createTestimonialService({
	company,
	content,
	job_description,
	name,
	rating,
}: CreateTestimonialService) {
	const testimonial = await prisma.testimonial.create({
		data: {
			company,
			content,
			job_description,
			name,
			rating,
		},
	});

	return testimonial;
}
