import BigNumber from "bignumber.js";
import { ECPair } from "bitcoinjs-lib";
import { atom } from "jotai";
import { decimals } from "../constants/numbers";
import { fees, rates, receiveToken, receiveValue, sendToken, sendValue } from "../store/swap-btc.store";

export const randomBytes = (size: number) => {
  const bytes = Buffer.allocUnsafe(size);
  global.crypto.getRandomValues(bytes);

  return bytes;
}

export const splitPairId = (pair: string) => {
  const split = pair.split('/');

  return {
    send: split[0],
    receive: split[1]
  }
}

export const getPairName = (name: string) => {
  if (name === 'STX') return "Stacks";
  else if (name === 'BTC') return "Bitcoin";
  return "Bitcoin"
}

export const formatFees = (fees: any, sendValue: string, sendToken: string, receiveToken: string) => {
  if (fees.minerFees[sendToken]) {
    let pair = sendToken + '/' + receiveToken;
    let feePercentage = new BigNumber(fees.percentages[pair])
    let _sendValue = parseFloat(sendValue);

    if (isNaN(_sendValue)) {
      return 0;
    }

    let percentageFee = feePercentage.times(_sendValue);
    // console.log('pct fee: ', percentageFee);
    

    let minerFee = new BigNumber(calculateMinerFee(fees, sendToken)).dividedBy(decimals);

    // TODO: if on Lightning
    // if (isLightning) {
    // minerFee = minerFee.times(new BigNumber(1).dividedBy(rate))
    // }

    // return -1
    return percentageFee.plus(minerFee);
  }
  return 0;
}

const calculateMinerFee = (fees: any, sendToken: string) => {
  let isLightning = false;

  if (fees.minerFees[sendToken]) {
    if (isLightning) {
      
    } else {
      return fees.minerFees[sendToken].normal;
    }
  }
  return 0;
}

export const formatFeeRate = (fees: any, sendToken: string, receiveToken: string) => {
  let pair = sendToken + '/' + receiveToken;
  if (fees.percentages[pair]) {
    return fees.percentages[pair] * 100;
  }
  return 0
}

export const formatRate = (rate: any, sendToken: string, receiveToken: string) => {
  let pair = sendToken + '/' + receiveToken;
  if (rate[pair]) {
    return rate[pair].rate;
  }
  return 0;
}

export const formatMinValue = (limits: any, sendToken: string, receiveToken: string) => {
  let pair = sendToken + "/" + receiveToken;
  // console.log('limits: ', limits[pair]);

  if (limits[pair]) {
    return new BigNumber(limits[pair].minimal).dividedBy(decimals).toString();
  }
  return 0;
}

export const formatMaxValue = (limits: any, sendToken: string, receiveToken: string) => {
  let pair = sendToken + "/" + receiveToken;

  if (limits[pair]) {
    return new BigNumber(limits[pair].maximal).dividedBy(decimals).toString();
  }

  return 0;
}

export const calculateReceiveValue = atom(
  null,
  (get, set) => {
    let _sendValue = get(sendValue);
    if (isNaN(parseFloat(_sendValue))) {
      set(receiveValue, '')
      return;
    }

    let _rates = get(rates);
    let _sendToken = get(sendToken);
    let _receiveToken = get(receiveToken);
    let _fees = get(fees);
    let rate = parseFloat(formatRate(_rates, _sendToken, _receiveToken));

    const amount = new BigNumber(_sendValue);
    let _rate = new BigNumber(rate);
    let _fee = new BigNumber(formatFees(_fees, _sendValue, _sendToken, _receiveToken));

    const quote = amount.times(_rate).minus(_fee.times(_rate)).toFixed(8);
    let newQuote = new BigNumber(quote);

    if (newQuote.isLessThanOrEqualTo(0)) {
      newQuote = new BigNumber(0);
    }

    set(receiveValue, newQuote.toString());
  }
)

export const getHexString = (input: any) => {
  return input.toString('hex');
}

export const generateKeys = (network: any) => {
  const keys = ECPair.makeRandom({ network });

  return {
    publicKey: getHexString(keys.publicKey),
    privateKey: getHexString(keys.privateKey)
  }
}