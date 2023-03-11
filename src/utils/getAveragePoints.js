const getAveragePoints = (quiz) => {
    let totalPoints
    if (quiz.points.length > 1) totalPoints = quiz.points.reduce((acc, curr) => acc + curr)
    if (quiz.points.length === 1) return totalPoints = quiz.points[0]

    return totalPoints / quiz.points.length
}

export default getAveragePoints