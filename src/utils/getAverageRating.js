const getAverageRating = (quiz) => {

    let totalRating = 0

    if (quiz.rating.length > 1) {
        const ratingArr = []
        quiz.rating?.map(elm => ratingArr.push(elm.rate))
        totalRating = (ratingArr.reduce((acc, curr) => acc + curr)) / ratingArr.length
    }
    if (quiz.rating.length === 1) return totalRating = quiz.rating[0].rate

    return totalRating
}

export default getAverageRating