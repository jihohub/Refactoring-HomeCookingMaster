import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const name = 'searchByImg';

type stateType = {
    list : [],
}

const initialState : stateType = {
    list : [],
}

export const getImgResult = createAsyncThunk("POST_IMGRESULT", async (formData: any) => {
    console.log('<search by image> : ',formData)
    try{
        const response = await axios.post("/api/main/search/img", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log('<search by image> : ',response.data)
        return response.data.data;
    }catch(e){
        return false
    }
})

export const getResultByImg = createSlice({
    name,
    initialState,
    reducers: {
        setImgResult(state) {
            state.list = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            getImgResult.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.list = action.payload;
                console.log('<search by image> : state.list ',state.list)
            }
        );
    },
});

export const { setImgResult } = getResultByImg.actions;
export default getResultByImg.reducer;



// interface ImageState {
//     formData: FormData | null;
//     loading: boolean;
//     error: string;
// }

// const initialState: ImageState = {
//     formData: null,
//     loading: false,
//     error: "",
// };

// /* 레시피 데이터 요청 */
// export const searchByImage = createAsyncThunk(
//     "SEARCH_BY_IMAGE",    
//     async (formData: any, ThunkAPI: any) => {
//         /* 백엔드 [GET] /recipe/<recipe_id> 요청 */
//         console.log("args", formData);
//         const response = await axios.post(
//             "/api/serach/img", formData,
//             {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                 },
//             }
//         );
        
//         return response;
//     }
// );

// export const searchByImageSlice = createSlice({
//     name: "searchByImageSlice",
//     initialState,
//     reducers: {
//         clearImage(state) {
//             state.formData = null;
//             state.loading = false;
//             state.error = "";
//         },
//     },
//     // extraReducers: (builder) => {
//     //     builder.addCase(
//     //         postImage.rejected,
//     //         (state, action: PayloadAction<any>) => {
//     //             state.loading = false;
//     //             state.error = action.payload;
//     //         }
//     //     );

//     //     builder.addCase(
//     //         postImage.pending,
//     //         (state, action: PayloadAction<any>) => {
//     //             state.loading = true;
//     //             state.error = "";
//     //         }
//     //     );

//     //     builder.addCase(
//     //         postImage.fulfilled,
//     //         (state, action: PayloadAction<any>) => {
//     //             state.formData = action.payload.formData;
//     //         }
//     //     );
//     // },
// });

// export const { clearImage } = searchByImageSlice.actions;
// export default searchByImageSlice.reducer;
