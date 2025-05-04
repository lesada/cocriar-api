import { describe, expect, it } from "vitest";
import { mockServer } from "../../../vitest.setup";

describe("http > routes > health", () => {
	it("should return 200 and status ok", async () => {
		const response = await mockServer.get("/health").expect(200);
		expect(response.body).toEqual({ status: "ok" });
	});
});
