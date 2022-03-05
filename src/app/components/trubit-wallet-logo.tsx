import { color, Stack, StackProps, Svg } from "@stacks/ui";
import { memo } from "react";
import TrubitLogo from '../../../public/assets/trubit-logo/black-no-background.svg';

export const TrubitWalletLogo = memo((props: StackProps) => {
  return (
    <Stack
      _hover={{ color: color('brand') }}
      alignItems="center"
      color={color('text-title')}
      cursor="pointer"
      isInline
      {...props}
    >
      <img
        src={TrubitLogo}
        style={{ height: "28px", width: "120px" }}
      />
    </Stack>
  )
})