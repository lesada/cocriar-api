import { prisma } from "@/lib/prisma";
import { type Mock, describe, expect, test } from "vitest";

describe("services > testimonials > get-approved-testimonials", () => {
	test("should return a list of approved testimonials", async () => {
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
				approved: true,
				created_at: new Date("2025-05-02T12:00:00Z"),
			},
		];

		(prisma.testimonial.findMany as Mock).mockResolvedValue(mockTestimonials);

		const { getApprovedTestimonialsService } = await import(
			"@/services/testimonials/get-approved-testimonials"
		);

		const result = await getApprovedTestimonialsService();

		expect(prisma.testimonial.findMany).toHaveBeenCalledWith({
			where: {
				approved: true,
			},
		});

		expect(result).toEqual(mockTestimonials);
	});
});
