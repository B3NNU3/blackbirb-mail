import {ClientConfigOptions, IdInfoObject} from "./model.js";

export class ClientConfig implements ClientConfigOptions{
	constructor(
		readonly logger: any = false,
		readonly emitLogs?: boolean,
		readonly logRaw?: boolean,
		readonly disableCompression?: boolean,
		readonly clientInfo?: IdInfoObject,
		readonly disableAutoIdle?: boolean,
		readonly tls?: {
			rejectUnauthorized?: boolean,
			minVersion?: string,
			minDHSize?: number,
		},
		readonly verifyOnly?: boolean,
		readonly proxy?: string,
		readonly qresync?: boolean,
		readonly maxIdleTime?: number,
		readonly missingIdleCommand?: string,
		readonly disableBinary?: boolean,
		readonly disableAutoEnable?: boolean,
		readonly connectionTimeout?: number,
		readonly greetingTimeout?: number,
		readonly socketTimeout?: number
	){}
}
