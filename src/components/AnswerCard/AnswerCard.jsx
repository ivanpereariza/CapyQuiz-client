import React from 'react'
import { Card, Col } from 'react-bootstrap'

const AnswerCard = ({ answer, handleAnswer, index }) => {

    const color = ['#b41c1c', '#38269a', '#269a41', '#e0e71e']

    return (
        <Col xl={{ span: 6 }} className='justify-content-center'>
            <Card className='mx-auto my-3 pointerCursor justify-content-center border-dark'
                style={{ width: '20rem', height: '12rem', backgroundColor: color[index] }} value={answer} onClick={handleAnswer}>
                <Card.Body className='d-flex align-items-center justify-content-center'>
                    <Card.Title className='text-dark text-center fs-1'>{answer} </Card.Title>
                </Card.Body>
            </Card>
        </Col>


    )
}

export default AnswerCard