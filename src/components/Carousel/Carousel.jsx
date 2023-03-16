import React, { useState } from 'react';
import { Carousel, Col, Row } from 'react-bootstrap';
import { CarouselConsts } from '../../consts';


const Gallery = () => {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    }

    return (
        <Row className='mt-5'>
            <Col lg={{ span: 6, offset: 3 }}>
                <Carousel activeIndex={index} onSelect={handleSelect} interval={CarouselConsts.INTERVAL_TIMER}>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://res.cloudinary.com/dkfzj9tmk/image/upload/v1678877914/QuizList_dglgjm.jpg"
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://res.cloudinary.com/dkfzj9tmk/image/upload/v1678877914/ranking_ihbaxs.jpg"
                            alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://res.cloudinary.com/dkfzj9tmk/image/upload/v1678877914/playDark_azjrpi.jpg"
                            alt="Third slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://res.cloudinary.com/dkfzj9tmk/image/upload/v1678877914/playDark_1_spel03.jpg"
                            alt="Fourth slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://res.cloudinary.com/dkfzj9tmk/image/upload/v1678877914/results_ythnrz.jpg"
                            alt="Fifth slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://res.cloudinary.com/dkfzj9tmk/image/upload/v1678877914/createQuiz_q98plg.jpg"
                            alt="Sixth slide"
                        />
                    </Carousel.Item>
                </Carousel>
            </Col>
        </Row>
    );
}

export default Gallery;
