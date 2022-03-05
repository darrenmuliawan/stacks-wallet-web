import { useAtom } from "jotai";
import { settingsVisibility, shouldAutoApproveAllSites } from "../store/connect-data-vault.store";

// Auto approve all sites
export const useAutoApproveAllSitesCheckedState = () => {
  return useAtom(shouldAutoApproveAllSites);
}

// Settings
export const useConnectDataVaultSettingsVisibilityState = () => {
  return useAtom(settingsVisibility);
}