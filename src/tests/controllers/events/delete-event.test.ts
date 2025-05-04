import { EventNotFoundError } from "@/errors/event-not-found";
import { prisma } from "@/lib/prisma";
import { deleteEventService } from "@/services/events/delete-event";
import { type Mock, beforeEach, describe, expect, it, vi } from "vitest";

describe("services > events > delete-event", () => {
	const event_id = "3ac41c9e-5b58-45cd-8ed7-f9a2b2a2ccf7";

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should throw EventNotFoundError if event does not exist", async () => {
		(prisma.event.findUnique as Mock).mockResolvedValueOnce(null);

		await expect(deleteEventService({ event_id })).rejects.toThrow(
			EventNotFoundError,
		);
	});

	it("should call delete if event exists", async () => {
		(prisma.event.findUnique as Mock).mockResolvedValueOnce({ id: event_id });
		(prisma.event.delete as Mock).mockResolvedValueOnce(undefined);

		await deleteEventService({ event_id });

		expect(prisma.event.delete).toHaveBeenCalledWith({
			where: { id: event_id },
		});
	});
});
