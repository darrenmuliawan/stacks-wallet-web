import { useAnalytics } from "@app/common/hooks/analytics/use-analytics";
import { useRouteHeader } from "@app/common/hooks/use-route-header";
import { CenteredPageContainer } from "@app/components/centered-page-container";
import { CENTERED_FULL_PAGE_MAX_WIDTH } from "@app/components/global-styles/full-page-styles";
import { Header } from "@app/components/header";
import { Tooltip } from "@app/components/tooltip";
import { Caption } from "@app/components/typography";
import { CurrentBtcAccountName } from "@app/features/btc-account/current-btc-account-name";
import { CurrentAccountAvatar } from "@app/features/current-account/current-account-avatar";
import { useCurrentAccount } from "@app/store/accounts/account.hooks";
import { RouteUrls } from "@shared/route-urls";
import { Box, color, Stack, StackProps, useClipboard } from "@stacks/ui";
import { UserAreaSelectors } from "@tests/integration/user-area.selectors";
import { memo, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { AccountInfoFetcher, BalanceFetcher } from "../home/components/fetchers";
import { FiCopy } from 'react-icons/fi';
import { truncateMiddle } from '@stacks/ui-utils';
import { getBitcoinAddress } from "@app/store/assets/utils";
import { BitcoinAccountActions } from "./components/btc-account-actions";
import { DataList } from "@app/features/data-list/data-list";
import { BitcoinAssets } from "@app/features/balances-list/components/bitcoin-assets";
import { useStxTokenState } from "@app/store/assets/asset.hooks";
import { AssetRow } from "@app/components/asset-row";
import { BtcAccountTabs } from "./components/btc-account-tabs";
import { BtcActivityList } from "./components/btc-activity-list";

export const AccountAddress = memo((props: StackProps) => {
  const currentAccount = useCurrentAccount();
  const { onCopy, hasCopied } = useClipboard(getBitcoinAddress(currentAccount?.address) || '');
  const analytics = useAnalytics();
  const copyToClipboard = () => {
    void analytics.track('copy_btc_address_to_clipboard');
    onCopy();
  };

  return currentAccount ? (
    <Stack isInline {...props}>
      <Caption>{truncateMiddle(getBitcoinAddress(currentAccount.address), 4)}</Caption>
      <Tooltip placement="right" label={hasCopied ? 'Copied!' : 'Copy address'}>
        <Stack>
          <Box
            _hover={{ cursor: 'pointer' }}
            onClick={copyToClipboard}
            size="12px"
            color={color('text-caption')}
            data-testid={UserAreaSelectors.AccountCopyAddress}
            as={FiCopy}
          />
        </Stack>
      </Tooltip>
    </Stack>
  ) : null;
});

export const BitcoinAccount = () => {
  const navigate = useNavigate();
  const account = useCurrentAccount();
  const stxToken = useStxTokenState(account ? account.address : "");
  
  useRouteHeader(<Header title="Bitcoin" onClose={() => navigate(RouteUrls.Home)} />);

  return (
    <>
      <Suspense fallback={null}>
        {account?.address && <BalanceFetcher address={account.address} />}
        {account?.address && <AccountInfoFetcher address={account.address} />}
      </Suspense>
      <Stack
        data-testid="btc-account-page"
        flexGrow={1}
        maxWidth={CENTERED_FULL_PAGE_MAX_WIDTH}
        mt="loose"
        px={['unset', 'base-loose']}
        spacing="loose"
      >
        <Stack spacing="base-tight" alignItems="center" isInline>
          <CurrentAccountAvatar />
          <Stack overflow="hidden" display="block" alignItems="flex-start" spacing="base-tight">
            <CurrentBtcAccountName />
            <AccountAddress />
          </Stack>
        </Stack>
        <BitcoinAccountActions />
        <BtcAccountTabs
          balances={
            <Stack spacing="loose">
              <BitcoinAssets />
              <AssetRow asset={stxToken}/>
            </Stack>
          }
          activity={<BtcActivityList />}
        />
      </Stack>
    </>
  )
}