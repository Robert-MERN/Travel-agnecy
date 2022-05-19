import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    refreshs: "false",
}

const refreshSlice = createSlice({
    name: "refresh",
    initialState,
    reducers: {
        setRefreshs: (state, action)=>{
            state.refreshs = action.payload;
        }
    }
});

export const { setRefreshs } = refreshSlice.actions;
export const selectRefresh = (state)=> state.refresh.refreshs;
export default refreshSlice.reducer;



