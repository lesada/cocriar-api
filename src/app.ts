import fastifyCors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import fastify from "fastify";
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { healthRoutes } from "./http/routes/health";

export const app = fastify();

app.register(fastifyCors, { origin: "*" });
app.register(fastifyMultipart, {
	attachFieldsToBody: true,
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

// app.register(eventsRoutes, {
// 	prefix: "/events",
// });

app.register(healthRoutes, {
	prefix: "/health",
});
