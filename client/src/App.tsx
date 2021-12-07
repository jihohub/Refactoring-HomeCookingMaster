/** @jsxImportSource @emotion/react */

import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import Router from "./Router";
import recipeSlice from "./modules/recipeSlice";
import recipeReviewSlice from "./modules/recipeReviewSlice";
import recipeLikeSlice from "./modules/recipeLikeSlice";
import rankingSlice from "./modules/rankingSlice";
import searchedImageSlice from "./components/Result/searchedImageSlice";
import searchText from "./modules/search";
import getSearchList from "./modules/searchList";
import getUserInfo from "./modules/userLogin";
import getMyInfoList from "./modules/myInfo";
import getNewAccessList from './modules/newToken'
import "./App.css";

function App() {
    const rootReducer = combineReducers({
        recipeSlice: recipeSlice,
        recipeReviewSlice: recipeReviewSlice,
        recipeLikeSlice: recipeLikeSlice,
        rankingSlice: rankingSlice,
        searchedImageSlice: searchedImageSlice,
        searchText: searchText,
        getSearchList: getSearchList,
        getUserInfo: getUserInfo,
        getMyInfoList : getMyInfoList,
        getNewAccessList:getNewAccessList
    });

    const store = configureStore({
        reducer: rootReducer
    });

    return (
        <Provider store={store}>
            <div>
                <Router />
            </div>
        </Provider>
    );
}

export default App;
