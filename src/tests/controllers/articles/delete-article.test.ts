import { deleteArticle } from "@/http/controllers/articles/delete-article";
import type { FastifyReply, FastifyRequest } from "fastify";
import { describe, expect, test, vi } from "vitest";

describe("controllers > delete-article", () => {
	const mockArticleId = "a2456ed3-23f5-4e18-bb7d-03aabc7a83dc";

	test("should delete article and return 204", async () => {
		const req = {
			params: {
				article_id: mockArticleId,
			},
		} as unknown as FastifyRequest;

		const send = vi.fn();
		const status = vi.fn(() => ({ send }));
		const rep = { status } as unknown as FastifyReply;

		await deleteArticle(req, rep);
		expect(status).toHaveBeenCalledWith(204);
		expect(send).toHaveBeenCalled();
	});

	test("should return 400 if params are invalid", async () => {
		const req = {
			params: {
				article_id: "not-a-uuid",
			},
		} as unknown as FastifyRequest;

		const send = vi.fn();
		const status = vi.fn(() => ({ send }));
		const rep = { status } as unknown as FastifyReply;

		await deleteArticle(req, rep);

		expect(status).toHaveBeenCalledWith(400);
		expect(send).toHaveBeenCalledWith(
			expect.objectContaining({
				error: "Invalid params",
				issues: expect.any(Object),
			}),
		);
	});
});
