import { useRouteHeader } from "@app/common/hooks/use-route-header";
import { CenteredPageContainer } from "@app/components/centered-page-container";
import { CENTERED_FULL_PAGE_MAX_WIDTH } from "@app/components/global-styles/full-page-styles";
import { Header } from "@app/components/header";
import { Caption } from "@app/components/typography";
import { CurrentBtcAccountName } from "@app/features/btc-account/current-btc-account-name";
import { QrCode } from "@app/pages/receive-tokens/components/address-qr-code";
import { useCurrentAccount } from "@app/store/accounts/account.hooks";
import { useStxTokenState } from "@app/store/assets/asset.hooks";
import { getBitcoinAddress } from "@app/store/assets/utils";
import { RouteUrls } from "@shared/route-urls";
import { Box, Button, Stack, color, Text, useClipboard } from "@stacks/ui";
import { useNavigate } from "react-router-dom";
import { truncateMiddle } from '@stacks/ui-utils';
import { PrimaryButton } from "@app/components/primary-button";
import { useAnalytics } from '@app/common/hooks/analytics/use-analytics';

export const ReceiveBitcoin = () => {
  const navigate = useNavigate();
  const account = useCurrentAccount();
  // const stxToken = useStxTokenState(account ? account.address : "");
  const btcAddress = getBitcoinAddress(account ? account.address : "");
  const { onCopy, hasCopied } = useClipboard(btcAddress);
  const analytics = useAnalytics();

  useRouteHeader(<Header title="Receive Bitcoin" onClose={() => navigate(RouteUrls.Bitcoin)} />);
  
  const copyToClipboard = () => {
    void analytics.track('copy_address_to_clipboard');
    onCopy();
  };

  return (
    <CenteredPageContainer>
      <Stack
        maxWidth={CENTERED_FULL_PAGE_MAX_WIDTH}
        px={['unset', 'base-loose']}
        spacing="loose"
        textAlign="center"
      >
        <Text textAlign={['left', 'center']}>
          Share your unique address to receive bitcoin.
        </Text>
        <Box mx="auto">
          <QrCode principal={btcAddress} />
        </Box>
        <CurrentBtcAccountName />
        <Caption userSelect="none">{truncateMiddle(btcAddress, 4)}</Caption>
        {!hasCopied ? (
          <PrimaryButton onClick={copyToClipboard}>Copy your address</PrimaryButton>
        ) : (
          <Button
            _hover={{
              boxShadow: 'none',
            }}
            border="1px solid"
            borderColor={color('border')}
            borderRadius="10px"
            boxShadow="none"
            color={color('accent')}
            height="48px"
            mode="tertiary"
          >
            Copied to clipboard!
          </Button>
        )}
      </Stack>
    </CenteredPageContainer>
  )
}