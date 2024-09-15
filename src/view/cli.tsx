#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
// import meow from 'meow';
import App from './app.js';
import {imapClient} from "../services/mail/imap-client.js";

export const Cli = ()=>{

// 	const cli = meow(
// 		`
// 	Usage
// 	  $ cliUiInk_test
//
// 	Options
// 		--name  Your name
//
// 	Examples
// 	  $ cliUiInk_test --name=Jane
// 	  Hello, Jane
// `,
// 		{
// 			importMeta: import.meta,
// 			flags: {
// 				name: {
// 					type: 'string',
// 				},
// 			},
// 		},
// 	);
	try{
		render(<App />);
	}catch (error){
		console.error(error);
		imapClient.disconnect();
	}
}


