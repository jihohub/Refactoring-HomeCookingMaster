/** @jsxImportSource @emotion/react */
import main1 from "../../assets/main1.png";
import main2 from "../../assets/main2.jpg";
import main3 from "../../assets/main3.png";
import main4 from "../../assets/main4.jpg";
import { Carousel, Image } from "react-bootstrap";
import Button from "@restart/ui/esm/Button";
import { styled } from '@mui/material/styles';

function MainSlide() {
    return (
        <>
            <Carousel pause="hover" className="bg-light">
                <Carousel.Item>
                    <Image
                    className="d-block w-100"
                    src={main1}
                    alt="main1"
                    style={{width:'60rem', height:'60rem', opacity:'0.7'}}
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <Image
                    className="d-block w-100"
                    src={main2}
                    alt="main2"
                    style={{width:'60rem', height:'60rem', opacity:'0.7'}}
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <Image
                    className="d-block w-100"
                    src={main3}
                    alt="main3"
                    style={{width:'60rem', height:'60rem', opacity:'0.7'}}
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <Image
                    className="d-block w-100"
                    src={main4}
                    alt="main4"
                    style={{width:'60rem', height:'60rem', opacity:'0.7'}}
                    />
                </Carousel.Item>
            </Carousel>
            <Carousel.Caption style={{marginBottom:'23rem'}} >
                    <h2 style={{fontSize:'5rem', textShadow:'2px 2px 6px black', color:'#fffff'}}>집밥꼬꼬선생</h2>
                    <p style={{ fontSize:'1.2rem', fontWeight:'600', color:'#191919'}}>집밥 레시피 검색 플랫폼</p>
                    <OkButton onClick={() => window.scrollTo(0,1000)}>이미지 검색하기</OkButton>
            </Carousel.Caption>
        </>
    );
}

export default MainSlide;

const OkButton = styled(Button)({
    borderRadius:'30px',
    backgroundColor: '#897A5F',
    borderColor: '#897A5F',
    color : 'white',
    fontFamily:'Elice',
    fontWeight:'600',
    width: '10rem',
    height: '2.5rem',
    '&:hover': {
        borderColor: '#897A5F',
    },
});