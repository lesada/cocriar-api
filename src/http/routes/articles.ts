import type { FastifyInstance } from "fastify";
import { z } from "zod";
import {
	createArticle,
	createArticleBodySchema,
	createArticleResponseSchema,
} from "../controllers/articles/create-article";
import {
	deleteArticle,
	deleteArticleParamsSchema,
} from "../controllers/articles/delete-article";
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

	app.delete(
		"/:article_id",
		{
			schema: {
				summary: "Delete an article",
				tags: ["Articles"],
				params: deleteArticleParamsSchema,
				response: {
					204: z.object({}),
				},
			},
		},
		deleteArticle,
	);
}
