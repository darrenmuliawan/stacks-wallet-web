import { atom } from "jotai";

// form values
export const sendToken = atom('STX');
export const receiveToken = atom('BTC');
export const sendValue = atom('');
export const receiveValue = atom('');
export const maxBitcoinValue = atom(0);
export const minBitcoinValue = atom(0);
export const stxBtcRate = atom(0);
export const feeRate = atom(0);

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
export const swapResponse = atom({});
export const swapStatus = atom({
  error: false,
  pending: false,
  message: "Waiting for one confirmation..."
});
export const webln = atom(null);