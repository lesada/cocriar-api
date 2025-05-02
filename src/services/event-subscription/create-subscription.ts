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
