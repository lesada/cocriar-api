import { ArticleNotFoundError } from "@/errors/article-not-found";
import { deleteArticleService } from "@/services/articles/delete-article";
import type { FastifyReply, FastifyRequest } from "fastify";
import { ZodError, z } from "zod";

export const deleteArticleParamsSchema = z.object({
	article_id: z.string().uuid(),
});

export async function deleteArticle(req: FastifyRequest, rep: FastifyReply) {
	try {
		const parsedParams = deleteArticleParamsSchema.safeParse(req.params);

		if (!parsedParams.success) {
			return rep.status(400).send({
				error: "Invalid params",
				issues: parsedParams.error.format(),
			});
		}

		await deleteArticleService({
			id: parsedParams.data.article_id,
		});

		return rep.status(204).send();
	} catch (err) {
		if (err instanceof ZodError) {
			return rep.status(400).send({
				error: "Validation error",
				issues: err.format(),
			});
		}

		if (err instanceof ArticleNotFoundError) {
			return rep
				.status(404)
				.send({ error: err.message, article_id: err.article_id });
		}
	}
}
