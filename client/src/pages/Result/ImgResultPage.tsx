/** @jsxImportSource @emotion/react */
import { TextSearchBar } from "../../components/Result/TextSearchBar";
import ItemList from "../../components/Result/ItemList";
import { Outlet } from "react-router";
import ImageResult from "../../components/Result/imageResult";


function ImgResultPage() {
    
    return (
        <div style={{marginTop:'12rem', paddingBottom:'7rem'}}>
            <ImageResult/>
            <TextSearchBar/>
            <ItemList />
            <Outlet />
        </div>
    );
}

export default ImgResultPage;
