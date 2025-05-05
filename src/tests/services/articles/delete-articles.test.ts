import { prisma } from "@/lib/prisma";
import { deleteArticleService } from "@/services/articles/delete-article";
import { randomUUID } from "node:crypto";
import { type Mock, beforeEach, describe, expect, test } from "vitest";

describe("services > delete-article", () => {
	const mockId = randomUUID();

	beforeEach(() => {
		(prisma.article.delete as Mock).mockResolvedValue(undefined);
	});

	test("should delete an article with the correct id", async () => {
		await deleteArticleService({ id: mockId });

		expect(prisma.article.delete).toHaveBeenCalledWith({
			where: {
				id: mockId,
			},
		});
	});
});
