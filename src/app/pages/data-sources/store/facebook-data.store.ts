import { atom } from "jotai";

export const facebookData = atom(
  {
    "ads-interests": {
      connected: false,
      data: [
        { category: "Action games", connected: false },
        { category: "amazon.com", connected: false },
        { category: "Friends (TV series)", connected: false },
        { category: "Samsung", connected: false },
        { category: "USB", connected: false },
      ]
    },
    "ads-you-interacted-with": {
      connected: false,
      data: [
        { category: "Xiaomi 11i Series 5G", connected: false },
        { category: "MSI Gaming", connected: false },
        { category: "Candy Crush", connected: false },
      ]
    },
    "pages-you-liked": {
      connected: false,
      data: [
        { category: "LG Global", connected: false },
        { category: "Hackintosh Shop", connected: false },
        { category: "Comedy Central Stand-Up", connected: false },
      ]
    },
    "profile-information": {
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
    },
    "location": {
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
    },
    "music-recommendations": {
      connected: false,
      data: []
    }
  }
)