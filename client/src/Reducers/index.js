import { combineReducers } from "redux"
// import wellsReducer from "./wellsReducer"
// import selectWellFromReduxStoreReducer from "./selectWellFromReduxStoreReducer"
// import postPlansToJSONdb from "./postPlansToJSONdb"
import saveWellInfoToReduxStoreReducer from "./saveWellInfoToReduxStoreReducer"
import postWellInfoToJSONDbReducer from "./postWellInfoToJSONDbReducer"
import getWellsFromJSONDbReducer from "./getWellsFromJSONDbReducer"
import saveWellPlansToJSONDbReducer from "./saveWellPlansToJSONDbReducer"
import saveActiveWellToReduxStoreReducer from "./saveActiveWellToReduxStoreReducer"

export default combineReducers({
  saveWellInfoToReduxStoreReducer,
  postWellInfoToJSONDbReducer,
  getWellsFromJSONDbReducer,
  saveWellPlansToJSONDbReducer,
  saveActiveWellToReduxStoreReducer
})