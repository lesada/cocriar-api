import { ArticleNotFoundError } from "@/errors/article-not-found";
import { getArticleByIdService } from "@/services/articles/get-article-by-id";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const getArticleByIdResponseSchema = z.object({
	article: z.object({
		id: z.string().uuid(),
		title: z.string(),
		image_url: z.string().nullable().optional(),
		category: z.string(),
		content: z.string(),
		created_at: z.coerce.date(),
	}),
});

export const getArticleByIdParamsSchema = z.object({
	article_id: z.string(),
});

export async function getArticleById(req: FastifyRequest, rep: FastifyReply) {
	try {
		const parsedParams = getArticleByIdParamsSchema.parse(req.params);

		const article = await getArticleByIdService({
			id: parsedParams.article_id,
		});

		return rep.status(200).send({ article });
	} catch (err) {
		if (err instanceof ArticleNotFoundError) {
			return rep
				.status(404)
				.send({ error: err.message, article_id: err.article_id });
		}
	}
}
