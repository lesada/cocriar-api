import type { FastifyInstance } from "fastify";

export async function eventsRoutes(app: FastifyInstance) {
	app.post(
		"/",
		{
			schema: {
				consumes: ["multipart/form-data"],
				body: {
					type: "object",
					required: ["image_url"],
					properties: {
						image_url: {
							type: "string",
							format: "binary",
						},
					},
				},
				response: {
					200: {
						type: "string",
					},
				},
			},
		},
		async (req, reply) => {
			console.log({ body: req.body });
			reply.send("done");
		},
	);
}
