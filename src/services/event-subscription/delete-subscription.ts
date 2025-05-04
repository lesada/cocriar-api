import { EventNotFoundError } from "@/errors/event-not-found";
import { UserNotSubscribedError } from "@/errors/user-not-subscribed";
import { prisma } from "@/lib/prisma";

interface DeleteSubscriptionService {
	event_id: string;
	email: string;
}

export async function deleteSubscriptionService({
	event_id,
	email,
}: DeleteSubscriptionService) {
	const eventExists = await prisma.event.findUnique({
		where: { id: event_id },
		select: { id: true },
	});

	if (!eventExists) {
		throw new EventNotFoundError(event_id);
	}

	const userSubscribed = await prisma.subscribedUser.findFirst({
		where: {
			event_id,
			email,
		},
	});

	if (!userSubscribed) {
		throw new UserNotSubscribedError(email, event_id);
	}

	await prisma.subscribedUser.delete({
		where: {
			email_event_id: {
				email,
				event_id,
			},
		},
	});
}
