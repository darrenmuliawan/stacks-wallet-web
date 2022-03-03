import { CENTERED_FULL_PAGE_MAX_WIDTH } from "@app/components/global-styles/full-page-styles"
import { PrimaryButton } from "@app/components/primary-button"
import { Box, Stack } from "@stacks/ui"
import { Suspense } from "react"
import { SendAmountField } from "./send-amount-field"
import { SelectedAsset } from "./selected-asset"
import { ReceiveAmountField } from "./receive-amount-field"

export const BuyBtcForm = () =>  {
  return (
    <Stack
      maxWidth={CENTERED_FULL_PAGE_MAX_WIDTH}
      mt="loose"
      px={['unset', 'base-loose']}
      spacing="loose"
      width="100%"
    >
      <SelectedAsset />
      <Suspense fallback={<></>}>
        <SendAmountField 
          error={""}
          value={0}
          title={"You send"}
          minValue={2}
          maxValue={500}
        />
      </Suspense>
      <Suspense fallback={<></>}>
        <ReceiveAmountField
          value={0}
          fee={0.06}
          feeRate={3}
          rate={0.00003}
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