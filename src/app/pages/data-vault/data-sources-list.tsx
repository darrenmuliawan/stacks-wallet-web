import { useRouteHeader } from "@app/common/hooks/use-route-header";
import { CENTERED_FULL_PAGE_MAX_WIDTH } from "@app/components/global-styles/full-page-styles";
import { Header } from "@app/components/header";
import { Switch } from "@app/components/switch";
import { useCurrentAccount } from "@app/store/accounts/account.hooks";
import { RouteUrls } from "@shared/route-urls";
import { Box, DynamicColorCircle, Stack, Text, Button } from "@stacks/ui"
import { BoxProps } from "@stacks/ui-core";
import { Suspense, useEffect } from "react";
import { FiInstagram } from "react-icons/fi";
import { BsGoogle, BsTwitter } from 'react-icons/bs';
import { FaTiktok, FaApple, FaAmazon, FaLinkedinIn, FaFacebookF, FaRedditAlien } from 'react-icons/fa';
import { GrSnapchat } from 'react-icons/gr';
import { useNavigate } from "react-router-dom"
import { CurrentAccount } from "../home/components/account-area";
import { BalanceFetcher, AccountInfoFetcher } from "../home/components/fetchers";
import { DataVaultActions } from "./components/data-vault-actions";
import { useCurrentPageState } from "./hooks/data-vault.hooks";
import { DATA_VAULT_PAGE_ENUM } from "./store/data-vault.store";
import { getDataSourcesListState } from "./hooks/data-sources.hooks";

export const DataSources = () => {
  const navigate = useNavigate();
  useRouteHeader(<Header title="Data Sources" onClose={() => navigate(RouteUrls.ConnectData)}/>)
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
        data-testid="connect-data-vault-page"
        flexGrow={1}
        maxWidth={CENTERED_FULL_PAGE_MAX_WIDTH}
        mt="loose"
        px={['unset', 'base-loose']}
        spacing='loose'
      >
        <CurrentAccount />
        <DataVaultActions />
        <DataSourcesList />
        <Footer />
      </Stack>
    </>
  )
}

const DataSourcesList = () => {
  // const example_data = [
  //   { name: 'facebook', connected: true },
  //   { name: 'twitter', connected: true },
  //   { name: 'google', connected: true },
  //   { name: 'instagram', connected: true },
  //   { name: 'linkedin', connected: true },
  //   { name: 'reddit', connected: true },
  //   { name: 'tiktok', connected: false },
  //   { name: 'apple', connected: false },
  //   { name: 'amazon', connected: true },
  //   { name: 'snapchat', connected: false },
  // ]
  const data = getDataSourcesListState();

  return (
    <Stack>
      {
        data.map((d, i) => 
          <DataSourceRow 
            title={d.name} 
            connected={d.connected} 
            onClick={d.onClick}
            key={`${d.name}.${i}`}
          />
        )
      }
    </Stack>
  )
}

interface DataSourceRowProps extends BoxProps {
  title: string;
  connected: boolean;
  onClick: () => void;
  key: string
}

const DataSourceRow = (props: DataSourceRowProps) => {
  const { title, connected, onClick, key } = props;

  return (
    <Box
      as='div'
      display='flex'
      textAlign='left'
      outline={0}
      position="relative"
      flexGrow={1}
    >
      <Stack pt="tight" flexGrow={1} width="100%" isInline spacing="base" alignItems="center">
        <DynamicColorCircle
          string={`${title}.${key}`}
        >
          {getDataSourceIcon(title)}
        </DynamicColorCircle>
        <Stack flexGrow={1}>
          <Text style={{ textTransform: 'capitalize' }}>{title}</Text>
        </Stack>
        <Stack>
          <Switch checked={connected} onClick={onClick}/>
        </Stack>
      </Stack>
    </Box>
  )
}

const getDataSourceIcon = (name: string) => {
  if (name === 'facebook') {
    return <FaFacebookF size={25} color="white" />
  } else if (name === 'twitter') {
    return <BsTwitter size={25} color="white" />
  } else if (name === 'google') {
    return <BsGoogle size={25} color="white" />
  } else if (name === 'instagram') {
    return <FiInstagram size={25} color="white" />
  } else if (name === 'linkedin') {
    return <FaLinkedinIn size={25} color="white" />
  } else if (name === 'reddit') {
    return <FaRedditAlien size={25} color="white" />
  } else if (name === 'tiktok') {
    return <FaTiktok size={25} color="white" />
  } else if (name === 'apple') {
    return <FaApple size={25} color="white" />
  } else if (name === 'amazon') {
    return <FaAmazon size={25} color="white" />
  } else if (name === 'snapchat') {
    return <GrSnapchat size={25} color="white" />
  } else {
    return <></>
  }
}

const Footer = (props: any) => {
  const {} = props;

  return (
    <Stack mt="tight">
      <Button
        size="md"
        fontSize={2}
        borderRadius="30px"
        width="100%"
      >
        Upload Data
      </Button>
    </Stack>
  )
}