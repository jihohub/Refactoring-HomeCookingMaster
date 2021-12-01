import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { searchText } from "./search";

const reducer = combineReducers({searchText : searchText.reducer})

export default configureStore({
    reducer,
});