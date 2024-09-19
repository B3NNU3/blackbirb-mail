// @ts-ignore
import {ImapFlow} from "imapflow"
import {ClientConfig, Authentication} from "../config/index.js";
import {FetchMessageObject, ListResponse, MailboxLockObject, MailboxObject, MessageStructureObject} from "./model.js";
import {streamToString} from "./util/stream-to-string.js";

const imapFlowClient = new ImapFlow({
	...new Authentication(),
	...new ClientConfig()
});

class ImapClient {
	private mailBoxLock: MailboxLockObject | undefined
	private mailBox: MailboxObject | undefined

	constructor(readonly client: ImapFlow) {
	}

	async connect(): Promise<void> {
		return this.client.connect()
	}

	async disconnect(): Promise<void> {
		await this.client.logout();
	}

	async getMailBoxes(): Promise<ListResponse[]> {
		return await this.client.list();
	}

	async openMailBox(boxName: string) {
		if (this.mailBoxLock) {
			this.mailBoxLock?.release();
		}
		this.mailBoxLock = await this.client.getMailboxLock(boxName);
		this.mailBox = this.client.mailbox;
	}

	async fetchMessages(): Promise<FetchMessageObject[]> {
		return (await this.client.fetchAll(`1:*`, {
			envelope: true,
			bodyStructure: true,
			bodyParts: true,
			uid: true,
			flags: true,
			headers: true,
			internalDate: true,
		})).reverse();
	}

	getMailBox(): MailboxObject | undefined {
		return this.mailBox;
	}

	async downloadContent(message: FetchMessageObject): Promise<string> {
		const partToDownload = this.selectPartToDownload(message.bodyStructure as MessageStructureObject);
		const {content} = await this.client.download(`${message.uid}`, [partToDownload], {uid: true});
		return await streamToString(content);
	}

	private selectPartToDownload(structure: MessageStructureObject): string {
		const partsMap: { [key: string]: string } = {}
		for (const child of structure.childNodes) {
			partsMap[child.type] = child.part
		}
		return partsMap['text/plain'] || partsMap['text/html'] || "1";
	}
}

export const imapClient = new ImapClient(imapFlowClient)
