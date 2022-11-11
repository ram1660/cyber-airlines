import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface UserType {
    user: string;
};

const initialState: UserType = {
    user: 'None'
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAirlineUser: state => {
            state.user = 'AIRLINE'
        },
        setCustomerUser: state => {
            state.user = 'CUSTOMER'
        }
    }
});

export const { setAirlineUser, setCustomerUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;