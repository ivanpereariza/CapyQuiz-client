import { useState } from "react"
import { Button, Form } from "react-bootstrap"

const SearchBar = ({ handleSearchBar }) => {

    const [currentText, setText] = useState()

    return (
        <Form className="d-flex my-5">
            <Form.Control
                onChange={handleSearchBar}
                value={currentText}
                type="search"
                placeholder="Search quiz"
                className="me-2"
                aria-label="Search"
            />
        </Form>
    )
}

export default SearchBar