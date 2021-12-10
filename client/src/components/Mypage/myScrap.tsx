/** @jsxImportSource @emotion/react */
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
            {isScrapList ? 
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
            : ""}
        </>
    )
}

export default MyScrap;