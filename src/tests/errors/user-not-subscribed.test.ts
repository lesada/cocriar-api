import { UserNotSubscribedError } from "@/errors/user-not-subscribed";
import { describe, expect, test } from "vitest";

describe("errors > user-not-subscribed", () => {
	test("create an user not subscribed error with email and eventId", () => {
		const email = "example@example.com";
		const eventId = "event-456";
		const error = new UserNotSubscribedError(email, eventId);

		expect(error).toBeInstanceOf(UserNotSubscribedError);
		expect(error).toBeInstanceOf(Error);
		expect(error.name).toBe("UserNotSubscribedError");
		expect(error.message).toBe("User not subscribed");
		expect(error.email).toBe(email);
		expect(error.event_id).toBe(eventId);
		expect(error.stack).toBeDefined();
	});
});
