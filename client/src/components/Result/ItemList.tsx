/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import {getList} from "../../modules/searchList"
import queryString from 'query-string';
import { useLocation, useNavigate } from 'react-router';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Typography from '@mui/material/Typography';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

function ItemList(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 쿼리 스트링
    const location = useLocation();
    // console.log('<itemList> : location : ',location);
    const query = queryString.parse(location.search)['data']
    // console.log('<itemList> : query data : ',query)


    // const ranlist:Number = []
    // const randomList = () => {
    //     for(let i=0;i<10;i++){
    //         const randNum = Math.floor(Math.random()*(400-1+1)) + 1;
    //         ranlist.push(randNum)
    //     }
    //     console.log('randomList',ranlist)
    //     return ranlist;
    // }
    
    // randomList();

    useEffect(() => {
        if(query){
            // console.log('<itemList> queryData : before dispatch')
            dispatch(getList(query))
            // console.log('<itemList> queryData : after dispatch')
        }else{
            // console.log('<itemList> null : before dispatch')
            dispatch(getList(""))
            // console.log('<itemList> null : before dispatch')
        }
    },[query])

    const resultList = useSelector((state:RootStateOrAny) => state.getSearchList.list)
    console.log('<itemList> : resultList : ', resultList)

    // 검색결과 수 확인용(1 or not)
    const [isRecipeList, setIsReciptList] = useState(true);

    // 검색 결과 1 -> 레시피 출력
    const [recipeList, setRecipeList] = useState<any[]>([]);
    useEffect(() => {
        const foodNumbers = Object.keys(resultList).length;
        if(foodNumbers === 1){
            const tmp: any[] = Object.values(resultList)
            setRecipeList(tmp[0])
            setIsReciptList(false);
        }else{
            setRecipeList([])
            setIsReciptList(true);
        }
    },[resultList])

    return(
        <div >
            <Typography 
                variant="h6" 
                gutterBottom component="div" 
                sx={{ fontWeight : '600', ml:23, mt:5, mb:5}}
            >
                {query ? `${query} 검색결과 입니다.` : "다양한 레시피를 확인해보세요."}
            </Typography>
            {/* <hr css={line}/> */}
            <Grid container spacing={2} columns={16} style={{marginLeft:'10%'}}>
            {isRecipeList ? Object.keys(resultList).map((item:any) => (
                    // <p key={item} style={{width:'100px', display:'inline'}}>
                    <Grid item xs={4} md={4} key={item} >
                        <Typography variant="h6" 
                            gutterBottom component="span" 
                            sx={{fontSize:20, height:60}}
                            onClick={() => navigate(`/result?data=${item}`)}
                        >{item}</Typography>
                    </Grid>
                    // </p>
                )
            ) : ""}
            </Grid>
            <ImageList sx={{ 
                    width: '80%', 
                    height: '100%',
                    marginLeft:'10%'}}>
                {recipeList ? recipeList.map((item:any) => (
                    <ImageListItem key={item.id}>
                        <img
                            src={item.img}
                            srcSet={item.img}
                            alt={item.id}
                            loading="lazy"
                            onClick={() => navigate(`/recipe/${item.id}`)}
                        />
                    <ImageListItemBar
                        title={item.name}
                        subtitle={
                            <span>스크랩수 {item.likes}, 조회수 {item.views}</span>
                        }
                        position="below"
                    />
                    </ImageListItem>
                )) : ""}
            </ImageList>
        </div>
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