import fastifyMultipart from "@fastify/multipart";
import fastify from "fastify";
import { eventsRoutes } from "./http/routes/events";

export const app = fastify();

app.register(fastifyMultipart);

app.register(eventsRoutes, {
	prefix: "/events",
});
