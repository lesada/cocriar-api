import { app } from "@/app";
import supertest from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("http > controllers > event-subscription > delete-subscription", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should delete subscription and return 204", async () => {
		const createdEvent = await supertest(app.server).post("/events").send({
			title: "Title XYZ",
			image_url:
				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAA6ElEQVR4nO3QQQ3AIADAQJhxpIOF9UVI7hQ0nXuswT/f7YCXmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFRzgswJGYSWUJwAAAABJRU5ErkJggg==",
			content: "XXXX",
			event_date: "2012-04-23T18:25:43.511Z",
			address: "Fifth Avenue, 785",
			max_participants: "100",
		});

		const { id } = createdEvent.body.event;

		const createdSubcription = await supertest(app.server)
			.post(`/events/subscribe/${id}`)
			.send({
				birthdate: new Date(),
				cellphone: "511111",
				email: "john.doe@example.com",
				entity: "ds",
				name: "john doe",
			});

		const { event_id } = createdSubcription.body.subscription;
		const response = await supertest(app.server)
			.delete(`/events/subscribe/${event_id}`)
			.send({
				email: "john.doe@example.com",
			});
		expect(response.statusCode).toBe(204);
	});

	it("should return 400 if params are invalid", async () => {
		const response = await supertest(app.server).delete("/events/subscribe/1");

		expect(response.statusCode).toBe(400);
	});
});
