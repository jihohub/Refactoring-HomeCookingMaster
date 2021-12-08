/** @jsxImportSource @emotion/react */
import { TextSearchBar } from "../../components/Result/TextSearchBar";
import ItemList from "../../components/Result/ItemList";
import { Outlet } from "react-router";


function ImgResultPage() {
    

    return (
        <div style={{marginTop:'12rem', paddingBottom:'7rem'}}>
            <TextSearchBar/>
            <ItemList />

            <Outlet />
        </div>
    );
}

export default ImgResultPage;
