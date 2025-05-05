import { ArticleNotFoundError } from "@/errors/article-not-found";
import { prisma } from "@/lib/prisma";

interface UpdateArticleService {
	id: string;
	title?: string;
	image_url?: string;
	category?: string;
	description?: string;
	content?: string;
}

export async function updateArticleService({
	id,
	description,
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
				description,
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
