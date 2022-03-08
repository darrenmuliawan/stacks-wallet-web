import { atom, useAtom } from "jotai"
import { locationInformationData } from "../store/location-information.store"

export const useLocationInformationDataState = () => {
  return useAtom(locationInformationData);
}

export const toggleLocationInformationDataChecked = atom(
  null,
  (get, set, key: string) => {
    let _locationInfo = get(locationInformationData);
    let newLocationInfo = {..._locationInfo};
    newLocationInfo.data[key].connected = !_locationInfo.data[key].connected;
    set(locationInformationData, newLocationInfo);
  }
)

export const toggleLocationInformationChecked = atom(
  null,
  (get, set) => {
    let _locationInfo = get(locationInformationData);
    let newLocationInfo = {..._locationInfo};
    newLocationInfo.connected = !_locationInfo.connected;
    set(locationInformationData, newLocationInfo);
  }
)