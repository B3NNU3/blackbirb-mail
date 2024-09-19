import React from "react"
import { Dispatch, SetStateAction } from "react"

// State helpers.

/*
 * Useful type function to describe array returned by `React.useState()`.
 */
export type SetState<T> = Dispatch<SetStateAction<T>>
export type StateHook<T> = [T, SetState<T>]

export class StateHolder<T> {
	constructor(readonly value: T, readonly setValue: SetState<T>) {}

	static createFromArray<T>(stateHook: StateHook<T>) {
		return new StateHolder(stateHook[0], stateHook[1])
	}

	asArray = (): StateHook<T> => [this.value, this.setValue]
	toString = () => JSON.stringify(this.value)
}

// React.useRef() helpers.

export type ReactRef<T> = React.MutableRefObject<T | undefined>
export type ReactRefReceiverFn<T> = (it: T) => void

/**
 * @param refObject its `current` property is value of `it`
 * @param receiverFn lambda that accepts `it`; only runs if `refObject.current` property is truthy
 * @return refObject return the refObject that is passed
 */
export const _withRef= <T,>(
	refObject: ReactRef<T>,
	receiverFn: ReactRefReceiverFn<T>
): ReactRef<T> => {
	if (refObject.current) receiverFn(refObject.current)
	return refObject
}

// Other React hook helpers.

/*
 * More info - https://stackoverflow.com/a/68602854/2085356.
 */
export function useForceUpdateFn(): () => void {
	const [_, setValue]: StateHook<boolean> = React.useState<boolean>(false)
	return () => setValue((value) => !value)
}

export const emptyArray = (): JSX.Element[] => new Array<JSX.Element>()
export type RenderItemFn<T> = (input: T, index: number) => JSX.Element
export const makeReactElementFromArray = <T, >(
	inputsArray: T[],
	itemRendererFn: RenderItemFn<T>
): JSX.Element => {
	const outputArray = emptyArray()
	inputsArray.forEach(
		(input: T, index: number) => outputArray.push(itemRendererFn(input, index))
	)
	return (<>{outputArray}</>)
}
