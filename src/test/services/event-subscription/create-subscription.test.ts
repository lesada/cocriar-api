import { EventNotFoundError } from "@/errors/event-not-found";
import { UserAlreadySubscribedError } from "@/errors/user-already-subscribed";
import { prisma } from "@/lib/prisma";
import { createSubscriptionService } from "@/services/event-subscription/create-subscription";
import { describe, expect, it, vi } from "vitest";

describe("services > create-subscription", () => {
	const validPayload = {
		event_id: "3ac41c9e-5b58-45cd-8ed7-f9a2b2a2ccf7",
		email: "user@example.com",
		name: "Jane Doe",
		birthdate: new Date("1990-01-01"),
		cellphone: "123456789",
		entity: "Some entity",
	};

	it("should throw EventNotFoundError if event does not exist", async () => {
		vi.mocked(prisma.event.findUnique).mockResolvedValueOnce(null); // Evento não encontrado

		await expect(createSubscriptionService(validPayload)).rejects.toThrowError(
			new EventNotFoundError(validPayload.event_id),
		);
	});

	it("should throw UserAlreadySubscribedError if user is already subscribed", async () => {
		vi.mocked(prisma.event.findUnique).mockResolvedValue({
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

		vi.mocked(prisma.subscribedUser.findFirst).mockResolvedValue({
			id: "c6ee7c31-f517-4541-a621-a61e7d2a9d3d",
			event_id: validPayload.event_id,
			email: validPayload.email,
			name: validPayload.name,
			birthdate: validPayload.birthdate,
			cellphone: validPayload.cellphone,
			entity: validPayload.entity,
		});

		await expect(createSubscriptionService(validPayload)).rejects.toThrowError(
			new UserAlreadySubscribedError(validPayload.email, validPayload.event_id),
		);
	});

	it("should create and return a subscription if event exists and user is not subscribed", async () => {
		vi.mocked(prisma.event.findUnique).mockResolvedValue({
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

		const createdSubscription = {
			id: "subscription-id",
			...validPayload,
		};

		vi.mocked(prisma.subscribedUser.create).mockResolvedValueOnce(
			createdSubscription,
		);

		const result = await createSubscriptionService(validPayload);

		expect(result).toEqual(createdSubscription);
	});
});
