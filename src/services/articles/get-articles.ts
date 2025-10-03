import { prisma } from "@/lib/prisma";

type GetArticlesParams = {
	limit?: number;
	query?: string;
};

export async function getArticlesService({ limit, query }: GetArticlesParams) {
	const articles = await prisma.article.findMany({
		take: limit,
		where: {
			title: query ? { contains: query, mode: "insensitive" } : undefined,
		},
	});

	return articles;
}
