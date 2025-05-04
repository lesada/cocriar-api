import { prisma } from "@/lib/prisma";
import { createEventsService } from "@/services/events/create-event";
import { type Mock, beforeEach, describe, expect, test } from "vitest";

describe("services > create-events", () => {
	const mockEventInput = {
		title: "Test Event",
		image_url: "https://example.com/image.png",
		tag: "technology",
		description: "Test event description",
		event_date: new Date("2025-12-01T20:00:00Z"),
		address: "123 Flower Street",
		max_participants: 100,
	};

	const mockCreatedEvent = {
		id: "event-123",
		...mockEventInput,
		created_at: new Date(),
		updated_at: new Date(),
	};

	beforeEach(() => {
		(prisma.event.create as Mock).mockResolvedValue(mockCreatedEvent);
	});

	test("should create an event with the correct data", async () => {
		const result = await createEventsService(mockEventInput);

		expect(prisma.event.create).toHaveBeenCalledOnce();
		expect(prisma.event.create).toHaveBeenCalledWith({
			data: mockEventInput,
		});

		expect(result).toEqual(mockCreatedEvent);
	});
});
