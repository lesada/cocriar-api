import type { FastifyReply } from "fastify";

export function checkBase64MimeTypes(base64: string, rep: FastifyReply) {
	const allowedMimeTypes = [
		"image/jpeg",
		"image/png",
		"image/webp",
		"image/jpg",
	];

	const mimeRegex = /^data:(image\/(jpeg|png|webp|jpg));base64,/;
	const match = mimeRegex.exec(base64);

	if (!match || !allowedMimeTypes.includes(match[1])) {
		return rep
			.status(400)
			.send({ error: "Invalid file type. Only images are allowed." });
	}
}
