import { app } from "@/app";
import supertest from "supertest";
import { afterAll, beforeAll, describe, expect, test } from "vitest";

describe("controllers > testimonials > delete-testimonial", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	test("should return 400 if params are invalid", async () => {
		const response = await supertest(app.server).delete("/testimonials/1");
		expect(response.statusCode).toBe(400);
	});
});
