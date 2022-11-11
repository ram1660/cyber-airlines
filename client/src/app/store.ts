import { configureStore } from "@reduxjs/toolkit";
import authenticateReducer from "../features/authenticateSlice";
import userReducer from "../features/userSlice";
export const store = configureStore({
    reducer: {
        authenticate: authenticateReducer,
        user: userReducer
    },
    devTools: true
});
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;
