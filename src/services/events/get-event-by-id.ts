import { EventNotFoundError } from "@/errors/event-not-found";
import { prisma } from "@/lib/prisma";

interface GetEventByIdService {
	id: string;
}

export async function getEventByIdService({ id }: GetEventByIdService) {
	const event = await prisma.event
		.findUniqueOrThrow({
			where: {
				id,
			},
		})
		.catch(() => {
			throw new EventNotFoundError(id);
		});

	return event;
}
