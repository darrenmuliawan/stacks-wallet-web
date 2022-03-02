import { contact_info_example, demographics_example, interests_example, purchase_history_example } from "./constants"
import { transformTrubitDataToAssets } from "./utils";

/**
 * TODO: Use real API to get current user's personal information
 * @param address 
 * @returns 
 */
export const getPersonalInformation = (address: string) => {
  return contact_info_example;
}

/**
 * TODO: Use real API to get current user's interests and affinities
 * @param address 
 * @returns 
 */
export const getInterestsAffinities = (address: string) => {
  return interests_example;
}

/**
 * TODO: Use real API to get current user's purchase history
 * @param address 
 * @returns 
 */
export const getPurchaseHistory = (address: string) => {
  return purchase_history_example;
}

/**
 * TODO: Use real API to get current user's demographics
 * @param address 
 * @returns 
 */
export const getDemographics = (address: string) => {
  return demographics_example;
}

/**
 * Returns list of TRUBIT data assets
 * @param address 
 * @returns 
 */
export const useDataTokenState = (address: string) => {
  const personalInformation = getPersonalInformation(address);
  const interests = getInterestsAffinities(address);
  const purchaseHistory = getPurchaseHistory(address);
  const demographics = getDemographics(address);
  const assets = {
    personalInformation: personalInformation,
    interests: interests,
    purchaseHistory: purchaseHistory,
    demographics: demographics
  }

  return transformTrubitDataToAssets(assets)
}