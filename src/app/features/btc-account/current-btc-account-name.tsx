import { memo, Suspense } from 'react';
import { BoxProps } from '@stacks/ui';
import { useCurrentAccount } from '@app/store/accounts/account.hooks';
import { truncateString } from '@app/common/utils';
import { Tooltip } from '@app/components/tooltip';
import { Title } from '@app/components/typography';
import { memoWithAs } from '@stacks/ui-core';

const AccountNameTitle = (props: BoxProps) => (
  <Title
    data-testid="btc-account-display-name"
    as="h1"
    lineHeight="1rem"
    fontSize={4}
    fontWeight={500}
    {...props}
  />
);

const AccountNameSuspense = memo((props: BoxProps) => {
  const currentAccount = useCurrentAccount();
  const name = currentAccount ? `BTC Account ${currentAccount.index + 1}` : "Shouldn't see this";
  if (!currentAccount || typeof currentAccount.index === 'undefined') return null;
  const nameCharLimit = 18;
  const isLong = name.length > nameCharLimit;
  const displayName = truncateString(name, nameCharLimit);

  return (
    <AccountNameTitle {...props}>
      <Tooltip label={isLong ? name : undefined}>
        <div>{displayName}</div>
      </Tooltip>
    </AccountNameTitle>
  );
});

export const CurrentBtcAccountName = memoWithAs((props: BoxProps) => {
  const currentAccount = useCurrentAccount();
  const defaultName = currentAccount ? `BTC Account ${currentAccount.index + 1}` : "Shouldn't see this";
  console.log('defaultName: ', defaultName);
  const fallback = <AccountNameTitle {...props}>{defaultName}</AccountNameTitle>;
  return (
    <Suspense fallback={fallback}>
      <AccountNameSuspense {...props} />
    </Suspense>
  );
});
