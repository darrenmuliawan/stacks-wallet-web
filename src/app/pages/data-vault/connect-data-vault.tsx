import { useRouteHeader } from "@app/common/hooks/use-route-header";
import { BaseDrawer } from "@app/components/drawer";
import { CENTERED_FULL_PAGE_MAX_WIDTH } from "@app/components/global-styles/full-page-styles";
import { Header } from "@app/components/header";
import { SpaceBetween } from "@app/components/space-between";
import { Switch } from "@app/components/switch";
import { Caption } from "@app/components/typography";
import { DataList } from "@app/features/data-list/data-list";
import { useCurrentAccount } from "@app/store/accounts/account.hooks";
import { RouteUrls } from "@shared/route-urls";
import { Button, ChevronIcon, color, Stack, Text } from "@stacks/ui";
import { Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentAccount } from "../home/components/account-area";
import { AccountInfoFetcher, BalanceFetcher } from "../home/components/fetchers";
import { DataVaultActions } from "./components/data-vault-actions";
import { useAutoApproveAllSitesCheckedState, useConnectDataVaultSettingsVisibilityState } from "./hooks/connect-data-vault.hooks";
import { useCurrentPageState } from "./hooks/data-vault.hooks";
import { DATA_VAULT_PAGE_ENUM } from "./store/data-vault.store";

export const ConnectDataVault = () => {
  const navigate = useNavigate();
  useRouteHeader(<Header title="Data Vault" onClose={() => navigate(RouteUrls.Home)}/>)
  const account = useCurrentAccount();
  const [_, setPage] = useCurrentPageState();

  useEffect(() => {
    setPage(DATA_VAULT_PAGE_ENUM.ConnectData)
  }, [])

  return (
    <>
      <Suspense fallback={<></>}>
        {account?.address && <BalanceFetcher address={account.address} />}
        {account?.address && <AccountInfoFetcher address={account.address} />}
      </Suspense>
      <Stack
        data-testid="connect-data-vault-page"
        flexGrow={1}
        maxWidth={CENTERED_FULL_PAGE_MAX_WIDTH}
        mt="loose"
        px={['unset', 'base-loose']}
        spacing='loose'
      >
        <CurrentAccount />
        <DataVaultActions />
        <ConnectDataList />
        <Footer />
      </Stack>
    </>
  )
} 

const ConnectDataList = () => {
  const navigate = useNavigate();

  return (
    <Stack>
      <Stack 
        mt="loose" 
        isInline 
        justify="space-between" 
        alignItems="center" 
        onClick={() => navigate(RouteUrls.DataSources)}
        _hover={{ cursor: "pointer", textDecoration: "underline" }}
      >
        <Stack>
          <Text>
            Data Sources
          </Text>
          <Caption>
            7/10 connected
          </Caption>
        </Stack>
        <Stack display='flex'>
          <ChevronIcon
            size="30px"
            direction="right"
            cursor="pointer"
            opacity={0.7}
            style={{
              alignSelf: "flex-end",
              justifySelf: "flex-end",
            }}
          />
        </Stack>
      </Stack>
      <Stack mt="loose">
        <DataList address={""} />
      </Stack>
    </Stack>
  )
}

const Footer = () => {
  const [settingsVisibility, setSettingsVisibility] = useConnectDataVaultSettingsVisibilityState();
  const [autoApproveAllSitesChecked, setAutoApproveAllSitesChecked] = useAutoApproveAllSitesCheckedState();
  
  return (
    <Stack>
      <Stack isInline justify="space-between" alignItems="center">
        <Button
          size="md"
          fontSize={2}
          borderRadius="30px"
          width="100%"
          mode="tertiary"
        >
          Sync All Data
        </Button>
        <Button
          size="md"
          fontSize={2}
          borderRadius="30px"
          width="100%"
        >
          Save Updates
        </Button>
      </Stack>
      <Stack mt="tight">
        <Caption
          _hover={{ cursor: 'pointer', textDecoration: 'underline' }}
          color={color('brand')}
          onClick={() => setSettingsVisibility(true)}
        >
          Settings
        </Caption>
      </Stack>
      <BaseDrawer
        title="Settings"
        isShowing={settingsVisibility}
        onClose={() => setSettingsVisibility(false)}
      >
        <SpaceBetween pb="extra-loose" px="loose" spacing="loose">
          <Stack>
            <Text>
              Auto Approve All Sites
            </Text>
          </Stack>
          <Stack>
            <Switch checked={autoApproveAllSitesChecked} onClick={() => setAutoApproveAllSitesChecked(!autoApproveAllSitesChecked)} />
          </Stack>
        </SpaceBetween>
      </BaseDrawer>
    </Stack>
  )
}