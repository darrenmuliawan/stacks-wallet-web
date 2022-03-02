import { IPurchaseHistory } from "../interfaces/purchase_history";

export const purchase_history_example: IPurchaseHistory[] = [
  {
    date: {
      year: 2022,
      month: 2,
      day: 28
    },
    name: 'iPhone 13 Pro',
    brand: 'Apple'
  },
  {
    date: {
      year: 2022,
      month: 2,
      day: 20
    },
    name: 'Macbook Pro',
    brand: 'Apple'
  },
  {
    date: {
      year: 2022,
      month: 3,
      day: 1
    },
    name: 'Coffee',
    brand: 'Starbucks'
  },
]