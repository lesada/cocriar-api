import type { FastifyInstance } from "fastify";

export async function healthRoutes(app: FastifyInstance) {
	app.get("/", (req, reply) => {
		reply.send({ status: "ok" });
	});
}
