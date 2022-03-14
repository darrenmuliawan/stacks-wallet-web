import { useRouteHeader } from "@app/common/hooks/use-route-header"
import { CenteredPageContainer } from "@app/components/centered-page-container"
import { Header } from "@app/components/header"
import { useCurrentAccount } from "@app/store/accounts/account.hooks"
import { getBitcoinAddress } from "@app/store/assets/utils"
import { RouteUrls } from "@shared/route-urls"
import { Box, Button, Input, Stack, Text } from "@stacks/ui"
import { useAtom } from "jotai"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { checkSwapAddress, startSwap, useLoadingInitSwapState, useReceiveTokenAddressState, useReceiveTokenState, useSendSwapStatusState } from "./hooks/swap-btc.hooks"

export const InsertAddress = () => {
  const [receiveToken, ] = useReceiveTokenState();
  const [receiveTokenAddress, setReceiveTokenAddress] = useReceiveTokenAddressState();
  const currentAccount = useCurrentAccount();
  const navigate = useNavigate();
  const [, _checkSwapAddress] = useAtom(checkSwapAddress);
  const [, _startSwap] = useAtom(startSwap);
  const [loadingInitSwap, ] = useLoadingInitSwapState();
  const [, setSwapStatus] = useSendSwapStatusState();
  useRouteHeader(<Header title="Step 1" onClose={() => navigate(RouteUrls.BuyBitcoin)}/>)

  useEffect(() => {
    let stxAddress = currentAccount ? currentAccount.address : "";
    let btcAddress = getBitcoinAddress(stxAddress);
    if (receiveToken === 'STX') {
      setReceiveTokenAddress(stxAddress);
    } else {
      setReceiveTokenAddress(btcAddress);
    }
  }, []);

  const handleClick = () => {
    _checkSwapAddress(() => _startSwap({
      navigationCb: () => navigate(RouteUrls.SendSwapTx),
      setSwapStatus: (data: any) => setSwapStatus(data)
    }))
  }

  return (
    <CenteredPageContainer>
      <Stack
        px={['unset', 'base-loose']}
        spacing='loose'
        textAlign='center'
      >
        <Text textAlign={['left', 'center']}>
          Insert {receiveToken} address
        </Text>
        <Box position="relative">
          <Input
            display="block"
            type="text"
            width="100%"
            placeholder="Enter address"
            value={receiveTokenAddress}
            onChange={(e) => setReceiveTokenAddress((e.target as HTMLInputElement).value)}
          />
        </Box>
        <Button
          size="md"
          pl="base-tight"
          pr={'base'}
          py="tight"
          fontSize={2}
          mode="primary"
          position="relative"
          onClick={handleClick}
          borderRadius="10px"
          isDisabled={loadingInitSwap}
        >
          <Text>Next</Text>
        </Button>
      </Stack>
    </CenteredPageContainer>
  )
}