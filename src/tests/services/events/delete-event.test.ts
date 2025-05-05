import { EventNotFoundError } from "@/errors/event-not-found";
import { prisma } from "@/lib/prisma";
import { deleteEventService } from "@/services/events/delete-event";
import { type Mock, beforeEach, describe, expect, test, vi } from "vitest";

describe("services > events > delete-events", () => {
	const mockEventId = "event-123";

	beforeEach(() => {
		vi.clearAllMocks();

		(prisma.event.findUnique as Mock).mockReset();
		(prisma.event.delete as Mock).mockReset();
	});

	test("should delete an event if it exists", async () => {
		(prisma.event.findUniqueOrThrow as Mock).mockResolvedValue({
			id: mockEventId,
		});
		(prisma.event.delete as Mock).mockResolvedValue({ id: mockEventId });

		await deleteEventService({ event_id: mockEventId });

		expect(prisma.event.findUniqueOrThrow).toHaveBeenCalledOnce();
		expect(prisma.event.findUniqueOrThrow).toHaveBeenCalledWith({
			where: { id: mockEventId },
		});

		expect(prisma.event.delete).toHaveBeenCalledOnce();
		expect(prisma.event.delete).toHaveBeenCalledWith({
			where: { id: mockEventId },
		});
	});

	test("should throw EventNotFoundError if event does not exist", async () => {
		(prisma.event.findUniqueOrThrow as Mock).mockRejectedValue(
			new Error("Not found"),
		);

		await expect(deleteEventService({ event_id: mockEventId })).rejects.toThrow(
			EventNotFoundError,
		);

		expect(prisma.event.findUniqueOrThrow).toHaveBeenCalledOnce();
		expect(prisma.event.delete).not.toHaveBeenCalled();
	});
});
