import { app } from "@/app";
import { randomUUID } from "node:crypto";
import supertest from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("controllers > update-article", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should update article and return 200", async () => {
		const created = await supertest(app.server).post("/articles").send({
			title: "Article title",
			image_url: "https://example.com/image.png",
			category: "tech",
			content: "Full content",
		});
		const { id } = created.body.article;
		const response = await supertest(app.server).patch(`/articles/${id}`).send({
			title: "Updated title",
			image_url: "https://example.com/updated-image.png",
			category: "health",
			content: "Updated full content",
		});
		expect(response.statusCode).toBe(200);
		expect(response.body.article).toEqual(
			expect.objectContaining({
				id,
				title: "Updated title",
				image_url: "https://example.com/updated-image.png",
				category: "health",
				content: "Updated full content",
			}),
		);
	});

	it("should return 400 if params are invalid", async () => {
		const response = await supertest(app.server).patch("/articles/1");

		expect(response.statusCode).toBe(400);
	});

	it("should return 404 if not found", async () => {
		const response = await supertest(app.server)
			.patch(`/articles/${randomUUID()}`)
			.send({
				title: "Updated title",
				image_url: "https://example.com/updated-image.png",
				category: "health",
				content: "Updated full content",
			});

		expect(response.statusCode).toBe(404);
	});
});
