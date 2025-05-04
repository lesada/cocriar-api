import { deleteArticleService } from "@/services/articles/delete-article";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const deleteArticleParamsSchema = z.object({
	article_id: z.string().uuid(),
});

export async function deleteArticle(req: FastifyRequest, rep: FastifyReply) {
	const parsed = deleteArticleParamsSchema.parse(req.params);

	await deleteArticleService({
		id: parsed.article_id,
	});

	return rep.status(204).send();
}
