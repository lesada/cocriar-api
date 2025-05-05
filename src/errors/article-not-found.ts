export class ArticleNotFoundError extends Error {
	public article_id: string;

	constructor(articleId: string) {
		super("Article id not found");
		this.name = "ArticleNotFoundError";
		this.article_id = articleId;

		Error.captureStackTrace?.(this, ArticleNotFoundError);
	}
}
