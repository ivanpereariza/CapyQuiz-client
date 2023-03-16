import { createContext, useState } from "react";

const ModalQuizContext = createContext()

function ModalQuizProviderWrapper(props) {

    const [showModalDetails, setShowModalDetails] = useState(false)
    const [selectedQuiz, setSelectedQuiz] = useState('')


    const openModalDetails = (id) => {
        setShowModalDetails(true)
        setSelectedQuiz(id)
        console.log(id)
    }


    return (
        <ModalQuizContext.Provider value={{ setShowModalDetails, showModalDetails, selectedQuiz, openModalDetails }}>
            {props.children}
        </ModalQuizContext.Provider>
    )


}

export { ModalQuizContext, ModalQuizProviderWrapper }