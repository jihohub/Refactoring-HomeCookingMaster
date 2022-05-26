import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import { useSelector, RootStateOrAny } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";

function MyPost(){
    const router = useRouter();
    const [isPostList, setIsPostList] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    // const postList = useSelector((state:RootStateOrAny) => state.getMyInfoList.list)

    // useEffect(() => {
    //     // console.log("<postList> : ", postList)
    //     if(Array.isArray(postList) && postList.length === 0){
    //         // console.log("<postList> : postList empty", isPostList)
    //     }else if(!postList){
    //         // console.log("<postList> : postList false", isPostList)
    //     }else{
    //         setIsPostList(true);
    //         // console.log("<postList> : postList true", isPostList);
    //         if(Array.isArray(postList.data.my_post) && postList.data.my_post.length === 0){
    //             // console.log("<postList> : real postList empty", postList.data.my_post)
    //             // console.log("<postList> : real post empty false", isEmpty);
    //         }else{
    //             setIsEmpty(true)
    //         }
    //     }
    // },[postList])

    return (
      <>
        {/* {isPostList ? 
                <ImageList 
                    sx={{ 
                        width: '100%', 
                        height: 450, 
                        display: 'flex',
                        // justifyContent: 'center', 
                        marginLeft:'25%',
                        mt:8,
                    }}>
                        
                    <ImageListItem key="Subheader" >
                    <ListSubheader component="div"  sx={{ mb:2, width:'40rem', backgroundColor:'#897A5F', color:'white'}}>
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
                            <ImageListItem >
                                <img
                                    src={`${item.recipe_img}?w=248&fit=crop&auto=format`}
                                    srcSet={`${item.recipe_img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    alt={item.title}
                                    loading="lazy"
                                    onClick={() => navigate(`/recipe/${item.recipe_id}`)}
                                    style={{width:'20rem', height:'10rem'}}
                                />
                                <ImageListItemBar
                                    title={item.recipe_name}
                                />
                            </ImageListItem>
                        ))}
                </ImageList>
            : ""} */}

        {/* {isPostList ? (
          <ImageList
            sx={{
              width: "100%",
              // height: 400,
              // justifyContent: 'center',
              marginLeft: "15%",
              mt: 8,
            }}
          >
            <ImageListItem key="Subheader" cols={3}>
              <ListSubheader
                sx={{
                  width: "70%",
                  backgroundColor: "#897A5F",
                  color: "white",
                }}
                component="div"
              >
                작성리뷰
              </ListSubheader>
              {isEmpty ? (
                ""
              ) : (
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  component="div"
                  sx={{ fontWeight: "600" }}
                >
                  준비된 레시피를 따라 요리를 해보고 리뷰를 작성해보세요!
                </Typography>
              )}
            </ImageListItem>
            <ImageList
              key="imageList"
              cols={3}
              style={{ marginBottom: "10rem", width: "140%" }}
            >
              {postList.data.my_post.map((item: any, index: number) => (
                <ImageListItem key={index} sx={{ width: "100" }} css={tmp}>
                  <img
                    src={`${item.recipe_img}?w=248&fit=crop&auto=format`}
                    srcSet={`${item.recipe_img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.recipe_id}
                    loading="lazy"
                    onClick={() => router.push(`/recipe/${item.recipe_id}`)}
                    css={img}
                  />
                  <ImageListItemBar title={item.recipe_name} />
                </ImageListItem>
              ))}
            </ImageList>
          </ImageList>
        ) : (
          ""
        )} */}
      </>
    );
}

export default MyPost;


// const img = css`
//     width:100%;
//     height:15rem;
//     cursor: pointer;
//     /* box-shadow: 2px 2px 6px gray; */
// `;

// const tmp = css`
//     cursor: pointer;
//     /* box-shadow: 2px 2px 6px gray; */
//     :hover {
//         opacity: 0.8;
//         transition: all 0.3s ease-in-out;
//     }
// `;