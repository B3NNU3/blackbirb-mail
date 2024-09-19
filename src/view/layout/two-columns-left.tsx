import React from 'react';
import {Box} from 'ink';
import {useTTYSize} from "../../utils/use-tty-size.js";

export type TwoColumnsLeftProps = {
	readonly left?: Array<React.ReactElement<any, string>> | React.ReactElement<any, string>;
	readonly right: Array<React.ReactElement<any, string>> | React.ReactElement<any, string>;
};

// @ts-ignore
export function TwoColumnsLeft({left, right}: TwoColumnsLeftProps) {
	const ttySize = useTTYSize()
	return (
		<Box display="flex" flexDirection="row">
			<Box display="flex" flexDirection="column" width={ttySize.columns / 3} height="100%" overflow={"hidden"}>
				{left}
			</Box>
			<Box display="flex" flexDirection="column" width={(ttySize.columns / 3 * 2) - 2} marginLeft={2}
				 height="100%" overflow={"hidden"}>
				{right}
			</Box>
		</Box>
	)
}
