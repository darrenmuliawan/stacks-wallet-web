import { useExplorerLink } from "@app/common/hooks/use-explorer-link"
import { useRouteHeader } from "@app/common/hooks/use-route-header"
import { CenteredPageContainer } from "@app/components/centered-page-container"
import { CENTERED_FULL_PAGE_MAX_WIDTH } from "@app/components/global-styles/full-page-styles"
import { Header } from "@app/components/header"
import { Link } from "@app/components/link"
import { Caption } from "@app/components/typography"
import { RouteUrls } from "@shared/route-urls"
import { Button, Stack, Text } from "@stacks/ui"
import { microStxToStx } from "@stacks/ui-utils"
import { useAtom } from "jotai"
import { useNavigate } from "react-router-dom"
import { CallContractConfirmDrawer } from "./components/call-contract-confirm-drawer"
import { broadcastClaimToken, useClaimStxTxSubmittedState, useClaimTokenTxId, useLnSwapResponseState, usePreviewClaimStxVisibilityState, useTxOptionsState, useUnsignedTxState } from "./hooks/ln-swap-btc.hooks"
import { useReceiveTokenState } from "./hooks/swap-btc.hooks"

export const ClaimToken = () => {
  const [receiveToken, ] = useReceiveTokenState();  
  const [lnSwapResponse, ] = useLnSwapResponseState();
  const [claimTxId, ] = useClaimTokenTxId();
  const [txOptions, ] = useTxOptionsState();
  const [unsignedTx, ] = useUnsignedTxState();
  const [previewClaimStxVisibility, setPreviewClaimStxVisibility] = usePreviewClaimStxVisibilityState()
  const [claimStxTxSubmitted, ] = useClaimStxTxSubmittedState();
  const { handleOpenTxLink } = useExplorerLink();
  const [claimTokenTxId, ] = useClaimTokenTxId();

  // handle fees
  // const [serializedTxPayload, ] = useSerializedTxPayloadState();
  // const [estimatedTxByteLength, ] = useEstimatedTxByteLengthState();
  // const { data: feeEstimationsResp, isError } = useFeeEstimationsQuery(
  //   serializedTxPayload,
  //   estimatedTxByteLength
  // );
  // const [, setFeeEstimations] = useFeeEstimationsState();
  // const feeEstimationsMaxValues = useFeeEstimationsMaxValues();

  const [, _broadcastClaimToken] = useAtom(broadcastClaimToken);
  const navigate = useNavigate();
  useRouteHeader(<Header title="Step 4" onClose={() => navigate(RouteUrls.BuyBitcoin)}/>);

  // handle fees
  // useEffect(() => {
  //   if (feeEstimationsResp) {
  //     if ((isError || !!feeEstimationsResp.error || !feeEstimationsResp.estimations.length) && estimatedTxByteLength) {
  //       setFeeEstimations(getDefaultSimulatedFeeEstimations(estimatedTxByteLength));
  //     }

  //     if (feeEstimationsResp.estimations && feeEstimationsResp.estimations.length) {
  //       const feeEstimationsWithMaxValues = getFeeEstimationsWithMaxValues(
  //         feeEstimationsResp.estimations,
  //         feeEstimationsMaxValues
  //       );
  //       setFeeEstimations(feeEstimationsWithMaxValues);
  //     }
  //   }
  // }, [estimatedTxByteLength, feeEstimationsResp, isError, setFeeEstimations])

  return (
    <CenteredPageContainer
      maxWidth={CENTERED_FULL_PAGE_MAX_WIDTH}
    >
      <Stack
        px={['unset', 'base-loose']}
        spacing='loose'
        textAlign='center'
      >
        <Text textAlign={['left', 'center']}>
          Transaction ID: {lnSwapResponse.id}
        </Text>
        <Text textAlign={['left', 'center']}>
          Lockup is confirmed, you can now trigger claim contract call to finalize the swap and receive your <b>{receiveToken}</b>
        </Text>
        {
          claimTokenTxId !== '' &&
          <Caption>
            Transaction submitted! You can check your transaction <Link fontSize={12} onClick={() => handleOpenTxLink(claimTokenTxId)}>here</Link>.
          </Caption>
        }
        {/* {
          feeEstimationsResp && (
            <FeeRow feeFieldName="fee" feeTypeFieldName="feeType" isSponsored={false} />
          )
        } */}
        <Button
          size="md"
          pl="base-tight"
          pr={'base'}
          py="tight"
          fontSize={2}
          mode="primary"
          position="relative"
          onClick={() => setPreviewClaimStxVisibility(true)}
          borderRadius="10px"
          // isDisabled={loadingInitSwap}
        >
          <Text>Claim {receiveToken}</Text>
        </Button>
      </Stack>
      <CallContractConfirmDrawer
        amount={microStxToStx((lnSwapResponse.onchainAmount / 100).toFixed(8))}
        onBroadcastTx={_broadcastClaimToken}
        txOptions={txOptions}
        title='Claim STX'
        disabled={claimStxTxSubmitted}
        isShowing={previewClaimStxVisibility}
        onClose={() => setPreviewClaimStxVisibility(false)}
      />
    </CenteredPageContainer>
  )
}