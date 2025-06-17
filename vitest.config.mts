import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		coverage: {
			reporter: ["text", "lcov"],
			reportsDirectory: "./coverage",
		},
		workspace: [
			{
				extends: true,
				test: {
					name: "unit",
					include: ["src/tests/unit/**/*.test.ts"],
				},
			},
			{
				extends: true,
				test: {
					name: "e2e",
					include: ["src/tests/e2e/**/*.test.ts"],
					environment:
						"./prisma/vitest-environment-prisma/prisma-test-environment.ts",
				},
			},
		],
	},
});
