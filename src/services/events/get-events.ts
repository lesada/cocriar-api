import { prisma } from "@/lib/prisma";

export async function getEventsService() {
	const events = await prisma.event.findMany();

	return events;
}
