import { useAtom } from "jotai"
import { btcAccountTab } from "../store/btc-account-tabs.store"

export const useBtcAccountTabs = () => {
  const [activeTab, setActiveTab] = useAtom(btcAccountTab);
  const setActiveTabBalances = () => setActiveTab(0);
  const setActiveTabActivity = () => setActiveTab(1);
  return {
    activeTab,
    setActiveTab,
    setActiveTabActivity,
    setActiveTabBalances
  }
}