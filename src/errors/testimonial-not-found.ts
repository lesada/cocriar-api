export class TestimonialNotFoundError extends Error {
	public testimonial_id: string;

	constructor(testimonialId: string) {
		super("Testimonial id not found");
		this.name = "TestimonialNotFoundError";
		this.testimonial_id = testimonialId;

		Error.captureStackTrace?.(this, TestimonialNotFoundError);
	}
}
