import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const name = 'search';

type stateType = {
    word : string
}

const initialState : stateType = {
    word : ''
}

export const getList = createAsyncThunk("GET_ITEM", async (recipe_id: string) => {
    const response = await axios.get("http://localhost:5000/api/main/search/str", {params:{data:recipe_id}})
    console.log(response.data)
    return response.data;
})

export const searchText = createSlice({
    name,
    initialState,
    reducers : {
        setWord(state,action : PayloadAction<string>){
            state.word = action.payload;
        }
    }
});

export const { setWord } = searchText.actions;

export default searchText.actions;