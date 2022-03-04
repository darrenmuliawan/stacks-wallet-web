import { Stack, StackProps } from "@stacks/ui";
import { Suspense } from "react";
import { ConnectButton } from "./connect-button";
import { MyDataButton } from "./my-data-button";
import { StackButton } from "./stack-button";

export const DataVaultActions = (props: StackProps) => {
  return (
    <Suspense fallback={<></>}>
      <Stack isInline spacing="base-tight" {...props}>
        <MyDataButton />
        <ConnectButton />
        <StackButton />
      </Stack>
    </Suspense>
  )
}