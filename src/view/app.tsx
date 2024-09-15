import React, {useEffect, useState} from 'react';
import {Box, Newline, Spacer, Text, useInput} from 'ink';
import {imapClient} from "../services/mail/imap-client.js";
import {MessageView} from "../services/mail/model.js";
import SelectInput from 'ink-select-input';
import Spinner from 'ink-spinner';
import {auth} from "../services/mail/auth.js";


// import {Query} from "./components/form/query.js";
// import {Select} from "./components/form/select.js";

// type Props = {
// 	name: string | undefined;
// };

export default function App() {
	const [authData, setAuth] = useState({} as {user:string});
	const [data, setData] = useState([] as MessageView[]);
	const [message, setMessage] = useState({} as MessageView);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		imapClient.connect().then(() => {
			setLoading(false)
			setData(imapClient.getMails());
		})
		setAuth(auth)
	}, []);

	useInput((input, key) => {
		if (input === 'q') {
			imapClient.disconnect();
			return process.exit(0)
		}
		if (input === 's') {
			if (message && message.uid) {
				imapClient.flag(message.uid, "\\SEEN");
				setLoading(true)
				imapClient.disconnect();
				imapClient.connect().then(() => {
					setLoading(false)
					setData(imapClient.getMails());
				})
			}
			return;
		}
		if (key['delete'] === true) {
			if (message && message.uid) {
				imapClient.flag(message.uid, "\\DELETED");
				setLoading(true)
				imapClient.disconnect();
				imapClient.connect().then(() => {
					setMessage({} as MessageView);
					setLoading(false)
					setData(imapClient.getMails());
				})
			}
			return;
		}
		if (key['escape'] === true) {
			setMessage({} as MessageView);
		}
	});

	const handleSelect = (item: { value: number, label: string }) => {
		const messages = data.filter((message) => {
			return message.uid === item.value
		})
		if (messages.length > 0) {
			setMessage(messages[0] as MessageView);
		}
	};

	const createLabel = (label: string, date: Date) => {
		return `${label} - ${date.toLocaleDateString()}`;
	}

	return (
		<>
			<Box display="flex" justifyContent="space-between" width="100%">
				<Text color="green">
					Moin,{authData?.user?.replace("@","[at]") || ""} ({data?.length || "0"})
				</Text>
				{
					loading ?
						<Text>
							<Text color="green">
								<Spinner type="dots"/>
							</Text>
							{' Loading'}
						</Text> : ""
				}

			</Box>

			<Box display="flex" height="100%" borderColor="blue" borderStyle="single" padding={0} gap={0}>
				<Box display="flex" flexDirection="column" overflowY="hidden" height={24} width="25%">
					<SelectInput limit={10} items={data.map(message => {
						return {value: message.uid, label: createLabel(message.subject as string, message.date)}
					})} onSelect={handleSelect}/>
				</Box>
				<Box width="75%" height="100%" marginLeft={2}>
					<Box display="flex" flexDirection="column" height="100%" width="98%" padding={1}>
						<Box width="100%" display="flex" justifyContent="space-between">
							<Text underline bold>{message.subject}</Text>
							<Text>{message?.date?.toDateString() || ""}</Text>
						</Box>

						<Newline/>
						<Box height={16} overflowY="hidden">
							<Text>{message.text}</Text>
						</Box>
						<Spacer/>
						<Text>{(message?.flags && message?.flags?.length > 0) ? "flags: " : ""}{message?.flags?.join(" | ") || ""} </Text>
					</Box>
				</Box>
			</Box>
			<Box width="100%" borderColor="blue" borderStyle="single" display="flex" height={3} gap={2}>
				<Newline/>
				<Text>q: quit</Text>
				<Text>s: flag as seen</Text>
				<Text>del: flag as deleted</Text>
				<Text>esc: close message</Text>
				<Newline/>
			</Box>
		</>
	);
}
