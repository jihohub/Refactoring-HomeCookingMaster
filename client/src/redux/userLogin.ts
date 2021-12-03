import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const name = 'getUserInfo';

type stateType = {
    list : [],
    // success : boolean | null
}

const initialState : stateType = {
    list : [],
    // success : null
}

export const getUser = createAsyncThunk("POST_USER", async (userList:{}, ThunkAPI:any) => {
    console.log('<getUser> (사용자가 입력해서 api에 넘긴 email, pw) : ',userList)
    try{
        // const { getUserInfo } = ThunkAPI.getState();
        const response = await axios.post("/api/auth/login", userList)
        console.log('<getUser> : api response : ',response.data.data)
        // getUserInfo.success = true;
        return response.data.data;
    }catch(e){
        return false
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
                console.log('<getUser> : token : ',state.list)
            }
        );
    },

});

export const { setUser } = getUserInfo.actions;

export default getUserInfo.reducer;