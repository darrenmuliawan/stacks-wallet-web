export interface SwapInfo {
  base: string;
  baseAmount: string;
  invoice: string;
  keys: {
    publicKey: string;
    privateKey: string;
  };
  pair: {
    id: string;
    orderSide: string;
  };
  preimage: string;
  preimageHash: string;
  quote: string;
  quoteAmount: string;
}

export interface SwapResponse {
  acceptZeroConf: boolean;
  address: string;
  asTimeoutBlockHeight: number;
  baseAmount: string;
  bip21: "";
  claimAddress: string;
  contractAddress: string;
  expectedAmount: number;
  id: string;
  origBlockHeight: number;
  quoteAmount: string;
  redeemScript: string;
  timeoutBlockHeight: number;
}