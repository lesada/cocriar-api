import { prisma } from "@/lib/prisma";

interface CreateEventService {
	title: string;
	image_url: string;
	content: string;
	event_date: Date;
	address: string;
	max_participants?: number;
}

export async function createEventService({
	address,
	content,
	event_date,
	image_url,
	max_participants,
	title,
}: CreateEventService) {
	const event = await prisma.event.create({
		data: {
			address,
			content,
			event_date,
			image_url,
			title,
			max_participants,
		},
	});

	return event;
}
