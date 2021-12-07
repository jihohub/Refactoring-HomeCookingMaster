import axios, { AxiosResponse } from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConnectingAirportsOutlined } from "@mui/icons-material";

interface LikeState {
    formData: FormData | null;
    loading: boolean;
    error: string;
}

const initialState: LikeState = {
    formData: null,
    loading: false,
    error: "",
};

/* 레시피 데이터 요청 */
export const recipeLike = createAsyncThunk("RECIPE_LIKE", async (args: any) => {
    /* 백엔드 [GET] /recipe/<recipe_id> 요청 */
    const response = await axios.post(
        `/api/recipe/${args.id}/like`,
        args.formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return null;
});

export const recipeLikeSlice = createSlice({
    name: "recipeLikeSlice",
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

export const { clearPost } = recipeLikeSlice.actions;
export default recipeLikeSlice.reducer;
