import { useState } from "react"
import ShowQuestion from "../ShowQuestion/ShowQuestion"
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader"

const PlayQuiz = ({ quiz, user }) => {

    const { questionsArr, _id } = quiz


    return (
        <>
            <ShowQuestion questionsArr={questionsArr} id={_id} />
        </>
    )
}

export default PlayQuiz