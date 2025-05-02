export class UserNotSubscribedError extends Error {
	public email: string;
	public event_id: string;

	constructor(email: string, event_id: string) {
		super("User not subscribed");
		this.name = "UserNotSubscribedError";
		this.email = email;
		this.event_id = event_id;
		Error.captureStackTrace?.(this, UserNotSubscribedError);
	}
}
