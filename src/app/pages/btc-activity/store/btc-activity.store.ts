import { makeLocalDataKey } from "@app/common/store-utils";
import { currentAccountStxAddressState } from "@app/store/accounts";
import { getBitcoinAddress } from "@app/store/assets/utils";
import { currentNetworkState } from "@app/store/network/networks";
import { atom } from "jotai";
import { atomFamily, atomWithStorage } from "jotai/utils";
import deepEqual from 'fast-deep-equal';
import { SwapInfo, SwapResponse } from "@app/pages/buy-btc/interfaces";

type LocalBitcoinTx = Record<string, RefundInfo>;

export interface RefundInfo {
  amount: number;
  contract: string;
  currency: string;
  preimageHash: string;
  privateKey: string;
  redeemScript: string;
  swapInfo: SwapInfo;
  swapResponse: SwapResponse;
  timeoutBlockHeight: number;
}

const currentAccountSubmittedBtcTxsRootState = atomFamily(
  ([_address, _network]: [string, string]) => 
    atomWithStorage<LocalBitcoinTx>(makeLocalDataKey([_address, _network, 'LOCAL_BTC_TXS']), {}),
  deepEqual
)

export const currentAccountSubmittedBtcTxsState = atom<LocalBitcoinTx, LocalBitcoinTx>(
  get => {
    const principal = get(currentAccountStxAddressState);
    if (!principal) return {};
    const btcAddress = getBitcoinAddress(principal);
    const networkUrl = get(currentNetworkState).url;
    console.log('principal: ', principal);
    console.log('btcAddress: ', btcAddress);
    console.log('networkUrl: ', networkUrl);
    return get(currentAccountSubmittedBtcTxsRootState([btcAddress, networkUrl]))
  },
  (get, set, newItem: LocalBitcoinTx) => {
    const principal = get(currentAccountStxAddressState);
    if (!principal) return {};
    const btcAddress = getBitcoinAddress(principal);
    const networkUrl = get(currentNetworkState).url;
    const submittedTxsState = currentAccountSubmittedBtcTxsRootState([btcAddress, networkUrl]);
    const latestLocalTxs = get(submittedTxsState);
    set(submittedTxsState, { ...newItem, ...latestLocalTxs });
  }
)