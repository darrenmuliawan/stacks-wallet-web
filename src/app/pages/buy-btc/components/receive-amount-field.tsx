import { SpaceBetween } from "@app/components/space-between";
import { AssetAvatar } from "@app/components/stx-avatar";
import { Caption } from "@app/components/typography";
import { Box, color, Stack, StackProps, Text } from "@stacks/ui";
import { useFeesState, useRatesState, useReceiveValueState, useSendValueState } from "../hooks/swap-btc.hooks";
import { receiveToken, sendToken } from "../store/swap-btc.store";
import { formatFeeRate, formatFees, formatRate, getPairName } from "../utils/utils";

interface ReceiveAmountFieldProps extends StackProps {
  value: number | string;
  fee: number;
  feeRate: number;
  rate: number;
  unit: string;
  receiveUnit: string;
}

export const ReceiveAmountField = (props: ReceiveAmountFieldProps) => {
  const { value, fee, feeRate, rate, unit, receiveUnit, ...rest } = props;
  const [fees, ] = useFeesState();
  const [rates, ] = useRatesState();
  const [sendValue, ] = useSendValueState();
  const [receiveValue, ] = useReceiveValueState();

  const title = "You receive";
  const _rate = formatRate(rates, unit, receiveUnit);

  return (
    <Stack {...rest}>
      <Stack>
        <Text as="label" display="block" mb="tight" fontSize={1} fontWeight="500">
          {title}
        </Text>
        <Box
          width="100%"
          px="base"
          py="base-tight"
          borderRadius="8px"
          border="1px solid"
          borderColor={color('border')}
          userSelect="none"
          mb="tight"
        >
          <SpaceBetween>
            <Stack spacing="base" alignItems="center" justifyContent="center" isInline>
              <AssetAvatar
                useStx={receiveUnit === 'STX'}
                useBtc={receiveUnit === 'BTC'}
                gradientString=""
                mr="tight"
                size="36px"
                color="white"
              />
              <Stack flexGrow={1}>
                <Text
                  display="block"
                  fontWeight="400"
                  fontSize={2}
                  color="ink.1000"
                >
                  {getPairName(receiveUnit)}
                </Text>
                <Caption>{receiveUnit}</Caption>
              </Stack>
            </Stack>
          </SpaceBetween>
        </Box>
        <Box
          width="100%"
          px="base"
          py="base"
          borderRadius="8px"
          border="1px solid"
          borderColor={color('border')}
          userSelect="none"
        >
          <SpaceBetween>
            <Text>{receiveValue === '' ? 0 : receiveValue}</Text>
            <Text>{receiveUnit}</Text>
          </SpaceBetween>
        </Box>
      </Stack>
      <Stack mt="base-tight" justify="space-between" alignItems="center" isInline>
        <Caption>Current fee: {formatFees(fees, sendValue, unit, receiveUnit).toFixed(5)} {unit} ({formatFeeRate(fees, unit, receiveUnit)}%)</Caption>
        <Caption>Rate: {_rate.toFixed(5)}</Caption>
      </Stack>
    </Stack>
  )
}