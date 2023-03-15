import { useEffect, useState, useContext } from 'react'
import Table from 'react-bootstrap/Table'
import { ThemeContext } from "../../contexts/theme.context"

function PointsTable({ id }) {

    const [topPoints, setTopPoints] = useState()
    const [quiz, setQuiz] = useState('')


    useEffect(() => {
        getQuizz()
    }, [id])

    useEffect(() => {
        setTopPoints(quiz.points.sort((a, b) => b - a).slice(0, 6))
    }, [quiz])

    const getQuizz = () => {
        quizzesService
            .getQuizById(id)
            .then(({ data }) => setQuiz(data))
            .catch(err => console.log(err))
    }

    const { themeValue } = useContext(ThemeContext)

    return (
        <Table striped variant={`${themeValue}`} className=' my-3'>
            <thead>
                <tr>
                    <th>Top Scores</th>
                </tr>
            </thead>
            <tbody>
                {
                    topPoints?.map((punctuation, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{punctuation}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    );
}

export default PointsTable;