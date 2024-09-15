import React, {useState} from 'react';
import {Box, Text} from 'ink';
import TextInput from 'ink-text-input';

export const Query = () => {
	const [query, setQuery] = useState('');

	return (
		<Box>
			<Box marginRight={1}>
				<Text>Enter your query:</Text>
			</Box>

			<TextInput value={query} onChange={setQuery} />
		</Box>
	);
};

