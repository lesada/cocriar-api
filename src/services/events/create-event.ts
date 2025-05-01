import { prisma } from "@/lib/prisma";
import type { MultipartFile } from "@fastify/multipart";

interface CreateEventsService {
	title: string;
	image_url: MultipartFile;
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
	image_url,
	max_participants,
	tag,
	title,
}: CreateEventsService) {
	const chunks: Buffer[] = [];
	for await (const chunk of image_url.file) {
		chunks.push(chunk);
	}
	const buffer = Buffer.concat(chunks);
	const base64Image = buffer.toString("base64");

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
