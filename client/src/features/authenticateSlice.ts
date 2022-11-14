import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface AuthenticationState {
    isAuth: boolean;
}

const initialState: AuthenticationState = {
    isAuth: false
};

export const authenticateSlice = createSlice({
    name: 'authenticate',
    initialState,
    reducers: {
        signedIn: state => {            
            state.isAuth = true;
        },

        signedOut: state => {
            state.isAuth = false;
        }
    }
});

export const { signedIn, signedOut } = authenticateSlice.actions;
export const selectAuth = (state: RootState) => state.authenticate.isAuth;


export default authenticateSlice.reducer;
