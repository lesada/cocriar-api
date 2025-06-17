import { app } from "@/app";
import supertest from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("http > controllers > events > get-events", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should return 200 and a list of events", async () => {
		const response = await supertest(app.server).get("/events/");

		expect(response.statusCode).toBe(200);
	});
});
