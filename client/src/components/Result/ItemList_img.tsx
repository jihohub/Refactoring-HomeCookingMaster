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
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { MdPersonSearch } from "react-icons/md";

function ItemList(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 쿼리 스트링
    const location = useLocation();
    // console.log('<itemList> : location : ',location);
    const query = queryString.parse(location.search)['data']
    // console.log('<itemList> : query data : ',query)

    useEffect(() => {
        if(query){
            // console.log('<itemList> queryData : before dispatch')
            dispatch(getList(query))
            // console.log('<itemList> queryData : after dispatch')
        }
        else{
            // console.log('<itemList> null : before dispatch')
            dispatch(getList(""))
            // console.log('<itemList> null : after dispatch')
        }
    },[query])

    const resultList = useSelector((state:RootStateOrAny) => state.getSearchList.list)
    // console.log('<itemList> : resultList : ', resultList)

    // 음식명 랜덤으로 뽑기
    const randomProperty = function (obj:any) {
        const keys = Object.keys(obj);
        return keys[keys.length * Math.random() << 0];
    };

    const tmpList : string[] = [];
    const randomList = function(){
        for(let i=0;i<10;i++){
            const ran = randomProperty(resultList)
            tmpList.push(ran);
        }
    }
    randomList();

    // 검색결과 수 확인용(1 or not)
    const [isRecipeList, setIsReciptList] = useState(true);

    // 검색 결과 1 -> 레시피 출력
    const [recipeList, setRecipeList] = useState<any[]>([]);
    // 검색결과 > 1 -> 음식명 리스트
    const [foodList, setFoodList] = useState<any[]>([]);
    
    useEffect(() => {
        const foodNumbers = Object.keys(resultList).length;
        if(foodNumbers === 1){
            const tmp: any[] = Object.values(resultList)
            setRecipeList(tmp[0])
            setIsReciptList(false);
        }else if(foodNumbers > 200){
            setFoodList(tmpList);
            setRecipeList([])
            setIsReciptList(true);
        }else{
            setFoodList(Object.keys(resultList))
            setRecipeList([])
            setIsReciptList(true);
        }
    },[resultList])


    return(
        <>
            <Typography 
                variant="h6" 
                gutterBottom component="div" 
                sx={{ fontWeight : '600', ml:'15%', mt:5, mb:5, fontFamily:'EliceBold'}}
            >
                {query ? `${query} 검색결과 입니다.` : <p><MdPersonSearch size='30'/> 추천검색어</p>}
            </Typography>
            <Box component="div" sx={{width:'80%', marginLeft:'12%'}}>
            {isRecipeList ? foodList.map((item:any) => (
                    <ItemBox 
                        variant="outlined" 
                        onClick={() => navigate(`/result?data=${item}`)}>
                        {item}
                    </ItemBox>
                )
            ) : ""}
            </Box>

            <ImageList 
                cols={3}
                gap={20}
                sx={{width:'90%', height:'130%', display: 'flex',
                flexWrap: 'wrap', paddingLeft:'15%'}}
            >
                {recipeList ? recipeList.map((item:any) => (
                    <ImageListItem key={item.id} sx={{width:'30%', height:'30%'}}>
                        <img
                            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.id}
                            onClick={() => navigate(`/recipe/${item.id}`)}
                            style={{width:'100%', height:'17rem'}}
                        />
                        <ImageListItemBar 
                            title={item.name}
                            subtitle={
                                <span>스크랩수 {item.likes}, 조회수 {item.views}</span>
                            }
                            position="below"
                            sx={{fontFamily:'Elice'}}
                        />
                    </ImageListItem>
                )) : ""}
            </ImageList>
        </>
    )
}

export default ItemList;


// 검색어 틀
const ItemBox = styled(Button)({
    borderRadius:'30px',
    backgroundColor: 'white',
    borderColor: '#897A5F',
    color:'#897A5F',
    width: 150,
    height: 50,
    margin: 5,
    marginBottom:10,
    '&:hover': {
        backgroundColor: '#c7b595',
        borderColor: '#c7b595',
        color: 'white',
    },
});




            // {/* <Grid container spacing={2} columns={16} style={{marginLeft:'10%'}}>
            // {isRecipeList ? foodList.map((item:any) => (
            //         // <p key={item} style={{width:'100px', display:'inline'}}>
            //         <Grid item xs={4} md={4} key={item} >
            //             <Typography variant="h6" 
            //                 gutterBottom component="p" 
            //                 sx={{fontSize:20, height:60}}
            //                 onClick={() => navigate(`/result?data=${item}`)}
            //             >
            //                 {item}
            //             </Typography>
            //         </Grid>
            //         // </p>
            //     )
            // ) : ""}

            //  // <Typography variant="h6" 
            //             //     gutterBottom component="p" 
            //             //     sx={{fontSize:20, height:60, width:'20%'}}
            //             //     onClick={() => navigate(`/result?data=${item}`)}
            //             // >
            //                 {item}
            //             // </Typography>
            // </Grid> */}