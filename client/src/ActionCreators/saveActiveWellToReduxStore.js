import { SAVE_ACTIVE_WELL_TO_REDUX_STORE_REQUESTED,
  SAVE_ACTIVE_WELL_TO_REDUX_STORE_RECEIVED,
  SAVE_ACTIVE_WELL_TO_REDUX_STORE_FAILED
 } from "./types"

export const saveSelectedAsActiveWell = (selectedWell) => {
  return { type: SAVE_ACTIVE_WELL_TO_REDUX_STORE_RECEIVED, payload: {selectedWell} }
}
