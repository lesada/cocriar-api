import type { FastifyInstance } from "fastify";
import { z } from "zod";

export async function healthRoutes(app: FastifyInstance) {
	app.post(
		"/",
		{
			schema: {
				body: z.object({
					name: z.string(),
				}),
			},
		},

		(req, reply) => {
			reply.send({ status: "ok" });
		},
	);
}
