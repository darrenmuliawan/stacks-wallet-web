import { atom, useAtom } from "jotai"
import { facebookAdsInterests } from "../store/ads-interests.store";

export const useAdsInterestsDataState = () => {
  return useAtom(facebookAdsInterests);
}

export const setAdsInterestsDataChecked = atom(
  null,
  async (get, set, index: number) => {
    let _facebookData = get(facebookAdsInterests);
    let newFacebookData = {..._facebookData}
    newFacebookData.data[index].connected = !_facebookData.data[index].connected;
    // console.log(newFacebookData.data[index]);
    set(facebookAdsInterests, newFacebookData);
  }
)

export const setAdsInterestsChecked = atom(
  null,
  async (get, set) => {
    let _adsInterests = get(facebookAdsInterests);
    let newAdsInterests = {..._adsInterests};
    newAdsInterests.connected = !_adsInterests.connected;
    console.log(newAdsInterests)
    set(facebookAdsInterests, newAdsInterests);
  }
)