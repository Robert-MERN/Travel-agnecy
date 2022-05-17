import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    alerts: null,
}

const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        setAlert: (state, action)=>{
            state.alerts = action.payload;
        },
        resetAlert: (state)=>{
            state.alerts = null
        }
    }
})

export const { setAlert } = alertSlice.actions;
export const { resetAlert } = alertSlice.actions;
export const selectAlert = (state)=> state.alert.alerts;
export default alertSlice.reducer;