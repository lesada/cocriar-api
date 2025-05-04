import { prisma } from "@/lib/prisma";

interface DeleteArticleService {
	id: string;
}

export async function deleteArticleService({ id }: DeleteArticleService) {
	await prisma.article.delete({
		where: {
			id,
		},
	});
}
