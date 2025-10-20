import { EventNotFoundError } from "@/errors/event-not-found";
import { prisma } from "@/lib/prisma";

interface UpdateEventService {
	id: string;
	title?: string;
	image_url?: string | null;
	content?: string;
	event_date?: Date;
	address?: string;
	max_participants?: number;
}

export async function updateEventService({
	id,
	title,
	image_url,
	content,
	event_date,
	address,
	max_participants,
}: UpdateEventService) {
	try {
		const event = await prisma.event.update({
			where: {
				id,
			},
			data: {
				title,
				image_url,
				content,
				event_date,
				address,
				max_participants,
			},
		});
		return event;
	} catch {
		throw new EventNotFoundError(id);
	}
}
