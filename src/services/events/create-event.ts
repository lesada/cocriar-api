import { prisma } from "@/lib/prisma";

interface CreateEventsService {
	title: string;
	image_url: string;
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
	const event = await prisma.event.create({
		data: {
			address,
			description,
			event_date,
			image_url,
			tag,
			title,
			max_participants,
		},
	});

	return event;
}
