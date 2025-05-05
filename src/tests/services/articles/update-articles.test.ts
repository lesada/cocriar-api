import { prisma } from "@/lib/prisma";
import { updateArticleService } from "@/services/articles/update-article";
import { type Mock, beforeEach, describe, expect, test } from "vitest";

describe("services > update-article", () => {
	const mockUpdateInput = {
		id: "article-123",
		title: "Updated Article",
		image_url: "https://example.com/image-updated.png",
		category: "tech",
		description: "Updated description",
		content: "Updated content",
	};

	const mockUpdatedArticle = {
		id: mockUpdateInput.id,
		title: mockUpdateInput.title,
		image_url: mockUpdateInput.image_url,
		category: mockUpdateInput.category,
		description: mockUpdateInput.description,
		content: mockUpdateInput.content,
	};

	beforeEach(() => {
		(prisma.article.update as Mock).mockResolvedValue(mockUpdatedArticle);
	});

	test("should update an article with the correct data", async () => {
		const result = await updateArticleService(mockUpdateInput);

		expect(prisma.article.update).toHaveBeenCalledOnce();
		expect(prisma.article.update).toHaveBeenCalledWith({
			where: {
				id: mockUpdateInput.id,
			},
			data: {
				title: mockUpdateInput.title,
				image_url: mockUpdateInput.image_url,
				category: mockUpdateInput.category,
				description: mockUpdateInput.description,
				content: mockUpdateInput.content,
			},
		});

		expect(result).toEqual(mockUpdatedArticle);
	});
});
