import { useRouteHeader } from "@app/common/hooks/use-route-header";
import { CENTERED_FULL_PAGE_MAX_WIDTH } from "@app/components/global-styles/full-page-styles";
import { Header } from "@app/components/header";
import { Switch } from "@app/components/switch";
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
import { togglePagesYouLikedDataChecked, usePagesYouLikedDataState } from "../hooks/pages-you-liked.hooks";

export const PagesYouLiked = () => {
  const navigate = useNavigate();
  useRouteHeader(<Header title="Pages You've Liked (Facebook)" onClose={() => navigate(RouteUrls.FacebookData)}/>)
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
        <PagesYouLikedList />
      </Stack>
    </>
  )
}

const PagesYouLikedList = () => {
  const [pagesYouLiked, ] = usePagesYouLikedDataState();
  const [, toggle] = useAtom(togglePagesYouLikedDataChecked);

  return (
    <Stack>
      {
        pagesYouLiked.data.map((d, i) =>
          <Box
            as='div'
            display='flex'
            textAlign='left'
            outline={0}
            position="relative"
            flexGrow={1}
            key={`${d.category}-${i}`}
          >
            <Stack pt="tight" flexGrow={1} width="100%" isInline spacing="base" alignItems="center">
              <Stack flexGrow={1}>
                <Text style={{ textTransform: 'capitalize' }}>{d.category}</Text>
              </Stack>
              <Stack>
                <Switch checked={d.connected} onClick={() => toggle(i)}/>
              </Stack>
            </Stack>
          </Box>
        )
      }
    </Stack>
  )
}