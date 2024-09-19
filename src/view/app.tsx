import React, {useEffect} from 'react';
import {useInput, Spacer} from 'ink';
import {Main} from "./layout/main.js";
import {useMailContext, useMailDispatch} from "./context/mail-context.js";
import {Footer} from "./layout/partials/footer.js";
import {Header} from "./layout/partials/header.js";
import {useViewContext, useViewDispatch, ViewState} from "./context/view-context.js";
import {Detail} from "./page/detail.js";
import {Overview} from "./page/overview.js";
import {imapClient} from "../services/imap/index.js";

export default function App() {
	const state = useMailContext();
	const dispatch = useMailDispatch();
	const viewState = useViewContext();
	const viewDispatch = useViewDispatch();

	useEffect(() => {
		(async () => {
			await imapClient.connect();
			const boxes = await imapClient.getMailBoxes();
			dispatch({type: "updateBoxList", boxList: boxes});
		})().catch(error => {
			console.error(error)
		})
	}, []);

	useInput((input, key) => {
		if (key['ctrl'] === true && input === 'd') {
			console.log("messages:", state?.mails?.length || "noMessages loaded")
			console.log("message:", state?.message?.envelope?.subject || "noMessage Set")
			console.log("loading:", state?.loading ? "true" : "false")
		}
		if (key['ctrl'] === true && input === 'q' || key['ctrl'] === true && input === 'c') {
			imapClient.disconnect()
				.catch(() => {
				})
				.then(() => {
					process.exit(0);
				});
		}
		if (key['escape'] === true) {
			dispatch({type: "updateMessage", message: undefined})
			dispatch({type: "setSelectedBox", selectedBox: ""})
			viewDispatch({type: "overview"})
		}
	});


	const getComponentByViewState = (viewState: ViewState) => {
		switch (viewState) {
			case "detail": {
				return (<Detail/>);
			}
			case "overview": {
				return (<Overview/>);
			}

			default: {
				throw new Error("unknown action")
			}
		}
	}
	const view = getComponentByViewState(viewState)
	return (
		<>
			<Header/>
			<Main>
				{view}
				<Spacer/>
			</Main>
			<Footer/>
		</>
	);
}
