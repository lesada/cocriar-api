import { prisma } from "@/lib/prisma";

interface CreateEventService {
	title: string;
	image_url: string;
	tag: string;
	description: string;
	event_date: Date;
	address: string;
	max_participants?: number;
}

export async function createEventService({
	address,
	description,
	event_date,
	image_url,
	max_participants,
	tag,
	title,
}: CreateEventService) {
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
