import { createArticle } from "@/http/controllers/articles/create-article";
import type { FastifyReply, FastifyRequest } from "fastify";
import { describe, expect, test, vi } from "vitest";

describe("controllers > create-article", () => {
	test("should create article and return 201 with article data", async () => {
		const req = {
			body: {
				title: "Article title",
				image_url: "https://example.com/image.png",
				category: "tech",
				description: "Short desc",
				content: "Full content",
			},
		} as FastifyRequest;

		const send = vi.fn();
		const status = vi.fn(() => ({ send }));
		const rep = { status } as unknown as FastifyReply;

		await createArticle(req, rep);

		expect(status).toHaveBeenCalledWith(201);
	});

	test("should return 400 if body is invalid", async () => {
		const req = {
			body: {
				title: "Only title",
			},
		} as unknown as FastifyRequest;

		const send = vi.fn();
		const status = vi.fn(() => ({ send }));
		const rep = { status } as unknown as FastifyReply;

		await createArticle(req, rep);

		expect(status).toHaveBeenCalledWith(400);
		expect(send).toHaveBeenCalledWith(
			expect.objectContaining({
				error: "Invalid body schema",
				issues: expect.any(Object),
			}),
		);
	});
});
