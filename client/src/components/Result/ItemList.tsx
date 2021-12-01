/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { line,recipeIntro } from "../../css/result_csst";
import { sample } from '../../assets/Sample.js';
import { itemImg,imgList,itemStyle } from "../../css/result_csst";
import { useDispatch, useSelector } from "react-redux";
import {getList} from '../../redux/search';

function ItemList(){
    const dispatch = useDispatch();
    const foodList = useSelector((state) => state.searchText);
    
    useEffect(() => {
        // dispatch(getList(""));
        console.log(dispatch(getList("")))
    },[])

    const onClick = () => {
        console.log(foodList)
    }
    return(
        <>
            <div>
                <p onClick = {onClick} css={recipeIntro}>다양한 레시피를 확인해보세요!</p>
                <hr css={line}/>
            </div>
            <div css={imgList}>
            {sample.map(item => {
                const img = item.img
                const title = item.name
                return(
                    <div css={itemStyle} key={title}>
                        <img src={img} alt={title} css={itemImg} />
                        <p>{title}</p>
                    </div>
                )
            })}
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