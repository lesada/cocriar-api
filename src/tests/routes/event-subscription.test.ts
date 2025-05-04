import { prisma } from "@/lib/prisma";
import { mockServer } from "@/tests/setup";
import { describe, expect, it, test, vi } from "vitest";

describe("http > routes > event-subscription", () => {
	const validPayload = {
		event_id: "3ac41c9e-5b58-45cd-8ed7-f9a2b2a2ccf7",
		email: "user@example.com",
		name: "Jane Doe",
		birthdate: new Date("1990-01-01"),
		cellphone: "123456789",
		entity: "Some entity",
	};

	test("should return 404 if event does not exist", async () => {
		vi.mocked(prisma.event.findUnique).mockResolvedValue(null);

		const response = await mockServer
			.post(`/events/subscribe/${validPayload.event_id}`)
			.send(validPayload)
			.expect(404);

		expect(response.body).toEqual({
			error: "Event id not found",
			event_id: "3ac41c9e-5b58-45cd-8ed7-f9a2b2a2ccf7",
		});
	});

	it("should return 400 if user is already subscribed", async () => {
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

		const response = await mockServer
			.post(`/events/subscribe/${validPayload.event_id}`)
			.send(validPayload)
			.expect(409);

		expect(response.body).toEqual({
			email: "user@example.com",
			error: "User already subscribed",
			event_id: "3ac41c9e-5b58-45cd-8ed7-f9a2b2a2ccf7",
		});
	});
});
