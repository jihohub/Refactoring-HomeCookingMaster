import { useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { setHideTrue, setHideFalse } from "./hideHeaderSlice";

export default function HideNavBar() {
    const dispatch = useDispatch();
    const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });

    if (window.innerWidth < 768) {
        ontouchstart = (e) => {
            setTouchPosition(
                {
                    x: e.changedTouches[0].pageX,
                    y: e.changedTouches[0].pageY
                }
            )
        }

        const touchEnd = (e: any) => {
            const distanceY = touchPosition.y - e.changedTouches[0].pageY;

            if (distanceY > 0) {
                dispatch(setHideTrue(true));
            } else if (distanceY < 0) {
                dispatch(setHideFalse(false));
            }
        }

        ontouchend = touchEnd;
    }

    return null;
}

