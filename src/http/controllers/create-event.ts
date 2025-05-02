import { createEventsService } from "@/services/events/create-event";
import { separateFieldsAndFiles } from "@/utils/fields-and-files-multipart";
import type { MultipartFile } from "@fastify/multipart";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

function checkTypeImage(imageFile: MultipartFile, rep: FastifyReply) {
	const allowedMimeTypes = [
		"image/jpeg",
		"image/png",
		"image/webp",
		"image/jpg",
	];

	if (!allowedMimeTypes.includes(imageFile.mimetype)) {
		return rep
			.status(400)
			.send({ error: "Invalid file type. Only images are allowed." });
	}
}

const createEventBodySchema = z.object({
	title: z.string(),
	tag: z.string(),
	description: z.string(),
	event_date: z.coerce.date(),
	address: z.string(),
	max_participants: z.coerce
		.number()
		.min(1, "Number of participants must be bigger than 0")
		.optional(),
});

export async function createEvent(req: FastifyRequest, rep: FastifyReply) {
	const { fields, imageFile } = await separateFieldsAndFiles(req);

	if (!imageFile) {
		return rep.status(400).send({ error: "Image file is required." });
	}

	checkTypeImage(imageFile, rep);

	const parsed = createEventBodySchema.safeParse(fields);

	if (!parsed.success) {
		return rep.status(400).send(parsed.error.format());
	}

	await createEventsService({
		...parsed.data,
		image: imageFile,
	});

	return rep.status(201).send();
}
