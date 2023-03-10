import { useEffect, useState } from "react"
import usersService from "../../services/users.services"
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader"

const Ranking = () => {

    const [ranking, setRanking] = useState()

    useEffect(() => {
        getRankingUsers()
    }, [])

    const getRankingUsers = () => {
        usersService
            .getUsersByPoints()
            .then(({ data }) => setRanking(data))
            .catch(err => console.log(err))
    }

    console.log(ranking)
    return (
        <>
            {
                ranking ?
                    ranking.map((elm, idx) => <p key={idx}>{elm.username} {elm.points}</p>)
                    :
                    <SpinnerLoader />
            }
        </>
    )
}

export default Ranking