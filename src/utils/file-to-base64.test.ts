import type { MultipartFields, MultipartFile } from "@fastify/multipart";
import { describe, expect, it } from "vitest";
import { fileToBase64 } from "./file-to-base64";

class MockMultipartFile implements MultipartFile {
	filename: string;
	encoding: string;
	mimetype: string;
	// biome-ignore lint: complex to mock file type
	file: any;
	type: "file";
	fieldname: string;
	fields: MultipartFields;

	constructor(content: string) {
		this.filename = "test.jpg";
		this.encoding = "7bit";
		this.mimetype = "image/jpeg";
		this.type = "file";
		this.fieldname = "file";
		this.fields = {};
		this.file = (async function* () {
			const chunkSize = 10;
			let position = 0;
			while (position < content.length) {
				yield Buffer.from(content.slice(position, position + chunkSize));
				position += chunkSize;
			}
		})();
	}

	toBuffer: () => Promise<Buffer> = async () => {
		const chunks: Buffer[] = [];
		for await (const chunk of this.file) {
			chunks.push(chunk);
		}
		return Buffer.concat(chunks);
	};
}

describe("fileToBase64", () => {
	it("should convert file content to base64", async () => {
		const mockFileContent = "Hello, this is a test content!";
		const mockFile = new MockMultipartFile(mockFileContent);

		const result = await fileToBase64(mockFile);

		const expectedBase64 = Buffer.from(mockFileContent).toString("base64");
		expect(result).toBe(expectedBase64);
	});
});
