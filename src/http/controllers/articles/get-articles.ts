import { getArticlesService } from "@/services/articles/get-articles";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const articleSchema = z.object({
	id: z.string().uuid(),
	title: z.string(),
	image_url: z.string(),
	category: z.string(),
	content: z.string(),
	created_at: z.coerce.date(),
});

export const getArticlesResponseSchema = z.object({
	articles: z.array(articleSchema),
});

export async function getArticles(_: FastifyRequest, rep: FastifyReply) {
	const articles = await getArticlesService();
	return rep.status(200).send({ articles });
}
