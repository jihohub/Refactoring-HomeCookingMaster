import axios, { AxiosResponse } from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginState {
    user_id: number;
    nickname: string;
    img: string;
    loading: boolean;
    error: string;
}

const initialState: LoginState = {
    user_id: 0,
    nickname: "",
    img: "",
    loading: false,
    error: "",
};

/* 레시피 좋아요 */
export const login = createAsyncThunk(
    "LOGIN",
    async (args: any) => {
        /* 백엔드 [POST] /recipe/<recipe_id>/like 요청 */
        const response = await axios.post("/api/auth/login", args);
        console.log(response.data.data);
        return response.data.data;
    }
);

export const loginInfoSlice = createSlice({
    name: "loginInfoSlice",
    initialState,
    reducers: {
        clearLogin(state) {
            state.user_id = 0;
            state.nickname = "";
            state.img = "";
            state.loading = false;
            state.error = "";
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            login.rejected,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            }
        );

        builder.addCase(
            login.pending,
            (state, action: PayloadAction<any>) => {
                state.loading = true;
                state.error = "";
            }
        );

        builder.addCase(
            login.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.user_id = action.payload.user_id;
                state.nickname = action.payload.nickname;
                state.img = action.payload.img;
            }
        );
    },
});

export const { clearLogin } = loginInfoSlice.actions;
export default loginInfoSlice.reducer;
