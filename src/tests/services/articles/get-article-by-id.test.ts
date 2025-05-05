import { ArticleNotFoundError } from "@/errors/article-not-found";
import { prisma } from "@/lib/prisma";
import { getArticleByIdService } from "@/services/articles/get-article-by-id";
import { type Mock, describe, expect, test } from "vitest";

describe("services > get-article-by-id", () => {
	const mockArticle = {
		id: "article-001",
		title: "Sample Article",
		image_url: "https://example.com/sample.png",
		category: "news",
		description: "A sample article",
		content: "Content of the sample article",
	};

	test("should return the article if found", async () => {
		(prisma.article.findUniqueOrThrow as Mock).mockResolvedValue(mockArticle);

		const result = await getArticleByIdService({ id: mockArticle.id });

		expect(prisma.article.findUniqueOrThrow).toHaveBeenCalledOnce();
		expect(prisma.article.findUniqueOrThrow).toHaveBeenCalledWith({
			where: { id: mockArticle.id },
		});
		expect(result).toEqual(mockArticle);
	});

	test("should throw ArticleNotFoundError if article is not found", async () => {
		const articleId = "non-existent-article";

		(prisma.article.findUniqueOrThrow as Mock).mockRejectedValue(
			new Error("Not found"),
		);

		await expect(getArticleByIdService({ id: articleId })).rejects.toThrow(
			ArticleNotFoundError,
		);

		await expect(
			getArticleByIdService({ id: articleId }),
		).rejects.toMatchObject({
			message: "Article id not found",
			article_id: articleId,
		});
	});
});
