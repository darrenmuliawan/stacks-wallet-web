import BigNumber from "bignumber.js";
import { crypto, ECPair, networks } from "bitcoinjs-lib";
import { randomBytes } from "crypto";
import { atom, useAtom } from "jotai"
import { bitcoinMainnet, litecoinMainnet, lnswapApi } from "../constants/networks";
import { currencies, feeRate, fees, limits, maxBitcoinValue, minBitcoinValue, pairWarning, rates, receiveToken, receiveTokenAddress, receiveValue, sendToken, sendValue, stxBtcRate, swapTxData } from "../store/swap-btc.store"
import { splitPairId } from "../utils/utils";

// form related
export const useSendTokenState = () => {
  return useAtom(sendToken);
}

export const useReceiveTokenState = () => {
  return useAtom(receiveToken);
}

export const useSendValueState = () => {
  return useAtom(sendValue);
}

export const useReceiveValueState = () => {
  return useAtom(receiveValue);
}

export const useMaxBitcoinValueState = () => {
  return useAtom(maxBitcoinValue);
}

export const useMinBitcoinValueState = () => {
  return useAtom(minBitcoinValue);
}

export const useStxBtcRateState = () => {
  return useAtom(stxBtcRate);
}

export const useFeeRateState = () => {
  return useAtom(feeRate);
}

// get pairs
export const useCurrenciesState = () => {
  return useAtom(currencies);
}

export const useRatesState = () => {
  return useAtom(rates);
}

export const useLimitsState = () => {
  return useAtom(limits);
}

export const useFeesState = () => {
  return useAtom(fees);
}

export const getPairs = atom(
  null, 
  async (get, set) => {
  const url = `${lnswapApi}/getpairs`;
  await fetch(url).then(async (res) => {
    let response = await res.json();
    console.log('res: ', response);
    const { warnings, pairs } = response;
    
    const _currencies = parseCurrencies(pairs);
    const _rates = parseRates(pairs);
    const _limits = parseLimits(pairs, _rates);
    const _fees = parseFees(pairs);

    set(currencies, _currencies);
    set(rates, _rates);
    set(limits, _limits);
    set(fees, _fees);
    console.log(_rates);
    console.log(_fees);
    // set(pairWarning, warnings);
  }).catch(err => {
    console.log(err);
  })
})

const parseCurrencies = (pairs: any) => {
  const currencies: string[] = [];

  const pushCurrency = (currency: string) => {
    if (!currencies.includes(currency)) {
      currencies.push(currency);
      if (currency === 'BTC') {
        currencies.push(`${currency} ⚡`);
      }
    }
  }

  Object.keys(pairs).forEach(id => {
    const { send, receive } = splitPairId(id);
    pushCurrency(send);
    pushCurrency(receive);
  });

  return currencies;
}

const parseRates = (pairs: any) => {
  const rates: {[key: string]: any} = {}

  Object.keys(pairs).forEach(id => {
    const pair = pairs[id];

    // set rate for sell order
    rates[id] = {
      pair: id,
      rate: pair.rate,
      orderSide: 'sell'
    }

    // set rate for buy order
    const { send, receive } = splitPairId(id);

    if (send !== receive) {
      rates[`${receive}/${send}`] = {
        pair: id,
        rate: 1 / pair.rate,
        orderSide: 'buy'
      }
    }
  })

  return rates;
}

const parseLimits = (pairs: any, rates: any) => {
  const limits: {[key: string]: any} = {};

  Object.keys(pairs).forEach(id => {
    const pair = pairs[id];
    const { send, receive } = splitPairId(id);

    if (send !== receive) {
      const reverseId = `${receive}/${send}`;
      const reverseRate = rates[reverseId].rate;

      limits[reverseId] = pair.limits;

      limits[id] = {
        minimal: Math.round(pair.limits.minimal * reverseRate),
        maximal: Math.round(pair.limits.maximal * reverseRate),
      };
    } else {
      limits[id] = pair.limits;
    }
  });

  return limits;
}

const parseFees = (pairs: any) => {
  const minerFees: {[key: string]: any} = {};
  const percentages: {[key: string]: any} = {};

  Object.keys(pairs).forEach(id => {
    const fees = pairs[id].fees;
    const percentage = fees.percentage / 100;

    const { send, receive } = splitPairId(id);

    percentages[id] = percentage;
    minerFees[send] = fees.minerFees.baseAsset;

    if (send !== receive) {
      percentages[`${receive}/${send}`] = percentage;

      minerFees[receive] = fees.minerFees.quoteAsset;
    }
  });

  return {
    minerFees,
    percentages,
  };
};

// swap tx data
export const useReceiveTokenAddressState = () => {
  return useAtom(receiveTokenAddress);
}

const getHexString = (input: any) => {
  return input.toString('hex');
}

const generateKeys = (network: any) => {
  const keys = ECPair.makeRandom({ network });

  return {
    publicKey: getHexString(keys.publicKey),
    privateKey: getHexString(keys.privateKey)
  }
}

export const initSwap = atom( 
  null,
  async (get, set, cb: () => any) => {
    // update swap tx data
    console.log('update swap tx data');
    let base = get(sendToken);
    let baseAmount = new BigNumber(get(sendValue)).toFixed(8);
    let keys = generateKeys(
      base === 'BTC' ? bitcoinMainnet : litecoinMainnet
    )
    console.log('base: ', base)
    let pair = {
      id: "BTC/STX",
      orderSide: base === 'BTC' ? "sell" : "buy"
    }
    let preimage = getHexString(randomBytes(32));
    let preimageHash = getHexString(crypto.sha256(preimage));
    let quote = get(receiveToken);
    let quoteAmount = new BigNumber(get(receiveValue)).toFixed(8);

    let newSwapTxData = {
      base: base,
      quote: quote,
      baseAmount: baseAmount,
      quoteAmount: quoteAmount,
      keys: keys,
      pair: pair,
      invoice: '',
      preimage: preimage,
      preimageHash: preimageHash,
      requestedAmount: ''
    };
    console.log('swap tx data: ', newSwapTxData)
    set(swapTxData, newSwapTxData);

    // run callback
    cb();
  }
)

export const checkSwapAddress = atom(
  null,
  async (get, set, cb: () => void) => {
    let address = get(receiveTokenAddress);

    if (address === '') {
      console.log('cant put empty address')
      return;
    } 

    let _swapTxData = get(swapTxData);
    console.log('prev swaptxdata: ', _swapTxData);
    _swapTxData.invoice = address;
    let newSwapTxData = {..._swapTxData};
    set(swapTxData, newSwapTxData);
    console.log('after swaptxdata: ', newSwapTxData);

    console.log(`sending to ${address}`)
    cb();
  }
)

export const startSwap = atom(
  null,
  async (get, set, cb: () => void) => {
    const url = `${lnswapApi}/createswap`;
    let { pair, invoice, keys, preimageHash, quoteAmount, baseAmount } = get(swapTxData);

    // Trim the "lightning:" prefix, that some wallets add in front of their invoices, if it exists
    if (invoice.slice(0, 10) === 'lightning:') {
      invoice = invoice.slice(10);
    }

    let body;
    let _quoteAmount = (parseFloat(quoteAmount) * 1000000).toString();
    if (
      (pair.id === 'BTC/STX') &&
      invoice.toLowerCase().slice(0, 4) !== 'lnbc'
    ) {
      body = {
        type: 'submarine',
        pairId: pair.id,
        orderSide: pair.orderSide,
        claimAddress: invoice,
        refundPublicKey: keys.publicKey,
        preimageHash,
        requestedAmount: _quoteAmount,
        baseAmount: baseAmount,
        quoteAmount: quoteAmount
      }
    } else {
      body = {
        type: 'submarine',
        pairId: pair.id,
        orderSide: pair.orderSide,
        invoice: invoice,
        refundPublicKey: keys.publicKey,
        channel: { auto: true, private: false, inboundLiquidity: 50 }
      }
    }
    console.log('body', body);

    await fetch(url, {
      method: "POST",
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(body)
    }).then(async (response) => {
      let res = await response.json();
      console.log(res);

      cb();
    }).catch(err => {
      console.log("startSwap err: ", err);
      const message = err.response.data.error;

      window.alert(`Failed to execute swap: ${message}`)
    })
  }
)