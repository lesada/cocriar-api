import { EventNotFoundError } from "@/errors/event-not-found";
import { prisma } from "@/lib/prisma";

interface DeleteEventService {
	event_id: string;
}

export async function deleteEventService({ event_id }: DeleteEventService) {
	const event = await prisma.event.findUnique({
		where: { id: event_id },
	});

	if (!event) {
		throw new EventNotFoundError(event_id);
	}

	await prisma.event.delete({
		where: { id: event_id },
	});
}
