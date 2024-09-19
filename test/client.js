// @ts-ignore
import {ImapFlow} from "imapflow"

const client = new ImapFlow({
	host: "longmore.uberspace.de",
	port: 993,
	secure: true,
	auth: {
		user: "b3n@uber.space",
		pass: "jackistmeinlieblingsK4T3R!"
	},
	logger: false
});

const main = async () => {
	// Wait until client connects and authorizes
	await client.connect();

	// Select and lock a mailbox. Throws if mailbox does not exist
	let lock = await client.getMailboxLock('INBOX');
	try {
		// fetch latest message source
		// client.mailbox includes information about currently selected mailbox
		// "exists" value is also the largest sequence number available in the mailbox
		// let message = await client.fetchOne(client.mailbox.exists, { source: true,  });
		// console.log("message",message.envelope,content);

		// list subjects for all messages
		// uid value is always included in FETCH response, envelope strings are in unicode.
		for await (let message of client.fetch(`${client.mailbox.exists-1000}:*`, { envelope: true, source: true })) {
			// const {content} = await client.download(message.uid,'text');
			console.log(`${message.uid}: ${message.envelope.subject}`, message.source.toString());
		}

	} finally {
		// Make sure lock is released, otherwise next `getMailboxLock()` never returns
		lock.release();
	}

	// log out and close connection
	await client.logout();
};

main().catch(err => console.error(err));
