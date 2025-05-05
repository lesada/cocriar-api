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
	getArticleById,
	getArticleByIdResponseSchema,
} from "../controllers/articles/get-article-by-id";
import {
	getArticles,
	getArticlesResponseSchema,
} from "../controllers/articles/get-articles";
import {
	updateArticle,
	updateArticleBodySchema,
	updateArticleParamsSchema,
} from "../controllers/articles/update-article";

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

	app.get(
		"/:article_id",
		{
			schema: {
				summary: "Search by article id",
				tags: ["Articles"],
				response: {
					200: getArticleByIdResponseSchema,
				},
			},
		},
		getArticleById,
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

	app.patch(
		"/:article_id",
		{
			schema: {
				summary: "Update an article",
				tags: ["Articles"],
				params: updateArticleParamsSchema,
				body: updateArticleBodySchema,
				response: {
					200: z.object({
						article: updateArticleBodySchema.merge(
							z.object({
								id: z.string(),
							}),
						),
					}),
				},
			},
		},
		updateArticle,
	);
}
