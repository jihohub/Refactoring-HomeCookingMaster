/** @jsxImportSource @emotion/react */
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { useSelector, RootStateOrAny } from 'react-redux';
import { useEffect, useState } from 'react';

function MyScrap(){
    const [isScrapList, setIsScrapList] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const scarpList = useSelector((state:RootStateOrAny) => state.getMyInfoList.list)

    useEffect(() => {
        console.log("<scarpList> : ", scarpList)
        if(Array.isArray(scarpList) && scarpList.length === 0){
            console.log("<scarpList> : scarpList empty", isScrapList)
        }else if(!scarpList){
            console.log("<scarpList> : scarpList false", isScrapList)
        }else{
            setIsScrapList(true);
            console.log("<scarpList> : scarpList true", isScrapList);
            if(Array.isArray(scarpList.data.liked_recipe) && scarpList.data.liked_recipe.length === 0){
                console.log("<scarpList> : real scarpList empty", scarpList.data.liked_recipe)
                console.log("<scarpList> : real scarpList empty false", isEmpty);
            }else{
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
                        justifyContent: 'center', 
                        mt:8,
                    }}>
                    <ImageListItem key="Subheader" cols={2}>
                        <ListSubheader component="div"  sx={{ mb:2}}>
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
                        <ImageListItem>
                            <img
                                src={`${item.img}?w=248&fit=crop&auto=format`}
                                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.title}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                title={item.title}
                                subtitle={item.author}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            : ""}
        </>
    )
}

export default MyScrap;