import React from 'react';
import {Box, Text} from 'ink';
import {useMailContext} from "../../context/mail-context.js";
import Spinner from 'ink-spinner';
import {useTTYSize} from "../../../utils/use-tty-size.js";


export function Header() {
	const ttySize = useTTYSize()
	const state = useMailContext()
	const {selectedBox} = state;

	return (
		<Box display="flex" justifyContent="space-between" flexDirection="row" width={ttySize.columns} height={1}>
			<Box display="flex" flexDirection="row" justifyContent="flex-start">
				<Text color="cyan">
					Moin,{state.authData?.user?.replace("@", "[at]") || ""}
				</Text>
				<Text color="cyan"> {">"} </Text>
				<Text>{selectedBox}</Text>
				<Text color="cyan"> {">"} </Text>
				<Text> count: {state.mails?.length || "0"} </Text>
			</Box>
			{
				state.loading ?
					<Text>
						<Text color="green">
							<Spinner type="dots"/>
						</Text>
					</Text> : ""
			}
		</Box>
	)
}
