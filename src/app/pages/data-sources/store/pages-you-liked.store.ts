import { atom } from "jotai";

export const facebookPagesYouLiked = atom({
  connected: false,
  data: [
    { category: "LG Global", connected: false },
    { category: "Hackintosh Shop", connected: false },
    { category: "Comedy Central Stand-Up", connected: false },
  ]
})