import { useRouteHeader } from "@app/common/hooks/use-route-header";
import { Header } from "@app/components/header";
import { useCurrentAccount } from "@app/store/accounts/account.hooks";
import { RouteUrls } from "@shared/route-urls";
import { Box, Button, ChevronIcon, color, Input, InputGroup, Stack, Text } from "@stacks/ui";
import { useNavigate } from "react-router-dom";
import { CurrentAccount } from "../home/components/account-area";
import { AccountInfoFetcher, BalanceFetcher } from "../home/components/fetchers";
import { CENTERED_FULL_PAGE_MAX_WIDTH } from "@app/components/global-styles/full-page-styles";
import { DataVaultActions } from "./components/data-vault-actions";
import { Suspense, useEffect, useState } from "react";
import { Caption } from "@app/components/typography";
import { SpaceBetween } from "@app/components/space-between";
import { useCurrentPageState } from "./hooks/data-vault.hooks";
import { DATA_VAULT_PAGE_ENUM } from "./store/data-vault.store";

export const StackData = () => {
  const navigate = useNavigate();
  useRouteHeader(<Header title="Stack Data" onClose={() => navigate(RouteUrls.MyDataVault)}/>)
  const account = useCurrentAccount();
  const [_, setPage] = useCurrentPageState();

  useEffect(() => {
    setPage(DATA_VAULT_PAGE_ENUM.StackData);
  }, [])

  return (
    <>
      <Suspense fallback={<></>}>
        {account?.address && <BalanceFetcher address={account.address} />}
        {account?.address && <AccountInfoFetcher address={account.address} />}
      </Suspense>
      <Stack
        data-testid="data-vault-page"
        flexGrow={1}
        maxWidth={CENTERED_FULL_PAGE_MAX_WIDTH}
        mt="loose"
        px={['unset', 'base-loose']}
        spacing='loose'
      >
        <CurrentAccount />
        <DataVaultActions />
        <StackDataContent />
        <Footer />
      </Stack>
    </>
  )
}

const StackDataContent = () => {
  const [value, setValue] = useState('');
  const slashtags = ["hello", "world", "my", "name", "is", "john doe"]

  return (
    <Stack>
      <Stack mt="loose">
        <Text display="block" fontSize={1} fontWeight="500" mb="tight">
          Slashtag categories
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
          <Stack isInline justifyContent="center" rowGap="tight" wrap="wrap">
            {
              slashtags.map((tags) =>
                <Box
                  px="base"
                  py="base-tight"
                  borderRadius="8px"
                  border="1px solid"
                  borderColor={color('border')}
                  userSelect="none"
                  key={tags}
                >
                  <Text style={{ textTransform: 'capitalize' }}>{tags}</Text>
                </Box>
              )
            }
          </Stack>
        </Box>
        <Caption>
          List of all slashtag categories the user will sell anonymized access to
        </Caption>
      </Stack>
      <InputGroup mt="loose" flexDirection="column">
        <Text as="label" display="block" mb="tight" fontSize={1} fontWeight="500" htmlFor="stacking-cycles">
          Number of stacking cycles you want to stack your data
        </Text>
        <Box>
          <Input
            display="block"
            type="text"
            inputMode="numeric"
            width="100%"
            placeholder="Max: 32 cycles"
            min="0"
            autoFocus={false}
            value={value}
            onChange={
              // @ts-ignore
              (e) => setValue(e.target.value)
            }
            autoComplete="off"
            name="amount"
          />
        </Box>
        <Caption mt="tight">
          8 cycles = 12 weeks
        </Caption>
      </InputGroup>
      <Stack mt="loose">
        <Text display="block" fontSize={1} fontWeight="500" mb="tight">
          Any data to exclude?
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
          <SpaceBetween>
            <Text>
              Slashtags
            </Text>
            <ChevronIcon
              size="24px"
              direction="down"
              cursor="pointer"
              opacity={0.7}
            />
          </SpaceBetween>
        </Box>
      </Stack>
      <Stack mt="loose">
        <Text display="block" fontSize={1} fontWeight="500" mb="tight">
          Collected Stacking Yield
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
          <Text>
            40 STX
          </Text>
        </Box>
      </Stack>
    </Stack>
  )
}

const Footer = () => {
  return (
    <Stack
      mt="tight"
      isInline
      justify="space-between"
      alignItems="center"
    >
      <Button
        size="md"
        fontSize={2}
        borderRadius="30px"
        width="100%"
        mode="tertiary"
      >
        Save Draft
      </Button>
      <Button
        size="md"
        fontSize={2}
        borderRadius="30px"
        width="100%"
      >
        Start Stacking!
      </Button>
    </Stack>
  )
}