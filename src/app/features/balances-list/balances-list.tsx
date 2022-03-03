import { Stack, StackProps } from '@stacks/ui';

import { AssetRow } from '@app/components/asset-row';
import { CollectibleAssets } from '@app/features/balances-list/components/collectible-assets';
import { useCurrentAccount } from '@app/store/accounts/account.hooks';

import { useCurrentAccountUnanchoredBalances } from '@app/query/balance/balance.hooks';
import { useBitcoinTokenState, useStxTokenState } from '@app/store/assets/asset.hooks';
import { FungibleAssets } from './components/fungible-assets';
import { NoAssets } from './components/no-assets';
import { BitcoinAssets } from './components/bitcoin-assets';
import BigNumber from 'bignumber.js';
import { useCallback } from 'react';
import { RouteUrls } from '@shared/route-urls';
import { useNavigate } from 'react-router-dom';

interface BalancesListProps extends StackProps {
  address: string;
}
export const BalancesList = ({ address, ...props }: BalancesListProps) => {
  const stxToken = useStxTokenState(address);
  const currentAccount = useCurrentAccount();
  const { data: balances } = useCurrentAccountUnanchoredBalances();
  const bitcoinAssets = useBitcoinTokenState();
  const navigate = useNavigate();
  const navigateToBitcoinPage = useCallback(() => navigate(RouteUrls.Bitcoin), [navigate]);

  if (!balances) return null;

  const noAssets =
    stxToken.balance.isEqualTo(0) &&
    Object.keys(balances.fungible_tokens).length === 0 &&
    Object.keys(balances.non_fungible_tokens).length === 0 &&
    bitcoinAssets.balance.isEqualTo(new BigNumber(0));

  if (noAssets && currentAccount?.address)
    return <NoAssets address={currentAccount.address} {...props} />;

  return (
    <Stack pb="extra-loose" spacing="extra-loose" {...props}>
      {stxToken && stxToken.balance.isGreaterThan(0) && <AssetRow asset={stxToken} />}
      <BitcoinAssets onClick={navigateToBitcoinPage} />
      <FungibleAssets />
      <CollectibleAssets spacing="extra-loose" />
    </Stack>
  );
};
