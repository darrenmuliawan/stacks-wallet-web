import { atom, useAtom } from "jotai"
import { facebookAdsYouInteractedWith } from "../store/ads-you-interacted-with.store"

export const useAdsYouInteractedWithDataState = () => {
  return useAtom(facebookAdsYouInteractedWith);
}

export const toggleAdsYouInteractedWithDataChecked = atom(
  null,
  (get, set, index: number) => {
    let _ads = get(facebookAdsYouInteractedWith);
    let newAds = {..._ads};
    newAds.data[index].connected = !_ads.data[index].connected;
    set(facebookAdsYouInteractedWith, newAds);
  }
)

export const setAdsYouInteractedWithChecked = atom(
  null,
  async (get, set) => {
    let _ads = get(facebookAdsYouInteractedWith);
    let newAds = {..._ads};
    newAds.connected = !_ads.connected;
    console.log(newAds)
    set(facebookAdsYouInteractedWith, newAds);
  }
)