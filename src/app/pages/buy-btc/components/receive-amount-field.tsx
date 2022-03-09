import { SpaceBetween } from "@app/components/space-between";
import { Caption } from "@app/components/typography";
import { Box, color, Stack, StackProps, Text } from "@stacks/ui";

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
  const title = "You receive";

  return (
    <Stack {...rest} mt="tight">
      <Stack>
        <Text as="label" display="block" mb="tight" fontSize={1} fontWeight="500">
          {title}
        </Text>
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
            <Text>{value === '' ? 0 : value}</Text>
            <Text>{receiveUnit}</Text>
          </SpaceBetween>
        </Box>
      </Stack>
      <Stack mt="base-tight" justify="space-between" alignItems="center" isInline>
        <Caption>Current fee: {fee} {unit} ({feeRate}%)</Caption>
        <Caption>Rate: {rate}</Caption>
      </Stack>
    </Stack>
  )
}