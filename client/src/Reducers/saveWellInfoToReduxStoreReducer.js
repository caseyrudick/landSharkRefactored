import { SAVE_WELL_INFO_TO_REDUX_STORE_REQUESTED,
  SAVE_WELL_INFO_TO_REDUX_STORE_RECEIVED,
  SAVE_WELL_INFO_TO_REDUX_STORE_FAILED } from "../ActionCreators/types"

  const INITIAL_STATE = {
    response: {}, 
    status: ""
  };

  export default (state = INITIAL_STATE, { type, payload }) => {
    
    switch (type) {
      case SAVE_WELL_INFO_TO_REDUX_STORE_REQUESTED:
        return { ...state, status: 'waiting' };
      case SAVE_WELL_INFO_TO_REDUX_STORE_RECEIVED:
        return { ...state, response: payload, status: 'received' };
      case SAVE_WELL_INFO_TO_REDUX_STORE_FAILED:
        return { ...state, response: payload, status: 'failed' };
      default:
        return state;
    }
  };
  