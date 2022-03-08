import { atom, useAtom } from "jotai"
import { facebookProfileInformation } from "../store/profile-information.store"

export const useProfileInformationState = () => {
  return useAtom(facebookProfileInformation);
}

export const toggleProfileInformationDataChecked = atom(
  null,
  (get, set, key: string) => {
    let _profileInfo = get(facebookProfileInformation);
    let newProfileInfo = {..._profileInfo};
    newProfileInfo.data[key].connected = !_profileInfo.data[key].connected;
    console.log(newProfileInfo.data[key])
    set(facebookProfileInformation, newProfileInfo);
  }
)

export const toggleProfileInformationChecked = atom(
  null,
  (get, set) => {
    let _profileInfo = get(facebookProfileInformation);
    let newProfileInfo = {..._profileInfo};
    newProfileInfo.connected = !_profileInfo.connected;
    console.log(newProfileInfo)
    set(facebookProfileInformation, newProfileInfo);
  }
)