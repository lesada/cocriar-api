import { prisma } from "@/lib/prisma";

interface CreateArticleService {
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
}: CreateArticleService) {
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
}
