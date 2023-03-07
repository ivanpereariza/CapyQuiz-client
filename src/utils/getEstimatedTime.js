
const getEstimatedTime = (questionsArr) => {
    if (questionsArr) {

        let time = 'mins'
        let estimatedTime = (30 * questionsArr.length) / 60
        if (estimatedTime < 1) {
            estimatedTime *= 60
            time = 'secs'
        }
        const text = `${estimatedTime} ${time}`
        return text
    }
    return 0
}

export default getEstimatedTime