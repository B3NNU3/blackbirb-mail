import React from 'react';
import App from "./app.js";
import {MailProvider} from "./context/mail-context.js";
import {ViewProvider} from "./context/view-context.js";

export function AppShell() {
	return (
		<ViewProvider>
			<MailProvider>
				<App/>
			</MailProvider>
		</ViewProvider>
	)
}
