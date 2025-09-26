import { app } from "@/app";
import { randomUUID } from "node:crypto";
import supertest from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("controllers > delete-article", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should delete article and return 204", async () => {
		const created = await supertest(app.server).post("/articles").send({
			title: "Article title",
			image_url: "https://example.com/image.png",
			category: "tech",
			content: "Full content",
		});

		const { id } = created.body.article;
		const response = await supertest(app.server).delete(`/articles/${id}`);
		expect(response.statusCode).toBe(204);
	});

	it("should return 400 if params are invalid", async () => {
		const response = await supertest(app.server).delete("/articles/1");

		expect(response.statusCode).toBe(400);
	});

	it("should return 404 if not found", async () => {
		const response = await supertest(app.server).delete(
			`/articles/${randomUUID()}`,
		);

		expect(response.statusCode).toBe(404);
	});
});
