export class UserAlreadySubscribedError extends Error {
	public email: string;
	public event_id: string;

	constructor(email: string, event_id: string) {
		super("User already subscribed");
		this.name = "UserAlreadySubscribedError";
		this.email = email;
		this.event_id = event_id;
		Error.captureStackTrace?.(this, UserAlreadySubscribedError);
	}
}
