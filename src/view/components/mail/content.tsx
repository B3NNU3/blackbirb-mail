import React, {useEffect, useState} from 'react';
import {Box, Newline, Spacer, Text} from 'ink';
import {useTTYSize} from "../../../utils/use-tty-size.js";
import {useMailContext, useMailDispatch} from "../../context/mail-context.js";
import {imapClient} from "../../../services/imap/index.js";

export function MailContent() {
	const ttySize = useTTYSize()
	const dispatch = useMailDispatch()
	const {message} = useMailContext();
	const [messageText, setMessageText] = useState("");

	useEffect(() => {
		(async () => {
			if (message) {
				setMessageText("");
				dispatch({type:"loading"})
				const content = await imapClient.downloadContent(message);
				dispatch({type:"loaded"})
				setMessageText(content)
			}
		})().catch(error => {
			console.error(error)
		})
	}, [message]);

	return (message?
		<Box width="100%" height="100%">
			<Box display="flex" flexDirection="column" height="98%" width="98%" padding={1}>
				<Box width="100%" display="flex" justifyContent="space-between" marginBottom={1}>
					<Text underline bold>{message.envelope.subject}</Text>
					<Text>{message?.internalDate?.toDateString() || ""} - {message?.internalDate?.toLocaleTimeString() || ""}</Text>
				</Box>
				<Box width="100%" display="flex" justifyContent="flex-start">
					<Text italic>{message.envelope.from?.[0]?.address || ""}</Text>
				</Box>

				<Newline/>
				<Box height={ttySize.rows - 12} overflowY="hidden">
					<Text>{messageText}</Text>
				</Box>
				<Spacer/>
				{(message?.flags && [...message?.flags].length > 0) ? (<Text>flags: </Text>) : (<></>)}{[...message?.flags].map((flag)=>{return (<Text>{flag}</Text>)})}
			</Box>
		</Box>:<></>
	)
}
