import React from 'react'
import { Button } from 'react-bootstrap'
import { useContext } from "react"
import { ThemeContext } from "../../contexts/theme.context"

const NewQuizzButton = ({ setShowModal }) => {

    const { theme } = useContext(ThemeContext)
    return (
        <div className="d-grid gap-2 align-items-center">
            <Button onClick={() => setShowModal(true)} type="submit" variant={`outline-${theme} `}>Add new Quiz!</Button>
        </div>
    )
}

export default NewQuizzButton