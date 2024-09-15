import {Message, Messages, MessageView} from "./model.js";

export class MessageList {
	private messages: Messages = {};

	setMessage(message: Message) {
		if (message.sequenceNumber in this.messages) {
			this.messages[message.sequenceNumber] = {...this.messages[message.sequenceNumber], ...message};
			return;
		}
		this.messages[message.sequenceNumber] = message;
	}

	getList(): MessageView[] {
		const mailData: MessageView[] = [];
		for (const key in this.messages) {
			const mail = this.messages[key] as Message;
			if (mail.subject && mail.uid && mail.text) {
				mailData.push(mail as MessageView);
			}
		}

		return mailData.sort((a, b) => {
			return b.uid - a.uid
		}) as MessageView[];
	}

	clear(){
		this.messages = {} as Messages;
	}
}
