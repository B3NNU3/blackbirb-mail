export type Message = {
	sequenceNumber: number,
	uid?: number,
	messageId?: string | undefined,
	text?: string,
	subject?: string,
	from?: { text: string },
	textAsHtml?: unknown,
	headers?: unknown,
	date?: Date,
	flags?: string[]
}

export type MessageView = {
	uid: number,
	subject: string,
	text: string,
	sequenceNumber: number,
	messageId?: string | undefined,
	from?: { text: string },
	textAsHtml?: unknown,
	headers?: unknown,
	date: Date,
	flags: string[]
}

export type MessageAttributes = {
	date: string,
	flags: string[],
	uid: number,
	modseq: string,
}

export type Messages = {
	[key: number]: Message
}

export enum MessageFlags {
	seen = "\\SEEN",
	deleted = "\\DELETED",
}
