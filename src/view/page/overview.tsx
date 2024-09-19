import React from 'react';
import {TwoColumnsLeft} from "../layout/two-columns-left.js";
import {Text} from 'ink';
import {FoldersSelect} from "../components/mail/folders-select.js";


export function Overview() {
	return (
		<>
			<TwoColumnsLeft left={<FoldersSelect/>} right={<Text>Choose a folder</Text>}/>
		</>
	)
}
