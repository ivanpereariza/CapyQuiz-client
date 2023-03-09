import { useEffect, useState } from "react"
import shuffleArray from "../../utils/shuffleArray"
import ShowQuestion from "../ShowQuestion/ShowQuestion"

const PlayQuiz = ({ quiz, user }) => {

    const { questionsArr, _id, owner } = quiz
    const [timer, setTimer] = useState(0)
    const [barTimer, setBarTimer] = useState(100)
    let Array


    const showTimer = segs => {
        setTimer(segs)
        const bar = (100 / 15) * (18 - segs)
        setBarTimer(`${bar}%`)
    }

    return (
        <>

            <h1 className="text-center">{quiz.title}</h1>
            <br />
            {
                timer > 3 && timer < 18 &&
                <div className="progress" role="progressbar" aria-label="Danger example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                    <div className="progress-bar bg-danger" style={{ width: barTimer }}></div>
                </div>
            }

            <ShowQuestion questionsArr={questionsArr} id={_id} user={user} owner={owner} showTimer={showTimer} />
        </>
    )
}

export default PlayQuiz