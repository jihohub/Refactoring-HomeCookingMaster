/** @jsxImportSource @emotion/react */
import ItemList from "../../components/Result/ItemList";
import { useParams } from "react-router";

function SearchResultPage() {
    const params = useParams();

    return (
        <div>
            <ItemList />
        </div>
    );
}

export default SearchResultPage;
