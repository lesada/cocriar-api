import { deleteTestimonial } from "@/http/controllers/testimonials/delete-testimonial";
import type { FastifyReply, FastifyRequest } from "fastify";
import { describe, expect, test, vi } from "vitest";

vi.mock("@/services/testimonials/delete-testimonial", () => ({
	deleteTestimonialService: vi.fn(),
}));

describe("controllers > testimonials > delete-testimonial", () => {
	test("should return 400 if params are invalid", async () => {
		const req = {
			params: { testimonial_id: "invalid-id" },
		} as unknown as FastifyRequest;

		const rep = {
			status: vi.fn().mockReturnThis(),
			send: vi.fn().mockReturnThis(),
		} as unknown as FastifyReply;

		await deleteTestimonial(req, rep);

		expect(rep.status).toHaveBeenCalledWith(400);
		expect(rep.send).toHaveBeenCalledWith({
			error: "Invalid params",
			issues: expect.any(Object),
		});
	});
});
