import { app } from "@/app";
import supertest from "supertest";
import { afterAll, beforeAll, vi } from "vitest";

export const mockServer = supertest(app.server);

beforeAll(async () => {
	vi.mock("@/lib/prisma", () => ({
		prisma: {
			event: {
				create: vi.fn(),
				findUnique: vi.fn(),
				findMany: vi.fn(),
				delete: vi.fn(),
				findUniqueOrThrow: vi.fn(),
			},
			subscribedUser: {
				create: vi.fn(),
				delete: vi.fn(),
				findFirst: vi.fn(),
				findMany: vi.fn(),
			},
			article: {
				create: vi.fn(),
				delete: vi.fn(),
				findFirst: vi.fn(),
				findMany: vi.fn(),
				update: vi.fn(),
				findUniqueOrThrow: vi.fn(),
			},
			testimonial: {
				create: vi.fn(),
				delete: vi.fn(),
				findMany: vi.fn(),
				update: vi.fn(),
			},
		},
	}));

	await app.ready();
});

afterAll(async () => {
	await app.close();
});
