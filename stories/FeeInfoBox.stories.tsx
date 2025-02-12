import { ComponentMeta } from '@storybook/react';
import { useReducer } from 'react';

import { InfoBoxContainer, InfoBoxRow } from 'components/InfoBox';

export default {
	title: 'Futures/FeeInfoBox',
	decorators: [
		(Story) => (
			<div style={{ width: 334 }}>
				<Story />
			</div>
		),
	],
} as ComponentMeta<any>;

export const Default = () => {
	return (
		<InfoBoxContainer>
			<InfoBoxRow title="Protocol Fee" keyNode="0.45%" value="$100,000.00" />
			<InfoBoxRow title="Limit / Stop Fee" value="$100,000,00" />
			<InfoBoxRow title="Cross Margin Fee" keyNode="0.02%" value="$100,000.00" spaceBeneath />
			<InfoBoxRow title="Total Fee" value="$100,000.00" />
			<InfoBoxRow title="Keeper Deposit" value="0.0100 ETH" />
		</InfoBoxContainer>
	);
};

export const ExpandedRow = () => {
	const [expanded, setExpanded] = useReducer((s) => !s, false);

	return (
		<InfoBoxContainer>
			<InfoBoxRow
				title="Fees"
				value="$100,000"
				expandable
				expanded={expanded}
				onToggleExpand={setExpanded}
			>
				<InfoBoxRow title="Protocol Fee" keyNode="0.45%" value="$100,000.00" />
				<InfoBoxRow title="Limit / Stop Fee" value="$100,000,00" />
				<InfoBoxRow title="Cross Margin Fee" keyNode="0.02%" value="$100,000.00" spaceBeneath />
				<InfoBoxRow title="Keeper Deposit" value="0.0100 ETH" />
			</InfoBoxRow>
			<InfoBoxRow title="Liquidation Price" value="$100,000" />
		</InfoBoxContainer>
	);
};
