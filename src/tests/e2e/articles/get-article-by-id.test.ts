import { app } from "@/app";
import { randomUUID } from "node:crypto";
import supertest from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("controllers > get-event-by-id", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should not found event and return 404", async () => {
		const response = await supertest(app.server).get(`/events/${randomUUID()}`);
		expect(response.statusCode).toBe(404);
	});

	it("should return the event", async () => {
		const created = await supertest(app.server).post("/events").send({
			title: "Title XYZ",
			image_url:
				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAA6ElEQVR4nO3QQQ3AIADAQJhxpIOF9UVI7hQ0nXuswT/f7YCXmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFRzgswJGYSWUJwAAAABJRU5ErkJggg==",
			content: "XXXX",
			event_date: "2012-04-23T18:25:43.511Z",
			address: "Fifth Avenue, 785",
			max_participants: "100",
		});
		const { id } = created.body.event;

		const response = await supertest(app.server).get(`/events/${id}`);
		expect(response.statusCode).toBe(200);
		expect(response.body.event).toEqual(
			expect.objectContaining({
				title: "Title XYZ",
				image_url:
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAA6ElEQVR4nO3QQQ3AIADAQJhxpIOF9UVI7hQ0nXuswT/f7YCXmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFRzgswJGYSWUJwAAAABJRU5ErkJggg==",
				content: "XXXX",
				event_date: "2012-04-23T18:25:43.511Z",
				address: "Fifth Avenue, 785",
				max_participants: 100,
			}),
		);
	});
});
