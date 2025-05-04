import { prisma } from "@/lib/prisma";

interface CreateArticleService {
	title: string;
	image_url: string;
	category: string;
	description: string;
	content: string;
}

export async function createArticleService({
	description,
	image_url,
	category,
	title,
	content,
}: CreateArticleService) {
	const article = await prisma.article.create({
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
