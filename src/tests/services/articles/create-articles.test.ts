import { prisma } from "@/lib/prisma";
import { createArticleService } from "@/services/articles/create-article";
import { type Mock, beforeEach, describe, expect, test } from "vitest";

describe("services > create-article", () => {
	const mockArticleInput = {
		title: "Test Article",
		image_url: "https://example.com/image.png",
		category: "technology",
		description: "Test article description",
		content: "This is the content of the article.",
	};

	const mockCreatedArticle = {
		id: "article-123",
		...mockArticleInput,
		created_at: new Date(),
		updated_at: new Date(),
	};

	beforeEach(() => {
		(prisma.article.create as Mock).mockResolvedValue(mockCreatedArticle);
	});

	test("should create an article with the correct data", async () => {
		const result = await createArticleService(mockArticleInput);

		expect(prisma.article.create).toHaveBeenCalledOnce();
		expect(prisma.article.create).toHaveBeenCalledWith({
			data: mockArticleInput,
		});

		expect(result).toEqual(mockCreatedArticle);
	});
});
