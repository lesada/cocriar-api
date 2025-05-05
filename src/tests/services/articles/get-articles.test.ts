import { prisma } from "@/lib/prisma";
import { getArticlesService } from "@/services/articles/get-articles";
import { type Mock, beforeEach, describe, expect, test } from "vitest";

describe("services > articles > get-articles", () => {
	const mockArticles = [
		{
			id: "article-1",
			title: "First Article",
			image_url: "https://example.com/image1.png",
			category: "tech",
			description: "First description",
			content: "First content",
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			id: "article-2",
			title: "Second Article",
			image_url: "https://example.com/image2.png",
			category: "science",
			description: "Second description",
			content: "Second content",
			created_at: new Date(),
			updated_at: new Date(),
		},
	];

	beforeEach(() => {
		(prisma.article.findMany as Mock).mockResolvedValue(mockArticles);
	});

	test("should return all articles", async () => {
		const result = await getArticlesService();

		expect(prisma.article.findMany).toHaveBeenCalledOnce();
		expect(result).toEqual(mockArticles);
	});
});
