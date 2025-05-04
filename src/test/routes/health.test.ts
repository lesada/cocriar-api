import { healthRoutes } from "@/http/routes/health";
import { fastify } from "fastify";
import supertest from "supertest";
import { beforeEach, describe, expect, it } from "vitest";

describe("http > routes > health", () => {
	const app = fastify();

	beforeEach(async () => {
		app.register(healthRoutes, { prefix: "/health" });
		await app.ready();
	});

	it("should return 200 and status ok", async () => {
		const response = await supertest(app.server).get("/health").expect(200);
		expect(response.body).toEqual({ status: "ok" });
	});
});
