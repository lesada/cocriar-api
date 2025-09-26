import { app } from "@/app";
import { randomUUID } from "node:crypto";
import supertest from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("controllers > get-articles-by-id", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should not found article and return 404", async () => {
		const response = await supertest(app.server).get(
			`/articles/${randomUUID()}`,
		);
		expect(response.statusCode).toBe(404);
	});

	it("should return the article", async () => {
		const created = await supertest(app.server).post("/articles").send({
			title: "Article title",
			image_url: "https://example.com/image.png",
			category: "tech",
			content: "Full content",
		});
		const { id } = created.body.article;

		const response = await supertest(app.server).get(`/articles/${id}`);
		expect(response.statusCode).toBe(200);
		expect(response.body.article).toEqual(
			expect.objectContaining({
				id,
				title: "Article title",
				image_url: "https://example.com/image.png",
				category: "tech",
				content: "Full content",
			}),
		);
	});
});
