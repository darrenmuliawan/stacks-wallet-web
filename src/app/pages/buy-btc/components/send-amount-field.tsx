import { ErrorLabel } from "@app/components/error-label";
import { SpaceBetween } from "@app/components/space-between";
import { AssetAvatar } from "@app/components/stx-avatar";
import { Caption } from "@app/components/typography";
import { useCurrentAccount } from "@app/store/accounts/account.hooks";
import { useAssets, useBitcoinTokenState, useStxTokenState } from "@app/store/assets/asset.hooks";
import { Box, color, Input, InputGroup, Stack, StackProps, Text } from "@stacks/ui";
import { SendFormSelectors } from "@tests/page-objects/send-form.selectors";
import { memo } from "react";
import { useLimitsState, useReceiveTokenState, useSendAmountErrorState, useSendTokenState, useSendValueState } from "../hooks/swap-btc.hooks";
import { formatMaxValue, formatMinValue, getPairName } from "../utils/utils";
import { SendMaxButton } from "./send-max-button";

interface AmountFieldProps extends StackProps {
  onValueChange: (value: string) => any;
}

const SendAmountFieldBase = (props: AmountFieldProps) => {
  const { onValueChange, ...rest } = props;
  const account = useCurrentAccount()
  const stxToken = useStxTokenState(account ? account.address : '');
  const btcToken = useBitcoinTokenState();
  const [sendToken, ] = useSendTokenState();
  const [receiveToken, ] = useReceiveTokenState();
  const [sendValue, ] = useSendValueState();
  const [sendAmountError, ] = useSendAmountErrorState();
  const stxBalance = useStxTokenState(account ? account.address : "");
  const placeholder = `0.000000 ${sendToken}`;
  const title = "You send"
  const [limits, ] = useLimitsState();

  return (
    <Stack {...rest}>
      <InputGroup flexDirection="column">
        <Text as="label" display="block" mb="tight" fontSize={1} fontWeight="500" htmlFor="amount">
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
                useStx={sendToken === 'STX'}
                useBtc={sendToken === 'BTC'}
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
                  {getPairName(sendToken)}
                </Text>
                <Caption>{sendToken === 'STX' ? stxToken.balance.toString() : btcToken.balance.toString()} {sendToken}</Caption>
              </Stack>
            </Stack>
          </SpaceBetween>
        </Box>
        <Box position="relative">
          <Input
            display="block"
            type="text"
            inputMode="numeric"
            width="100%"
            placeholder={placeholder}
            min="0"
            autoFocus={false}
            value={sendValue}
            autoComplete="off"
            name="amount"
            onChange={(e) => onValueChange((e.target as HTMLInputElement).value)}
            // data-testid=""
          />
          {/* <SendMaxButton
            fee={0}
            onClick={() => {}}
          /> */}
        </Box>
      </InputGroup>
      {
        sendAmountError.error && (
          <ErrorLabel data-testid={SendFormSelectors.InputAmountFieldErrorLabel}>
            <Text textStyle="caption">{sendAmountError.message}</Text>
          </ErrorLabel>
        )
      }
      <Stack mt="base-tight" justify="space-between" alignItems="center" isInline>
        <Caption>Min: {formatMinValue(limits, sendToken, receiveToken)} {sendToken}</Caption>
        <Caption>Max: {formatMaxValue(limits, sendToken, receiveToken)} {sendToken}</Caption>
      </Stack>
    </Stack>
  )
}

export const SendAmountField = memo(SendAmountFieldBase);