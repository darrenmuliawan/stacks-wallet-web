import { currentAccountState } from "@app/store/accounts";
import { currentStacksNetworkState } from "@app/store/network/networks";
import { AnchorMode, broadcastTransaction, bufferCV, createStacksPrivateKey, FungibleConditionCode, makeContractSTXPostCondition, makeUnsignedContractCall, PostConditionMode, pubKeyfromPrivKey, publicKeyToString, SignedContractCallOptions, TransactionSigner, UnsignedContractCallOptions } from "@stacks/transactions";
import { serializePayload } from "@stacks/transactions/dist/payload";
import { getContractName } from "@stacks/ui-utils";
import BigNumber from "bignumber.js";
import { crypto } from "bitcoinjs-lib";
import BN from "bn.js";
import { randomBytes } from "crypto";
import { atom, useAtom } from "jotai";
import { bitcoinMainnet, litecoinMainnet, lnSwapApi, postData, SwapUpdateEvent } from "../constants/networks";
import { decimals } from "../constants/numbers";
import { LnSwapInfo, LnSwapResponse } from "../interfaces";
import { claimStxTxSubmitted, claimTokenTxId, estimatedTxByteLength, lnSwapInfo, lnSwapResponse, lnSwapStatus, lockupTokenTx, previewClaimStxVisibility, serializedTxPayload, signedTx, txOptions, unsignedTx } from "../store/ln-swap-btc.store";
import { sendToken, sendValue, receiveToken, receiveValue, limits, swapFormError, sendAmountError, receiveTokenAddress, loadingInitSwap, swapWorkflow } from "../store/swap-btc.store";
import { convertBtcToSatoshis, generateKeys, getContractAddress, getHexString } from "../utils/utils";
import { getSwapWorkflow } from "./swap-btc.hooks";

export const useLnSwapResponseState = () => {
  return useAtom(lnSwapResponse);
}

export const useLnSwapStatusState = () => {
  return useAtom(lnSwapStatus);
}

export const useClaimTokenTxId = () => {
  return useAtom(claimTokenTxId);
}

export const useLockupTokenTxState = () => {
  return useAtom(lockupTokenTx);
}

export const useTxOptionsState = () => {
  return useAtom(txOptions);
}

export const useUnsignedTxState = () => {
  return useAtom(unsignedTx);
}

export const useSerializedTxPayloadState = () => {
  return useAtom(serializedTxPayload);
}

export const useEstimatedTxByteLengthState = () => {
  return useAtom(estimatedTxByteLength);
}

export const usePreviewClaimStxVisibilityState = () => {
  return useAtom(previewClaimStxVisibility);
}

export const useClaimStxTxSubmittedState = () => {
  return useAtom(claimStxTxSubmitted);
}

export const initLnSwap = atom(
  null,
  async (get, set, cb: () => any) => {
    let base = get(sendToken);
    let quote = get(receiveToken);

    // set workflow
    let workflow = getSwapWorkflow(base, quote);
    console.log('workflow: ', workflow);
    set(swapWorkflow, workflow);

    base = base.split(" ")[0]
    let baseAmount = new BigNumber(get(sendValue));
    quote = base.split(" ")[0]
    let quoteAmount = new BigNumber(get(receiveValue));

    // Error checking: check if sendValue < min. value or > max. value
    let error = {
      error: false,
      message: ''
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
    console.log('update ln swap tx data');
    let keys = generateKeys(
      base === 'BTC' ? bitcoinMainnet : litecoinMainnet
    );
    let pair = {
      id: "BTC/STX",
      orderSide: base === 'BTC' ? "sell" : "buy"
    }
    let preimage = randomBytes(32);

    let newLnSwapTxData: LnSwapInfo = {
      base: base,
      quote: quote,
      baseAmount: baseAmount.toFixed(8),
      quoteAmount: quoteAmount.toFixed(8),
      keys: keys,
      pair: pair,
      address: '',
      preimage: getHexString(preimage),
      preimageHash: getHexString(crypto.sha256(preimage)),
      isSponsored: false
    }
    console.log('ln swap tx data: ', newLnSwapTxData);
    set(lnSwapInfo, newLnSwapTxData);

    // run callback
    cb();
  }
)

export const checkLnSwapAddress = atom(
  null,
  async (get, set, cb: () => void) => {
    let address = get(receiveTokenAddress);

    if (address === '') {
      console.log('cant put empty address');
      return;
    }

    let _lnSwapInfo = get(lnSwapInfo);
    _lnSwapInfo.address = address;
    let newLnSwapInfo = {..._lnSwapInfo}
    set(lnSwapInfo, newLnSwapInfo);

    console.log(`ln invoice: ${address}`)
    cb();
  }
)

export const startLnSwap = atom(
  null,
  async (get, set, { 
    setSwapStatus, 
    setLockupTokenTx,
    setClaimStxInfo,
    navigateSendSwapToken, 
    navigateReceiveSwapToken, 
    navigateClaimToken, 
    navigateTimelockExpired,
    navigateEndSwap
  }) => {
    set(loadingInitSwap, true);
    const url = `${lnSwapApi}/zcreateswap`;
    const { pair, keys, baseAmount, address, preimageHash } = get(lnSwapInfo);

    const amount = convertBtcToSatoshis(baseAmount);
    let body = {
      type: 'reversesubmarine',
      pairId: pair.id,
      invoiceAmount: amount,
      orderSide: pair.orderSide,
      claimPublicKey: keys.publicKey,
      claimAddress: address,
      preimageHash: preimageHash,
      prepayMinerFee: false
    }
    console.log('body', body);

    postData(url, body).then(data => {
      set(loadingInitSwap, false);
  
      if (data.error) {
        window.alert(`Failed to execute swap: ${data.error}`);
        return;
      }
      console.log('lnswap response: ', data);
      set(lnSwapResponse, data);

      // add to tx history

      // start listening for tx
      const _swapInfo = get(lnSwapInfo);
      const _swapResponse = get(lnSwapResponse);
      startListeningForTx(
        _swapInfo, 
        _swapResponse, 
        navigateReceiveSwapToken, 
        navigateClaimToken,
        navigateTimelockExpired,
        navigateEndSwap,
        setSwapStatus,
        setLockupTokenTx
      )

      // set claimStx info
      setClaimStxInfo();

      // handle navigation
      navigateSendSwapToken();
    }).catch(err => {
      console.log("lnStartSwap err: ", err);
      const message = err.response.data.error;
      window.alert(`Failed to execute swap: ${message}`)
    })
  }
)

const startListeningForTx = (
  swapInfo: LnSwapInfo, 
  swapResponse: LnSwapResponse,
  navigateReceiveSwapToken: any, 
  navigateClaimToken: any,
  navigateTimelockExpired: any,
  navigateEndSwap: any,
  setSwapStatus: any,
  setLockupTokenTx: any
) => {
  console.log('start listening for tx...')
  const source = new EventSource(`${lnSwapApi}/streamswapstatus?id=${swapResponse.id}`);

  source.onerror = () => {
    source.close();

    console.log('Lost connection to lnswap');
    const url = `${lnSwapApi}/swapstatus`;

    const interval = setInterval(() => {
      postData(url, {
        id: swapResponse.id
      }).then(response => {
        clearInterval(interval);

        console.log('Reconnected to lnswap');

        startListeningForTx(
          swapInfo, 
          swapResponse, 
          navigateReceiveSwapToken, 
          navigateClaimToken,
          navigateTimelockExpired,
          navigateEndSwap,
          setSwapStatus,
          setLockupTokenTx
        );

        handleReverseSwapStatus(
          JSON.parse(response.data),
          source,
          navigateReceiveSwapToken, 
          navigateClaimToken,
          navigateTimelockExpired,
          navigateEndSwap,
          swapInfo,
          swapResponse,
          setSwapStatus,
          setLockupTokenTx
        )
      }).catch(err => {
        console.log(err);
      })
    }, 1000);
  }

  source.onmessage = event => {
    handleReverseSwapStatus(
      JSON.parse(event.data),
      source,
      navigateReceiveSwapToken, 
      navigateClaimToken,
      navigateTimelockExpired,
      navigateEndSwap,
      swapInfo,
      swapResponse,
      setSwapStatus,
      setLockupTokenTx
    )
  }
}

const handleReverseSwapStatus = (
  data: any,
  source: any,
  navigateReceiveSwapToken: any, 
  navigateClaimToken: any,
  navigateTimelockExpired: any,
  navigateEndSwap: any,
  swapInfo: LnSwapInfo,
  swapResponse: LnSwapResponse,
  setSwapStatus: any,
  setLockupTokenTx: any
) => {
  const status = data.status;
  console.log('handleReverseSwapStatus: ', status);

  switch (status) {
    case SwapUpdateEvent.TransactionMempool:
      setLockupTokenTx({
        transactionId: data.transaction.id,
        transactionHex: data.transaction.hex,
        success: true
      })
      navigateReceiveSwapToken();
      break;

    case SwapUpdateEvent.TransactionConfirmed:
      setSwapStatus({
        error: false,
        pending: false,
        message: 'Transaction confirmed'
      })
      navigateClaimToken();
      break;

    case SwapUpdateEvent.SwapExpired:
    case SwapUpdateEvent.TransactionRefunded:
      source.close();
      navigateTimelockExpired();
      break;

    case SwapUpdateEvent.TransactionFailed:
      source.close();
      setSwapStatus({
        error: true,
        pending: true,
        message: 'Could not send onchain coins'
      })
      setLockupTokenTx({
        transactionId: '',
        transactionHex: '',
        success: false
      })
      break;

    case SwapUpdateEvent.InvoiceSettled:
      source.close();
      // update tx status to be completed
      navigateEndSwap();
      break;

    case SwapUpdateEvent.MinerFeePaid:
      break;

    default:
      console.log(`Unknown swap status: ${JSON.stringify(data)}`);
      break;
  }
}

export const setClaimStxInfo = atom(
  null,
  async (get, set) => {
    const network = get(currentStacksNetworkState);
    const swapResponse = get(lnSwapResponse);
    const contract = swapResponse.lockupAddress;
    const contractAddress = getContractAddress(contract).toUpperCase();
    const contractName = getContractName(contract);
    const swapInfo = get(lnSwapInfo);
    const preimage = swapInfo.preimage;
    const amount = swapResponse.onchainAmount;
    const timeLock = swapResponse.timeoutBlockHeight;

    console.log(`Claiming ${amount} STX with preimage ${preimage} and timelock ${timeLock}`);

    let smallamount = parseInt((amount / 100).toString());
    console.log('smallamount: ' + smallamount);

    console.log('onchainamount: ', swapResponse.onchainAmount);
    let swapamount = smallamount.toString(16).split('.')[0] + '';
    let postConditionAmount = new BN(
      Math.ceil(parseInt(swapResponse.onchainAmount.toString()) / 100)
    );
    console.log(`postconditionamount: ${postConditionAmount}`);

    const postConditionAddress = contractAddress;
    console.log(`postConditionAddress: ${postConditionAddress}`);
    const postConditionCode = FungibleConditionCode.LessEqual;
    const postConditions = [
      makeContractSTXPostCondition(
        postConditionAddress,
        contractName,
        postConditionCode,
        postConditionAmount
      )
    ];
    console.log(
      'postConditions: ' + contractAddress,
      contractName,
      postConditionCode,
      postConditionAmount
    );

    let paddedamount = swapamount.padStart(32, '0');
    let paddedtimelock = timeLock.toString(16).padStart(32, '0');
    console.log(
      'amount, timelock ',
      smallamount,
      swapamount,
      paddedamount,
      paddedtimelock
    );

    // (claimStx (preimage (buff 32)) (amount (buff 16)) (claimAddress (buff 42)) (refundAddress (buff 42)) (timelock (buff 16)))
    const functionArgs = [
      bufferCV(Buffer.from(preimage, 'hex')),
      bufferCV(Buffer.from(paddedamount, 'hex')),
      bufferCV(Buffer.from('01', 'hex')),
      bufferCV(Buffer.from('01', 'hex')),
      bufferCV(Buffer.from(paddedtimelock, 'hex')),
    ];
    
    const account = get(currentAccountState);
    let _txOptions: UnsignedContractCallOptions = {
      contractAddress: contractAddress,
      contractName: contractName,
      functionName: 'claimStx',
      functionArgs: functionArgs,
      publicKey: publicKeyToString(pubKeyfromPrivKey(account ? account.stxPrivateKey : '')),
      network,
      postConditionMode: PostConditionMode.Deny,
      postConditions,
      anchorMode: AnchorMode.Any,
    }
  
    console.log('txOptions: ', txOptions);
    const transaction = await makeUnsignedContractCall(_txOptions);
    const signer = new TransactionSigner(transaction);
    signer.signOrigin(createStacksPrivateKey(account ? account.stxPrivateKey : ""))
    
    const _serializedTxPayload = serializePayload(transaction.payload).toString('hex');
    const _estimatedTxByteLength = transaction.serialize().byteLength;
    set(serializedTxPayload, _serializedTxPayload);
    set(estimatedTxByteLength, _estimatedTxByteLength);
    set(txOptions, _txOptions);
    set(unsignedTx, transaction);
    // if (transaction) {
    //   const broadcastResponse = await broadcastTransaction(transaction, network);
    //   const txId = broadcastResponse.txid;
    //   set(claimTokenTxId, txId);
    // }
  }
)

export const broadcastClaimToken = atom(
  null,
  async (get, set) => {
    let _transaction = get(unsignedTx);
    
    if (_transaction === undefined) {
      return;
    }

    console.log('found tx');
    const network = get(currentStacksNetworkState);
    const account = get(currentAccountState);
    const signer = new TransactionSigner(_transaction);
    signer.signOrigin(createStacksPrivateKey(account ? account.stxPrivateKey : ''));

    if (_transaction) {
      set(claimStxTxSubmitted, true);
      const broadcastResponse = await broadcastTransaction(_transaction, network);
      const txId = broadcastResponse.txid;
      set(claimTokenTxId, txId);
      set(claimStxTxSubmitted, false);
      set(previewClaimStxVisibility, false);
    }
  }
)