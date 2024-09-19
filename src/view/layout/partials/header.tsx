import React from 'react';
import {Box, Text} from 'ink';
import {useMailContext} from "../../context/mail-context.js";
import Spinner from 'ink-spinner';
import {useTTYSize} from "../../../utils/use-tty-size.js";


export function Header() {
	const ttySize = useTTYSize()
	const state = useMailContext()
	const {selectedBox, message} = state;

	return (
		<Box display="flex" justifyContent="space-between" flexDirection="row" width={ttySize.columns} height={3}
			 borderStyle="round" borderColor="blue">
			<Box display="flex" flexDirection="row" justifyContent="flex-start">
				<Text backgroundColor="cyan">
					Moin, {state.authData?.user || ""}
				</Text>
				{selectedBox.length > 0 ? (
					<>
						<Text color="cyan"> {">"} </Text>
						<Text backgroundColor="blue">{selectedBox}</Text>
						<Text backgroundColor="cyanBright">({state.mails?.length || "0"})</Text>
					</>
				) : (<></>)}
				{message ? (
					<>
						<Text color="cyan"> {">"} </Text>
						<Text backgroundColor="green">uid: {message.uid}</Text>
					</>
				) : (<></>)}

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
