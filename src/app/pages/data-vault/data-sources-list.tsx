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
import { getDataSourcesListState, useConfirmationDialogButtonTitleState, useConfirmationDialogCurrentDataSourceState, useConfirmationDialogMessageState, useConfirmationDialogTitleState, useConfirmationDialogVisibilityState } from "./hooks/data-sources.hooks";
import { BaseDrawer } from "@app/components/drawer";
import { confirmationDialogConfirmCallback } from "./hooks/data-sources.hooks";
import { useAtom } from "jotai";

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
        <ConfirmationDialog />
      </Stack>
    </>
  )
}

const DataSourcesList = () => {
  const data = getDataSourcesListState();

  return (
    <Stack>
      {
        data.map((d, i) => 
          <DataSourceRow 
            title={d.name} 
            connected={d.connected} 
            onClick={d.onClick}
            _key={`${d.name}.${i}`}
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
  _key: string;
}

const DataSourceRow = (props: DataSourceRowProps) => {
  const { title, connected, onClick, _key } = props;

  return (
    <Box
      as='div'
      display='flex'
      textAlign='left'
      outline={0}
      position="relative"
      flexGrow={1}
      key={_key}
    >
      <Stack pt="tight" flexGrow={1} width="100%" isInline spacing="base" alignItems="center">
        <DynamicColorCircle
          string={`${title}.${_key}`}
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
  if (name === 'Facebook') {
    return <FaFacebookF size={25} color="white" />
  } else if (name === 'Twitter') {
    return <BsTwitter size={25} color="white" />
  } else if (name === 'Google') {
    return <BsGoogle size={25} color="white" />
  } else if (name === 'Instagram') {
    return <FiInstagram size={25} color="white" />
  } else if (name === 'LinkedIn') {
    return <FaLinkedinIn size={25} color="white" />
  } else if (name === 'Reddit') {
    return <FaRedditAlien size={25} color="white" />
  } else if (name === 'Tiktok') {
    return <FaTiktok size={25} color="white" />
  } else if (name === 'Apple') {
    return <FaApple size={25} color="white" />
  } else if (name === 'Amazon') {
    return <FaAmazon size={25} color="white" />
  } else if (name === 'Snapchat') {
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

const ConfirmationDialog = () => {
  const [confirmationDialogVisibility, setConfirmationDialogVisibility] = useConfirmationDialogVisibilityState();
  const [confirmationDialogTitle, ] = useConfirmationDialogTitleState();
  const [confirmationDialogMessage, ] = useConfirmationDialogMessageState();
  const [confirmationDialogButtonTitle, ] = useConfirmationDialogButtonTitleState();
  const [confirmationDialogCurrentDataSource, ] = useConfirmationDialogCurrentDataSourceState();
  const [, confirmCallback] = useAtom(confirmationDialogConfirmCallback);

  return (
    <BaseDrawer
      title={confirmationDialogTitle}
      isShowing={confirmationDialogVisibility}
      onClose={() => setConfirmationDialogVisibility(false)}
    >
      <Stack pb="extra-loose" px="loose" spacing="loose">
        <Text>
          {confirmationDialogMessage}
        </Text>
        <Button
          size="md"
          fontSize={2}
          borderRadius="30px"
          width="100%"
          onClick={() => confirmCallback(confirmationDialogCurrentDataSource)}
        >
          {confirmationDialogButtonTitle}
        </Button>
      </Stack>
    </BaseDrawer>
  )
}