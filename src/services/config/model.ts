export type IdInfoObject = {
	name?: string;
	version?: string;
	os?: string;
	vendor?: string;
	'support-url'?: string;
	date?: Date;
}

export interface ClientConfigOptions {
	disableCompression?: boolean;
	clientInfo?: IdInfoObject;
	disableAutoIdle?: boolean;
	tls?: {
		rejectUnauthorized?: boolean;
		minVersion?: string;
		minDHSize?: number;
	};
	logger?: any;
	logRaw?: boolean;
	emitLogs?: boolean;
	verifyOnly?: boolean;
	proxy?: string;
	qresync?: boolean;
	maxIdleTime?: number;
	missingIdleCommand?: string;
	disableBinary?: boolean;
	disableAutoEnable?: boolean;
	connectionTimeout?: number;
	greetingTimeout?: number;
	socketTimeout?: number;
}
