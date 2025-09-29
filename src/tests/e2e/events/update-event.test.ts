import { app } from "@/app";
import { randomUUID } from "node:crypto";
import supertest from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("http > controllers > events > update-event", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should update event and return 200", async () => {
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

		const response = await supertest(app.server).patch(`/events/${id}`).send({
			title: "Updated Title",
			image_url:
				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAA6ElEQVR4nO3QQQ3AIADAQJhxpIOF9UVI7hQ0nXuswT/f7YCXm",
			content: "Updated Content",
			event_date: "2012-04-23T18:25:43.511Z",
			address: "Updated Address",
			max_participants: "200",
		});

		expect(response.statusCode).toBe(200);
		expect(response.body.event).toEqual(
			expect.objectContaining({
				id,
				title: "Updated Title",
				image_url:
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAA6ElEQVR4nO3QQQ3AIADAQJhxpIOF9UVI7hQ0nXuswT/f7YCXm",
				content: "Updated Content",
				event_date: "2012-04-23T18:25:43.511Z",
				address: "Updated Address",
				max_participants: 200,
			}),
		);
	});

	it("should return 400 if params are invalid", async () => {
		const response = await supertest(app.server).patch("/events/1");

		expect(response.statusCode).toBe(400);
	});

	it("should return 404 if event does not exist", async () => {
		const response = await supertest(app.server)
			.patch(`/events/${randomUUID}`)
			.send({
				title: "Updated Title",
				image_url:
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAA6ElEQVR4nO3QQQ3AIADAQJhxpIOF9UVI7hQ0nXuswT/f7YCXm",
				content: "Updated Content",
				event_date: "2012-04-23T18:25:43.511Z",
				address: "Updated Address",
				max_participants: "200",
			});

		expect(response.statusCode).toBe(404);
	});
});
