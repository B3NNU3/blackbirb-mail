import {useStdout} from "ink"
import {EffectCallback, useEffect, useState} from "react"
import {StateHook} from "./react-core.js"

/**
 * https://nodejs.org/api/process.html#processstdout
 * https://nodejs.org/api/tty.html#event-resize
 */
export const useTTYSize = (): TTYSize => {
	// Get the Node.js stdout stream.
	const {stdout} = useStdout()

	// Initial size of the TTY window.
	const [dimensions, setDimensions]: StateHook<TTYSize> = useState(TTYSize.getInstance(stdout))

	// Handle TTY resize events.
	const attachResizeListenerOnMountAndDetachOnUnmountEffectFn: EffectCallback = () => {
		if (!stdout) return
		const _resizeHandler = () => {
			setDimensions(TTYSize.getInstance(stdout))
		}
		const removeEffectFn = () => {
			stdout.off("resize", _resizeHandler)
		}
		stdout.on("resize", _resizeHandler)
		return removeEffectFn
	}
	useEffect(attachResizeListenerOnMountAndDetachOnUnmountEffectFn, [stdout])

	return dimensions
}

export class TTYSize {
	constructor(public rows = 0, public columns = 0) {
	}

	static getInstance = (stdout: NodeJS.WriteStream | undefined): TTYSize => {
		if (!stdout) {
			return new TTYSize()
		}
		return new TTYSize(stdout.rows, stdout.columns);
	}
	toString = () => `rows: ${this.rows}, columns: ${this.columns}`
}
