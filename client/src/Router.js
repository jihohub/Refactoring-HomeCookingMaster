import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";

import Header from "./components/Common/Header";
import MainPage from "./pages/Main/MainPage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterCompletePage from "./pages/Register/RegisterPage";
import RegisterUserInfoPage from "./pages/Register/RegisterInfo";
import TermsNConditionsPage from './pages/Register/TermsNConditions'
import AboutPage from "./pages/About/AboutPage";
import ResultPage from "./pages/Result/ResultPage";
import RecipePage from "./pages/Recipe/RecipePage";
import MyPage from "./pages/Mypage/MyPage";
import ScrollToTop from "./components/Common/ScrollToTop";
import HideNavBar from "./components/Common/HideNavBar";

function Router() {
    const hide = useSelector((state) => state.hideHeaderSlice.hide);

    return (
        <BrowserRouter>
            <ScrollToTop />
            <HideNavBar />
            {!hide && <Header />}
            <Routes>
                <Route exact={true} path="/" element={<MainPage />} />
                <Route exact={true} path="/recipe" element={<RecipePage />} />
                <Route exact={true} path="/result" element={<ResultPage />} />
                <Route exact={true} path="/mypage" element={<MyPage />} />
                <Route exact={true} path="/login" element={<LoginPage />} />
                <Route exact={true} path="/register/termsNConditions" element={<TermsNConditionsPage />} />
                <Route exact={true} path="/register/userInfo" element={<RegisterUserInfoPage />} />
                <Route exact={true} path="/register/complete" element={<RegisterCompletePage />} />
                <Route exact={true} path="/about" element={<AboutPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
