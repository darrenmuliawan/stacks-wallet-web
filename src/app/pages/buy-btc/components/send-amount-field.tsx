import { ErrorLabel } from "@app/components/error-label";
import { Caption } from "@app/components/typography";
import { useCurrentAccount } from "@app/store/accounts/account.hooks";
import { useAssets, useStxTokenState } from "@app/store/assets/asset.hooks";
import { Box, Input, InputGroup, Stack, StackProps, Text } from "@stacks/ui";
import { SendFormSelectors } from "@tests/page-objects/send-form.selectors";
import { memo } from "react";
import { SendMaxButton } from "./send-max-button";

interface AmountFieldProps extends StackProps {
  error?: string;
  value: number | string;
  minValue: number | string;
  maxValue: number | string;
}

const SendAmountFieldBase = (props: AmountFieldProps) => {
  const { error, value, minValue, maxValue, ...rest } = props;
  const account = useCurrentAccount()
  const stxBalance = useStxTokenState(account ? account.address : "");
  const placeholder = "0.000000 STX";
  const title = "You send"

  return (
    <Stack {...rest}>
      <InputGroup flexDirection="column">
        <Text as="label" display="block" mb="tight" fontSize={1} fontWeight="500" htmlFor="amount">
          {title}
        </Text>
        <Box position="relative">
          <Input
            display="block"
            type="text"
            inputMode="numeric"
            width="100%"
            placeholder={placeholder}
            min="0"
            autoFocus={false}
            value={value === 0 ? '' : value}
            autoComplete="off"
            name="amount"
            // data-testid=""
          />
          <SendMaxButton
            fee={0}
            onClick={() => {}}
          />
        </Box>
      </InputGroup>
      {
        error && (
          <ErrorLabel data-testid={SendFormSelectors.InputAmountFieldErrorLabel}>
            <Text textStyle="caption">{error}</Text>
          </ErrorLabel>
        )
      }
      <Stack mt="base-tight" justify="space-between" alignItems="center" isInline>
        <Caption>Min: {minValue} STX</Caption>
        <Caption>Max: {maxValue} STX</Caption>
      </Stack>
    </Stack>
  )
}

export const SendAmountField = memo(SendAmountFieldBase);