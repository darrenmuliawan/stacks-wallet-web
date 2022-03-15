import { useAtom } from "jotai"
import { useAtomValue } from "jotai/utils";
import { currentAccountSubmittedBtcTxsState } from "../store/btc-activity.store"

export const getCurrentAccountSubmittedBtcTxsState = () => {
  return useAtomValue(currentAccountSubmittedBtcTxsState);
}