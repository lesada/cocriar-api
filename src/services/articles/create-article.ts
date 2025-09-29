import { prisma } from "@/lib/prisma";

interface CreateArticleService {
	title: string;
	image_url: string;
	category: string;
	content: string;
}

export async function createArticleService({
	image_url,
	category,
	title,
	content,
}: CreateArticleService) {
	try {
		const article = await prisma.article.create({
			data: {
				image_url,
				category,
				title,
				content,
			},
		});
		return article;
	} catch (error) {
		console.error(error); // Veja o erro real no terminal
		throw error;
	}
}
