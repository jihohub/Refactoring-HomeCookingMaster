/** @jsxImportSource @emotion/react */
import { TextSearchBar } from "../../components/Result/TextSearchBar";
import ItemList from "../../components/Result/ItemList";


function ResultPage() {

    return (
        <div>
            <TextSearchBar/>
            <ItemList />
        </div>
    );
}

export default ResultPage;
