import React from 'react'
import { Card, Col } from 'react-bootstrap'

const AnswerCard = ({ answer, handleAnswer, index }) => {
    let color

    if (index === 0) color = '#b41c1c'
    if (index === 1) color = '#38269a'
    if (index === 2) color = '#269a41'
    if (index === 3) color = '#e0e71e'

    return (
        <Col xl={{ span: 6 }} className='justify-content-center'>
            <Card className='mx-auto my-5 pointerCursor justify-content-center border-dark' style={{ width: '25rem', height: '12rem', backgroundColor: color }} onClick={handleAnswer}>
                <Card.Body className='d-flex align-items-center justify-content-center'>
                    <Card.Title className='text-dark text-center fs-1'>{answer} </Card.Title>
                </Card.Body>
            </Card>
        </Col>


    )
}

export default AnswerCard