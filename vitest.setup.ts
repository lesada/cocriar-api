import { beforeAll, vi } from "vitest";

beforeAll(() => {
	vi.mock("@/lib/prisma", () => ({
		prisma: {
			event: {
				create: vi.fn(),
			},
		},
	}));
});
