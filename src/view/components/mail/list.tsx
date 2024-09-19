import React, {ReactNode, useEffect} from 'react';
import {Box, Text,Newline} from 'ink';
import {useTTYSize} from "../../../utils/use-tty-size.js";
import {SelectList} from "../select-list/index.js";
import {useMailContext, useMailDispatch} from "../../context/mail-context.js";
import {useViewDispatch} from "../../context/view-context.js";
import {FetchMessageObject, imapClient} from "../../../services/imap/index.js";

export function MailList() {
	const ttySize = useTTYSize();
	const state = useMailContext();
	const dispatch = useMailDispatch();
	const viewDispatch = useViewDispatch();
	const {selectedBox} = state;


	useEffect(() => {
		(async () => {
			dispatch({type: "loading"})
			await imapClient.openMailBox(selectedBox)
			dispatch({type: "setMailBox", mailBox: imapClient.getMailBox()})
			const messages = await imapClient.fetchMessages()
			dispatch({type: "updateMails", mails: messages});
		})().catch(error => {
			console.error(error)
		})
	}, [selectedBox]);

	const handleSelect = (item: { value: number, label: string }) => {
		const messages = state.mails.filter((message: FetchMessageObject) => {
			return message.uid === item.value
		})
		if (messages.length > 0) {
			dispatch({type: "updateMessage", message: messages[0] as FetchMessageObject})
			viewDispatch({type: "detail"})
		}
	};

	const createLabel = (label: string, date: Date) => {
		return `${label} - ${date.toLocaleDateString()}`;
	}

	const createElement = (message: FetchMessageObject): ReactNode => {
		return (
			<Box display="flex" flexDirection="column" width="100%">
				<Box display="flex" justifyContent="space-between" width="100%" overflowX="hidden">
					<Text bold={!message.flags?.has("Seen")}>
						{message.envelope?.subject}
					</Text>
				</Box>
				<Box display="flex" justifyContent="space-between" width="100%">
					<Text>{message.envelope.from?.[0]?.address || ""}</Text>
					<Text>{message?.internalDate?.toLocaleDateString()} - {message?.internalDate?.toLocaleTimeString()}</Text>
				</Box>
			</Box>
		);
	}

	return (
		<Box display="flex" flexDirection="column" height="100%" width="100%">
			{(state.mails.length > 0) ? (
				<SelectList limit={(ttySize.rows / 2) - 5} items={state.mails.map(message => {
					return {
						value: message.uid,
						label: createLabel(message.envelope?.subject as string, message?.internalDate as Date),
						element: createElement(message)
					}
				})} onSelect={handleSelect}/>

			) : (
				<>
				<Text bold>No messages found.</Text>
					<Newline/>
				<Text>Press 'esc' to return.</Text>
				</>
			)}
		</Box>
	)
}
