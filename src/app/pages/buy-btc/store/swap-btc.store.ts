import { atom } from "jotai";
import { SwapResponse } from "../interfaces";

// form values
export const defaultError = {
  error: false,
  message: ""
}
export const sendToken = atom('STX');
export const receiveToken = atom('BTC ⚡');
export const sendValue = atom('');
export const receiveValue = atom('');
export const maxBitcoinValue = atom(0);
export const minBitcoinValue = atom(0);
export const stxBtcRate = atom(0);
export const feeRate = atom(0);
export const swapFormError = atom(defaultError);
export const sendAmountError = atom(defaultError);

// swap step
export const swapStep = atom<number>(0);
export const swapWorkflow = atom<string[]>([]);

// pairs data
export const currencies = atom(['BTC', 'STX']);
export const rates = atom({});
export const limits = atom({});
export const fees = atom({
  minerFees: {},
  percentages: {}
});
export const pairWarning = atom({});

// swap tx data
export const receiveTokenAddress = atom('');
export const swapTxData = atom({
  base: '',
  quote: '',
  baseAmount: '',
  quoteAmount: '',
  keys: {
    privateKey: '',
    publicKey: ''
  },
  pair: {
    id: '',
    orderSide: ''
  },
  invoice: '',
  preimage: '',
  preimageHash: '',
  requestedAmount: ''
});
export const swapResponse = atom<SwapResponse>({
  acceptZeroConf: false,
  address: '',
  asTimeoutBlockHeight: 0,
  baseAmount: '',
  bip21: '',
  claimAddress: '',
  contractAddress: '',
  expectedAmount: 0,
  id: '',
  origBlockHeight: 0,
  quoteAmount: '',
  redeemScript: '',
  timeoutBlockHeight: 0,
});
export const swapStatus = atom({
  error: false,
  pending: false,
  message: "Waiting for one confirmation..."
});
export const loadingInitSwap = atom(false);
export const webln = atom(null);

// send swap tx data
export const sendSwapResponse = atom({
  acceptZeroConf: false,
  address: '',
  asTimeoutBlockHeight: 0,
  baseAmount: '',
  bip21: '',
  claimAddress: '',
  contractAddress: '',
  expectedAmount: 0,
  id: '',
  origBlockHeight: 0,
  quoteAmount: '',
  redeemScript: '',
  timeoutBlockHeight: 0
});
export const sendSwapAmount = atom(0);
export const sendSwapTransactionId = atom('');
export const sendSwapContractAddress = atom('');
export const sendSwapBitcoinAddress = atom('');
export const sendSwapStatus = atom({
  pending: true,
  message: "Waiting for one confirmation..."
})
export const lockStxTxId = atom('');
export const previewLockStxVisibility = atom(false);
export const lockStxTxSubmitted = atom(false);