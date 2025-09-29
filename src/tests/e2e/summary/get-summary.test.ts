import { app } from "@/app";
import supertest from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("controllers > get-summary", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should return 200 with summary", async () => {
		const response = await supertest(app.server).get("/summary");
		expect(response.statusCode).toBe(200);
		expect(response.body).toBeDefined();
	});
});
