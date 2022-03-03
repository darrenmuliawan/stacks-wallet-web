import { AssetAvatar } from "@app/components/stx-avatar"
import { Caption } from "@app/components/typography"
import { useCurrentAccount } from "@app/store/accounts/account.hooks"
import { useStxTokenState } from "@app/store/assets/asset.hooks"
import { Box, color, Stack, Text } from "@stacks/ui"

export const SelectedAsset = () => {
  const account = useCurrentAccount();
  const stxToken = useStxTokenState(account ? account.address : '');

  return (
    <Stack spacing="base-loose" flexDirection="column">
      <Stack spacing="tight">
        <Text display="block" fontSize={1} fontWeight="500" mb="tight">
          Choose an asset
        </Text>
        <Box
          width="100%"
          px="base"
          py="base-tight"
          borderRadius="8px"
          border="1px solid"
          borderColor={color('border')}
          userSelect="none"
        >
          <Stack spacing="base" alignItems="center" isInline>
            <AssetAvatar
              useStx={true}
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
                Stacks
              </Text>
              <Caption>STX</Caption>
            </Stack>
          </Stack>
        </Box>
      </Stack>
      <Caption>
        Balance: {stxToken.balance.toString()} STX
      </Caption>
    </Stack>
  )
}