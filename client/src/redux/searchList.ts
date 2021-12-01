import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const name = 'getsearchList';

type stateType = {
    list : []
}

const initialState : stateType = {
    list : []
}

export const getList = createAsyncThunk("GET_ITEM", async (recipe_id: string) => {
    const response = await axios.get("/api/main/search/str", {params:{data:recipe_id}})
    console.log('getList',response.data.result)
    return response.data.result;
})

export const getSearchList = createSlice({
    name,
    initialState,
    reducers: {
        setList(state) {
            state.list = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            getList.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.list = action.payload;
            }
        );
    },

});

export const { setList } = getSearchList.actions;

export default getSearchList.reducer;