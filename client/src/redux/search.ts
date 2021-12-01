import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const name = 'searchText';

type stateType = {
    word : String
}

const initialState : stateType = {
    word : ''
}

// export const getList = createAsyncThunk("GET_ITEM", async (recipe_id: string) => {
//     const response = await axios.get("/api/main/search/str", {params:{data:recipe_id}})
//     console.log('getList',response.data.result)
//     return response.data.result;
// })

export const searchText = createSlice({
    name,
    initialState,
    reducers : {
        setWord(state,action : PayloadAction<String>){
            state.word = action.payload;
            console.log(state.word);
        }
    },
});

export const { setWord } = searchText.actions;

export default searchText.reducer;
