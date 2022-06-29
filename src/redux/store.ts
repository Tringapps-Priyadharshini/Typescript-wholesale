import { configureStore } from "@reduxjs/toolkit";
import retailerReducer from "./retailerSlice";
import wholesaleReducer from "./wholesaleSlice";
const store = configureStore({
    reducer:{
        wholesale:wholesaleReducer,
        retailer:retailerReducer
    }

})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch