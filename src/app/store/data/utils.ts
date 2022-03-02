import { AssetWithMeta } from "@app/common/asset-types";
import BigNumber from "bignumber.js";
import { ITrubitAssets } from "./interfaces/trubit_assets";

/**
 * 
 * @param data 
 * @returns 
 */
export const transformTrubitDataToAssets = (data: ITrubitAssets) => {
  const personalInformation = data.personalInformation;
  const interests = data.interests;
  const purchaseHistory = data.purchaseHistory;
  const demographics = data.demographics;

  let personalInformationAsset: AssetWithMeta = {
    name: "Personal Information",
    contractAddress: "",
    contractName: "",
    subtitle: "TRUBIT-INFO",
    type: "nft",
    balance: new BigNumber(personalInformation.length),
    canTransfer: false,
    hasMemo: false,
  }

  let interestsAsset: AssetWithMeta = {
    name: "Interests & Affinities",
    contractAddress: "",
    contractName: "",
    subtitle: "TRUBIT-INTEREST",
    type: "nft",
    balance: new BigNumber(interests.length),
    canTransfer: false,
    hasMemo: false,
  }

  let purchaseHistoryAsset: AssetWithMeta = {
    name: "Purchase History",
    contractAddress: "",
    contractName: "",
    subtitle: "TRUBIT-PH",
    type: "nft",
    balance: new BigNumber(purchaseHistory.length),
    canTransfer: false,
    hasMemo: false,
  }

  let demographicAsset: AssetWithMeta = {
    name: "Demographics",
    contractAddress: "",
    contractName: "",
    subtitle: "TRUBIT-DEMO",
    type: "nft",
    balance: new BigNumber(demographics.length),
    canTransfer: false,
    hasMemo: false,
  }

  return {
    personalInformation: personalInformationAsset,
    interests: interestsAsset,
    purchaseHistory: purchaseHistoryAsset,
    demographics: demographicAsset
  }
}