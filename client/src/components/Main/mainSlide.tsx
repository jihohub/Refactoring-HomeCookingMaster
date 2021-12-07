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
                    style={{width:'55rem', height:'60rem'}}
                    />
                    {/* <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption> */}
                </Carousel.Item>
                <Carousel.Item>
                    <Image
                    className="d-block w-100"
                    src={main2}
                    alt="main2"
                    style={{width:'55rem', height:'60rem'}}
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
                    style={{width:'55rem', height:'60rem'}}
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
                    style={{width:'55rem', height:'60rem'}}
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