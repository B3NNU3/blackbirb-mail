// @ts-ignore
import Imap from "imap"
import {auth} from "./auth.js";
import {MessageList} from "./message-list.js";
import {simpleParser} from "mailparser";
import {MessageAttributes, MessageView} from "./model.js";

class ImapClient {
	private client: Imap | undefined;
	private messages: MessageList
	private resolveCallback: ((value: unknown) => void | undefined) | undefined;
	private rejectCallback: ((value: unknown) => void | undefined) | undefined;

	constructor() {
		this.messages = new MessageList();
	}

	getMails(): MessageView[] {
		if (!this.client) {
			throw new Error("client not connected")
		}
		return this.messages.getList();
	}

	async connect() {
		// console.log("open imap connection")
		this.client = new Imap(auth);
		await new Promise((resolve, reject) => {
			this.resolveCallback = resolve;
			this.rejectCallback = resolve;
			try {
				this.client.once('ready', () => {
					this.openBox("INBOX")
				})
				this.client.once('end', () => {
					// console.log('Done fetching all messages!');
				})

				this.client.connect();
			} catch (error) {
				reject(error)
				this.disconnect();
			}
		})
		return this;
	}

	disconnect(){
		if(this.client){
			this.client.end();
		}
	}

	flag(uid:number,flag:string){
		if(this.client){
			this.client.addFlags([uid],[flag])
		}
	}

	private openBox(boxName: string) {
		// console.log('opened Inbox')
		this.client.openBox(boxName, false, () => {
			this.search();
		})

	}

	search() {
		this.messages.clear();
		// @ts-ignore
		this.client.search([['SINCE', new Date("2024.08.01")]], (err?: Error, results) => {
			if (err && this.rejectCallback) {
				return this.rejectCallback(err);
			}
			const fetchMail = this.client.fetch(results, {bodies: ''});
			fetchMail.on('message', (message: unknown, sequenceNumber: number) => {
				this.onFetchMail(message, sequenceNumber)
			})
			// @ts-ignore
			fetchMail.once('error', error => {
				return Promise.reject(error);
			});
			// @ts-ignore
			fetchMail.once('end', () => {
				// console.log('Done fetching all messages!', this.messages.getList().length);
				// this.client.end();
				if (this.resolveCallback) {
					this.resolveCallback("done");
				}
			});
		})
	}

	private onFetchMail(message: unknown, sequenceNumber: number) {
		// @ts-ignore
		message.once('attributes', (attrs: MessageAttributes) => {
			const {uid, flags, date} = attrs;
			if(flags.some((flag)=>flag.includes("Deleted"))){
				return;
			}
			this.messages.setMessage({uid, sequenceNumber, flags, date: new Date(date)})
		});

		// @ts-ignore
		message.on('body', stream => {
			// @ts-ignore
			simpleParser(stream, async (err, parsed) => {
				const {from, subject, textAsHtml, text, messageId, headers} = parsed;
				this.messages.setMessage({from, sequenceNumber, subject, textAsHtml, text, messageId, headers})
			});
		});
	}
}

export const imapClient = new ImapClient();
