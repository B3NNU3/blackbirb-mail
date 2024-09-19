// @ts-ignore
import {ImapFlow} from "imapflow"
import {ClientConfig, Authentication} from "../config/index.js";
import {FetchMessageObject, ListResponse, MailboxLockObject, MailboxObject, MessageStructureObject} from "./model.js";
import {streamToString} from "./util/stream-to-string.js";
import {safe} from "../../utils/safe.js";

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
		return await this.client.list({
			statusQuery: {
				messages: true,
				recent: true,
				uidNext: true,
				uidValidity: true,
				unseen: true,
				highestModseq: true,
			}
		});
	}

	async openMailBox(boxName: string) {
		if (this.mailBoxLock) {
			this.mailBoxLock?.release();
		}
		this.mailBoxLock = await this.client.getMailboxLock(boxName);
		this.mailBox = this.client.mailbox;
	}

	async fetchMessages(): Promise<FetchMessageObject[]> {

		const messageListResult = await safe<FetchMessageObject[]>(this.client.fetchAll(`1:*`, {
			envelope: true,
			bodyStructure: true,
			bodyParts: true,
			uid: true,
			flags: true,
			headers: true,
			internalDate: true,
		}));
		if (messageListResult.success) {
			return messageListResult.data.reverse();
		}
		return [] as FetchMessageObject[];
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
		if (!structure.childNodes || structure.childNodes.length < 1) {
			return "TEXT";
		}

		const partsMap: { [key: string]: string } = {}
		for (const child of structure.childNodes) {
			partsMap[child.type] = child.part
		}
		return partsMap['text/plain'] || partsMap['text/html'] || "1";
	}
}

export const imapClient = new ImapClient(imapFlowClient)
