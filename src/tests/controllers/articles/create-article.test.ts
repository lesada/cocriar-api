import { app } from "@/app";
import supertest from "supertest";
import { afterAll, beforeAll, describe, expect, test } from "vitest";

describe("controllers > create-article", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	test("should create article and return 201 with article data", async () => {
		const response = await supertest(app.server).post("/articles").send({
			title: "Article title",
			image_url: "https://example.com/image.png",
			category: "tech",
			description: "Short desc",
			content: "Full content",
		});
		expect(response.statusCode).toBe(201);
	});

	test("should return 400 if body is invalid", async () => {
		const response = await supertest(app.server).post("/articles").send({
			title: "Article title",
		});
		expect(response.statusCode).toBe(400);
	});
});
