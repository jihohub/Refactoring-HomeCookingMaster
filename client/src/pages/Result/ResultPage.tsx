/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import searchedImageSlice from "../../components/Result/searchedImageSlice";

function ResultPage() {
    const previewUrl = useSelector((state: RootStateOrAny) => state.searchedImageSlice.previewUrl);

    return (
        <div>
            <img src={previewUrl} />
        </div>
    );
}

export default ResultPage;
