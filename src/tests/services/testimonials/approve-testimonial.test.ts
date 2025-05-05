import { TestimonialNotFoundError } from "@/errors/testimonial-not-found";
import { prisma } from "@/lib/prisma";
import { type Mock, describe, expect, test } from "vitest";

describe("services > testimonials > approve-testimonial", () => {
	test("should approve a testimonial successfully", async () => {
		const mockId = "testimonial-id-456";

		const mockUpdated = {
			id: mockId,
			company: "ACME Inc.",
			content: "Muito bom!",
			job_description: "CEO",
			name: "Maria Oliveira",
			rating: 5,
			approved: true,
			created_at: new Date("2025-05-01T12:00:00Z"),
		};

		(prisma.testimonial.update as Mock).mockResolvedValue(mockUpdated);

		const { approveTestimonialService } = await import(
			"@/services/testimonials/approve-testimonial"
		);

		const result = await approveTestimonialService({ id: mockId });

		expect(prisma.testimonial.update).toHaveBeenCalledWith({
			where: { id: mockId },
			data: { approved: true },
		});

		expect(result).toEqual(mockUpdated);
	});

	test("should throw TestimonialNotFoundError if testimonial does not exist", async () => {
		const mockId = "non-existent-id";

		(prisma.testimonial.update as Mock).mockRejectedValue(
			new Error("Not found"),
		);

		const { approveTestimonialService } = await import(
			"@/services/testimonials/approve-testimonial"
		);

		await expect(approveTestimonialService({ id: mockId })).rejects.toEqual(
			new TestimonialNotFoundError(mockId),
		);

		expect(prisma.testimonial.update).toHaveBeenCalledWith({
			where: { id: mockId },
			data: { approved: true },
		});
	});
});
