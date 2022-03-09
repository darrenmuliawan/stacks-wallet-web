import { CENTERED_FULL_PAGE_MAX_WIDTH } from "@app/components/global-styles/full-page-styles"
import { PrimaryButton } from "@app/components/primary-button"
import { Box, Stack } from "@stacks/ui"
import { Suspense, useState } from "react"
import { SendAmountField } from "./send-amount-field"
import { SelectedAsset } from "./selected-asset"
import { ReceiveAmountField } from "./receive-amount-field"

export const BuyBtcForm = () =>  {
  const [firstPair, setFirstPair] = useState('STX');
  const [secondPair, setSecondPair] = useState('BTC');
  const [sendValue, setSendValue] = useState('');
  const [receiveValue, setReceiveValue] = useState('');
  const maxBitcoinValue = 0.5;
  const minBitcoinValue = 0.00005;
  const stxBtcRate = 0.00003;
  const feeRate = 3;

  const getName = (name: string) => {
    if (name === 'STX') return "Stacks";
    return "Bitcoin"
  }

  const swapPair = () => {
    if (firstPair === 'STX') {
      setFirstPair("BTC");
      setSecondPair("STX");
    } else {
      setFirstPair("STX");
      setSecondPair("BTC");
    }
    setSendValue(receiveValue);
    setReceiveValue(sendValue);
  }

  const calculateMinValue = () => {
    if (firstPair === 'STX') {
      return 2
    } else {
      return 2 * stxBtcRate;
    }
  }

  const calculateMaxValue = () => {
    if (firstPair === 'STX') {
      return 500;
    } else {
      return (500 * stxBtcRate).toFixed(5);
    }
  }

  const calculateFee = () => {
    if (sendValue === '') return 0
    return parseFloat((parseFloat(sendValue) * feeRate / 100).toFixed(3))
  }

  const calculateReceiveValue = (value: number) => {
    if (firstPair === 'STX') {
      return stxBtcRate * value;
    } else {
      return value / stxBtcRate;
    }
  }

  const onValueChange = (value: string) => {
    setSendValue(value);
    let num = parseFloat(value);
    if (!isNaN(num)) {
      let receiveValue = calculateReceiveValue(num).toFixed(4);
      setReceiveValue(receiveValue);
    } else {
      setReceiveValue("");
    }
  }
  
  return (
    <Stack
      maxWidth={CENTERED_FULL_PAGE_MAX_WIDTH}
      mt="loose"
      px={['unset', 'base-loose']}
      spacing="loose"
      width="100%"
    >
      <SelectedAsset 
        firstPair={firstPair}
        secondPair={secondPair}
        getName={getName}
        swapPair={swapPair}
      />
      <Suspense fallback={<></>}>
        <SendAmountField 
          error={""}
          value={sendValue}
          title={"You send"}
          minValue={calculateMinValue()}
          maxValue={calculateMaxValue()}
          unit={firstPair}
          onValueChange={onValueChange}
        />
      </Suspense>
      <Suspense fallback={<></>}>
        <ReceiveAmountField
          value={receiveValue}
          fee={calculateFee()}
          feeRate={feeRate}
          rate={stxBtcRate}
          unit={firstPair}
          receiveUnit={secondPair}
        />
      </Suspense>
      {/* <FeeRow feeFieldName="fee" feeTypeFieldName="feeType" isSponsored={true} /> */}
      <Box mt="auto">
        <PrimaryButton
          // data-testid=""
          width="100%"
        >
          Start Swap
        </PrimaryButton>
      </Box>
    </Stack>
  )
}