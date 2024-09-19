export async function streamToString(stream: ReadableStream<string>): Promise<string> {
	const chunks = [];
	// @ts-expect-error ReadableStream<string> must have an async iterator
	for await (const chunk of stream) {
		chunks.push(Buffer.from(chunk));
	}
	return Buffer.concat(chunks).toString("utf-8");
}
