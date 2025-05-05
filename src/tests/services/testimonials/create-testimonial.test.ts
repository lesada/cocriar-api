import { type Mock, describe, expect, test } from "vitest";

describe("services > testimonials > create-testimonial", () => {
	test("should create a testimonial with correct data", async () => {
		const mockInput = {
			company: "ACME Inc.",
			content: "Great service!",
			job_description: "CTO",
			name: "John Smith",
			rating: 5,
		};

		const mockCreated = {
			id: "mock-testimonial-id",
			...mockInput,
			created_at: new Date("2025-05-01T12:00:00Z"),
		};

		const { prisma } = await import("@/lib/prisma");

		(prisma.testimonial.create as Mock).mockResolvedValue(mockCreated);

		const { createTestimonialService } = await import(
			"@/services/testimonials/create-testimonial"
		);

		const result = await createTestimonialService(mockInput);

		expect(prisma.testimonial.create).toHaveBeenCalledWith({
			data: mockInput,
		});

		expect(result).toEqual(mockCreated);
	});
});
