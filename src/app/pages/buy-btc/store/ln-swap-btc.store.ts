import { StacksTransaction, UnsignedContractCallOptions } from "@stacks/transactions";
import BigNumber from "bignumber.js";
import { atom } from "jotai";
import { LnSwapInfo, LnSwapResponse } from "../interfaces";

// swap tx data
export const lnSwapInfo = atom<LnSwapInfo>({
  base: '',
  quote: '',
  baseAmount: '',
  quoteAmount: '',
  keys: {
    publicKey: '',
    privateKey: '',
  },
  pair: {
    id: '',
    orderSide: '',
  },
  address: '',
  preimage: '',
  preimageHash: '',
  isSponsored: false,
})

export const lnSwapResponse = atom<LnSwapResponse>({
  id: '',
  invoice: '',
  lockupAddress: '',
  onchainAmount: 0,
  refundAddress: '',
  timeoutBlockHeight: 0
})

export const lnSwapStatus = atom({
  error: false,
  pending: false,
  message: "Waiting for one confirmation...",
})

export const lockupTokenTx = atom({
  transactionId: '',
  transactionHex: '',
  success: false
})

export const claimTokenTxId = atom('');
export const previewClaimStxVisibility = atom(false);
export const claimStxTxSubmitted = atom(false);
export const txOptions = atom<UnsignedContractCallOptions | undefined>(undefined);
export const unsignedTx = atom<StacksTransaction | undefined>(undefined);
export const serializedTxPayload = atom<string>('');
export const estimatedTxByteLength = atom<number>(0);