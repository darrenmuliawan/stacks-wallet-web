import { NoAccountActivity } from "@app/features/activity-list/components/no-account-activity";
import { getCurrentAccountSubmittedBtcTxsState } from "./hooks/btc-activity.hooks";

export const BtcActivityList = () => {
  const transactions = getCurrentAccountSubmittedBtcTxsState();
  console.log('txs: ', transactions);
  const hasTxs = false;//transactions.length > 0;

  if (!hasTxs) return <NoAccountActivity />

  return (
    <>
    
    </>
  )
}