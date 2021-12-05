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

function MyPost(){
    const [isPostList, setIsPostList] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const postList = useSelector((state:RootStateOrAny) => state.getMyInfoList.list)

    useEffect(() => {
        console.log("<postList> : ", postList)
        if(Array.isArray(postList) && postList.length === 0){
            console.log("<postList> : postList empty", isPostList)
        }else if(!postList){
            console.log("<postList> : postList false", isPostList)
        }else{
            setIsPostList(true);
            console.log("<postList> : postList true", isPostList);
            if(Array.isArray(postList.data.my_post) && postList.data.my_post.length === 0){
                console.log("<postList> : real postList empty", postList.data.my_post)
                console.log("<postList> : real post empty false", isEmpty);
            }else{
                setIsEmpty(true)
            }
        }
    },[postList])

    return(
        <>
            {isPostList ? 
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
                            작성리뷰
                        </ListSubheader>
                        {isEmpty ? "" : 
                            <Typography 
                                variant="subtitle1" 
                                gutterBottom component="div" 
                                sx={{ fontWeight : '600'}}
                            >
                                준비된 레시피를 따라 요리를 해보고 리뷰를 작성해보세요!
                            </Typography>
                        }
                    </ImageListItem>
                    {postList.data.my_post.map((item : any) => (
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

export default MyPost;