import {
	deleteEvent,
	deleteEventParamsSchema,
} from "@/http/controllers/events/delete-event";
import type { FastifyReply, FastifyRequest } from "fastify";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("http > controllers > event-subscription > delete-subscription", () => {
	let mockReply: FastifyReply;
	let mockRequest: FastifyRequest;

	beforeEach(() => {
		mockReply = {
			status: vi.fn().mockReturnThis(),
			send: vi.fn().mockReturnThis(),
		} as unknown as FastifyReply;

		mockRequest = {
			params: { event_id: "invalid-event-id" },
		} as FastifyRequest;
	});

	it("should return 400 if params are invalid", async () => {
		const mockFormat = vi.fn().mockReturnValueOnce([
			{
				message: "Invalid event_id",
				path: ["event_id"],
				code: "invalid_type",
			},
		]);

		const mockSafeParseParams = vi.fn().mockReturnValueOnce({
			success: false,
			error: {
				format: mockFormat,
				issues: [
					{
						message: "Invalid event_id",
						path: ["event_id"],
						code: "invalid_type",
					},
				],
				message: "Invalid event_id",
				isEmpty: false,
			},
		});

		deleteEventParamsSchema.safeParse = mockSafeParseParams;

		await deleteEvent(mockRequest, mockReply);

		expect(mockReply.status).toHaveBeenCalledWith(400);
		expect(mockReply.send).toHaveBeenCalledWith({
			error: "Invalid params",
			issues: [
				{
					message: "Invalid event_id",
					path: ["event_id"],
					code: "invalid_type",
				},
			],
		});
	});
});
