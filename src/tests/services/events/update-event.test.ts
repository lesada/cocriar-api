import { EventNotFoundError } from "@/errors/event-not-found";
import { prisma } from "@/lib/prisma";
import { updateEventService } from "@/services/events/update-event";
import { randomUUID } from "node:crypto";
import { type Mock, describe, expect, test } from "vitest";

describe("services > update-event", () => {
	const mockUpdateInput = {
		id: randomUUID(),
		title: "Event 1",
		image_url:
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAA6ElEQVR4nO3QQQ3AIADAQJhxpIOF9UVI7hQ0nXuswT/f7YCXmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFRzgswJGYSWUJwAAAABJRU5ErkJggg==",
		tag: "tech",
		description: "Event Description",
		event_date: new Date(),
		address: "update",
		max_participants: 120,
	};

	const mockUpdatedEvent = {
		...mockUpdateInput,
		created_at: new Date(),
	};

	test("should update an event", async () => {
		(prisma.event.update as Mock).mockResolvedValue(mockUpdatedEvent);

		const result = await updateEventService(mockUpdateInput);

		expect(prisma.event.update).toHaveBeenCalledOnce();
		expect(prisma.event.update).toHaveBeenCalledWith({
			where: { id: mockUpdateInput.id },
			data: {
				title: mockUpdateInput.title,
				image_url: mockUpdateInput.image_url,
				tag: mockUpdateInput.tag,
				description: mockUpdateInput.description,
				event_date: mockUpdateInput.event_date,
				address: mockUpdateInput.address,
				max_participants: mockUpdateInput.max_participants,
			},
		});

		expect(result).toEqual(mockUpdatedEvent);
	});

	test("should throw EventNotFoundError if the event does not exist", async () => {
		(prisma.event.update as Mock).mockRejectedValue(
			new Error("Event not found"),
		);

		await expect(updateEventService(mockUpdateInput)).rejects.toThrow(
			EventNotFoundError,
		);
	});
});
