import { useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { setHideTrue, setHideFalse } from "../../modules/hideHeaderSlice";

export default function HideNavBar() {
    const dispatch = useDispatch();
    const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });

    if (window.innerWidth < 768) {
        if ('ontouchstart' in document.documentElement) {
            ontouchstart = (e) => {
                setTouchPosition(
                    {
                        x: e.changedTouches[0].pageX,
                        y: e.changedTouches[0].pageY
                    }
                )
                
                const touchEnd = (e: any) => {
                    const distanceY = touchPosition.y - e.changedTouches[0].pageY;

                    if (distanceY > 0) {
                        dispatch(setHideTrue(true));
                        console.log("down");
                    } else if (distanceY < 0) {
                        dispatch(setHideFalse(false));
                        console.log("up");
                    }
                }

                ontouchend = touchEnd;
            }
        }
    }

    return null;
}

