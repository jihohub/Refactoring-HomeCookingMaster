import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const name = 'getMyInfoList';

type stateType = {
    list : []
}

const initialState : stateType = {
    list : []
}

const sessionID = sessionStorage.getItem('id')          // access_token

export const getMyInfo = createAsyncThunk("GET_INFO", async () => {
    try{
        console.log('<MyInfo> : before axios')
        const response = await axios.get("/api/mypage", {
            headers : {
                Authorization: 'Bearer ' + sessionID
            }
        })
        console.log('<MyInfo> : res : ',response.data)
        return response.data;
    }catch(e){
        console.log('<MyInfo> : false')
        return false
    }
})

export const getMyInfoList = createSlice({
    name,
    initialState,
    reducers: {
        setMyList(state) {
            state.list = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            getMyInfo.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.list = action.payload;
                console.log('<MyInfo> state : ', state.list)
            }
        );
    },

});

export const { setMyList } = getMyInfoList.actions;

export default getMyInfoList.reducer;