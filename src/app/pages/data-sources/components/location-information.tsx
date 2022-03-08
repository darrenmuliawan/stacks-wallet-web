import { useRouteHeader } from "@app/common/hooks/use-route-header";
import { CENTERED_FULL_PAGE_MAX_WIDTH } from "@app/components/global-styles/full-page-styles";
import { Header } from "@app/components/header";
import { Switch } from "@app/components/switch";
import { Caption } from "@app/components/typography";
import { DataVaultActions } from "@app/pages/data-vault/components/data-vault-actions";
import { useCurrentPageState } from "@app/pages/data-vault/hooks/data-vault.hooks";
import { DATA_VAULT_PAGE_ENUM } from "@app/pages/data-vault/store/data-vault.store";
import { CurrentAccount } from "@app/pages/home/components/account-area";
import { AccountInfoFetcher, BalanceFetcher } from "@app/pages/home/components/fetchers"
import { useCurrentAccount } from "@app/store/accounts/account.hooks";
import { RouteUrls } from "@shared/route-urls";
import { Box, Stack, Text } from "@stacks/ui";
import { useAtom } from "jotai";
import { Suspense, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { toggleLocationInformationDataChecked, useLocationInformationDataState } from "../hooks/location-information.hooks";

export const LocationInformation = () => {
  const navigate = useNavigate();
  useRouteHeader(<Header title="Location (Facebook)" onClose={() => navigate(RouteUrls.FacebookData)}/>)
  const account = useCurrentAccount();
  const [_, setPage] = useCurrentPageState();

  useEffect(() => {
    setPage(DATA_VAULT_PAGE_ENUM.ConnectData);
  }, [])
  
  return (
    <>
      <Suspense fallback={<></>}>
        {account?.address && <BalanceFetcher address={account.address} />}
        {account?.address && <AccountInfoFetcher address={account.address} />}
      </Suspense>
      <Stack
        data-testid="fb-data-categories"
        flexGrow={1}
        maxWidth={CENTERED_FULL_PAGE_MAX_WIDTH}
        mt="loose"
        px={['unset', 'base-loose']}
        spacing='loose'
      >
        <CurrentAccount />
        <DataVaultActions />
        <LocationInformationList />
      </Stack>
    </>
  )
}

const LocationInformationList = () => {
  const [locationInformation, ] = useLocationInformationDataState();
  const [, toggle] = useAtom(toggleLocationInformationDataChecked);

  return (
    <Stack>
      <Box
        as='div'
        display='flex'
        textAlign='left'
        outline={0}
        position="relative"
        flexGrow={1}
      >
        <Stack pt="tight" flexGrow={1} width="100%" isInline spacing="base" alignItems="center">
          <Stack flexGrow={1}>
            <Text style={{ textTransform: 'capitalize' }}>Location</Text>
            <Caption>
              {locationInformation.data['location'].value}
            </Caption>
          </Stack>
          <Stack>
            <Switch checked={locationInformation.data['location'].connected} onClick={() => toggle('location')}/>
          </Stack>
        </Stack>
      </Box>
      <Box
        as='div'
        display='flex'
        textAlign='left'
        outline={0}
        position="relative"
        flexGrow={1}
      >
        <Stack pt="tight" flexGrow={1} width="100%" isInline spacing="base" alignItems="center">
          <Stack flexGrow={1}>
            <Text style={{ textTransform: 'capitalize' }}>Timezone</Text>
            <Caption>
              {locationInformation.data['timezone'].value}
            </Caption>
          </Stack>
          <Stack>
            <Switch checked={locationInformation.data['timezone'].connected} onClick={() => toggle('timezone')}/>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  )
}