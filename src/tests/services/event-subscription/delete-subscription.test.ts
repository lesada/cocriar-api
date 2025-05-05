import { EventNotFoundError } from "@/errors/event-not-found";
import { UserNotSubscribedError } from "@/errors/user-not-subscribed";
import { prisma } from "@/lib/prisma";
import { deleteSubscriptionService } from "@/services/event-subscription/delete-subscription";
import { describe, expect, it, vi } from "vitest";

describe("services > subscriptions > delete-subscription", () => {
	const validPayload = {
		event_id: "3ac41c9e-5b58-45cd-8ed7-f9a2b2a2ccf7",
		email: "user@example.com",
	};

	it("should fail to delete subscription when the event does not exist", async () => {
		vi.mocked(prisma.event.findUnique).mockResolvedValueOnce(null);

		await expect(deleteSubscriptionService(validPayload)).rejects.toThrowError(
			new EventNotFoundError(validPayload.event_id),
		);
	});

	it("should fail to delete subscription when user is not subscribed to the event", async () => {
		vi.mocked(prisma.event.findUnique).mockResolvedValueOnce({
			id: validPayload.event_id,
			title: "Sample Event",
			image_url: "https://example.com/event.png",
			tag: "Technology",
			description: "Sample event description",
			created_at: new Date(),
			event_date: new Date("2025-12-01T20:00:00Z"),
			address: "123 Event Street",
			max_participants: 100,
		});

		vi.mocked(prisma.subscribedUser.findFirst).mockResolvedValueOnce(null);

		await expect(deleteSubscriptionService(validPayload)).rejects.toThrowError(
			new UserNotSubscribedError(validPayload.email, validPayload.event_id),
		);
	});

	it("should successfully delete subscription when user is subscribed to the event", async () => {
		vi.mocked(prisma.event.findUnique).mockResolvedValueOnce({
			id: validPayload.event_id,
			title: "Sample Event",
			image_url: "https://example.com/event.png",
			tag: "Technology",
			description: "Sample event description",
			created_at: new Date(),
			event_date: new Date("2025-12-01T20:00:00Z"),
			address: "123 Event Street",
			max_participants: 100,
		});

		vi.mocked(prisma.subscribedUser.findFirst).mockResolvedValueOnce({
			email: validPayload.email,
			event_id: validPayload.event_id,
			name: "Jane Doe",
			birthdate: new Date("1990-01-01"),
			cellphone: "123456789",
			entity: "Some entity",
			id: "3ac41c9e-5b58-45cd-8ed7-f9a2b2a2ccf7",
		});

		const deleteMock = vi
			.mocked(prisma.subscribedUser.delete)
			.mockResolvedValueOnce({
				email: validPayload.email,
				event_id: validPayload.event_id,
				name: "Jane Doe",
				birthdate: new Date("1990-01-01"),
				cellphone: "123456789",
				entity: "Some entity",
				id: "3ac41c9e-5b58-45cd-8ed7-f9a2b2a2ccf7",
			});

		await expect(
			deleteSubscriptionService(validPayload),
		).resolves.toBeUndefined();

		expect(deleteMock).toHaveBeenCalledWith({
			where: {
				email_event_id: {
					email: validPayload.email,
					event_id: validPayload.event_id,
				},
			},
		});
	});
});
