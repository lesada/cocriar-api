import { EventNotFoundError } from "@/errors/event-not-found";
import { UserAlreadySubscribedError } from "@/errors/user-already-subscribed";
import { prisma } from "@/lib/prisma";

interface CreateSubscriptionService {
	event_id: string;
	birthdate: Date;
	cellphone: string;
	email: string;
	entity: string;
	name: string;
}

export async function createSubscriptionService({
	event_id,
	birthdate,
	cellphone,
	email,
	entity,
	name,
}: CreateSubscriptionService) {
	const eventExists = await prisma.event.findUnique({
		where: { id: event_id },
		select: { id: true },
	});

	if (!eventExists) {
		throw new EventNotFoundError(event_id);
	}

	const alreadySubscribed = await prisma.subscribedUser.findFirst({
		where: {
			event_id,
			email,
		},
	});

	if (alreadySubscribed) {
		throw new UserAlreadySubscribedError(email, event_id);
	}

	const subscription = await prisma.subscribedUser.create({
		data: {
			event_id,
			birthdate,
			cellphone,
			email,
			entity,
			name,
		},
	});

	return subscription;
}
