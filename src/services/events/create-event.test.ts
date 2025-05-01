import { prisma } from "@/lib/prisma";
import { createEventsService } from "@/services/events/create-event";
import { fileToBase64 } from "@/utils/file-to-base64";
import type { MultipartFile } from "@fastify/multipart";
import { beforeEach, describe, expect, test, vi } from "vitest";

vi.mock("@/utils/file-to-base64", () => ({
	fileToBase64: vi.fn().mockResolvedValue("mockedBase64String"),
}));

vi.mock("@/lib/prisma", () => ({
	prisma: {
		event: {
			create: vi.fn(),
		},
	},
}));

// Mock do arquivo MultipartFile
const mockMultipartFile = {
	toBuffer: async () => Buffer.from("dummy image"),
} as MultipartFile;

describe("services > events > createEventsService", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test("should successfully create an event", async () => {
		const fixedDate = new Date("2025-05-01T00:00:00Z");

		const eventInput = {
			title: "Test Event",
			image: mockMultipartFile,
			tag: "tech",
			description: "An event for testing",
			event_date: fixedDate,
			address: "123 Test St",
			max_participants: 100,
		};

		await createEventsService(eventInput);

		expect(fileToBase64).toHaveBeenCalledWith(mockMultipartFile);
		expect(prisma.event.create).toHaveBeenCalledWith({
			data: {
				address: "123 Test St",
				description: "An event for testing",
				event_date: fixedDate,
				image_url: "mockedBase64String",
				max_participants: 100,
				tag: "tech",
				title: "Test Event",
			},
		});
		expect(prisma.event.create).toHaveBeenCalledTimes(1);
	});
});
