import { useRouteHeader } from "@app/common/hooks/use-route-header";
import { CenteredPageContainer } from "@app/components/centered-page-container";
import { CENTERED_FULL_PAGE_MAX_WIDTH } from "@app/components/global-styles/full-page-styles";
import { Header } from "@app/components/header";
import { SpaceBetween } from "@app/components/space-between";
import { RouteUrls } from "@shared/route-urls";
import { Box, Button, color, Stack, Text } from "@stacks/ui";
import { useNavigate } from "react-router-dom";
import { QrCode } from "../receive-tokens/components/address-qr-code";
import { useReceiveTokenState } from "./hooks/swap-btc.hooks";

export const SendSwapTransaction = () => {
  const [receiveToken, ] = useReceiveTokenState();
  const navigate = useNavigate();
  useRouteHeader(<Header title="Step 2" onClose={() => navigate(RouteUrls.BuyBitcoin)}/>)

  const getSwapTransactionContractContent = () => {
    if (receiveToken === 'STX') {
      return <StxContractContent />
    } else {
      return <BtcContractContent /> 
    }
  }

  return (
    <CenteredPageContainer>
      <Stack
        maxWidth={CENTERED_FULL_PAGE_MAX_WIDTH}
        px={['unset', 'base-loose']}
        spacing="loose"
        textAlign='center'
      >
        {getSwapTransactionContractContent()}
      </Stack>
    </CenteredPageContainer>
  )
}

const StxContractContent = () => {
  return (
    <>
      <Text textAlign={['left', 'center']}>
        You need to lock 3.00000000 STX on this contract
      </Text>
      <Text as='label' display='block' mb='tight' fontSize={1} fontWeight='500'>
        Contract address
      </Text>
      <Box
        width="100%"
        px='base'
        py='base'
        borderRadius='8px'
        border='1px solid'
        borderColor={color('border')}
        userSelect='none'
      >
        <SpaceBetween>
          <Stack flexGrow={1}>
            <Text>SP25...</Text>
          </Stack>
        </SpaceBetween>
      </Box>
      <Button
        size="md"
        pl="base-tight"
        pr={'base'}
        py="tight"
        fontSize={2}
        mode="primary"
        position="relative"
        // ref={ref}
        // onClick={handleClick}
        borderRadius="10px"
      >
        <Text>Lock STX</Text>
      </Button>
    </>
  )
}

const BtcContractContent = () => {
  return (
    <>
      <Text textAlign={['left', 'center']}>
        Send x BTC to this address
      </Text>
      <Text as='label' display='block' mb='tight' fontSize={1} fontWeight='500'>
        37zHd...
      </Text>
      <QrCode
        principal="37zHD..."
      />
      <Button
        size="md"
        pl="base-tight"
        pr={'base'}
        py="tight"
        fontSize={2}
        mode="primary"
        position="relative"
        // ref={ref}
        // onClick={handleClick}
        borderRadius="10px"
      >
        <Text>Waiting for one confirmation...</Text>
      </Button>
    </>
  )
}