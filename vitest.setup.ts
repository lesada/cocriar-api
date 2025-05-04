import { app } from "@/app";
import supertest from "supertest";
import { afterAll, beforeAll, vi } from "vitest";

export const mockServer = supertest(app.server);

beforeAll(async () => {
	vi.mock("@/lib/prisma", () => ({
		prisma: {
			event: {
				create: vi.fn(),
			},
		},
	}));

	await app.ready();
});

afterAll(async () => {
	await app.close();
});
