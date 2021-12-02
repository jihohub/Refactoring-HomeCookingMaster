/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { line,recipeIntro } from "../../css/result_csst";
import { sample } from '../../assets/Sample.js';
import { itemImg,imgList,itemStyle } from "../../css/result_csst";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import {getList} from "../../redux/searchList"

function ItemList(){
    const dispatch = useDispatch();
    const searchWord = useSelector((state:RootStateOrAny) => state.searchText.word);
    const [foodList, setFoodList] = useState([]);
    
    useEffect(() => {
        dispatch(getList(searchWord))
    },[])

    const resultList = useSelector((state:RootStateOrAny) => state.getSearchList.list)
    
    console.log('resultList', resultList)
    
    const onClick = () => {
        // dispatch(getList(searchWord))
        // console.log('검색어',searchWord)
    }
    return(
        <>
            <div>
                <p onClick = {onClick} css={recipeIntro}>{searchWord} 검색결과 입니다.</p>
                <hr css={line}/>
            </div>
            <div css={imgList}>
            {resultList ? Object.keys(resultList).map((item:any) => {
                return(
                    <div css={itemStyle} key={item}>
                        <p>{item}</p>
                    </div>
                )
            }) : ""}
            </div>
        </>
    )
}

export default ItemList;



// import { Pagination } from "@mui/material";
// import PaginationCompo from './pagination';

// // pagination
// const [posts, setPosts] = useState<string[]>([]);
// const [loading, setLoading] = useState<boolean>(false);
// const [currentPage, setCurrentPage] = useState<number>(1);
// const [postsPerPage] = useState<number>(10);

// useEffect(() => {
//     const fetchPosts = async () => {
//         setLoading(true)
//         const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
//         setPosts(res.data);
//         setLoading(false);
//     }
//     fetchPosts();
// },[]);

// // Get current posts
// const indexOfLastPost = currentPage * postsPerPage;
// const indexOfFirstPost = indexOfLastPost - postsPerPage;
// const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

// // chage page
// const paginate = (pageNumber:any) => setCurrentPage(pageNumber)


// {Object.keys(resultList).map((item:any) => {
//     const img = item.img
//     const title = item.name
//     console.log('item', item)
//     return(
//         <div css={itemStyle} key={title}>
//             {/* <img src={img} alt={title} css={itemImg} /> */}
//             <p>{title}</p>
//         </div>
//     )
// })}