/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setHideTrue, setHideFalse } from "../../components/Common/hideHeaderSlice";
import { setImageFile, setPreviewUrl } from "../../components/Result/searchedImageSlice";
import background from "../../assets/main.jpg";
import { SearchBar } from "../../components/Common/SearchBar";

import { sample } from "../../assets/Sample";
import { iteratorSymbol } from "immer/dist/internal";

const mainWrapperStyle = css`
    .background-div {
        width: 100%;
        height: 100%;
        background-image: url(${background});
        background-size: cover;
        // position: relative;
    }

    .search-div {
        margin: 0 auto;
        display: block;
        position: relative;
        max-width: 810px;

        .form {
            border-radius: 100px;
        }

        top: 10vh;

        .paper {
            width: 100%;
        }

        .searchButton {
            :hover {
                opacity: 1;
            }
        }
    }

    .scroll-container {
        height: 95vh;
        scroll-snap-type: y mandatory;
        overflow-y: scroll;
        // scrollbar-width: none;
        // -ms-overflow-style: none;

        @media screen and (max-width: 768px) {
            height: 100vh;
        }
    }

    .scroll-container::-webkit-scrollbar {
        // width: 0;
        // background-color: transparent;
    }

    .page-section {
        scroll-snap-align: start;
        height: 100%;
    }

    // .page-section {
    //     position: absolute;
    //     width: 100%;
    //     height: 100%;
    //     top: 0;
    //     left: 0;
    //     overflow: hidden;
    //     transform: translateZ(0);
    //     z-index: 1;
    //     opacity: 0;
    // }

    // .page-section.active {
    //     z-index: 2;
    //     opacity: 1;
    // }
    
    #sec1 {
        background-color: aliceblue;
    }

    #sec2 {
        background-color: lightpink;
    }

    #sec3 {
        background-color: coral;
    }

    #sec4 {
        background-color: aqua;
    }

    #sec5 {
        background-color: red;
    }

    #sec6 {
        background-color: yellow;
    }
`

const MainSearch = () => {
    return (
        <div id="sec1" className="page-section">
            <div className="background-div">
                <div className="search-div">
                    <SearchBar />
                </div>
            </div>
        </div>
    )
}

const MainRanking = () => {
    return (
        <div id="sec2" className="page-section">
            {sample.map((item) => {
                return <img src={item.img} alt="imgrecipe" />
            })}
        </div>
    )
}

const Div3 = () => {
    return (
        <div id="sec3" className="page-section">
            3
        </div>
    )
}

const Div4 = () => {
    return (
        <div id="sec4" className="page-section">
            4
        </div>
    )
}

const Div5 = () => {
    return (
        <div id="sec5" className="page-section">
            5
        </div>
    )
}

const Div6 = () => {
    return (
        <div id="sec6" className="page-section">
            6
        </div>
    )
}

function MainPage() {

    return (
        <div css={mainWrapperStyle}>
            <div className="scroll-container">
                <MainSearch />
                <MainRanking />
                <Div3 />
                <Div4 />
                <Div5 />
                <Div6 />
            </div>
        </div>
    );
}

export default MainPage;
