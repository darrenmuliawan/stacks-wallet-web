import { atom } from "jotai";
import { facebookData } from "./facebook-data.store";

export const locationInformationData = atom({
  connected: false,
  data: {
    "location": {
      connected: false,
      value: "Menlo Park, California, United States"
    },
    "timezone": {
      connected: false,
      value: "Pacific Time"
    }
  }
});