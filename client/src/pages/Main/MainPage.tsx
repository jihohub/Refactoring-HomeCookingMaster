/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { setHideTrue, setHideFalse } from "../../components/Common/hideHeaderSlice";
import background from "../../assets/main.jpg";

const mainWrapperStyle = css`
    .scroll-container {
        height: 100vh;
        scroll-snap-type: y mandatory;
        overflow-y: scroll;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }

    .scroll-container::-webkit-scrollbar {
        width: 0;
        background-color: transparent;
    }

    .page-section {
        scroll-snap-align: start;
        height: 100vh;
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

function MainPage() {
    const dispatch = useDispatch();
    const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });

    onwheel = (e) => {
        if (e.deltaY > 0) {
            dispatch(setHideTrue(true));
        } else if (e.deltaY < 0) {
            dispatch(setHideFalse(false));
        }
    }

    if (window.innerWidth < 768) {
        ontouchstart = (e) => {
            setTouchPosition(
                {
                    x: e.changedTouches[0].pageX,
                    y: e.changedTouches[0].pageY
                }
            )
            console.log("1", e.changedTouches[0].pageY);
            ontouchend = touchEnd;
        }

        const touchEnd = (e: any) => {
            const distanceY = touchPosition.y - e.changedTouches[0].pageY;
            console.log("2", touchPosition.y);
            console.log("3", e.changedTouches[0].pageY);
            if (distanceY > 0) {
                dispatch(setHideTrue(true));
            } else if (distanceY < 0) {
                dispatch(setHideFalse(false));
            }
        }
    }

    return (
        <div css={mainWrapperStyle}>
            <div className="scroll-container">
                <div id="sec1" className="page-section">
                    {/* <img src={background} alt="ef" /> */}
                    1
                </div>
                <div id="sec2" className="page-section">
                    2
                </div>
                <div id="sec3" className="page-section">
                    3
                </div>
                <div id="sec4" className="page-section">
                    4
                </div>
                <div id="sec5" className="page-section">
                    5
                </div>
                <div id="sec6" className="page-section">
                    6
                </div>
            </div>
        </div>
    );
}

export default MainPage;
