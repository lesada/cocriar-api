import { prisma } from "@/lib/prisma";

export async function getArticlesService() {
	const articles = await prisma.article.findMany();

	return articles;
}
