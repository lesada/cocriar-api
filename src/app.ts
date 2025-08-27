import fastifyCors from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import fastify from "fastify";
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { ZodError } from "zod";
import { env } from "./env";
import { articlesRoutes } from "./http/routes/articles";
import { eventSubscriptionsRoutes } from "./http/routes/event-subscriptions";
import { eventsRoutes } from "./http/routes/events";
import { healthRoutes } from "./http/routes/health";
import { summaryRoutes } from "./http/routes/summary";
import { testimonialsRoutes } from "./http/routes/testimonials";

export const app = fastify();

app.register(fastifyCors, {
	origin: true, // Allow all origins
	credentials: true, // Allow cookies/auth headers
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
	allowedHeaders: [
		"Content-Type",
		"Authorization",
		"Accept",
		"Origin",
		"X-Requested-With",
	],
});

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

app.register(summaryRoutes, {
	prefix: "/summary",
});

app.register(testimonialsRoutes, {
	prefix: "/testimonials",
});

app.register(healthRoutes, {
	prefix: "/health",
});

app.setErrorHandler((error, _, reply) => {
	if (error instanceof ZodError) {
		return reply
			.status(400)
			.send({ message: "Validation error.", issues: error.format() });
	}

	if (error.validation && error.code === "FST_ERR_VALIDATION") {
		return reply
			.status(400)
			.send({ message: "Validation error.", issues: error.validation });
	}

	if (env.NODE_ENV !== "production") {
		console.error(error);
	} else {
		// TODO: log to external service
	}

	return reply.status(500).send({ message: "Internal server error." });
});
