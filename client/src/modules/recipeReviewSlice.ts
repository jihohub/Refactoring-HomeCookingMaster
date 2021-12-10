import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
interface PostState {
    formData: FormData | null;
    loading: boolean;
    error: string;
}

const initialState: PostState = {
    formData: null,
    loading: false,
    error: "",
};

/* 레시피 데이터 요청 */
export const recipeReview = createAsyncThunk(
    "RECIPE_REVIEW",
    async (args: any) => {
        /* 백엔드 [GET] /recipe/<recipe_id> 요청 */
        const response = await axios.post(`/api/recipe/${args.recipe_id}/post`, args.formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    }
);

export const recipeReviewSlice = createSlice({
    name: "recipeReviewSlice",
    initialState,
    reducers: {
        clearPost(state) {
            state.formData = null;
            state.loading = false;
            state.error = "";
        },
    },
});

export const { clearPost } = recipeReviewSlice.actions;
export default recipeReviewSlice.reducer;
