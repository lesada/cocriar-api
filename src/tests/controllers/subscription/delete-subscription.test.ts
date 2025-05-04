import {
	UnsubscribeParamsSchema,
	deleteSubscription,
} from "@/http/controllers/event-subscription/delete-subscription";
import type { FastifyReply, FastifyRequest } from "fastify";
import { beforeEach, describe, expect, it, vi } from "vitest";

const body = {
	event_id: "3ac41c9e-5b58-45cd-8ed7-f9a2b2a2ccf7",
};

describe("http > controllers > event-subscription > delete-subscription", () => {
	let mockReply: FastifyReply;
	let mockRequest: FastifyRequest;

	beforeEach(() => {
		mockReply = {
			status: vi.fn().mockReturnThis(),
			send: vi.fn().mockReturnThis(),
		} as unknown as FastifyReply;

		mockRequest = {
			body,
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

		UnsubscribeParamsSchema.safeParse = mockSafeParseParams;

		await deleteSubscription(mockRequest, mockReply);

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

	it("should return 400 if params are invalid", async () => {
		const mockFormatBody = vi.fn().mockReturnValueOnce([
			{
				message: "Invalid body data",
				path: ["data"],
				code: "invalid_type",
			},
		]);

		const mockSafeParseParams = vi.fn().mockReturnValueOnce({
			success: false,
			error: {
				format: mockFormatBody,
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

		UnsubscribeParamsSchema.safeParse = mockSafeParseParams;

		await deleteSubscription(mockRequest, mockReply);

		expect(mockReply.status).toHaveBeenCalledWith(400);
		expect(mockReply.send).toHaveBeenCalledWith({
			error: "Invalid params",
			issues: [
				{
					message: "Invalid body data",
					path: ["data"],
					code: "invalid_type",
				},
			],
		});
	});
});
