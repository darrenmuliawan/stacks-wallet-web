import { atom } from "jotai";

export const facebookAdsYouInteractedWith = atom({
  connected: false,
  data: [
    { category: "Xiaomi 11i Series 5G", connected: false },
    { category: "MSI Gaming", connected: false },
    { category: "Candy Crush", connected: false },
  ]
})