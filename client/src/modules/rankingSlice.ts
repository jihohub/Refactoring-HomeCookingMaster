import axios, { AxiosResponse } from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RankingState {
    ranking: [];
    loading: boolean;
    error: string;
}

const initialState: RankingState = {
    ranking: [],
    loading: false,
    error: "",
};

/* 레시피 데이터 요청 */
export const getRanking = createAsyncThunk(
    "GET_RANKING",
    async (ThunkAPI) => {
        /* 백엔드 [GET] /recipe/<recipe_id> 요청 */
        let response = await axios.get(`/api/main/ranking`);
        console.log("res", response.data.result);
        return response.data.result;
    }
);

export const rankingSlice = createSlice({
    name: "rankingSlice",
    initialState,
    reducers: {
        clearRanking(state) {
            state.ranking = [];
            state.loading = false;
            state.error = "";
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            getRanking.rejected,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            }
        );

        builder.addCase(
            getRanking.pending,
            (state, action: PayloadAction<any>) => {
                state.loading = true;
                state.error = "";
            }
        );

        builder.addCase(
            getRanking.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.ranking = action.payload;
            }
        );
    },
});

export const { clearRanking } = rankingSlice.actions;
export default rankingSlice.reducer;
