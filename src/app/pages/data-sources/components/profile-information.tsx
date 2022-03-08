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
import { Box, DynamicColorCircle, Stack, Text } from "@stacks/ui";
import { useAtom } from "jotai";
import { Suspense, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { toggleProfileInformationDataChecked, useProfileInformationState } from "../hooks/profile-information.hooks";
import { convertBirthdateToString } from "../utils/utils";

export const ProfileInformation = () => {
  const navigate = useNavigate();
  useRouteHeader(<Header title="Profile Information (Facebook)" onClose={() => navigate(RouteUrls.FacebookData)}/>)
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
        <ProfileInformationList />
      </Stack>
    </>
  )
}

const ProfileInformationList = () => {
  const [profileInformation, ] = useProfileInformationState();
  const [, toggle] = useAtom(toggleProfileInformationDataChecked);

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
            <Text style={{ textTransform: 'capitalize' }}>Full name</Text>
            <Caption>
              {profileInformation['data']['full-name'].value}
            </Caption>
          </Stack>
          <Stack>
            <Switch checked={profileInformation['data']['full-name'].connected} onClick={() => toggle('full-name')}/>
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
            <Text style={{ textTransform: 'capitalize' }}>Email</Text>
            <Caption>
              {profileInformation['data']['email'].value}
            </Caption>
          </Stack>
          <Stack>
            <Switch checked={profileInformation['data']['email'].connected} onClick={() => toggle('email')}/>
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
            <Text style={{ textTransform: 'capitalize' }}>Birthday</Text>
            <Caption>
              {convertBirthdateToString(profileInformation['data']['birthday'].value)}
            </Caption>
          </Stack>
          <Stack>
            <Switch checked={profileInformation['data']['birthday'].connected} onClick={() => toggle('birthday')}/>
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
            <Text style={{ textTransform: 'capitalize' }}>Gender</Text>
            <Caption style={{ textTransform: 'capitalize' }}>
              {profileInformation['data']['gender'].value}
            </Caption>
          </Stack>
          <Stack>
            <Switch checked={profileInformation['data']['gender'].connected} onClick={() => toggle('gender')}/>
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
            <Text style={{ textTransform: 'capitalize' }}>Relationship</Text>
            <Caption style={{ textTransform: 'capitalize' }}>
              {profileInformation['data']['relationship'].value}
            </Caption>
          </Stack>
          <Stack>
            <Switch checked={profileInformation['data']['relationship'].connected} onClick={() => toggle('relationship')}/>
          </Stack>
        </Stack>
      </Box>
      {/* <Box
        as='div'
        display='flex'
        textAlign='left'
        outline={0}
        position="relative"
        flexGrow={1}
      >
        <Stack pt="tight" flexGrow={1} width="100%" isInline spacing="base" alignItems="center">

          <Stack flexGrow={1}>
            <Text style={{ textTransform: 'capitalize' }}>Educations</Text>
            <Caption>
              {profileInformation['data']['educations'].value}
            </Caption>
          </Stack>
          <Stack>
            <Switch checked={profileInformation['data']['educations'].connected} onClick={() => {}}/>
          </Stack>
        </Stack>
      </Box> */}
    </Stack>
  )
}