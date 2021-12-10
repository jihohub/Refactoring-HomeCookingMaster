import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

    return response.data;
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
