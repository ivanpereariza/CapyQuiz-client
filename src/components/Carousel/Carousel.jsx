import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Col, Row } from 'react-bootstrap';

const handleDragStart = (e) => e.preventDefault();

const Gallery = () => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const items = [
        <img style={{ height: '400px' }} src="https://res.cloudinary.com/dkfzj9tmk/image/upload/v1678877914/QuizList_dglgjm.jpg" onDragStart={handleDragStart} role="presentation" />,
        <img style={{ height: '400px' }} src="https://res.cloudinary.com/dkfzj9tmk/image/upload/v1678877914/ranking_ihbaxs.jpg" onDragStart={handleDragStart} role="presentation" />,
        <img style={{ height: '400px' }} src="https://res.cloudinary.com/dkfzj9tmk/image/upload/v1678877914/playDark_azjrpi.jpg" onDragStart={handleDragStart} role="presentation" />,
        <img style={{ height: '400px' }} src="https://res.cloudinary.com/dkfzj9tmk/image/upload/v1678877914/playDark_1_spel03.jpg" onDragStart={handleDragStart} role="presentation" />,
        <img style={{ height: '400px' }} src="https://res.cloudinary.com/dkfzj9tmk/image/upload/v1678877914/results_ythnrz.jpg" onDragStart={handleDragStart} role="presentation" />,
        <img style={{ height: '400px' }} src="https://res.cloudinary.com/dkfzj9tmk/image/upload/v1678877914/createQuiz_q98plg.jpg" onDragStart={handleDragStart} role="presentation" />,
    ]

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((currentIndex + 1) % items.length);
        }, 2000);
        return () => clearInterval(intervalId);
    }, [currentIndex, items.length]);


    return (
        <Row className='mt-5'>
            <Col lg={{ span: 4, offset: 4 }}>
                <AliceCarousel mouseTracking items={items} infinite={true} animationDuration={10} activeIndex={currentIndex} />
            </Col>
        </Row>
    );
}

export default Gallery;
