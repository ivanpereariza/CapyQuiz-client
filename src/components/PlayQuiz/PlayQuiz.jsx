import { useState } from "react"
import { ProgressBar } from "react-bootstrap"
import { GameConstants } from "../../consts"
import ShowQuestion from "../ShowQuestion/ShowQuestion"

const PlayQuiz = ({ quiz }) => {

    const { questionsArr, _id, owner } = quiz
    const [timer, setTimer] = useState(0)
    const [barTimer, setBarTimer] = useState(100)

    const showTimer = segs => {
        setTimer(segs)
        const bar = (100 / GameConstants.GAME_SHOW_ANSWERS_TIMER) * (GameConstants.GAME_QUESTION_TIMER - segs)
        setBarTimer(bar)
    }


    return (
        <>

            <h1 className="text-center">{quiz.title}</h1>
            <br />
            {
                timer > 3 && timer < 18 &&
                <ProgressBar variant='danger' animated now={barTimer} label={`${barTimer}%`} visuallyHidden />
            }

            <ShowQuestion questionsArr={questionsArr} id={_id} owner={owner} showTimer={showTimer} />
        </>
    )
}

export default PlayQuiz