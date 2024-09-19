import 'dotenv/config' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

export class Auth {
	user: string = process.env['MAIL_USER'] as string;
	password: string = process.env['MAIL_PASS'] as string
	host: string = process.env['MAIL_HOST'] as string
	port: number = Number(process.env['MAIL_PORT']);
	tls: boolean = Boolean(process.env['MAIL_TLS']);
}
export const auth = new Auth();

export interface AuthenticateOptions {
	host: string,
	port: number,
	secure: boolean,
	auth: {
		user: string,
		pass: string
	}
}

export class Authentication implements AuthenticateOptions {
	readonly host: string;
	readonly port: number;
	readonly secure: boolean;
	readonly auth: {
		user: string,
		pass: string
	} = {user: '', pass: ''}

	constructor(
		user?: string,
		pass?: string,
		host?: string,
		port?: number,
		secure?: boolean,
	) {
		this.auth.user = user || process.env['MAIL_USER'] as string
		this.auth.pass = pass || process.env['MAIL_PASS'] as string
		this.host = host || process.env['MAIL_HOST'] as string
		this.port = port || Number(process.env['MAIL_PORT'])
		this.secure = secure || Boolean(process.env['MAIL_TLS'])
	}
}

