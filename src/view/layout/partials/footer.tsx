import React from 'react';
import {Box, Newline, Text, Spacer} from 'ink';
import {useTTYSize} from "../../../utils/use-tty-size.js";
import {useViewContext} from "../../context/view-context.js";
import {useMailContext} from "../../context/mail-context.js";

export function Footer() {
	const ttySize = useTTYSize()
	const viewState = useViewContext()
	const {message} = useMailContext()

	return (
		<>
			<Spacer/>
			<Box width={ttySize.columns} borderColor="blue" borderStyle="single" display="flex" height={3} gap={2}>
				<Newline/>
				<Text>ctrl+q: quit</Text>
				{(viewState === "detail" && message)?(
					<>
						<Text>ctrl+s: flag as seen</Text>
						<Text>del: flag as deleted</Text>
						<Text>esc: close message</Text>
					</>
				):(<></>)}

				<Newline/>
			</Box>
		</>
	)
}
