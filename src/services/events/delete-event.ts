import { EventNotFoundError } from "@/errors/event-not-found";
import { prisma } from "@/lib/prisma";

interface DeleteEventService {
	event_id: string;
}

export async function deleteEventService({ event_id }: DeleteEventService) {
	await prisma.event
		.findUniqueOrThrow({
			where: { id: event_id },
		})
		.catch(() => {
			throw new EventNotFoundError(event_id);
		});

	await prisma.event.delete({
		where: { id: event_id },
	});
}
