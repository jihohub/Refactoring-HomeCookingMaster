/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { line,recipeIntro } from "../../css/result_csst";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import {getList} from "../../redux/searchList"
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import queryString from 'query-string';

function ItemList(location:any){
    console.log('location',location);

    const query = queryString.parse(location.search)
    console.log('query',query)

    const dispatch = useDispatch();
    const searchWord = useSelector((state:RootStateOrAny) => state.searchText.word);

    useEffect(() => {
        dispatch(getList(searchWord))
        console.log('getList 11')
    },[searchWord])


    const resultList = useSelector((state:RootStateOrAny) => state.getSearchList.list)

    return(
        <>
            <div>
                <p css={recipeIntro}>{searchWord ? `${searchWord} 검색결과 입니다.` : "다양한 레시피를 확인해보세요."}</p>
                <hr css={line}/>
            </div>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                p: 5,
                ml: 4,
                flexDirection:'row'
            }}>
                <Grid container spacing={2}>
                    {resultList ? Object.keys(resultList).map((item:any) => (
                            <div>
                                <Button variant="outlined"
                                    sx={{width: 150, fontSize:15, height:60}}
                                >{item}</Button>
                            </div>
                        )
                    ) : ""}
                </Grid>
            </Box>
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