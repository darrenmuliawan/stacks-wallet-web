import { Caption } from "@app/components/typography";
import { Box, color, Stack, StackProps, Text } from "@stacks/ui";

interface ReceiveAmountFieldProps extends StackProps {
  value: number | string;
  fee: number;
  feeRate: number;
  rate: number;
}

export const ReceiveAmountField = (props: ReceiveAmountFieldProps) => {
  const { value, fee, feeRate, rate, ...rest } = props;
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
          <Text>{value} BTC</Text>
        </Box>
      </Stack>
      <Stack mt="base-tight" justify="space-between" alignItems="center" isInline>
        <Caption>Current fee: {fee} STX ({feeRate}%)</Caption>
        <Caption>Rate: {rate}</Caption>
      </Stack>
    </Stack>
  )
}