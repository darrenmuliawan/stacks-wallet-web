import { atom, useAtom } from "jotai"
import { facebookPagesYouLiked } from "../store/pages-you-liked.store"

export const usePagesYouLikedDataState = () => {
  return useAtom(facebookPagesYouLiked);
}

export const togglePagesYouLikedDataChecked = atom(
  null,
  (get, set, index: number) => {
    let _pagesYouLiked = get(facebookPagesYouLiked);
    let newPagesYouLiked = {..._pagesYouLiked};
    newPagesYouLiked.data[index].connected = !_pagesYouLiked.data[index].connected;
    set(facebookPagesYouLiked, newPagesYouLiked)
  }
)

export const togglePagesYouLikedChecked = atom(
  null,
  (get, set) => {
    let _pagesYouLiked = get(facebookPagesYouLiked);
    let newPagesYouLiked = {..._pagesYouLiked};
    newPagesYouLiked.connected = !_pagesYouLiked.connected;
    set(facebookPagesYouLiked, newPagesYouLiked)
  }
)