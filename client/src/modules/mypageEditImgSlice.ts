import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
interface EditImgState {
    formData: FormData | null;
    loading: boolean;
    error: string;
}

const initialState: EditImgState = {
    formData: null,
    loading: false,
    error: "",
};

/* 레시피 좋아요 */
export const editImg = createAsyncThunk("EDIT_IMAGE", async (formData: any) => {
    /* 백엔드 [POST] /api/mypage/editimg 요청 */
    const response = await axios.post("/api/mypage/editimg", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    sessionStorage.setItem("img", response.data.data.img);

    return response.data;
});

export const myPageEditImgSlice = createSlice({
    name: "myPageEditImgSlice",
    initialState,
    reducers: {
        clearEdit(state) {
            state.formData = null;
            state.loading = false;
            state.error = "";
        },
    },
});

export const { clearEdit } = myPageEditImgSlice.actions;
export default myPageEditImgSlice.reducer;
