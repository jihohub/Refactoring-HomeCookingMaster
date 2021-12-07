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
export const recipeLike = createAsyncThunk("RECIPE_LIKE", async (id: number) => {
    /* 백엔드 [POST] /recipe/<recipe_id>/like 요청 */
    const response = await axios.post(`/api/recipe/${id}/like`, {
        user_id: 2
    });

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
    // extraReducers: (builder) => {
    //     builder.addCase(
    //         postReview.rejected,
    //         (state, action: PayloadAction<any>) => {
    //             state.loading = false;
    //             state.error = action.payload;
    //         }
    //     );

    //     builder.addCase(
    //         postReview.pending,
    //         (state, action: PayloadAction<any>) => {
    //             state.loading = true;
    //             state.error = "";
    //         }
    //     );

    //     builder.addCase(
    //         postReview.fulfilled,
    //         (state, action: PayloadAction<any>) => {
    //             state.formData = action.payload;
    //         }
    //     );
    // },
});

export const { clearLike } = recipeLikeSlice.actions;
export default recipeLikeSlice.reducer;
