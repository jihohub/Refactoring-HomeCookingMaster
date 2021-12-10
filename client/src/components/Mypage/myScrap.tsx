/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import { useSelector, RootStateOrAny } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function MyScrap(){
    const navigate = useNavigate();

    const [isScrapList, setIsScrapList] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const scarpList = useSelector((state:RootStateOrAny) => state.getMyInfoList.list)

    useEffect(() => {
        if (Array.isArray(scarpList) && scarpList.length === 0) {
        } else if (!scarpList) {
        } else {
            setIsScrapList(true);
            if (Array.isArray(scarpList.data.liked_recipe) && scarpList.data.liked_recipe.length === 0){
            } else {
                setIsEmpty(true)
            }
        }
    },[scarpList])

    return(
        <>
            {/* {isScrapList ? 
                <ImageList 
                    sx={{ 
                        width: '100%', 
                        height: 450, 
                        display: 'flex',
                        marginLeft:'25%',
                        flexDirection:'column',
                        mt:8,
                    }}>
                    <ImageListItem key="Subheader" cols={2}>
                        <ListSubheader component="div"  sx={{ width:'40rem', backgroundColor:'#897A5F', color:'white' }}>
                            스크랩레시피
                        </ListSubheader>
                        {isEmpty ? "" : 
                            <Typography 
                                variant="subtitle1" 
                                gutterBottom component="div" 
                                sx={{ fontWeight : '600'}}
                            >
                                원하는 레시피를 스크랩해보세요!
                            </Typography>
                        }
                    </ImageListItem>
                    {scarpList.data.liked_recipe.map((item : any) => (
                        <ImageListItem 
                            sx={{width:'15rem', height:'10rem', cursor:'pointer'}}
                            onClick={() => navigate(`/recipe/${item.recipe_id}`)}>
                            <img
                                src={`${item.recipe_img}?w=248&fit=crop&auto=format`}
                                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.recipe_name}
                                style={{width:'100%', height:'15rem'}}
                            />
                            <ImageListItemBar
                                title={item.recipe_name}
                                // subtitle={item.author}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            : ""} */}

{isScrapList ?
            <ImageList 
                sx={{ 
                width: '100%', 
                // height: 400, 
                // justifyContent: 'center', 
                marginLeft:'15%',
                mt:8,
            }}>
            <ImageListItem key="Subheader" cols={3}>
            <ListSubheader sx={{  width:'70%', backgroundColor:'#897A5F', color:'white'}} component="div">스크랩레시피</ListSubheader>
            {isEmpty ? "" : 
                <Typography 
                    variant="subtitle1" 
                    gutterBottom component="div" 
                    sx={{ fontWeight : '600'}}
                >
                    원하는 레시피를 스크랩해보세요!
                </Typography>
            }
            </ImageListItem>
            <ImageList  key="Subheader" cols={3} style={{marginBottom:'10rem',width:'140%'}} >
                {scarpList.data.liked_recipe.map((item:any) => (
                <ImageListItem key={item.recipe_img} sx={{width:'100'}} css={tmp}>
                    <img
                    src={`${item.recipe_img}?w=248&fit=crop&auto=format`}
                    srcSet={`${item.recipe_img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.recipe_id}
                    loading="lazy"
                    onClick={() => navigate(`/recipe/${item.recipe_id}`)}
                    css={img}

                    />
                    <ImageListItemBar
                    title={item.recipe_name}
                    />
                </ImageListItem>
                ))}
            </ImageList>
            </ImageList> : ""}
        </>
    )
}

export default MyScrap;

const img = css`
    width:100%;
    height:15rem;
    cursor: pointer;
    /* box-shadow: 2px 2px 6px gray; */
`;

const tmp = css`
    cursor: pointer;
    /* box-shadow: 2px 2px 6px gray; */
    :hover{
        transform: scale(1.1);
        transition:.5s;
    }
`;

