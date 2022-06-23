import { configureStore } from "@reduxjs/toolkit";

import appStateReducer from "./appState/slice";
import userReducer from "./user/slice";
import dataReducer from "./data/slice";

export default configureStore({
  reducer: {
    appState: appStateReducer,
    user: userReducer,
    data: dataReducer,
  },
});
