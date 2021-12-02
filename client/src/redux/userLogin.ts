import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const name = 'getUserInfo';

type stateType = {
    list : [],
}

const initialState : stateType = {
    list : [],
}

export const getUser = createAsyncThunk("POST_USER", async (userList:{}) => {
    console.log('userLiset',userList)
    try{
        const response = await axios.post("/api/auth/login", userList)
        console.log('getUser',response.data.data)
        return response.data.data;
    }catch(e){
        return "Fail"
    }
})

export const getUserInfo = createSlice({
    name,
    initialState,
    reducers: {
        setUser(state) {
            state.list = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            getUser.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.list = action.payload;
                console.log('list',state.list)
            }
        );
    },

});

export const { setUser } = getUserInfo.actions;

export default getUserInfo.reducer;