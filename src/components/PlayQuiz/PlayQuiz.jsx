import { useState } from "react"
import ShowQuestion from "../ShowQuestion/ShowQuestion"
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader"

const PlayQuiz = ({ quiz, user }) => {

    const { questionsArr, _id, owner } = quiz


    return (

        <ShowQuestion questionsArr={questionsArr} id={_id} user={user} owner={owner} />

    )
}

export default PlayQuiz