import { useRouteHeader } from "@app/common/hooks/use-route-header";
import { CenteredPageContainer } from "@app/components/centered-page-container";
import { CENTERED_FULL_PAGE_MAX_WIDTH } from "@app/components/global-styles/full-page-styles";
import { Header } from "@app/components/header";
import { SpaceBetween } from "@app/components/space-between";
import { RouteUrls } from "@shared/route-urls";
import { Box, Button, color, Stack, Text } from "@stacks/ui";
import { truncateMiddle } from "@stacks/ui-utils";
import { useNavigate } from "react-router-dom";
import { QrCode } from "../receive-tokens/components/address-qr-code";
import { useReceiveTokenState, useSendSwapResponseState, useSendSwapStatusState } from "./hooks/swap-btc.hooks";
import { FiCopy } from 'react-icons/fi';

export const SendSwapTransaction = () => {
  const [receiveToken, ] = useReceiveTokenState();
  const navigate = useNavigate();
  useRouteHeader(<Header title="Step 2" onClose={() => navigate(RouteUrls.BuyBitcoin)}/>)

  const getSwapTransactionContractContent = () => {
    if (receiveToken === 'STX') {
      return <BtcContractContent />
    } else {
      return <StxContractContent /> 
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
  const [sendSwapResponse, ] = useSendSwapResponseState();
  
  return (
    <>
      <Text textAlign={['left', 'center']}>
        You need to lock <Text fontWeight='bold'>{sendSwapResponse.baseAmount} STX</Text> to this contract:
      </Text>
      <Box
        width="100%"
        px='base'
        py='base'
        borderRadius='8px'
        border='1px solid'
        borderColor={color('border')}
        userSelect='none'
        flexWrap='wrap'
        wrap='wrap'
      >
        <SpaceBetween>
          <Stack>
            <Text>{truncateMiddle(sendSwapResponse.address, 5)}</Text>
          </Stack>
          <FiCopy 
            cursor='pointer'
            opacity={0.7}
          />
        </SpaceBetween>
      </Box>
      <Button
        size="md"
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
  const [sendSwapResponse, ] = useSendSwapResponseState();
  const [sendSwapStatus, ] = useSendSwapStatusState();

  return (
    <>
      <Text textAlign={['left', 'center']}>
        Transaction ID: <Text fontWeight='bold'>{sendSwapResponse.id}</Text>
      </Text>
      <Text textAlign={['left', 'center']}>
        Send <Text fontWeight='bold'>{sendSwapResponse.expectedAmount} BTC</Text> to this address
      </Text>
      <Text as='label' display='block' mb='tight' fontSize={1}>
        {sendSwapResponse.address}
      </Text>
      <QrCode
        principal={sendSwapResponse.bip21}
      />
      <Button
        size="md"
        fontSize={2}
        mode="primary"
        // ref={ref}
        // onClick={handleClick}
        borderRadius="12px"
        isDisabled={sendSwapStatus.pending}
      >
        <Text>{sendSwapStatus.message}</Text>
      </Button>
    </>
  )
}