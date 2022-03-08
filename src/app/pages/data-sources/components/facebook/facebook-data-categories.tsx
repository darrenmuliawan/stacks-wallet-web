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
import { Suspense, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { setAdsInterestsChecked, useAdsInterestsDataState } from "../../hooks/ads-interests.hooks";
import { setAdsYouInteractedWithChecked, useAdsYouInteractedWithDataState } from "../../hooks/ads-you-interacted-with.hooks";
import { toggleLocationInformationChecked, useLocationInformationDataState } from "../../hooks/location-information.hooks";
import { togglePagesYouLikedChecked, usePagesYouLikedDataState } from "../../hooks/pages-you-liked.hooks";
import { toggleProfileInformationChecked, useProfileInformationState } from "../../hooks/profile-information.hooks";

export const FacebookDataCategories = () => {
  const navigate = useNavigate();
  useRouteHeader(<Header title="Facebook Data" onClose={() => navigate(RouteUrls.ConnectData)}/>)
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
        <FacebookDataCategoriesList />
      </Stack>
    </>
  )
}

const FacebookDataCategoriesList = () => {
  const navigate = useNavigate();
  // const [adsInterestsChecked, setAdsInterestsChecked] = useState(false);
  const [, toggleAdsInterests] = useAtom(setAdsInterestsChecked);
  const [adsInterests, ] = useAdsInterestsDataState();

  const [adsYouInteractedWith, ] = useAdsYouInteractedWithDataState();
  const [, toggleAdsYouInteractedWith] = useAtom(setAdsYouInteractedWithChecked);

  const [pagesYouLiked, ] = usePagesYouLikedDataState();
  const [, togglePagesYouLiked] = useAtom(togglePagesYouLikedChecked);
  
  const [profileInformation, ] = useProfileInformationState();
  const [, toggleProfileInformation] = useAtom(toggleProfileInformationChecked);

  const [locationInformation, ] = useLocationInformationDataState();
  const [, toggleLocationInformation] = useAtom(toggleLocationInformationChecked);

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
        <Stack pt="base-tight" flexGrow={1} width="100%" isInline spacing="base" alignItems="center">
          <Stack flexGrow={1}>
            <Text style={{ textTransform: 'capitalize' }}>Ads Interests</Text>
            <Caption
              _hover={{ cursor: 'pointer', textDecoration: 'underline' }}
              // color={color('brand')}
              onClick={() => navigate(RouteUrls.AdsInterests)}
            >
              View & Manage Data
            </Caption>
          </Stack>
          <Stack>
            <Switch checked={adsInterests.connected} onClick={toggleAdsInterests}/>
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
        <Stack pt="base-tight" flexGrow={1} width="100%" isInline spacing="base" alignItems="center">
          <Stack flexGrow={1}>
            <Text style={{ textTransform: 'capitalize' }}>Ads You've Interacted With</Text>
            <Caption
              _hover={{ cursor: 'pointer', textDecoration: 'underline' }}
              // color={color('brand')}
              onClick={() => navigate(RouteUrls.AdsYouInteractedWith)}
            >
              View & Manage Data
            </Caption>
          </Stack>
          <Stack>
            <Switch checked={adsYouInteractedWith.connected} onClick={toggleAdsYouInteractedWith}/>
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
        <Stack pt="base-tight" flexGrow={1} width="100%" isInline spacing="base" alignItems="center">
          <Stack flexGrow={1}>
            <Text style={{ textTransform: 'capitalize' }}>Pages You've Liked</Text>
            <Caption
              _hover={{ cursor: 'pointer', textDecoration: 'underline' }}
              // color={color('brand')}
              onClick={() => navigate(RouteUrls.PagesYouLiked)}
            >
              View & Manage Data
            </Caption>
          </Stack>
          <Stack>
            <Switch checked={pagesYouLiked.connected} onClick={togglePagesYouLiked}/>
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
        <Stack pt="base-tight" flexGrow={1} width="100%" isInline spacing="base" alignItems="center">
          <Stack flexGrow={1}>
            <Text style={{ textTransform: 'capitalize' }}>Profile Information</Text>
            <Caption
              _hover={{ cursor: 'pointer', textDecoration: 'underline' }}
              // color={color('brand')}
              onClick={() => navigate(RouteUrls.ProfileInformation)}
            >
              View & Manage Data
            </Caption>
          </Stack>
          <Stack>
            <Switch checked={profileInformation.connected} onClick={toggleProfileInformation}/>
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
        <Stack pt="base-tight" flexGrow={1} width="100%" isInline spacing="base" alignItems="center">
          <Stack flexGrow={1}>
            <Text style={{ textTransform: 'capitalize' }}>Location</Text>
            <Caption
              _hover={{ cursor: 'pointer', textDecoration: 'underline' }}
              // color={color('brand')}
              onClick={() => navigate(RouteUrls.LocationInformation)}
            >
              View & Manage Data
            </Caption>
          </Stack>
          <Stack>
            <Switch checked={locationInformation.connected} onClick={toggleLocationInformation}/>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  )
}