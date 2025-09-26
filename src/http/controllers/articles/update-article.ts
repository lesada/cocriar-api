import { ArticleNotFoundError } from "@/errors/article-not-found";
import { updateArticleService } from "@/services/articles/update-article";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const updateArticleParamsSchema = z.object({
	article_id: z.string().uuid(),
});

export const updateArticleBodySchema = z.object({
	title: z.string().optional(),
	category: z.string().optional(),
	image_url: z.string().optional(),
	content: z.string().optional(),
});

export async function updateArticle(req: FastifyRequest, rep: FastifyReply) {
	try {
		const parsedParams = updateArticleParamsSchema.parse(req.params);

		const { article_id } = parsedParams;

		const parsedBody = updateArticleBodySchema.parse(req.body);

		const article = await updateArticleService({
			id: article_id,
			...parsedBody,
		});

		return rep.status(200).send({
			article,
		});
	} catch (err) {
		if (err instanceof ArticleNotFoundError) {
			return rep
				.status(404)
				.send({ error: err.message, article_id: err.article_id });
		}
	}
}
