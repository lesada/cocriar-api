export class EventNotFoundError extends Error {
	public event_id: string;

	constructor(eventId: string) {
		super("Event id not found");
		this.name = "EventNotFoundError";
		this.event_id = eventId;

		Error.captureStackTrace?.(this, EventNotFoundError);
	}
}
