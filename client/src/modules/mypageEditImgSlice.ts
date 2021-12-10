import axios, { AxiosResponse } from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConnectingAirportsOutlined } from "@mui/icons-material";

interface EditImgState {
    img: string | null;
    loading: boolean;
    error: string;
}

const initialState: EditImgState = {
    img: null,
    loading: false,
    error: "",
};

/* 레시피 좋아요 */
export const editImg = createAsyncThunk("EDIT_IMAGE", async (formData: any) => {
    /* 백엔드 [POST] /api/mypage/editimg 요청 */
    const response = await axios.post("/api/mypage/editimg", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    console.log(response);

    return response.data.data.img;
});

export const myPageEditImgSlice = createSlice({
    name: "myPageEditImgSlice",
    initialState,
    reducers: {
        clearEdit(state) {
            state.img = null;
            state.loading = false;
            state.error = "";
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            editImg.rejected,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            }
        );

        builder.addCase(
            editImg.pending,
            (state, action: PayloadAction<any>) => {
                state.loading = true;
                state.error = "";
            }
        );

        builder.addCase(
            editImg.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.img = action.payload.img;
            }
        );
    },
});

export const { clearEdit } = myPageEditImgSlice.actions;
export default myPageEditImgSlice.reducer;
