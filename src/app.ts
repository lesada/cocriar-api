import fastifyCors from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import fastify from "fastify";
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { articlesRoutes } from "./http/routes/articles";
import { eventSubscriptionsRoutes } from "./http/routes/event-subscriptions";
import { eventsRoutes } from "./http/routes/events";
import { healthRoutes } from "./http/routes/health";
import { testimonialsRoutes } from "./http/routes/testimonials";

export const app = fastify();

app.register(fastifyCors, { origin: "*" });

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: "Cocriar Api",
			description: "Documentação da API cocriar, usando TypeScript e Fastify",
			version: "1.0.0",
		},
	},
	transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
	routePrefix: "/docs",
});

app.register(articlesRoutes, {
	prefix: "/articles",
});

app.register(eventsRoutes, {
	prefix: "/events",
});

app.register(eventSubscriptionsRoutes, {
	prefix: "/events/subscribe",
});

app.register(testimonialsRoutes, {
	prefix: "/testimonials",
});

app.register(healthRoutes, {
	prefix: "/health",
});
