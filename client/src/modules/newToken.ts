import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const name = 'getNewAccess';

type stateType = {
    list : []
}

const initialState : stateType = {
    list : []
}

export const getNewAccess = createAsyncThunk("POST_ACCESS", async (refresh : any) => {
    // console.log('<NewToken> : before axios')
    try{
        const response = await axios.post("/api/auth/refresh", refresh)
        // console.log('<NewToken> : res : ',response.data)
        return response.data;
    }catch(e){
        // console.log('<NewToken> : false')
        return false
    }
})

export const getNewAccessList = createSlice({
    name,
    initialState,
    reducers: {
        setAccess(state) {
            state.list = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            getNewAccess.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.list = action.payload;
                console.log('<NewToken> : token : ',state.list)
            }
        );
    },

});

export const { setAccess } = getNewAccessList.actions;
export default getNewAccessList.reducer;
