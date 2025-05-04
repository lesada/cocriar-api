import { EventNotFoundError } from "@/errors/event-not-found";
import { prisma } from "@/lib/prisma";

interface DeleteEventsService {
	event_id: string;
}

export async function deleteEventsService({ event_id }: DeleteEventsService) {
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
