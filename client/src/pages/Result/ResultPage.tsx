/** @jsxImportSource @emotion/react */
import { TextSearchBar } from "../../components/Result/TextSearchBar";
import ItemList from "../../components/Result/ItemList";
import { Outlet } from "react-router";
import ImageResult from "../../components/Result/imageResult";


function ResultPage() {
    
    return (
        <div style={{marginTop:'10%', paddingBottom:'7rem', backgroundColor:'#fbfbf9', paddingTop:'5%', width:'80%', margin: '10%', marginBottom:'17rem' }}>
            <TextSearchBar/>
            <ImageResult/>
            <ItemList />
            <Outlet />
        </div>
    );
}

export default ResultPage;
