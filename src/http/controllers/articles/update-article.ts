import { updateArticleService } from "@/services/articles/update-article";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const updateArticleParamsSchema = z.object({
	article_id: z.string().uuid(),
});

export const updateArticleBodySchema = z.object({
	title: z.string().optional(),
	category: z.string().optional(),
	description: z.string().optional(),
	image_url: z.string().optional(),
	content: z.string().optional(),
});

export async function updateArticle(req: FastifyRequest, rep: FastifyReply) {
	const parsedParams = updateArticleParamsSchema.safeParse(req.params);

	if (!parsedParams.success) {
		return rep.status(400).send({
			error: "Invalid params",
			issues: parsedParams.error.format(),
		});
	}

	const { article_id } = parsedParams.data;

	const parsedBody = updateArticleBodySchema.safeParse(req.body);
	if (!parsedBody.success) {
		return rep.status(400).send({
			error: "Invalid body schema",
			issues: parsedBody.error.format(),
		});
	}

	const article = await updateArticleService({
		id: article_id,
		...parsedBody.data,
	});

	return rep.status(200).send({
		article,
	});
}
