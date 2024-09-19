export type MailboxLockObject = {
	path: string;
	release: (...params: any[]) => any;
}

export type MailboxObject = {
	path: string;
	delimiter: string;
	flags: Set<string>;
	specialUse?: string;
	listed: boolean;
	subscribed: boolean;
	permanentFlags: Set<string>;
	mailboxId?: string;
	highestModseq?: bigint;
	noModseq?: string;
	uidValidity: bigint;
	uidNext: number;
	exists: number;
}


export type MessageAddressObject = {
	name?: string;
	address: string;
}

export type MessageEnvelopeObject = {
	date: Date;
	subject: string;
	messageId?: string;
	inReplyTo?: string;
	from: MessageAddressObject[];
	sender?: MessageAddressObject[];
	replyTo?: MessageAddressObject[];
	to?: MessageAddressObject[];
	cc?: MessageAddressObject[];
	bcc?: MessageAddressObject[];
}

export type MessageStructureObject = {
	part: string;
	type: string;
	parameters?: any;
	id?: string;
	encoding?: string;
	size?: number;
	envelope?: MessageEnvelopeObject;
	disposition?: string;
	dispositionParameters?: any;
	childNodes: MessageStructureObject[];
}

export type FetchMessageObject = {
	seq: number;
	uid: number;
	source?: Buffer;
	modseq?: bigint;
	emailId?: string;
	threadid?: string;
	labels?: Set<string>;
	size?: number;
	flags: Set<string>;
	flagColor?: string;
	envelope: MessageEnvelopeObject;
	bodyStructure?: MessageStructureObject;
	internalDate?: Date;
	bodyParts?: Map<string, Buffer>;
	headers?: Buffer;
}

export type StatusObject = {
	path: string;
	messages?: number;
	recent?: number;
	uidNext?: number;
	uidValidity?: bigint;
	unseen?: number;
	highestModseq?: bigint;
}

export type ListResponse = {
	path: string;
	pathAsListed: string;
	name: string;
	delimiter: string;
	parent: String[];
	parentPath: string;
	flags: Set<string>;
	specialUse: string;
	listed: boolean;
	subscribed: boolean;
	status?: StatusObject;
}
