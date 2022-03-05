import { atom, useAtom } from "jotai"
import { useAtomValue } from "jotai/utils"
import { selectedPage } from "../store/data-vault.store";


export const useCurrentPageState = () => {
  return useAtom(selectedPage);
};

export const setCurrentSelectedPage = (page: number) => {
  const [_, setCurrentSelectedPage] = useAtom(selectedPage);
  setCurrentSelectedPage(page);
}

export const currentDataVaultState = atom({
  selectedPage: selectedPage
})


export const useDataVaultState = () => {
  return useAtomValue(currentDataVaultState)
}