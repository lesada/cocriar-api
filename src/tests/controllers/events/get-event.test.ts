import { getEvents } from "@/http/controllers/events/get-events";
import type { FastifyReply, FastifyRequest } from "fastify";
import { randomUUID } from "node:crypto";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/services/events/get-events", () => ({
	getEventsService: vi.fn().mockResolvedValue([
		{
			id: randomUUID(),
			title: "Event 1",
			image_url:
				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAA6ElEQVR4nO3QQQ3AIADAQJhxpIOF9UVI7hQ0nXuswT/f7YCXmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFRzgswJGYSWUJwAAAABJRU5ErkJggg==",
			tag: "tech",
			description: "First event",
			event_date: new Date("2025-12-01T20:00:00Z"),
			address: "Address",
			max_participants: 100,
			created_at: new Date(),
			updated_at: new Date(),
		},
	]),
}));

describe("http > controllers > events > get-events", () => {
	let mockReply: FastifyReply;
	let mockRequest: FastifyRequest;

	beforeEach(() => {
		mockReply = {
			status: vi.fn().mockReturnThis(),
			send: vi.fn().mockReturnThis(),
		} as unknown as FastifyReply;

		mockRequest = {} as FastifyRequest;
	});

	it("should return 200 and a list of events", async () => {
		await getEvents(mockRequest, mockReply);

		expect(mockReply.status).toHaveBeenCalledWith(200);
		expect(mockReply.send).toHaveBeenCalledWith({});
	});
});
