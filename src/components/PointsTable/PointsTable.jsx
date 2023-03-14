import { useEffect, useState, useContext } from 'react'
import Table from 'react-bootstrap/Table'
import { ThemeContext } from "../../contexts/theme.context"

function PointsTable({ points }) {

    const [topPoints, setTopPoints] = useState()

    useEffect(() => {
        setTopPoints(points.sort((a, b) => b - a).slice(0, 6))
    }, [points])

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