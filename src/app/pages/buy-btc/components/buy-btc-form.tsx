import { CENTERED_FULL_PAGE_MAX_WIDTH } from "@app/components/global-styles/full-page-styles"
import { PrimaryButton } from "@app/components/primary-button"
import { Box, Stack } from "@stacks/ui"
import { Suspense, useEffect } from "react"
import { SendAmountField } from "./send-amount-field"
import { SelectedAsset } from "./selected-asset"
import { ReceiveAmountField } from "./receive-amount-field"
import { getPairs, initSwap, useFeeRateState, useMaxBitcoinValueState, useMinBitcoinValueState, useReceiveTokenState, useReceiveValueState, useSendTokenState, useSendValueState, useStxBtcRateState } from "../hooks/swap-btc.hooks"
import { useAtom } from "jotai"
import { useNavigate } from "react-router-dom"
import { RouteUrls } from "@shared/route-urls"
import { CgArrowsExchangeAltV } from 'react-icons/cg';
import { calculateReceiveValue } from "../utils/utils"

export const BuyBtcForm = () =>  {
  const navigate = useNavigate();
  const [sendToken, setSendToken] = useSendTokenState();
  const [receiveToken, setReceiveToken] = useReceiveTokenState();
  const [sendValue, setSendValue] = useSendValueState();
  const [receiveValue, setReceiveValue] = useReceiveValueState();
  const [maxBitcoinValue, ] = useMaxBitcoinValueState();
  const [minBitcoinValue, ] = useMinBitcoinValueState();
  const [stxBtcRate, ] = useStxBtcRateState();
  const [feeRate, ] = useFeeRateState();
  const [, _initSwap] = useAtom(initSwap);
  const [, _getPairs] = useAtom(getPairs);
  const [, _calculateReceiveValue] = useAtom(calculateReceiveValue);

  useEffect(() => {
    _getPairs();
  }, [])

  const swapPair = () => {
    if (sendToken === 'STX') {
      setSendToken("BTC");
      setReceiveToken("STX");
    } else {
      setSendToken("STX");
      setReceiveToken("BTC");
    }
    setSendValue(receiveValue);
    setReceiveValue(sendValue);
  }

  const calculateMinValue = () => {
    if (sendToken === 'STX') {
      return 2
    } else {
      return 2 * stxBtcRate;
    }
  }

  const calculateMaxValue = () => {
    if (sendToken === 'STX') {
      return 500;
    } else {
      return (500 * stxBtcRate).toFixed(5);
    }
  }

  const calculateFee = () => {
    if (sendValue === '') return 0
    return parseFloat((parseFloat(sendValue) * feeRate / 100).toFixed(3))
  }

  // const calculateReceiveValue = (value: number) => {
  //   if (sendToken === 'STX') {
  //     return stxBtcRate * value;
  //   } else {
  //     return value / stxBtcRate;
  //   }
  // }

  const onValueChange = (value: string) => {
    setSendValue(value);
    // let num = parseFloat(value);
    _calculateReceiveValue();
    // if (!isNaN(num)) {
    //   let receiveValue = calculateReceiveValue(num).toFixed(4);
    //   setReceiveValue(receiveValue);
    // } else {
    //   setReceiveValue("");
    // }
  }

  const navigateToInsertAddressPage = () => {
    navigate(RouteUrls.InsertAddress);
  }
  
  return (
    <Stack
      maxWidth={CENTERED_FULL_PAGE_MAX_WIDTH}
      mt="loose"
      px={['unset', 'base-loose']}
      spacing="loose"
      width="100%"
    >
      {/* <SelectedAsset 
        sendToken={sendToken}
        receiveToken={receiveToken}
        getName={getName}
        swapPair={swapPair}
      /> */}
      <Suspense fallback={<></>}>
        <SendAmountField 
          error={""}
          title={"You send"}
          onValueChange={onValueChange}
        />
      </Suspense>
      <Stack justifyContent='center' alignItems='center'>
        <CgArrowsExchangeAltV 
          size={25} 
          cursor='pointer'
          onClick={swapPair} 
        />
      </Stack>
      <Suspense fallback={<></>}>
        <ReceiveAmountField
          value={receiveValue}
          fee={calculateFee()}
          feeRate={feeRate}
          rate={stxBtcRate}
          unit={sendToken}
          receiveUnit={receiveToken}
        />
      </Suspense>
      {/* <FeeRow feeFieldName="fee" feeTypeFieldName="feeType" isSponsored={true} /> */}
      <Box mt="auto">
        <PrimaryButton
          // data-testid=""
          width="100%"
          onClick={() => _initSwap(navigateToInsertAddressPage)}
          isDisabled={
            sendValue === ''
          }
        >
          Start Swap
        </PrimaryButton>
      </Box>
    </Stack>
  )
}