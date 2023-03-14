import { Form } from "react-bootstrap"
import { useContext } from "react"
import { ThemeContext } from "../../contexts/theme.context"

const SearchBar = ({ handleSearchBar, searchValue }) => {

    const { themeValue } = useContext(ThemeContext)


    return (

        <Form className="d-flex" onSubmit={(event) => event.preventDefault()}>
            <Form.Control
                className={`${themeValue} secondary me-2`}
                onChange={handleSearchBar}
                value={searchValue}
                type="search"
                placeholder="Search quiz"
                aria-label="Search"
            />
        </Form>
    )
}

export default SearchBar