import React, {Dispatch, useContext, createContext, useReducer} from 'react';

export type ViewState = "overview" | "detail"
export const initialViewState = "overview"

export type ViewDispatchProps = {
	type: ViewState
}

export const ViewContext = createContext<ViewState>(initialViewState);
export const ViewDispatchContext = createContext<Dispatch<ViewDispatchProps>>(() => undefined);

export type MailProviderProps = {
	readonly children?: Array<React.ReactElement<any, string>> | React.ReactElement<any, string>;
};

export function ViewProvider({children}: MailProviderProps): React.ReactElement {
	const [state, dispatch] = useReducer(viewReducer, initialViewState)
	return (
		<ViewContext.Provider value={state}>
			<ViewDispatchContext.Provider value={dispatch}>
				<>{children}</>
			</ViewDispatchContext.Provider>
		</ViewContext.Provider>
	)
}

export function useViewContext(): ViewState {
	return useContext<ViewState>(ViewContext)
}

export function useViewDispatch(): Dispatch<ViewDispatchProps> {
	return useContext<Dispatch<ViewDispatchProps>>(ViewDispatchContext)
}

export function viewReducer(state: ViewState, action: ViewDispatchProps): ViewState {
	return action.type || state;
}
