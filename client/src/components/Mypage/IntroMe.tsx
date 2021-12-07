/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { getMyInfo } from "../../redux/myInfo";
import { getNewAccess } from "../../redux/newToken";
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


function IntroMe(){
    const dispatch = useDispatch();
    const refreshTkn = sessionStorage.getItem('usrRfshTkn')
    const [isInfo, setIsInfo] = useState(false);

    const newToken = useSelector((state:RootStateOrAny) => state.getNewAccessList.list)

    useEffect(() => {
        console.log("<IntroMe> : dispatch > getMyInfo")
        dispatch(getMyInfo());
    },[])

    const myInfo = useSelector((state:RootStateOrAny) => state.getMyInfoList.list)

    useEffect(() => {
        console.log("<IntroMe> : myInfo : ", myInfo)
        if(Array.isArray(myInfo) && myInfo.length === 0){
            console.log("<IntroMe> : myInfo empty")
        }else if(!myInfo){
            console.log("<IntroMe> : myInfo false")
            handleToken();
        }else{
            console.log("<IntroMe> : myInfo true ", myInfo.data.user_info)
            setIsInfo(true);
        }
    }, [myInfo])

    const handleToken = () => {
        dispatch(getNewAccess({
            refresh_token : refreshTkn
        }))
    }

    useEffect(() => {
        console.log("<newToken> : ", newToken)
        if(Array.isArray(newToken) && newToken.length === 0){
            console.log("<newToken> : token empty")
        }else if(!newToken){
            console.log("<newToken> : token false")
        }else{
            console.log("<newToken> : token true ", newToken.data)
            sessionStorage.removeItem('usrAcsTkn')
            sessionStorage.setItem('usrAcsTkn', newToken.data['access_token'])
            console.log("<newToken> : dispatch > again")
            dispatch(getMyInfo());
        }
    },[newToken])
    

    return(
        <>
            {isInfo ? 
                <div style={{ width: '100%' }}>
                    <Box component="div"
                        sx={{
                        display: 'flex',
                        // justifyContent: 'center',
                        flexDirection : 'row',
                        marginLeft : '25%'
                        }}
                    >
                        <Avatar
                            alt={myInfo.data.user_info.nickname}
                            src={myInfo.data.user_info.img}
                            sx={{ width: 128, height: 128 }}
                        />
                        <Box component="div"
                            sx={{
                                display: 'flex',
                                flexDirection : 'column',
                                pl : 5
                            }}
                        >
                            <Box component="div"
                                sx={{ 
                                    display: 'flex', 
                                    flexDirection : 'row', 
                                    alignItems: 'flex-end' }}>
                                <Typography variant="h4" gutterBottom component="div">
                                    {myInfo.data.user_info.nickname}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom component="div" sx={{ pl : 4, pb:1 }}>
                                    Lv. {myInfo.data.user_info.exp}
                                </Typography>
                            </Box>
                            <Box component="div" >
                                <Typography variant="subtitle1" gutterBottom component="div" sx={{ fontWeight : '600' }}>
                                    한줄소개
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom component="div">
                                    {myInfo.data.user_info.intro}
                                </Typography>
                            </Box>
                            <Box component="div" 
                                sx={{ 
                                    display: 'flex', 
                                    flexDirection : 'row'}}>
                                <Typography variant="subtitle1" gutterBottom component="div">
                                    작성리뷰 {myInfo.data.my_post.length}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom component="div" sx={{ pl : 2 }}>
                                    스크랩레시피 {myInfo.data.liked_recipe.length}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </div>
            : "no"}
        </>
    )
}

export default IntroMe;