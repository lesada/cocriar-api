import { TestimonialNotFoundError } from "@/errors/testimonial-not-found";
import { prisma } from "@/lib/prisma";
import { type Mock, describe, expect, test } from "vitest";

describe("services > testimonials > delete-testimonial", () => {
	test("should delete a testimonial successfully", async () => {
		const mockId = "testimonial-id-123";

		(prisma.testimonial.delete as Mock).mockResolvedValue(undefined);

		const { deleteTestimonialService } = await import(
			"@/services/testimonials/delete-testimonial"
		);

		await expect(
			deleteTestimonialService({ id: mockId }),
		).resolves.toBeUndefined();

		expect(prisma.testimonial.delete).toHaveBeenCalledWith({
			where: { id: mockId },
		});
	});

	test("should throw TestimonialNotFoundError if testimonial does not exist", async () => {
		const mockId = "non-existent-id";

		(prisma.testimonial.delete as Mock).mockRejectedValue(
			new Error("Not found"),
		);

		const { deleteTestimonialService } = await import(
			"@/services/testimonials/delete-testimonial"
		);

		await expect(deleteTestimonialService({ id: mockId })).rejects.toEqual(
			new TestimonialNotFoundError(mockId),
		);

		expect(prisma.testimonial.delete).toHaveBeenCalledWith({
			where: { id: mockId },
		});
	});
});
