import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";

import Header from "./components/Common/Header";
import MainPage from "./pages/Main/MainPage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import AboutPage from "./pages/About/AboutPage";
import DictionaryPage from "./pages/Dictionary/DictionaryPage";
import ResultPage from "./pages/Result/ResultPage";
import SuggestionPage from "./pages/Suggestion/SuggestionPage";
import RecipePage from "./pages/Recipe/RecipePage";
import MyPage from "./pages/Mypage/MyPage";
import ScrollToTop from "./components/Common/ScrollToTop";

function Router() {
    const hide = useSelector((state) => state.hideHeaderSlice.hide);
    
    return (
        <BrowserRouter>
            <ScrollToTop />
            {!hide && <Header />}
            <Routes>
                <Route exact={true} path="/" element={<MainPage />} />
                <Route exact={true} path="/recipe" element={<RecipePage />} />
                <Route exact={true} path="/result" element={<ResultPage />} />
                <Route exact={true} path="/mypage" element={<MyPage />} />
                <Route exact={true} path="/login" element={<LoginPage />} />
                <Route exact={true} path="/register" element={<RegisterPage />} />
                <Route exact={true} path="/suggestion" element={<SuggestionPage />} />
                <Route exact={true} path="/dictionary" element={<DictionaryPage />} />
                <Route exact={true} path="/about" element={<AboutPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
