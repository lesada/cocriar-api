import type { MultipartFile } from "@fastify/multipart";

export async function fileToBase64(content: MultipartFile) {
	const chunks: Buffer[] = [];
	for await (const chunk of content.file) {
		chunks.push(chunk);
	}
	const buffer = Buffer.concat(chunks);
	const base64Image = buffer.toString("base64");

	return base64Image;
}
