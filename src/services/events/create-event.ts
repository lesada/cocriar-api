import { prisma } from "@/lib/prisma";
import { fileToBase64 } from "@/utils/file-to-base64";
import type { MultipartFile } from "@fastify/multipart";

interface CreateEventsService {
	title: string;
	image: MultipartFile;
	tag: string;
	description: string;
	event_date: Date;
	address: string;
	max_participants?: number;
}

export async function createEventsService({
	address,
	description,
	event_date,
	image,
	max_participants,
	tag,
	title,
}: CreateEventsService) {
	const base64Image = await fileToBase64(image);

	await prisma.event.create({
		data: {
			address,
			description,
			event_date,
			image_url: base64Image,
			tag,
			title,
			max_participants,
		},
	});
}
