import { updateEvent } from "@/http/controllers/events/update-event";
import type { FastifyReply, FastifyRequest } from "fastify";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/services/events/update-event", () => ({
	updateEventService: vi.fn().mockResolvedValue({
		id: "123e4567-e89b-12d3-a456-426614174000",
		title: "Event 1",
		image_url:
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAA6ElEQVR4nO3QQQ3AIADAQJhxpIOF9UVI7hQ0nXuswT/f7YCXmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFRzgswJGYSWUJwAAAABJRU5ErkJggg==",
		tag: "tech",
		description: "Updated description",
		event_date: new Date(),
		address: "Address",
		max_participants: 200,
		created_at: new Date(),
		updated_at: new Date(),
	}),
}));

describe("http > controllers > events > update-event", () => {
	let mockReply: FastifyReply;
	let mockRequest: FastifyRequest;

	beforeEach(() => {
		mockReply = {
			status: vi.fn().mockReturnThis(),
			send: vi.fn().mockReturnThis(),
		} as unknown as FastifyReply;

		mockRequest = {
			params: {
				event_id: "123e4567-e89b-12d3-a456-426614174000",
			},
			body: {
				title: "Event 1",
				image_url:
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAA6ElEQVR4nO3QQQ3AIADAQJhxpIOF9UVI7hQ0nXuswT/f7YCXmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFRzgswJGYSWUJwAAAABJRU5ErkJggg==",
				tag: "tech",
				description: "Updated description",
				event_date: new Date(),
				address: "Address",
				max_participants: 200,
				created_at: new Date(),
				updated_at: new Date(),
			},
		} as unknown as FastifyRequest;
	});

	it("should return 200 and the updated event", async () => {
		await updateEvent(mockRequest, mockReply);

		expect(mockReply.status).toHaveBeenCalledWith(200);
	});

	it("should return 400 if params are invalid", async () => {
		mockRequest.params = { event_id: "invalid-id" };

		await updateEvent(mockRequest, mockReply);

		expect(mockReply.status).toHaveBeenCalledWith(400);
		expect(mockReply.send).toHaveBeenCalledWith(
			expect.objectContaining({ error: "Invalid params" }),
		);
	});

	it("should return 400 if body is invalid", async () => {
		mockRequest.body = {
			max_participants: "not-a-number",
		};

		await updateEvent(mockRequest, mockReply);

		expect(mockReply.status).toHaveBeenCalledWith(400);
		expect(mockReply.send).toHaveBeenCalledWith(
			expect.objectContaining({ error: "Invalid body schema" }),
		);
	});
});
