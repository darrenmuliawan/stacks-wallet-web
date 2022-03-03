import { memo, Suspense } from 'react';

import { useBitcoinTokenState } from '@app/store/assets/asset.hooks';
import { WalletPageSelectors } from '@tests/page-objects/wallet.selectors';

import { SendTxButton } from './btc-tx-button';

const SendButtonSuspense = () => {
  const assets = useBitcoinTokenState();
  const isDisabled = !assets || assets?.balance.isEqualTo(0);
  return <SendTxButton isDisabled={true} data-testid={WalletPageSelectors.BtcBtnSendTokens} />;
};

const SendButtonFallback = memo(() => <SendTxButton isDisabled />);

export const SendButton = () => (
  <Suspense fallback={<SendButtonFallback />}>
    <SendButtonSuspense />
  </Suspense>
);
