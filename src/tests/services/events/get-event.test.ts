import { prisma } from "@/lib/prisma";
import { getEventsService } from "@/services/events/get-events";
import { randomUUID } from "node:crypto";
import { type Mock, describe, expect, test } from "vitest";

describe("services > get-events", () => {
	const mockEvents = [
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
		{
			id: randomUUID(),
			title: "Event 2",
			image_url:
				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAA6ElEQVR4nO3QQQ3AIADAQJhxpIOF9UVI7hQ0nXuswT/f7YCXmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFRzgswJGYSWUJwAAAABJRU5ErkJggg==",
			tag: "tech",
			description: "Second event",
			event_date: new Date("2025-12-01T20:00:00Z"),
			address: "Address",
			max_participants: 100,
			created_at: new Date(),
			updated_at: new Date(),
		},
	];

	test("should return a list of events", async () => {
		(prisma.event.findMany as Mock).mockResolvedValue(mockEvents);
		const result = await getEventsService();

		expect(prisma.event.findMany).toHaveBeenCalledOnce();
		expect(result).toEqual(mockEvents);
	});
});
