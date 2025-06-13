import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [tsconfigPaths()],

	test: {
		dir: "src",
		coverage: {
			reporter: ["text", "lcov"],
			reportsDirectory: "./coverage",
		},
		workspace: [
			{
				extends: true,
				test: {
					name: "unit",
					dir: "src/tests/services",
					environment:
						"./prisma/vitest-environment-prisma/prisma-test-environment.ts",
				},
			},
			{
				extends: true,
				test: {
					name: "e2e",
					dir: "src/tests/controllers",
					environment:
						"./prisma/vitest-environment-prisma/prisma-test-environment.ts",
				},
			},
		],
	},
});
