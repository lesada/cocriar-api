import type { MultipartFile } from "@fastify/multipart";
import type { FastifyRequest } from "fastify";

export async function separateFieldsAndFiles(req: FastifyRequest) {
	const parts = req.parts();
	const fields: Record<string, string> = {};

	let imageFile: MultipartFile | null = null;

	for await (const part of parts) {
		if (part.type === "file" && part.fieldname === "image_url") {
			imageFile = part;
		} else if (part.type === "field") {
			fields[part.fieldname] = String(part.value);
		}
	}

	return {
		imageFile,
		fields,
	};
}
