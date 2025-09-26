import { ArticleNotFoundError } from "@/errors/article-not-found";
import { prisma } from "@/lib/prisma";

interface UpdateArticleService {
	id: string;
	title?: string;
	image_url?: string;
	category?: string;
	content?: string;
}

export async function updateArticleService({
	id,
	image_url,
	category,
	title,
	content,
}: UpdateArticleService) {
	try {
		const article = await prisma.article.update({
			where: {
				id,
			},
			data: {
				image_url,
				category,
				title,
				content,
			},
		});
		return article;
	} catch {
		throw new ArticleNotFoundError(id);
	}
}
