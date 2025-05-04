import { healthRoutes } from "@/http/routes/health";
import { type FastifyInstance, fastify } from "fastify";
import { beforeEach, describe, expect, it } from "vitest";

describe("http > routes > health", () => {
	let app: FastifyInstance;

	beforeEach(async () => {
		app = fastify();
		await healthRoutes(app);
		await app.ready();
	});

	it("should return 200 and status ok", async () => {
		const response = await app.inject({
			method: "GET",
			url: "/",
		});

		expect(response.statusCode).toBe(200);
		expect(response.json()).toEqual({ status: "ok" });
	});
});
