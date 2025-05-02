import { app } from "@/app";
import { afterAll, beforeAll, beforeEach, vi } from "vitest";

beforeAll(async () => {
	await app.ready();
});

afterAll(async () => {
	await app.close();
});

beforeEach(() => {
	vi.clearAllMocks();
});
