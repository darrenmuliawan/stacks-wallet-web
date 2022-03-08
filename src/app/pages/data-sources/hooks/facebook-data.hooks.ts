import { atom, useAtom } from "jotai";
import { facebookAdsInterests, facebookData } from "../store/facebook-data.store";

export const useFacebookAdsInterestsState = () => {
  return useAtom(facebookAdsInterests);
}