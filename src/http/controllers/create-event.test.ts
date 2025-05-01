import { createEventsService } from "@/services/events/create-event";
import { separateFieldsAndFiles } from "@/utils/fields-and-files-multipart";
import type { MultipartFile } from "@fastify/multipart";
import type { FastifyReply, FastifyRequest } from "fastify";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { createEvent } from "./create-event";

vi.mock("@/utils/fields-and-files-multipart", () => ({
	separateFieldsAndFiles: vi.fn(),
}));

vi.mock("@/services/events/create-event", () => ({
	createEventsService: vi.fn(),
}));

describe("http > controllers > events > create-event", () => {
	let mockReply: FastifyReply;
	let mockRequest: FastifyRequest;

	beforeEach(() => {
		mockReply = {
			status: vi.fn().mockReturnThis(),
			send: vi.fn(),
		} as unknown as FastifyReply;

		mockRequest = {} as FastifyRequest;
	});

	test("should return 400 if no image file is provided", async () => {
		const mockSeparateFieldsAndFiles = vi.mocked(separateFieldsAndFiles);
		mockSeparateFieldsAndFiles.mockResolvedValueOnce({
			fields: {},
			imageFile: null,
		});

		await createEvent(mockRequest, mockReply);

		expect(mockReply.status).toHaveBeenCalledWith(400);
		expect(mockReply.send).toHaveBeenCalledWith({
			error: "Image file is required.",
		});

		expect(createEventsService).not.toHaveBeenCalled();
	});

	test("should return 400 if fields are invalid (fails schema validation)", async () => {
		const mockSeparateFieldsAndFiles = vi.mocked(separateFieldsAndFiles);
		mockSeparateFieldsAndFiles.mockResolvedValueOnce({
			fields: {
				title: "",
				tag: "event",
				description: "description",
				event_date: "invalid-date",
				address: "address",
				max_participants: "-5", // inválido se convertido
			},
			imageFile: {
				mimetype: "image/png",
			} as MultipartFile,
		});

		await createEvent(mockRequest, mockReply);

		expect(mockReply.status).toHaveBeenCalledWith(400);
		expect(mockReply.send).toHaveBeenCalled();
		expect(createEventsService).not.toHaveBeenCalled();
	});
});
