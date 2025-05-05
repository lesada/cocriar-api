import type { FastifyInstance } from "fastify";

export async function healthRoutes(app: FastifyInstance) {
	app.get(
		"/",
		{
			schema: {
				tags: ["Health"],
			},
		},
		(req, reply) => {
			reply.send({ status: "ok" });
		},
	);
}
