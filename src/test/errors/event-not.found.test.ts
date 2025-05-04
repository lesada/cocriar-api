import { EventNotFoundError } from "@/errors/event-not-found";
import { describe, expect, test } from "vitest";

describe("errors > event-not-found", () => {
	test("create a event not found error with event id", () => {
		const eventId = "abc123";
		const error = new EventNotFoundError(eventId);

		expect(error).toBeInstanceOf(EventNotFoundError);
		expect(error).toBeInstanceOf(Error);
		expect(error.name).toBe("EventNotFoundError");
		expect(error.message).toBe("Event id not found");
		expect(error.event_id).toBe(eventId);
		expect(error.stack).toBeDefined();
	});
});
