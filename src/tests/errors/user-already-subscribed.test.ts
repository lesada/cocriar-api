import { UserAlreadySubscribedError } from "@/errors/user-already-subscribed";
import { describe, expect, test } from "vitest";

describe("errors > user-already-subscribed", () => {
	test("create an user already subscribed error with email and eventId", () => {
		const email = "test@example.com";
		const eventId = "event-123";
		const error = new UserAlreadySubscribedError(email, eventId);

		expect(error).toBeInstanceOf(UserAlreadySubscribedError);
		expect(error).toBeInstanceOf(Error);
		expect(error.name).toBe("UserAlreadySubscribedError");
		expect(error.message).toBe("User already subscribed");
		expect(error.email).toBe(email);
		expect(error.event_id).toBe(eventId);
		expect(error.stack).toBeDefined();
	});
});
