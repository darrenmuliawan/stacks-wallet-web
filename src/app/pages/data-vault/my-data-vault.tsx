import { useRouteHeader } from "@app/common/hooks/use-route-header";
import { BaseDrawer } from "@app/components/drawer";
import { CENTERED_FULL_PAGE_MAX_WIDTH } from "@app/components/global-styles/full-page-styles";
import { Header } from "@app/components/header";
import { SpaceBetween } from "@app/components/space-between";
import { Switch } from "@app/components/switch";
import { Caption } from "@app/components/typography";
import { useCurrentAccount } from "@app/store/accounts/account.hooks";
import { RouteUrls } from "@shared/route-urls";
import { Button, color, Stack, Text } from "@stacks/ui";
import { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentAccount } from "../home/components/account-area";
import { AccountInfoFetcher, BalanceFetcher } from "../home/components/fetchers";
import { DataVaultActions } from "./components/data-vault-actions";
import { useAutoApproveAllSitesCheckedState, useLocationCheckedState, useMyDataVaultSettingsState, usePersonalInfoCheckedState, useShoppingAndInterestsCheckedState } from "./hooks/my-data-vault.hooks";

export const MyDataVault = () => {
  const navigate = useNavigate();
  useRouteHeader(<Header title="Data Vault" onClose={() => navigate(RouteUrls.Home)} />)
  const account = useCurrentAccount();

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
        <MyDataList />
        <Footer />
      </Stack>
    </>
  )
}

const MyDataList = () => {
  // const [personalInfoChecked, setPersonalInfoChecked] = useState(false);
  // const [shoppingInterestsChecked, setShoppingInterestsChecked] = useState(false);
  // const [locationChecked, setLocationChecked] = useState(false);
  const [personalInfoChecked, setPersonalInfoChecked] = usePersonalInfoCheckedState();
  const [shoppingInterestsChecked, setShoppingInterestsChecked] = useShoppingAndInterestsCheckedState();
  const [locationChecked, setLocationChecked] = useLocationCheckedState();

  return (
    <Stack
      align="space-between"
    >
      <Stack mt="loose" isInline justify="space-between" alignItems="center">
        <Stack>
          <Text>
            Personal Information
          </Text>
          <Caption>
            Name, address, email, age, gender, etc
          </Caption>
        </Stack>
        <Stack>
          <Switch checked={personalInfoChecked} onClick={() => setPersonalInfoChecked(!personalInfoChecked)} />
        </Stack>      
      </Stack>
      <Stack mt="loose" isInline justify="space-between" alignItems="center">
        <Stack>
          <Text>
            Shopping {"&"} Interests
          </Text>
          <Caption>
            Interests, hobbies, groups, shopping history, affinities
          </Caption>
        </Stack>
        <Stack>
          <Switch checked={shoppingInterestsChecked} onClick={() => setShoppingInterestsChecked(!shoppingInterestsChecked)} />
        </Stack>
      </Stack>
      <Stack mt="loose" isInline justify="space-between" alignItems="center">
        <Stack>
          <Text>
            Geography {"&"} Location
          </Text>
          <Caption>
            Location, language, etc
          </Caption>
        </Stack>
        <Stack>
          <Switch checked={locationChecked} onClick={() => setLocationChecked(!locationChecked)} />
        </Stack>
      </Stack>
    </Stack>
  )
}

const Footer = () => {
  const [autoApproveAllSitesChecked, setAutoApproveAllSitesChecked] = useAutoApproveAllSitesCheckedState();
  const [settingsVisibility, setSettingsVisibility] = useMyDataVaultSettingsState();

  return (
    <Stack
      mt="loose"
    >
      <Caption>
        [site name] wants to access your data for 10 sats
      </Caption>
      <Stack mt="tight" isInline justify="space-between" alignItems="center">
        <Button
          size="md"
          fontSize={2}
          borderRadius="30px"
          width="100%"
          mode="tertiary"
        >
          Decline
        </Button>
        <Button
          size="md"
          fontSize={2}
          borderRadius="30px"
          width="100%"
        >
          Approve
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