import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: "username Loading",
    name: "name Loading",
    amount: 0,
    dataTake: [],
    dataGive: []
};

export const DataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setDataTake: (state, action) => {
            state.dataTake = action.payload;
        },
        setDataGive: (state, action) => {
            state.dataGive = action.payload;
        },
        setName: (state,action) => {
            state.name = action.payload;
        },
        setUser: (state,action)=>{
            state.user = action.payload;
        },
        setAmount: (state,action)=>{
            state.amount = action.payload;
        }
    }
});
export const { setDataTake, setDataGive, setName, setUser, setAmount } = DataSlice.actions;
export default DataSlice.reducer


