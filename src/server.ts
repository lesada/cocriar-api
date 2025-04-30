import { app } from "./app";
import { env } from "./env";

app.get("/health", async () => {
	return {
		status: "ok",
	};
});


app
	.listen({
		host: "0.0.0.0",
		port: env.PORT,
	})
	.then(() => console.log(`HTTP Server running in port ${env.PORT} 👾`));
