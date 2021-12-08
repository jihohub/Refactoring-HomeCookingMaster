/** @jsxImportSource @emotion/react */
import main1 from "../../assets/main1.png";
import main2 from "../../assets/main2.jpg";
import main3 from "../../assets/main3.png";
import main4 from "../../assets/main4.jpg";
import { Carousel, Image } from "react-bootstrap";

function MainSlide() {
    return (
        <>
            <Carousel pause="hover" className="bg-light">
                <Carousel.Item>
                    <Image
                    className="d-block w-100"
                    src={main1}
                    alt="main1"
                    style={{width:'60rem', height:'60rem'}}
                    />
                    <Carousel.Caption style={{marginBottom:'30rem'}}>
                    <h2 style={{fontSize:'5rem'}}>집밥꼬꼬선생</h2>
                    <p style={{backgroundColor:'white', color:'black'}}>집밥 레시피 검색 플랫폼</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Image
                    className="d-block w-100"
                    src={main2}
                    alt="main2"
                    style={{width:'60rem', height:'60rem'}}
                    />
                    {/* <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption> */}
                </Carousel.Item>
                <Carousel.Item>
                    <Image
                    className="d-block w-100"
                    src={main3}
                    alt="main3"
                    style={{width:'60rem', height:'60rem'}}
                    />
                    <Carousel.Caption style={{marginBottom:'30rem'}}>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Image
                    className="d-block w-100"
                    src={main4}
                    alt="main4"
                    style={{width:'60rem', height:'60rem'}}
                    />
                    <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </>
    );
}

export default MainSlide;