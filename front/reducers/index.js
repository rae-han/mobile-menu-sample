import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";

import storeSlice from './modules/store'

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        store: storeSlice.reducer,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;