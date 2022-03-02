import { getAssetStringParts, truncateMiddle } from '@stacks/ui-utils';
import BigNumber from 'bignumber.js';
import type { Asset, AssetWithMeta } from '@app/common/asset-types';
import type { AccountBalanceResponseBigNumber } from '@shared/models/account-types';
import { c32ToB58 } from 'c32check';

export function transformAssets(balances?: AccountBalanceResponseBigNumber) {
  const _assets: Asset[] = [];
  if (!balances) return _assets;
  _assets.push({
    type: 'stx',
    contractAddress: '',
    contractName: '',
    balance: balances.stx.balance,
    subtitle: 'STX',
    name: 'Stacks Token',
    canTransfer: true,
    hasMemo: true,
  });
  Object.keys(balances.fungible_tokens).forEach(key => {
    const balance = new BigNumber(balances.fungible_tokens[key].balance);
    const { address, contractName, assetName } = getAssetStringParts(key);
    if (balance.isEqualTo(0)) return; // tokens users have traded will persist in the api response even if they don't have a balance
    _assets.push({
      type: 'ft',
      subtitle: `${truncateMiddle(address)}.${contractName}`,
      contractAddress: address,
      contractName,
      name: assetName,
      balance: balance,
    });
  });
  return _assets;
}

/**
 * Convert STX address to BTC address
 * source: https://github.com/hirosystems/stacks.js/blob/master/packages/cli/src/cli.ts
 * @param stxAddress 
 */
 export const getBitcoinAddress = (stxAddress: string | undefined) => {
  if (!stxAddress) {
    return "";
  }

  const C32_ADDRESS_CHARS = '[0123456789ABCDEFGHJKMNPQRSTVWXYZ]+';
  const STACKS_ADDRESS_PATTERN = `^(${C32_ADDRESS_CHARS})$`;
  let b58addr: string;

  if (stxAddress.match(STACKS_ADDRESS_PATTERN)) {
    b58addr = c32ToB58(stxAddress);
  } else if (stxAddress.match(/[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+/)) {
    b58addr = stxAddress;
  } else {
    throw new Error(`Unrecognized address ${stxAddress}`)
  }
  
  // console.log('btc: ', b58addr)
  return b58addr;
}

/**
 * 
 * @param asset 
 * @returns 
 */
export const transformBitcoinAssets = (asset: any) => {
  // console.log(asset)
  let btcAssetWithMeta: AssetWithMeta = {
    name: "Bitcoin",
    contractAddress: "",
    contractName: "",
    subtitle: "BTC",
    type: "ft",
    balance: new BigNumber(asset.balance),
    canTransfer: false,
    hasMemo: false
  }
  return btcAssetWithMeta;
}