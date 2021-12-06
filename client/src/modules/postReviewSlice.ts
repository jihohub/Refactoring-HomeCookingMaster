import axios, { AxiosResponse } from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConnectingAirportsOutlined } from "@mui/icons-material";

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
export const postReview = createAsyncThunk(
    "POST_REVIEW",
    async (args: any, ThunkAPI: any) => {
        /* 백엔드 [GET] /recipe/<recipe_id> 요청 */
        const response = await axios.post(`/api/recipe/${args.id}/post`, args.formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return null;
    }
);

export const postReviewSlice = createSlice({
    name: "postReviewSlice",
    initialState,
    reducers: {
        clearPost(state) {
            state.formData = null;
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

export const { clearPost } = postReviewSlice.actions;
export default postReviewSlice.reducer;
