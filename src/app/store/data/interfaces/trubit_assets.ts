import { IPersonalInfo } from ".";
import { IDemographics } from "./demographics";
import { IInterestAffinities } from "./interests";
import { IPurchaseHistory } from "./purchase_history";

export interface ITrubitAssets {
  personalInformation: IPersonalInfo[],
  interests: IInterestAffinities[],
  purchaseHistory: IPurchaseHistory[],
  demographics: IDemographics[]
}