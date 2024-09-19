import React from 'react';
import {Box} from 'ink';
import {useTTYSize} from "../../utils/use-tty-size.js";

export type MainProps = {
	readonly children?: Array<React.ReactElement<any,string>>|React.ReactElement<any,string>;
};

export function Main({children}: MainProps) {
	const ttySize = useTTYSize()
	return (
		<Box display="flex" flexDirection="column" width={ttySize.columns} height={ttySize.rows - 10} borderColor="cyan"
			 borderStyle="round" overflow={"hidden"}>
			{children}
		</Box>
	)
}
