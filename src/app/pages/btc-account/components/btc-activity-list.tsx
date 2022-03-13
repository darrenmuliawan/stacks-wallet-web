import { NoAccountActivity } from "@app/features/activity-list/components/no-account-activity";

export const BtcActivityList = () => {
  const transactions = []
  const hasTxs = transactions.length > 0;

  if (!hasTxs) return <NoAccountActivity />

  return (
    <>
    
    </>
  )
}