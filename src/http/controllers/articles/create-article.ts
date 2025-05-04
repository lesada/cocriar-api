import { createArticleService } from "@/services/articles/create-article";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const createArticleBodySchema = z.object({
	title: z.string(),
	category: z.string(),
	description: z.string(),
	image_url: z.string(),
	content: z.string(),
});

export const createArticleResponseSchema = z.object({
	article: z.object({
		id: z.string().uuid(),
		title: z.string(),
		image_url: z.string(),
		category: z.string(),
		description: z.string(),
		content: z.string(),
		created_at: z.coerce.date(),
	}),
});

export async function createArticle(req: FastifyRequest, rep: FastifyReply) {
	const parsed = createArticleBodySchema.parse(req.body);
	const article = await createArticleService(parsed);
	return rep.status(201).send({ article });
}
