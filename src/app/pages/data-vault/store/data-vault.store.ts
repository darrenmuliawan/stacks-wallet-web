import { atom } from "jotai";

export enum DATA_VAULT_PAGE_ENUM {
  MyData = 0,
  ConnectData = 1,
  StackData = 2
}
export const selectedPage = atom(DATA_VAULT_PAGE_ENUM.MyData);
