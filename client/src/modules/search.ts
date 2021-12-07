import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const name = 'searchText';

type stateType = {
    word : String
}

const initialState : stateType = {
    word : ''
}


export const searchText = createSlice({
    name,
    initialState,
    reducers : {
        setWord(state,action : PayloadAction<String>){
            state.word = action.payload;
            console.log('<setWord> : 검색한 값 : ', state.word);
        }
    },
});

export const { setWord } = searchText.actions;

export default searchText.reducer;
