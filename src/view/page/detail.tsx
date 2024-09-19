import React from 'react';
import {TwoColumnsLeft} from "../layout/two-columns-left.js";
import {MailList} from "../components/mail/list.js";
import {MailContent} from "../components/mail/content.js";
// @ts-ignore
import {useMailContext, useMailDispatch} from "../context/mail-context.js";
// import {useViewContext} from "../context/view-context.js";
import {useInput} from 'ink';


export function Detail() {
	const state = useMailContext();
	// const dispatch = useMailDispatch()
	// const viewState = useViewContext()
		useInput((input, key) => {
			if (key['ctrl'] === true && input === 's') {
				if (state.message && state.message.uid) {
					console.log("flag as seen")
					// dispatch({type: "loading"})
					// imapClient.flag(state.message.uid, "\\SEEN").then(() => {
					// 	dispatch({type: "clearMessage"})
					// });
					// reloadMessageList();
				}
				return;
			}
			if (key['delete'] === true) {
				if (state.message && state.message.uid) {
					console.log("delete")
					// dispatch({type: "loading"})
					// imapClient.flag(state.message.uid, "\\DELETED").then(() => {
					// 	imapClient.delete([state.message.uid]).then(() => {
					// 		dispatch({type: "clearMessage"});
					// 	})
					// });
					// reloadMessageList();
				}
				return;
			}

	});

	return (
		<>
			<TwoColumnsLeft left={<MailList/>} right={<MailContent/>}/>
		</>
	)
}
