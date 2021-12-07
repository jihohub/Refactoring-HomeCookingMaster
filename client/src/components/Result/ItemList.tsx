/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { line,recipeIntro, foodName } from "../../css/result_csst";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import {getList} from "../../redux/searchList"
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import queryString from 'query-string';
import { useLocation, useNavigate } from 'react-router';

function ItemList(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 쿼리 스트링
    const location = useLocation();
    console.log('<itemList> : location : ',location);
    const query = queryString.parse(location.search)['data']
    console.log('<itemList> : query data : ',query)

    useEffect(() => {
        if(query){
            console.log('<itemList> queryData : before dispatch')
            dispatch(getList(query))
            console.log('<itemList> queryData : after dispatch')
        }else{
            console.log('<itemList> null : before dispatch')
            dispatch(getList(""))
            console.log('<itemList> null : before dispatch')
        }
    },[query])

    const resultList = useSelector((state:RootStateOrAny) => state.getSearchList.list)
    console.log('<itemList> : resultList : ', resultList)

    // 검색결과 수 확인(1개일 때만 레시피 출력)
    // const [recipeList, setRecipeList] = useState<[]>([]);
    // useEffect(() => {
    //     const foodNumbers = Object.keys(resultList).length;
    //     if(foodNumbers === 1){
    //         const tmp: any[] = Object.values(recipeList)
    //         console.log('tmp', tmp)
    //         setRecipeList(tmp[0])
    //     }
    // },[resultList])
    // console.log('recipeList', recipeList)

    return(
        <>
            <div>
                <p css={recipeIntro}>{query ? `${query} 검색결과 입니다.` : "다양한 레시피를 확인해보세요."}</p>
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
                            <div key={item}>
                                <Button variant="outlined"
                                    sx={{width: 150, fontSize:15, height:60}}
                                    onClick={() => navigate(`/result?data=${item}`)}
                                >{item}</Button>
                            </div>
                        )
                    ) : ""}
                    {/* {recipeList ? recipeList.map((item:any) => (
                        console.log(item)
                    )) : ""} */}
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