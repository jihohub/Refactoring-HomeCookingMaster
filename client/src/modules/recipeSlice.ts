import axios, { AxiosResponse } from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
interface RecipeState {
    recipe_info: {
        id: number;
        name: string;
        likes: number;
        views: number;
        img: string;
        servings: string;
        difficulty: string;
        cooking_time: string;
        food_id: number;
    };
    food_info: {
        id: number;
        name: string;
        category_l: string;
        category_m: string;
        category_s: string;
    };
    ingredient_info: Array<{
        id: number;
        name: string;
        amount: string;
        recipe_id: number;
    }>;
    process_info: Array<{
        id: number;
        recipe: string;
        step: number;
        img: string;
        recipe_id: number;
    }>;
    post_info: Array<{
        id: number;
        post: string;
        img: string;
        timestamp: string;
        user_id: number;
        nickname: string;
        recipe_id: number;
    }>;
    loading: boolean;
    error: string;
}

const initialState: RecipeState = {
    recipe_info: {
        id: 0,
        name: "",
        likes: 0,
        views: 0,
        img: "",
        servings: "",
        difficulty: "",
        cooking_time: "",
        food_id: 0
    },
    food_info: {
        id: 0,
        name: "",
        category_l: "",
        category_m: "",
        category_s: ""
    },
    ingredient_info: [],
    process_info: [],
    post_info: [],
    loading: false,
    error: "",
};

/* 레시피 데이터 요청 */
export const getRecipe = createAsyncThunk(
    "GET_RECIPE",
    async (recipe_id: number, ThunkAPI) => {
        /* 백엔드 [GET] /recipe/<recipe_id> 요청 */
        let response = await axios.get(`/api/recipe/${recipe_id}`);
        console.log("잘되나", recipe_id);
        console.log("res", response.data);
        return response.data.data;
    }
);

export const recipeSlice = createSlice({
    name: "recipeSlice",
    initialState,
    reducers: {
        clearRecipe(state) {
            state.recipe_info = {
                id: 0,
                name: "",
                likes: 0,
                views: 0,
                img: "",
                servings: "",
                difficulty: "",
                cooking_time: "",
                food_id: 0
            };
            state.food_info = {
                id: 0,
                name: "",
                category_l: "",
                category_m: "",
                category_s: ""
            };
            state.ingredient_info = [];
            state.process_info = [];
            state.post_info = [];
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
            state.recipe_info = action.payload.recipe_info;
            state.food_info = action.payload.food_info;
            state.ingredient_info = action.payload.ingredient_info;
            state.process_info = action.payload.process_info;
            state.post_info = action.payload.post_info;
        });
    },
});

export const { clearRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
