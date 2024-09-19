import React, {Dispatch, useContext, createContext, useReducer} from 'react';
import {auth, Auth} from "../../services/config/index.js";
import {FetchMessageObject, ListResponse, MailboxObject} from "../../services/imap/index.js";

export type MailState = {
	authData: Auth,
	mails: FetchMessageObject[],
	message: FetchMessageObject | undefined,
	loading: boolean,
	boxList: ListResponse[],
	selectedBox: string,
	currentMailBox: MailboxObject | undefined,
}
export const initialMailState = {
	authData: auth,
	mails: [] as FetchMessageObject[],
	message: undefined,
	loading: true,
	boxList: [] as ListResponse[],
	selectedBox: '',
	currentMailBox: undefined,
}

export type MailDispatchProps = {
	type: "init" | "loading" | "loaded" | "clearMessage"
} | {
	type: "updateMails",
	mails: FetchMessageObject[],
} | {
	type: "updateMessage",
	message: FetchMessageObject | undefined
} | {
	type: "openBox",
	box: string
}
	| {
	type: "updateBoxList",
	boxList: ListResponse[]
} | {
	type: "setSelectedBox",
	selectedBox: string,
}| {
	type: "setMailBox",
	mailBox: MailboxObject | undefined,
}

export const MailContext = createContext<MailState>(initialMailState);
export const MailDispatchContext = createContext<Dispatch<MailDispatchProps>>(() => undefined);

export type MailProviderProps = {
	readonly children?: Array<React.ReactElement<any, string>> | React.ReactElement<any, string>;
};

export function MailProvider({children}: MailProviderProps): React.ReactElement {
	const [state, dispatch] = useReducer(viewReducer, initialMailState)
	return (
		<MailContext.Provider value={state}>
			<MailDispatchContext.Provider value={dispatch}>
				<>{children}</>
			</MailDispatchContext.Provider>
		</MailContext.Provider>
	)
}

export function useMailContext(): MailState {
	return useContext<MailState>(MailContext)
}

export function useMailDispatch(): Dispatch<MailDispatchProps> {
	return useContext<Dispatch<MailDispatchProps>>(MailDispatchContext)
}

export function viewReducer(state: MailState, action: MailDispatchProps): MailState {
	switch (action.type) {
		case "init": {
			return state;
		}
		case "loading": {
			return {...state, loading: true};
		}
		case "loaded": {
			return {...state, loading: false};
		}
		case "clearMessage": {
			return {...state, message: {} as FetchMessageObject};
		}
		case "updateMails": {
			return {...state, mails: action['mails'], loading: false};
		}
		case "updateMessage": {
			return {...state, message: action['message']};
		}
		case "updateBoxList": {
			return {...state, boxList: action['boxList']};
		}
		case "setSelectedBox": {
			return {...state, selectedBox: action['selectedBox']};
		}
		case "setMailBox": {
			return {...state, currentMailBox: action['mailBox']};
		}
		default: {
			throw new Error(`unknown action: ${action.type}`)
		}
	}
}
