import { getArticlesService } from "@/services/articles/get-articles";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const articleSchema = z.object({
	id: z.string().uuid(),
	title: z.string(),
	image_url: z.string().nullable().optional(),
	category: z.string(),
	content: z.string(),
	created_at: z.coerce.date(),
});

export const getArticlesResponseSchema = z.object({
	articles: z.array(articleSchema),
});

export const getArticlesQuerySchema = z.object({
	limit: z.coerce.number().optional(),
	query: z.string().optional(),
});

export async function getArticles(req: FastifyRequest, rep: FastifyReply) {
	const parsed = getArticlesQuerySchema.parse(req.query);

	const articles = await getArticlesService(parsed);
	return rep.status(200).send({ articles });
}
