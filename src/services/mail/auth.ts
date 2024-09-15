import 'dotenv/config' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

class Auth {
	user: string = process.env['MAIL_USER'] as string;
	password: string = process.env['MAIL_PASS'] as string
	host: string = process.env['MAIL_HOST'] as string
	port: number =  Number(process.env['MAIL_PORT']);
	tls: boolean = Boolean(process.env['MAIL_TLS']);
}

export const auth = new Auth();
