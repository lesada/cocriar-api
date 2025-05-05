import type { FastifyReply, FastifyRequest } from "fastify";
import { describe, expect, test, vi } from "vitest";

describe("controllers > update-article", () => {
	const mockArticleId = "9ad64f26-9ef7-4e32-a6c7-72e261cf8c3d";
	const mockUpdateData = {
		title: "Updated title",
		description: "Updated desc",
	};

	test("should return 400 if params are invalid", async () => {
		const req = {
			params: { article_id: "invalid-uuid" },
			body: mockUpdateData,
		} as unknown as FastifyRequest;

		const send = vi.fn();
		const status = vi.fn(() => ({ send }));
		const rep = { status } as unknown as FastifyReply;

		const { updateArticle } = await import(
			"@/http/controllers/articles/update-article"
		);

		await updateArticle(req, rep);

		expect(status).toHaveBeenCalledWith(400);
		expect(send).toHaveBeenCalledWith(
			expect.objectContaining({
				error: "Invalid params",
				issues: expect.any(Object),
			}),
		);
	});

	test("should return 400 if body is invalid", async () => {
		const req = {
			params: { article_id: mockArticleId },
			body: { title: 123 }, // título inválido
		} as unknown as FastifyRequest;

		const send = vi.fn();
		const status = vi.fn(() => ({ send }));
		const rep = { status } as unknown as FastifyReply;

		const { updateArticle } = await import(
			"@/http/controllers/articles/update-article"
		);

		await updateArticle(req, rep);

		expect(status).toHaveBeenCalledWith(400);
		expect(send).toHaveBeenCalledWith(
			expect.objectContaining({
				error: "Invalid body schema",
				issues: expect.any(Object),
			}),
		);
	});
});
