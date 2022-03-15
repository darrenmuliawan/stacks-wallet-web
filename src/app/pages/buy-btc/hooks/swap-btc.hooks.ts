import { currentAccountSubmittedBtcTxsState, RefundInfo } from "@app/pages/btc-activity/store/btc-activity.store";
import BigNumber from "bignumber.js";
import { crypto, ECPair, networks } from "bitcoinjs-lib";
import { randomBytes } from "crypto";
import { atom, useAtom } from "jotai"
import { bitcoinMainnet, litecoinMainnet, lnswapApi, postData, SwapUpdateEvent } from "../constants/networks";
import { decimals } from "../constants/numbers";
import { currencies, feeRate, fees, limits, loadingInitSwap, maxBitcoinValue, minBitcoinValue, pairWarning, rates, receiveToken, receiveTokenAddress, receiveValue, sendAmountError, sendSwapAmount, sendSwapBitcoinAddress, sendSwapContractAddress, sendSwapResponse, sendSwapStatus, sendToken, sendValue, stxBtcRate, swapFormError, swapResponse, swapTxData } from "../store/swap-btc.store"
import { generateKeys, getHexString, splitPairId } from "../utils/utils";

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

export const useSwapFormErrorState = () => {
  return useAtom(swapFormError);
}

export const useSendAmountErrorState = () => {
  return useAtom(sendAmountError);
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
    // console.log('res: ', response);
    const { warnings, pairs } = response;
    
    const _currencies = parseCurrencies(pairs);
    const _rates = parseRates(pairs);
    const _limits = parseLimits(pairs, _rates);
    const _fees = parseFees(pairs);

    set(currencies, _currencies);
    set(rates, _rates);
    set(limits, _limits);
    set(fees, _fees);
    // console.log(_rates);
    // console.log(_fees);
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

export const useLoadingInitSwapState = () => {
  return useAtom(loadingInitSwap);
}

export const initSwap = atom( 
  null,
  async (get, set, cb: () => any) => {
    let base = get(sendToken);
    let baseAmount = new BigNumber(get(sendValue));
    let quote = get(receiveToken);
    let quoteAmount = new BigNumber(get(receiveValue));

    // Error checking: check if sendValue < min. value or > max. value
    let error = {
      error: false,
      message: ""
    }
    let _limits: {[key: string]: any} = get(limits);
    let _pair = base + "/" + quote;
    if (_limits[_pair]) {
      let _minimalValue = new BigNumber(_limits[_pair].minimal).dividedBy(decimals);
      if (baseAmount.isLessThan(_minimalValue)) {
        error = {
          error: true,
          message: "Invalid amount: can't send less than min. value"
        }
        set(swapFormError, error);
        set(sendAmountError, error);
        return;
      }

      let _maximalValue = new BigNumber(_limits[_pair].maximal).dividedBy(decimals);
      if (baseAmount.isGreaterThan(_maximalValue)) {
        error = {
          error: true,
          message: "Invalid amount: can't send more than max. value"
        }
        set(swapFormError, error);
        set(sendAmountError, error);
        return;
      }
    }

    // Error checking: insufficient balance


    // reset error message
    set(swapFormError, error);
    set(sendAmountError, error);

    // update swap tx data
    console.log('update swap tx data');
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

    let newSwapTxData = {
      base: base,
      quote: quote,
      baseAmount: baseAmount.toFixed(8),
      quoteAmount: quoteAmount.toFixed(8),
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
    _swapTxData.invoice = address;
    let newSwapTxData = {..._swapTxData};
    set(swapTxData, newSwapTxData);

    console.log(`sending to ${address}`)
    cb();
  }
)

export const startSwap = atom(
  null,
  async (get, set, { navigationCb, setSwapStatus }) => {
    set(loadingInitSwap, true);
    const url = `${lnswapApi}/createswap`;
    let { pair, invoice, keys, preimageHash, quoteAmount, baseAmount } = get(swapTxData);

    // Trim the "lightning:" prefix, that some wallets add in front of their invoices, if it exists
    if (invoice.slice(0, 10) === 'lightning:') {
      invoice = invoice.slice(10);
    }

    let body;
    let _quoteAmount = parseInt((parseFloat(quoteAmount) * 1000000).toString()).toString();
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

    postData(url, body).then(data => {
      set(loadingInitSwap, false);
  
      if (data.error) {
        window.alert(`Failed to execute swap: ${data.error}`);
        return;
      }
      console.log(data);
      set(sendSwapResponse, data);

      let _swapInfo = get(swapTxData)
      let refundObject: RefundInfo = {
        amount: parseInt((parseFloat(data.expectedAmount) / 100).toString()),
        contract: data.address,
        currency: _swapInfo.base,
        privateKey: _swapInfo.keys.privateKey,
        preimageHash: _swapInfo.preimageHash,
        redeemScript: data.redeemScript,
        swapInfo: _swapInfo,
        swapResponse: data,
        timeoutBlockHeight: data.timeoutBlockHeight
      }
      console.log('refundObj', refundObject);
      set(currentAccountSubmittedBtcTxsState, {
        [data.id]: refundObject
      });

      // start listening for tx
      let swapId = data.id;
      startListeningForTx(swapId, setSwapStatus);

      navigationCb();
    }).catch(err => {
      console.log("startSwap err: ", err);
      const message = err.response.data.error;
      window.alert(`Failed to execute swap: ${message}`)
    })
  }
)

// send swap tx data
export const useSendSwapResponseState = () => {
  return useAtom(sendSwapResponse);
}

export const useSendSwapStatusState = () => {
  return useAtom(sendSwapStatus);
}

export const startListeningForTx = (swapId: string, setSwapStatus: any) => {
  const url = `${lnswapApi}/streamswapstatus?id=${swapId}`;
  const source = new EventSource(url);
  console.log('start listening for tx...')

  // setTimeout(() => {
  //   handleSwapStatus({ status: SwapUpdateEvent.TransactionConfirmed }, setSwapStatus);
  // }, 5000);
  source.onerror = () => {
    source.close();

    console.log('Lost connection to LN Swap');
    const url = `${lnswapApi}/swapstatus`;

    const interval = setInterval(() => {
      postData(url, {
        id: swapId,
      }).then(response => {
        clearInterval(interval);
        console.log('Reconnected to LN Swap');

        startListeningForTx(swapId, setSwapStatus);
        handleSwapStatus(response.data, setSwapStatus, source, {});
      })

    }, 1000);
  }

  source.onmessage = (event: any) => {
    handleSwapStatus(JSON.parse(event.data), setSwapStatus, source, {});
  }
}

export const handleSwapStatus = (data: any, setSwapStatus: any, source: any, callback: any) => {
  const status = data.status;
  console.log('handleSwapStatus: ', data);
  
  switch (status) {
    case SwapUpdateEvent.TransactionConfirmed:
      setSwapStatus({
        pending: true,
        message: "Waiting for invoice to be paid..."
      })
      break;

    case SwapUpdateEvent.InvoiceFailedToPay:
      source.close();
      setSwapStatus({
        error: true,
        pending: false,
        message: 'Could not pay invoice. Please refund your coins.'
      })
      break;
    
    case SwapUpdateEvent.SwapExpired:
      source.close();
      setSwapStatus({
        error: true,
        pending: false,
        message: 'Swap expired. Please refund your coins.'
      })
      break;

    case SwapUpdateEvent.InvoicePaid:
    case SwapUpdateEvent.TransactionClaimed:
      source.close();
      callback();
      break;

    case SwapUpdateEvent.ASTransactionMempool:
    case SwapUpdateEvent.TransactionMempool:
      console.log('got mempool');
      let swapStatusObj = {
        pending: true,
        message: 'Transaction is in mempool...',
        transaction: null
      };
      if (data.transaction) {
        swapStatusObj.transaction = data.transaction;
      }
      setSwapStatus(swapStatusObj);
      break;

    case SwapUpdateEvent.ASTransactionConfirmed:
      console.log('got asconfirmed');
      setSwapStatus({
        pending: true,
        message: 'Atomic Swap is ready'
      });
      break;

    case SwapUpdateEvent.TransactionFailed:
      setSwapStatus({
        error: true,
        pending: false,
        message: 'Atomic Swap coins could not be sent. Please refund your coins.'
      });
      break;
    
    case SwapUpdateEvent.LockupFailed:
      setSwapStatus({
        error: true,
        pending: false,
        message: 'Lockup failed. Please refund your coins.'
      })
      break;

    case SwapUpdateEvent.ChannelCreated:
      setSwapStatus({
        pending: true,
        message: 'Channel is being created...'
      })
      break;

    default:
      console.log(`Unknown swap status: ${JSON.stringify(data)}`);
      break;
  }
}