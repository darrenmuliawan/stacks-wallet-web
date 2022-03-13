import { networks } from "bitcoinjs-lib";

// lnswap API
export const lnswapApi = 'https://api.lnswap.org:9002'

// bitcoin network
export const bitcoinMainnet = networks.bitcoin;

// litecoin network
const litecoinPrefix = '\\x19Litecoin Signed Message:\n';
export const litecoinMainnet: networks.Network = {
  messagePrefix: litecoinPrefix,
  bip32: {
    private: 0x488ADE4,
    public: 0x488B21E,
  },
  bech32: 'ltc',
  scriptHash: 0x32,
  pubKeyHash: 0x30,
  wif: 0xb0,
}