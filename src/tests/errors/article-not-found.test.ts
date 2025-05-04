import { ArticleNotFoundError } from "@/errors/article-not-found";
import { describe, expect, test } from "vitest";

describe("errors > article-not-found", () => {
	test("create an article not found error with article id", () => {
		const articleId = "article-xyz";
		const error = new ArticleNotFoundError(articleId);

		expect(error).toBeInstanceOf(ArticleNotFoundError);
		expect(error).toBeInstanceOf(Error);
		expect(error.name).toBe("ArticleNotFoundError");
		expect(error.message).toBe("Article id not found");
		expect(error.article_id).toBe(articleId);
		expect(error.stack).toBeDefined();
	});
});
