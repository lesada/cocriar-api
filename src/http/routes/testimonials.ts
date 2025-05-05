import type { FastifyInstance } from "fastify";
import { z } from "zod";
import {
	approveTestimonial,
	approveTestimonialParamsSchema,
	approveTestimonialResponseSchema,
} from "../controllers/testimonials/approve-testimonial";
import {
	createTestimonial,
	createTestimonialBodySchema,
	createTestimonialResponseSchema,
} from "../controllers/testimonials/create-testimonial";
import {
	deleteTestimonial,
	deleteTestimonialParamsSchema,
} from "../controllers/testimonials/delete-testimonial";
import {
	getApprovedTestimonials,
	getApprovedTestimonialsResponseSchema,
} from "../controllers/testimonials/get-approved-testimonials";
import {
	getTestimonials,
	getTestimonialsResponseSchema,
} from "../controllers/testimonials/get-testimonials";

export async function testimonialsRoutes(app: FastifyInstance) {
	app.get(
		"/",
		{
			schema: {
				summary: "List all testimonials",
				tags: ["Testimonials"],
				response: {
					200: getTestimonialsResponseSchema,
				},
			},
		},
		getTestimonials,
	);

	app.get(
		"/approved",
		{
			schema: {
				summary: "List all testimonials",
				tags: ["Testimonials"],
				response: {
					200: getApprovedTestimonialsResponseSchema,
				},
			},
		},
		getApprovedTestimonials,
	);

	app.post(
		"/",
		{
			schema: {
				summary: "Create a new testimonial",
				tags: ["Testimonials"],
				response: {
					201: createTestimonialResponseSchema,
				},
				body: createTestimonialBodySchema,
			},
		},
		createTestimonial,
	);

	app.delete(
		"/:testimonial_id",
		{
			schema: {
				summary: "Delete a testimonial",
				tags: ["Testimonials"],
				response: {
					204: z.object({}),
				},
				params: deleteTestimonialParamsSchema,
			},
		},
		deleteTestimonial,
	);

	app.put(
		"/:testimonial_id/approve",
		{
			schema: {
				summary: "Approve a testimonial",
				tags: ["Testimonials"],
				response: {
					200: approveTestimonialResponseSchema,
				},
				params: approveTestimonialParamsSchema,
			},
		},
		approveTestimonial,
	);
}
