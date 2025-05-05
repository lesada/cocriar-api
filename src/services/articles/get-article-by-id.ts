import { ArticleNotFoundError } from "@/errors/article-not-found";
import { prisma } from "@/lib/prisma";

interface GetArticleByIdService {
	id: string;
}

export async function getArticleByIdService({ id }: GetArticleByIdService) {
	const article = await prisma.article
		.findUniqueOrThrow({
			where: {
				id,
			},
		})
		.catch(() => {
			throw new ArticleNotFoundError(id);
		});

	return article;
}
