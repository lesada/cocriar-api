import { prisma } from "@/lib/prisma";
import { type Mock, describe, expect, test } from "vitest";

describe("services > testimonials > get-testimonials", () => {
	test("should return a list of all testimonials", async () => {
		const mockTestimonials = [
			{
				id: "t1",
				company: "Company A",
				content: "Very good!",
				job_description: "Developer",
				name: "Anna",
				rating: 5,
				approved: true,
				created_at: new Date("2025-05-01T12:00:00Z"),
			},
			{
				id: "t2",
				company: "Company B",
				content: "Highly recommend!",
				job_description: "Product Manager",
				name: "Charles",
				rating: 4,
				approved: false,
				created_at: new Date("2025-05-02T12:00:00Z"),
			},
		];

		(prisma.testimonial.findMany as Mock).mockResolvedValue(mockTestimonials);

		const { getTestimonialsService } = await import(
			"@/services/testimonials/get-testimonials"
		);

		const result = await getTestimonialsService();

		expect(prisma.testimonial.findMany).toHaveBeenCalledWith();
		expect(result).toEqual(mockTestimonials);
	});
});
