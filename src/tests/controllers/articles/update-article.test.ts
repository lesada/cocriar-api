import { app } from "@/app";
import supertest from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("controllers > update-article", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should return 400 if params are invalid", async () => {
		const response = await supertest(app.server).patch("/articles/1");

		expect(response.statusCode).toBe(400);
	});
});
