/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import { Grid, Card, CardMedia, CardContent, CardActionArea, Typography } from "@mui/material";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setImageFile, setPreviewUrl } from "../../components/Result/searchedImageSlice";
import { getRanking, clearRanking } from "../../modules/rankingSlice";
import background from "../../assets/main.jpg";
import DragDrop from "../../components/Main/DragDrop";
import DropZone from "../../components/Main/DropZone";

import MainSlide from "../../components/Main/mainSlide";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { imageTitle, btn, btnDiv,imgSearch,imgGuide,guideTitle,rankingTitle, rankingDiv, top3Div, top3Img,top3ItemDiv, top3TopDiv, top3Name } from "../../css/main_css";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const OkButton = styled(Button)({
    backgroundColor: '#897A5F',
    borderColor: '#897A5F',
    '&:hover': {
        backgroundColor: '#ED6C02',
        borderColor: '#ED6C02',
    },
});

const mainWrapperStyle = css`
    width: 100%;
    height: 45rem;
    /* background-image: url(${background}); */
    /* background-size: cover; */
    /* position: relative; */
`;

const searchDivStyle = css`
    /* margin: 0 auto; */
    margin-top: 3rem;
    display: flex;
    position: relative;
    /* max-width: 810px; */
    height: 30vh;
    width: 100%;
    justify-content: space-around;

    @media screen and (min-width: 768px) and (max-width: 1080px) {
        max-width: 500px;
    }

    @media screen and (max-width: 768px) {
        max-width: 80vw;
    }

    .form {
        border-radius: 100px;
    }

    top: 10vh;

        .paper {
            width: 100%;
        }

        .searchButton {
            :hover {
                opacity: 1;
            }
        }
    }
`;


const MainSearch = () => {
    return (
        <div css={searchDivStyle}>
            <div css={imgSearch}>
                <h2 css={imageTitle}>이미지 검색</h2>
                <DropZone />
                <div css={btnDiv}>
                    {/* <Link to="/" css={agree_btn}> */}
                        <OkButton
                            id="nextBtn" variant="contained" css={btn}
                        >
                            검색
                        </OkButton>
                    {/* </Link> */}
                </div>
            </div>
            <div css={imgGuide}>
                <h2 css={guideTitle}>이렇게 찍어주세요!</h2>
                <div>
                    <h5>1. 완성된 음식 사진을 올려주세요!</h5>
                    <p>미완성된 음식 사진을 올리거나 재료 사진을 올릴 경우에 원하는 결과를 얻을 수 없습니다. 완성된 음식 사진을 올려야 정확도 있는 결과를 받을 수 있습니다!</p>
                    <h5>2. 화질이 나쁜 사진은 검색이 어렵습니다.</h5>
                    <p>이미지의 화질이 너무 안좋거나 정확한 판단이 어려운 사진을 올릴 경우, 원하는 결과를 얻기 어렵습니다.</p>
                    <h5>3. 음식이 잘보이는 사진일수록 더욱 정확한 결과를 얻을 수 있습니다.</h5>
                    <p>이미지 내에 음식 크기가 너무 작을 경우 이미지 인식이 어려워 정확한 결과를 얻을 확률이 낮아집니다. 결과의 정확도를 위해 음식이 잘 보이는 사진으로 검색해주세요!</p>
                </div>
            </div>
        </div>
    );
}

const MainRanking = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getRanking());
        return () => {
            dispatch(clearRanking());
        };
    }, []);

    const handleClick = (item: any) => {
        navigate(`/recipe/${item.id}`);
        return;
    }

    const ranking = useSelector((state: RootStateOrAny) => state.rankingSlice.ranking);
    console.log("page", ranking);

    // 순위 3위 전후로 나누기
    const [top3List, setTop3List] = useState<any[]>([]);
    const [othersList, setOthersList] = useState<any[]>([]);
    useEffect(() => {
        if(ranking.length !== 0){
            setTop3List([ranking[0], ranking[1], ranking[2]]);
            setOthersList([ranking[3], ranking[4], ranking[5],ranking[6], ranking[7], ranking[8],ranking[9], ranking[10], ranking[11]]);
        }
    },[ranking])
    console.log(top3List)
    console.log(othersList)

    return (
        <div>
            <h1 css={rankingTitle}>레시피 랭킹</h1>
            <div css={top3TopDiv}>
                {top3List ? top3List.map((item:any) => (
                    <div css={top3ItemDiv}>
                        <div css={top3Div}>
                            <Typography variant="h2" gutterBottom component="p">
                                {top3List.indexOf(item)+1}
                            </Typography>
                        </div>
                        <img src={item.img} css={top3Img} alt={item.name}></img>
                        <div css={top3Name}>
                            <Typography variant="h5" gutterBottom component="p">
                                    {item.name}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom component="p">
                                    {item.cooking_time}, {item.servings}, {item.difficulty}
                            </Typography>
                        </div>
                    </div>
                ))

                : ""}
            </div>
            <div css={rankingDiv}>
            <ImageList cols={3}
                gap={20}
                sx={{
                    width:'100vw', 
                    height:'150%', 
                    display: 'flex',
                    flexWrap: 'wrap', 
                    justifyContent:'center', 
                    marginBottom:'15rem'}}>
                {othersList ? othersList.map((item:any) => (
                    <ImageListItem 
                        key={item.img} 
                        sx={{width:'26%', height:'10rem'}}
                        >
                        <img
                            src={`${item.img}?w=248&fit=crop&auto=format`}
                            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.title}
                            loading="lazy"
                            style={{width:'100%', height:'22rem'}}
                        />
                        <ImageListItemBar
                            title={item.name}
                            actionIcon={
                                <IconButton
                                    sx={{ color: 'rgba(255, 255, 255, 0.54)', cursor:'pointer' }}
                                    aria-label={`info about ${item.name}`}
                                    onClick={() => navigate(`/recipe/${item.id}`)}
                                >
                                    <ArrowForwardIcon />
                                </IconButton>
                            }
                        />
                    </ImageListItem>
                )) : ""}
            </ImageList>
            </div>
        </div>
    )
}

function MainPage() {
    return (
        <div style={{height:'200%'}}>
            <MainSlide/>
            <div css={mainWrapperStyle}>
                <MainSearch />
            </div>
            <MainRanking />
        </div>
    );
}

export default MainPage;






// <div id="sec2" className="page-section">
//                 {/* <ImageListItem key="Subheader" cols={3}> */}
//                 <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
//                     {ranking.map((item: any) => {
//                         return (
//                             <Grid item xs={2} sm={3} md={3} display="flex" justifyContent="center">
//                                 <Card sx={{ width: 250 }}>
//                                     <CardActionArea onClick={() => navigate(`/recipe/${item.id}`)}>
//                                         <CardMedia
//                                             component="img"
//                                             height="150"
//                                             image={item.img}
//                                             alt="Paella dish"
//                                         />
//                                         <CardContent sx={{height: 150}}>
//                                             <Typography gutterBottom variant="h6" component="div">
//                                                 {item.name}
//                                             </Typography>
//                                             <Typography variant="body2" color="text.secondary" sx={{position: "absolute", bottom: 10}}>
//                                                 {`조회수: ${item.views}`}
//                                                 {`좋아요: ${item.likes}`}
//                                             </Typography>
//                                         </CardContent>
//                                     </CardActionArea>
//                                 </Card>
//                             </Grid>
//                         )
//                     })}
//                 </Grid>
//             </div>