import { deleteSubscription } from "@/http/controllers/event-subscription/delete-subscription";
import type { FastifyReply, FastifyRequest } from "fastify";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/services/events/create-event", () => ({
	createEventsService: vi.fn().mockResolvedValue({
		title: "Title XYZ",
		image_url:
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAA6ElEQVR4nO3QQQ3AIADAQJhxpIOF9UVI7hQ0nXuswT/f7YCXmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFRzgswJGYSWUJwAAAABJRU5ErkJggg==",
		description: "XXXX",
		tag: "Tag X",
		event_date: "2012-04-23T18:25:43.511Z",
		address: "Fifth Avenue, 785",
		max_participants: "100",
	}),
}));

const body = {
	title: "Title XYZ",
	image_url:
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAA6ElEQVR4nO3QQQ3AIADAQJhxpIOF9UVI7hQ0nXuswT/f7YCXmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFRzgswJGYSWUJwAAAABJRU5ErkJggg==",
	description: "XXXX",
	tag: "Tag X",
	event_date: "2012-04-23T18:25:43.511Z",
	address: "Fifth Avenue, 785",
	max_participants: "100",
};

describe("http > controllers > events > create-event", () => {
	let mockReply: FastifyReply;
	let mockRequest: FastifyRequest;

	beforeEach(() => {
		mockReply = {
			status: vi.fn().mockReturnThis(),
			send: vi.fn().mockReturnThis(),
		} as unknown as FastifyReply;

		mockRequest = {
			body,
		} as FastifyRequest;
	});

	it("should return error 400", async () => {
		await deleteSubscription(mockRequest, mockReply);
		expect(mockReply.status).toHaveBeenCalledWith(400);
	});
});
