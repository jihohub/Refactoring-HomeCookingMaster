import axios, { AxiosResponse } from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConnectingAirportsOutlined } from "@mui/icons-material";

interface LikeState {
    loading: boolean;
    error: string;
}

const initialState: LikeState = {
    loading: false,
    error: "",
};

/* 레시피 좋아요 */
export const recipeLike = createAsyncThunk(
    "RECIPE_LIKE",
    async (args: any) => {
    /* 백엔드 [POST] /recipe/<recipe_id>/like 요청 */
        const response = await axios.post(
            `/api/recipe/${args.recipe_id}/like`, {
                user_id: `${args.user_id}`
            }
        );

    return null;
});

export const recipeLikeSlice = createSlice({
    name: "recipeLikeSlice",
    initialState,
    reducers: {
        clearLike(state) {
            state.loading = false;
            state.error = "";
        },
    },
});

export const { clearLike } = recipeLikeSlice.actions;
export default recipeLikeSlice.reducer;
