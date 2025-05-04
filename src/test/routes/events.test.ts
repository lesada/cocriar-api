import { prisma } from "@/lib/prisma";
import { mockServer } from "@/test/setup";
import { type Mock, describe, expect, it } from "vitest";

describe("http > routes > events", () => {
	it("should create an event with valid body", async () => {
		const mockInput = {
			title: "Test Event",
			image_url: "https://example.com/image.png",
			tag: "tech",
			description: "Descrição do evento",
			event_date: new Date("2025-12-01T20:00:00Z").toISOString(),
			address: "Rua das Flores, 123",
			max_participants: 100,
		};

		const mockOutput = {
			id: "mock-event-id",
			...mockInput,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		};

		(prisma.event.create as Mock).mockResolvedValue(mockOutput);

		const response = await mockServer
			.post("/events")
			.send(mockInput)
			.expect(201);

		expect(response.body).toEqual({
			event: mockOutput,
		});
	});
});
