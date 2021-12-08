import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const name = 'getUserInfo';

type UserInfo = {
    access_token: string | null;
    refresh_token: string | null;
    user_id: number | null;
    nickname: string;
    img: string;
    loading: boolean;
    error: string;
};

const initialState: UserInfo = {
    access_token: null,
    refresh_token: null,
    user_id: null,
    nickname: "",
    img: "",
    loading: false,
    error: "",
};

export const getUser = createAsyncThunk(
    "POST_USER",
    async (userList: any) => {
        /* 백엔드 [POST] /api/auth/login 요청 */
        const response = await axios.post("/api/auth/login", userList)
        return response.data.data;
})

export const getUserInfo = createSlice({
    name,
    initialState,
    reducers: {
        setUser(state) {
            state.access_token = null;
            state.refresh_token = null;
            state.user_id = null;
            state.nickname = "";
            state.img = "";
            state.loading = false;
            state.error = "";
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            getUser.rejected,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            }
        );

        builder.addCase(
            getUser.pending,
            (state, action: PayloadAction<any>) => {
                state.loading = true;
                state.error = "";
            }
        );

        builder.addCase(
            getUser.fulfilled,
            (state, action: PayloadAction<any>) => {
                console.log("action.payload", action.payload);
                state.access_token = action.payload.access_token;
                state.refresh_token = action.payload.refresh_token;
                state.user_id = action.payload.user_id;
                state.nickname = action.payload.nickname;
                state.img = action.payload.img;
            }
        );
    },
});

export const { setUser } = getUserInfo.actions;

export default getUserInfo.reducer;