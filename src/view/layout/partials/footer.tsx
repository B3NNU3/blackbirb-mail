import React from 'react';
import {Box, Newline, Text, Spacer} from 'ink';
import {useTTYSize} from "../../../utils/use-tty-size.js";

export function Footer() {
	const ttySize = useTTYSize()

	return (
		<>
			<Spacer/>
			<Box width={ttySize.columns} borderColor="blue" borderStyle="single" display="flex" height={3} gap={2}>
				<Newline/>
				<Text>q: quit</Text>
				<Text>s: flag as seen</Text>
				<Text>del: flag as deleted</Text>
				<Text>esc: close message</Text>
				<Newline/>
			</Box>
		</>
	)
}
