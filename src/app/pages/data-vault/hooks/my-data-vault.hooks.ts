import { useAtom } from "jotai"
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import { locationChecked, personalInfoChecked, settingsVisibility, shoppingAndInterestsChecked, shouldAutoApproveAllSites } from "../store/my-data-vault.store"

// Personal Information
export const getPersonalInfoCheckedState = () => {
  return useAtomValue(personalInfoChecked);
}

export const setPersonalInfoChecked = (checked: boolean) => {
  const setter = useUpdateAtom(personalInfoChecked);
  setter(checked);
}

export const usePersonalInfoCheckedState = () => {
  return useAtom(personalInfoChecked);
}

// Shopping & Interests
export const getShoppingAndInterestsCheckedState = () => {
  return useAtomValue(shoppingAndInterestsChecked);
}

export const setShoppingAndInterestsChecked = (checked: boolean) => {
  useUpdateAtom(shoppingAndInterestsChecked)(checked);
}

export const useShoppingAndInterestsCheckedState = () => {
  return useAtom(shoppingAndInterestsChecked);
}

// Geography & Location
export const getLocationCheckedState = () => {
  return useAtomValue(locationChecked);
}

export const setLocationChecked = (checked: boolean) => {
  useUpdateAtom(locationChecked)(checked);
}

export const useLocationCheckedState = () => {
  return useAtom(locationChecked);
}

// Auto approve all sites
export const getAutoApproveAllSitesCheckedState = () => {
  return useAtomValue(shouldAutoApproveAllSites);
}

export const setAutoApproveAllSitesChecked = (checked: boolean) => {
  useUpdateAtom(shouldAutoApproveAllSites)(checked);
}

export const useAutoApproveAllSitesCheckedState = () => {
  return useAtom(shouldAutoApproveAllSites);
}

// Settings
export const useMyDataVaultSettingsState = () => {
  return useAtom(settingsVisibility);
}