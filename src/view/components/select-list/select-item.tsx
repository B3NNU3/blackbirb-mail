import * as React from 'react';
import {Box} from 'ink';
import {ReactNode} from "react";

export type MailItemProps = {
	readonly isSelected?: boolean;
	readonly label: string;
	readonly element?: ReactNode;
};

export function SelectItem({label, element}: MailItemProps) {
	return (
		<Box display="flex">
			{element ? element : label}
		</Box>
	);
}
