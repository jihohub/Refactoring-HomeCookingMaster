import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
interface ImageState {
    formData: FormData | null;
    loading: boolean;
    error: string;
}

const initialState: ImageState = {
    formData: null,
    loading: false,
    error: "",
};

/* 레시피 데이터 요청 */
export const postImage = createAsyncThunk("POST_IMAGE", async (args: any, ThunkAPI: any) => {
        const { searchImageSlice } = ThunkAPI.getState();
        // console.log("args", args);
        const response = await axios.post(
            `/api/recipe/${args}/post`,
            searchImageSlice.formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response;
    }
);

export const searchImageSlice = createSlice({
    name: "searchImageSlice",
    initialState,
    reducers: {
        clearImage(state) {
            state.formData = null;
            state.loading = false;
            state.error = "";
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            postImage.rejected,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            }
        );

        builder.addCase(
            postImage.pending,
            (state, action: PayloadAction<any>) => {
                state.loading = true;
                state.error = "";
            }
        );

        builder.addCase(
            postImage.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.formData = action.payload.formData;
            }
        );
    },
});

export const { clearImage } = searchImageSlice.actions;
export default searchImageSlice.reducer;
