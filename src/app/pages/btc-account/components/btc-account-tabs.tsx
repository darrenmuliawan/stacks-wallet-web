import { LoadingSpinner } from "@app/components/loading-spinner";
import { Tabs } from "@app/components/tabs";
import { Box, Flex, SlideFade, Stack, StackProps } from "@stacks/ui";
import { Suspense } from "react";
import { useBtcAccountTabs } from "../hooks/btc-account-tabs.hooks";

interface BtcAccountTabsProps extends StackProps {
  balances: JSX.Element;
  activity: JSX.Element;
}

export const BtcAccountTabs = (props: BtcAccountTabsProps) => {
  const {
    balances,
    activity,
    ...rest
  } = props;

  const { activeTab, setActiveTab } = useBtcAccountTabs();

  const setActiveTabTracked = (index: number) => {
    setActiveTab(index);
  }

  return (
    <Stack flexGrow={1} spacing="extra-loose" {...rest}>
      <Tabs
        tabs={[
          { slug: 'balances', label: 'Balances' },
          { slug: 'activity', label: 'Activity' }
        ]}
        activeTab={activeTab}
        onTabClick={setActiveTabTracked}
      />
      <Flex position="relative" flexGrow={1}>
        {
          activeTab === 0 && (
            <Suspense fallback={<LoadingSpinner pb="72px"/>}>
              <SlideFade in={activeTab === 0}>
                {
                  styles => (
                    <Box style={styles} width="100%">
                      {balances}
                    </Box>
                  )
                }
              </SlideFade>
            </Suspense>
          )
        }
        {
          activeTab === 1 && (
            <Suspense fallback={<LoadingSpinner pb="72px" />}>
              <SlideFade in={activeTab === 1}>
                {styles => (
                  <Box position="absolute" top={0} left={0} width="100%" style={styles}>
                    {activity}
                  </Box>
                )}
              </SlideFade>
            </Suspense>
          )
        }
      </Flex>
    </Stack>
  )
}