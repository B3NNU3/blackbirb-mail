import React, {ReactNode} from 'react';
import {Box, Text} from 'ink';
import {useTTYSize} from "../../../utils/use-tty-size.js";
import {SelectList} from "../select-list/index.js";
import {useMailContext, useMailDispatch} from "../../context/mail-context.js";
import {useViewDispatch} from "../../context/view-context.js";
import {ListResponse} from "../../../services/imap/index.js";

export function FoldersSelect() {
	const dispatch = useMailDispatch();
	const viewDispatch = useViewDispatch();
	const ttySize = useTTYSize()
	const state = useMailContext();

	const onSelect = (item: { value: string, label: string }) => {
		dispatch({type: "setBox", selectedBox: item.value});
		viewDispatch({type: "detail"});
	}

		const createElement = (box: ListResponse): ReactNode => {
			return (
				<Box width="100%" overflowX="hidden" marginLeft={box.parent.length}>
					<Text bold={true}>{box.name}</Text>
				</Box>
			);
		}

		return (
			<Box display="flex" flexDirection="column" height="100%" width="100%">
				<SelectList limit={(ttySize.rows / 2) - 5} items={state.boxList.map(folder => {
					return {
						value: folder.pathAsListed,
						label: folder.name,
						element: createElement(folder)
					}
				})} onSelect={onSelect}/>
			</Box>
		)
	}
