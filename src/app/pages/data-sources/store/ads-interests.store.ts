import { atom } from "jotai";
import { facebookData } from "./facebook-data.store";

// export const adsInterestsData = atom({
//   connected: false,
//   data: []
// });

// hardcode data for now
export const facebookAdsInterests = atom({
  connected: false,
  data: [
    { category: "Action games", connected: false },
    { category: "amazon.com", connected: false },
    { category: "Friends (TV series)", connected: false },
    { category: "Samsung", connected: false },
    { category: "USB", connected: false },
  ]
})