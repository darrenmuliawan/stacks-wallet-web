import { Suspense } from 'react';
import { Box, Stack, SlideFade, Flex } from '@stacks/ui';
import type { StackProps } from '@stacks/ui';

import { Tabs } from '@app/components/tabs';
import { LoadingSpinner } from '@app/components/loading-spinner';
import { useHomeTabs } from '@app/common/hooks/use-home-tabs';
import { useAnalytics } from '@app/common/hooks/analytics/use-analytics';

interface HomeTabsProps extends StackProps {
  balances: JSX.Element;
  activity: JSX.Element;
  // dataList: JSX.Element;
}

const ANALYTICS_PATH = ['/balances', '/activity', '/data'];

export function HomeTabs(props: HomeTabsProps) {
  const { 
    balances, 
    activity, 
    // dataList, 
    ...rest 
  } = props;
  const analytics = useAnalytics();

  const { activeTab, setActiveTab } = useHomeTabs();

  const setActiveTabTracked = (index: number) => {
    void analytics.page('view', ANALYTICS_PATH[index]);
    setActiveTab(index);
  };

  return (
    <Stack flexGrow={1} spacing="extra-loose" {...rest}>
      <Tabs
        tabs={[
          { slug: 'balances', label: 'Balances' },
          { slug: 'activity', label: 'Activity' },
          // { slug: 'data', label: 'Data' }
        ]}
        activeTab={activeTab}
        onTabClick={setActiveTabTracked}
      />
      <Flex position="relative" flexGrow={1}>
        {activeTab === 0 && (
          <Suspense fallback={<LoadingSpinner pb="72px" />}>
            <SlideFade in={activeTab === 0}>
              {styles => (
                <Box style={styles} width="100%">
                  {balances}
                </Box>
              )}
            </SlideFade>
          </Suspense>
        )}
        {activeTab === 1 && (
          <Suspense fallback={<LoadingSpinner pb="72px" />}>
            <SlideFade in={activeTab === 1}>
              {styles => (
                <Box position="absolute" top={0} left={0} width="100%" style={styles}>
                  {activity}
                </Box>
              )}
            </SlideFade>
          </Suspense>
        )}
        {/* {activeTab === 2 && (
          <Suspense fallback={<LoadingSpinner pb="72px" />}>
            <SlideFade in={activeTab === 2}>
              {styles => (
                <Box position="absolute" top={0} left={0} width="100%" style={styles}>
                  {dataList}
                </Box>
              )}
            </SlideFade>
          </Suspense>
        )} */}
      </Flex>
    </Stack>
  );
}
