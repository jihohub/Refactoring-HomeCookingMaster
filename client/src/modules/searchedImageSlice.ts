import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SliceState = {
    imageFile: String | null,
    previewUrl: String | null
};

const initialState: SliceState = {
    imageFile: "",
    previewUrl: "",
};

export const searchedImageSlice = createSlice({
    name: "searchedImageSlice",
    initialState,
    reducers: {
        setImageFile: (state, action: PayloadAction<String>) => {
        state.imageFile = action.payload;
        },
        setPreviewUrl: (state, action: PayloadAction<String | null>) => {
        state.previewUrl = action.payload;
        },
    },
});

export const { setImageFile, setPreviewUrl } = searchedImageSlice.actions;
export default searchedImageSlice.reducer;
