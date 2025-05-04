import type { FastifyInstance } from "fastify";
import {
	createArticle,
	createArticleBodySchema,
	createArticleResponseSchema,
} from "../controllers/articles/create-article";
import {
	getArticles,
	getArticlesResponseSchema,
} from "../controllers/articles/get-articles";

export async function articlesRoutes(app: FastifyInstance) {
	app.get(
		"/",
		{
			schema: {
				summary: "List all articles",
				tags: ["Articles"],
				response: {
					200: getArticlesResponseSchema,
				},
			},
		},
		getArticles,
	);

	app.post(
		"/",
		{
			schema: {
				summary: "Create a new article",
				tags: ["Articles"],
				body: createArticleBodySchema,
				response: {
					201: createArticleResponseSchema,
				},
			},
		},
		createArticle,
	);
}
