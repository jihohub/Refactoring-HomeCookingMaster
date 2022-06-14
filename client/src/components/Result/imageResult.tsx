import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';


function ImageResult() {
    const [img, setImg] = useState(false);
    const [resultState, setResultState] = useState(false);
    const [resultImg, setResultImg] = useState<String | ArrayBuffer | null>("");
    const [resultName, setResultName] = useState('');
    const [resultRate, setResultRate] = useState('');
    // const dispatch = useDispatch();
    const router = useRouter();

    const [resultFirstName, setResultFirstName] = useState('');
    const [firstCheck, setFirstCheck] = useState(false);
    const [resultSecondName, setResultSecondName] = useState('');
    const [secondCheck, setSecondCheck] = useState(false);
    const [resultThirdName, setResulThirdName] = useState('');
    const [thirdCheck, setThirdCheck] = useState(false);


    const checkRate1 = (listItem:{"name" : '', "rate" : 0}) => {
        const name = listItem['name']
        const rate = listItem['rate']
        if(rate < 0.7 && rate > 0.3){
            setResultFirstName(name)
            setFirstCheck(true)
        }
    }
    const checkRate2 = (listItem:{"name" : '', "rate" : 0}) => {
        const name = listItem['name']
        const rate = listItem['rate']
        if(rate < 0.7 && rate > 0.3){
            setResultSecondName(name)
            setSecondCheck(true)
        }
    }
    const checkRate3 = (listItem:{"name" : '', "rate" : 0}) => {
        const name = listItem['name']
        const rate = listItem['rate']
        if(rate < 0.7 && rate > 0.3){
            setResulThirdName(name)
            setThirdCheck(true)
        }
    }


    // 검색한 이미지 불러오기
    // const searchImg = useSelector((state:RootStateOrAny) => state.userSearchImg.searchImg)
    // const searchImg = useSelector((state:RootStateOrAny) => state.searchedImageSlice.imageFile)
    // const previewUrl = useSelector((state:RootStateOrAny) => state.searchedImageSlice.previewUrl)

    // console.log('searchImgsearchImg', searchImg)
    // console.log('previewUrlpreviewUrl', previewUrl)

    // useEffect(() => {
    //     let reader = new FileReader();
    //     let file = searchImg;

    //     reader.onloadend = () => {
    //         setResultImg(reader.result);
    //     }
    //     if(file){
    //         reader.readAsDataURL(file);
    //     }
    // },[searchImg])


    // 이미지 검색 결과
    // const imgResult = useSelector((state:RootStateOrAny) => state.getResultByImg.list)
    // console.log('imgResult', imgResult)

    // 소수점 조절
    function financial(x:any) {
        return Number.parseFloat(x).toFixed(2);
    }

    // useEffect(() => {
    //     if (imgResult) {
    //         const rateResult = imgResult["equal_rate"];
    //         // console.log("<검색결과페이지> : 검색결과페이지 true", rateResult)
    //         if (
    //             typeof rateResult == "undefined" ||
    //             rateResult == null ||
    //             rateResult === ""
    //         ) {
    //             // console.log("<검색결과페이지> : empty")
    //         } else {
    //             if (rateResult[0]["rate"] > 0.7) {
    //                 const name = rateResult[0]["name"];
    //                 const rate = rateResult[0]["rate"] * 100;
    //                 const rate_ = financial(rate);
    //                 // console.log('<검색결과페이지> : name 처리', typeof(rate))
    //                 setResultName(name);
    //                 setResultRate(rate_);
    //                 // checkRate2(rateResult[1])
    //                 // checkRate3(rateResult[2])
    //                 setImg(true);
    //                 // dispatch(setImgResult());
    //             } else {
    //                 // console.log('<imgResult> : 값 < 0.7')
    //                 // navigate('/result')
    //                 checkRate1(rateResult[0]);
    //                 checkRate2(rateResult[1]);
    //                 checkRate3(rateResult[2]);
    //                 setResultState(true);
    //                 dispatch(setImgResult());
    //             }
    //         }
    //     }
    // }, [dispatch, imgResult]);

    

    return (
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        {img ? (
          <Card sx={{ maxWidth: 500, marginBottom: "5%" }}>
            <CardMedia
              component="img"
              height="400"
              image={typeof resultImg == "string" ? resultImg : ""}
              alt="resultImg"
            />
            <CardContent sx={{ textAlign: "center" }}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ fontFamily: "Elice" }}
              >
                {resultName}
              </Typography>
              <Typography
                variant="h4"
                color="#897A5F"
                sx={{ fontFamily: "Elice", fontWeight: "600" }}
              >
                {resultRate}%
              </Typography>
            </CardContent>
            {secondCheck || thirdCheck ? (
              <p style={{ marginTop: "1rem", marginLeft: "3rem" }}>
                유사 검색어
              </p>
            ) : (
              ""
            )}
            <div style={{ paddingLeft: "1rem", paddingBottom: "1rem" }}>
              {secondCheck ? (
                <ItemBox
                  variant="outlined"
                  onClick={() =>
                    router.push(`/result?data=${resultSecondName}`)
                  }
                >
                  {resultSecondName}
                </ItemBox>
              ) : (
                ""
              )}
              {thirdCheck ? (
                <ItemBox
                  variant="outlined"
                  onClick={() => router.push(`/result?data=${resultThirdName}`)}
                >
                  {resultThirdName}
                </ItemBox>
              ) : (
                ""
              )}
            </div>
          </Card>
        ) : (
          ""
        )}
        {resultState ? (
          <Card
            sx={{
              minWidth: 200,
              maxWidth: 400,
              marginBottom: "5rem",
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  paddingBottom: "10px",
                  marginTop: "1rem",
                  fontFamily: "Elice",
                }}
              >
                검색 결과를 찾을 수 없습니다.
              </Typography>
              <Typography variant="body2" sx={{ fontFamily: "Elice" }}>
                검색하신 이미지에 일치하는 결과를 찾을 수 없습니다. 촬영가이드를
                참고하여 다시 검색하거나 텍스트 검색을 이용해주세요.
                <br />
              </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "center" }}>
              <OkButton size="small" onClick={() => router.push("/")}>
                다시 검색하기
              </OkButton>
            </CardActions>
            <div style={{ textAlign: "center" }}>
              {firstCheck || secondCheck || thirdCheck ? (
                <p style={{ marginTop: "1rem", fontSize: "5" }}>
                  혹시 이건 아닐까요?
                </p>
              ) : (
                ""
              )}
              <div style={{ paddingBottom: "1rem" }}>
                {firstCheck ? (
                  <ItemBox
                    variant="outlined"
                    onClick={() =>
                      router.push(`/result?data=${resultFirstName}`)
                    }
                  >
                    {resultFirstName}
                  </ItemBox>
                ) : (
                  ""
                )}
                {secondCheck ? (
                  <ItemBox
                    variant="outlined"
                    onClick={() =>
                      router.push(`/result?data=${resultSecondName}`)
                    }
                  >
                    {resultSecondName}
                  </ItemBox>
                ) : (
                  ""
                )}
                {thirdCheck ? (
                  <ItemBox
                    variant="outlined"
                    onClick={() =>
                      router.push(`/result?data=${resultThirdName}`)
                    }
                  >
                    {resultThirdName}
                  </ItemBox>
                ) : (
                  ""
                )}
              </div>
            </div>
          </Card>
        ) : (
          ""
        )}
      </div>
    );
}

export default ImageResult;

const OkButton = styled(Button)({
    // backgroundColor: '#897A5F',
    borderColor: '#897A5F',
    color : '#897A5F',
    fontFamily:'Elice',
    fontWeight:'600',
    '&:hover': {
        borderColor: '#897A5F',
    },
});


const ItemBox = styled(Button)({
    borderRadius:'30px',
    backgroundColor: 'white',
    borderColor: '#897A5F',
    color:'#897A5F',
    width: 130,
    height: 50,
    margin: 5,
    marginBottom:10,
    '&:hover': {
        backgroundColor: '#c7b595',
        borderColor: '#c7b595',
        color: 'white',
    },
});




// useEffect(() => {
//     const rateResult = imgResult['equal_rate'];
//     if(imgStatus){
//         console.log('its trrrururuuuuuuweee')
//         if(typeof rateResult == "undefined" || rateResult == null || rateResult === "" || imgResult === []){
//             console.log("<rateResult> : imgResult empty")
//         }else{
//             setResultImg(searchImg)
//             console.log("imgResult true", searchImg);
//             const result = rateResult[0]['name']
//             navigate(`/result?data=${result}`)
//             dispatch(setStatus(false));
//         }
//     }else{
//         console.log('its fflflallslslslslfe')
//     }
// },[imgResult])