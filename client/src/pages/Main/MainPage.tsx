/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import React, { useEffect, useState } from "react";

import { Grid, Card, CardMedia, CardContent, CardActionArea, Typography } from "@mui/material";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setImageFile, setPreviewUrl } from "../../components/Result/searchedImageSlice";
import { getRanking, clearRanking } from "../../modules/rankingSlice";
import background from "../../assets/main.jpg";
import DragDrop from "../../components/Main/DragDrop";
import DropZone from "../../components/Main/DropZone";
import { sample } from "../../assets/Sample";

const mainWrapperStyle = css`
    width: 100%;
    height: 100%;
    background-image: url(${background});
    background-size: cover;
    // position: relative;
`;

const searchDivStyle = css`
    margin: 0 auto;
    display: block;
    position: relative;
    max-width: 810px;
    height: 30vh;

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
            <DropZone />
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

    return (
        <div id="sec2" className="page-section">
            <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {ranking.map((item: any) => {
                    return (
                        <Grid item xs={2} sm={3} md={3} display="flex" justifyContent="center">
                            <Card sx={{ width: 250 }}>
                                <CardActionArea onClick={() => navigate(`/recipe/${item.id}`)}>
                                    <CardMedia
                                        component="img"
                                        height="150"
                                        image={item.img}
                                        alt="Paella dish"
                                    />
                                    <CardContent sx={{height: 150}}>
                                        <Typography gutterBottom variant="h6" component="div">
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{position: "absolute", bottom: 10}}>
                                            {`조회수: ${item.views}`}
                                            {`좋아요: ${item.likes}`}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    )
}

function MainPage() {
    // const token = useSelector((state:RootStateOrAny) => state.getUserInfo.list)

    // const checkLogState = () => {
    //     if(token){
    //         localStorage.setItem('id', token['refresh_token'])
    //         sessionStorage.setItem('id', token['access_token'])
            
    //     }
    // }

    // useEffect(() => {
    //     checkLogState();
    // },[])

    return (
        <div css={mainWrapperStyle}>
            <MainSearch />
            <MainRanking />
        </div>
    );
}

export default MainPage;
