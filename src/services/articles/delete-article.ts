import { ArticleNotFoundError } from "@/errors/article-not-found";
import { prisma } from "@/lib/prisma";

interface DeleteArticleService {
	id: string;
}

export async function deleteArticleService({ id }: DeleteArticleService) {
	try {
		await prisma.article.delete({
			where: {
				id,
			},
		});
	} catch {
		throw new ArticleNotFoundError(id);
	}
}
