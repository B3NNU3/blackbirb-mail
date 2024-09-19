import React from 'react';
import {TwoColumnsLeft} from "../layout/two-columns-left.js";
import {MailList} from "../components/mail/list.js";
import {MailContent} from "../components/mail/content.js";

export function Detail() {
	return (
		<>
			<TwoColumnsLeft left={<MailList/>} right={<MailContent/>}/>
		</>
	)
}
