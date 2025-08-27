import { getSummaryService } from "@/services/summary/get-summary";
import type { FastifyInstance } from "fastify";
import { getSummaryResponseSchema } from "../controllers/summary/get-summary";

export async function summaryRoutes(app: FastifyInstance) {
	app.get(
		"/",
		{
			schema: {
				summary: "Get summary",
				tags: ["Summary"],
				response: {
					200: getSummaryResponseSchema,
				},
			},
		},
		getSummaryService,
	);
}
