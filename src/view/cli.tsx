#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';

import {AppShell} from "./app-shell.js";
import {imapClient} from "../services/imap/index.js";

export const Cli = ()=>{

	try{
		render(<AppShell />);
	}catch (error){
		console.error(error);
		imapClient.disconnect();
	}
}


