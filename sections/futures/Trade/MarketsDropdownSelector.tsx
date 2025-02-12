import Wei from '@synthetixio/wei';
import { FC } from 'react';
import styled from 'styled-components';

import MarketBadge from 'components/Badge/MarketBadge';
import ColoredPrice from 'components/ColoredPrice';
import CurrencyIcon from 'components/Currency/CurrencyIcon';
import { FlexDivCentered } from 'components/layout/flex';
import { StyledCaretDownIcon } from 'components/Select/Select';
import { Body, NumericValue } from 'components/Text';
import { FuturesMarketAsset, SynthSuspensionReason } from 'sdk/types/futures';
import { PricesInfo } from 'state/prices/types';
import { formatDollars, formatPercent } from 'utils/formatters/number';
import { MarketKeyByAsset } from 'utils/futures';

type Props = {
	asset: FuturesMarketAsset;
	label: string;
	description: string;
	isMarketClosed?: boolean;
	closureReason?: SynthSuspensionReason;
	mobile?: boolean;
	priceDetails: {
		oneDayChange: Wei;
		priceInfo?: PricesInfo;
	};
	onClick: () => void;
};

const MarketsDropdownSelector: FC<Props> = (props) => (
	<Container {...props}>
		<ContentContainer mobile={props.mobile}>
			<CurrencyIcon currencyKey={MarketKeyByAsset[props.asset]} width="31px" height="31px" />
			<div className="currency-meta">
				<CurrencyLabel>
					{props.label}
					<MarketBadge
						currencyKey={props.asset}
						isFuturesMarketClosed={props.isMarketClosed}
						futuresClosureReason={props.closureReason}
					/>
				</CurrencyLabel>
				<Body className="name">{props.description}</Body>
			</div>
			{props.mobile && (
				<div style={{ marginRight: 15 }}>
					<ColoredPrice priceInfo={props.priceDetails.priceInfo}>
						{formatDollars(props.priceDetails.priceInfo?.price ?? '0')}
					</ColoredPrice>
					<NumericValue value={props.priceDetails.oneDayChange} colored>
						{formatPercent(props.priceDetails.oneDayChange)}
					</NumericValue>
				</div>
			)}

			<StyledCaretDownIcon />
		</ContentContainer>
	</Container>
);

export const CurrencyLabel = styled.div`
	font-family: ${(props) => props.theme.fonts.regular};
	font-size: 16px;
	display: flex;
	align-items: center;
	gap: 5px;
`;

const Container = styled.div`
	width: 100%;
`;

export const ContentContainer = styled(FlexDivCentered)<{ mobile?: boolean }>`
	.currency-meta {
		flex: 1;
		margin-left: 12px;
	}

	color: ${(props) => props.theme.colors.selectedTheme.text.value};
	border: ${(props) => props.theme.colors.selectedTheme.border};
	border-radius: ${(props) => (props.mobile ? 0 : '10px')};
	padding: 10px;
	cursor: pointer;
	background: ${(props) => props.theme.colors.selectedTheme.background};
	&:hover {
		background: ${(props) => props.theme.colors.selectedTheme.button.fillHover};
	}
	.name {
		font-family: ${(props) => props.theme.fonts.regular};
		font-size: 12.5px;
		line-height: 12.5px;
		margin: 0;
		color: ${(props) => props.theme.colors.selectedTheme.gray};
	}

	p {
		margin: 0;
	}

	.price {
		font-family: ${(props) => props.theme.fonts.mono};
		color: ${(props) => props.theme.colors.selectedTheme.gray};
		font-size: 15px;
	}

	.change {
		font-family: ${(props) => props.theme.fonts.mono};
		font-size: 11.5px;
		text-align: right;
	}

	&:not(:last-of-type) {
		margin-bottom: 4px;
	}

	.green {
		color: ${(props) => props.theme.colors.selectedTheme.green};
	}

	.red {
		color: ${(props) => props.theme.colors.selectedTheme.red};
	}
`;

export default MarketsDropdownSelector;
