import axios, { AxiosResponse } from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RecipeState {
    food_info: {
        category_l: string;
        category_m: string;
        category_s: string;
        id: number;
        name: string;
    };
    post_info: {};
    recipe_info: {
        cooking_time: string;
        difficulty: string;
        food_id: number;
        id: number;
        img: string;
        likes: number;
        name: string;
        servings: string;
        views: number;
    };
    loading: boolean;
    error: string;
}

const initialState: RecipeState = {
    food_info: {
        category_l: "",
        category_m: "",
        category_s: "",
        id: 0,
        name: ""
    },
    post_info: {},
    recipe_info: {
        cooking_time: "",
        difficulty: "",
        food_id: 0,
        id: 0,
        img: "",
        likes: 0,
        name: "",
        servings: "",
        views: 0
    },
    loading: false,
    error: "",
};

/* 레시피 데이터 요청 */
export const getRecipe = createAsyncThunk(
    "GET_RECIPE",
    async (recipe_id: number, ThunkAPI) => {
        /* 백엔드 [GET] /recipe/<recipe_id> 요청 */
        let response = await axios.get(`/api/recipe/${recipe_id}`);
        console.log("res", response.data.result);
        return response.data.result;
    }
);

export const recipeSlice = createSlice({
    name: "recipeSlice",
    initialState,
    reducers: {
        clearRecipe(state) {
            state.food_info = {
                category_l: "",
                category_m: "",
                category_s: "",
                id: 0,
                name: ""
            };
            state.post_info = {

            };
            state.recipe_info = {
                cooking_time: "",
                difficulty: "",
                food_id: 0,
                id: 0,
                img: "",
                likes: 0,
                name: "",
                servings: "",
                views: 0
            };
            state.loading = false;
            state.error = "";
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getRecipe.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(getRecipe.pending, (state, action: PayloadAction<any>) => {
            state.loading = true;
            state.error = "";
        });

        builder.addCase(getRecipe.fulfilled, (state, action: PayloadAction<any>) => {
            state.food_info = action.payload.food_info;
            state.post_info = action.payload.post_info;
            state.recipe_info = action.payload.recipe_info;
        });
    },
});

export const { clearRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
