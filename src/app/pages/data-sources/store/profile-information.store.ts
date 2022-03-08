import { atom } from "jotai";

export const facebookProfileInformation = atom({
  connected: false,
  data: {
    "full-name": {
      connected: false,
      value: "Mark Zuckerberg"
    },
    "email": {
      connected: false,
      value: "mark@facebook.com"
    },
    "birthday": {
      connected: false,
      value: {
        "year": 1984,
        "month": 5,
        "day": 14
      }
    },
    "gender": {
      connected: false,
      value: "male"
    },
    "relationship": {
      connected: false,
      value: "married"
    },
    // "educations": {
    //   connected: false,
    //   value: [
    //     { name: "Harvard University", degree: "dropped-out" }
    //   ]
    // }
  }
})