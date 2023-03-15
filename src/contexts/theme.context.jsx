import { createContext, useEffect, useState } from "react"

const ThemeContext = createContext()

function ThemeProviderWrapper(props) {


    const [themeValue, setThemeValue] = useState('dark')
    const [theme, setTheme] = useState('light')

    useEffect(() => {
        const themeToken = localStorage.getItem('theme')
        if (themeToken) {
            setThemeValue(themeToken)

        }

    }, [])

    useEffect(() => {
        themeValue === 'light' ? setTheme('dark') : setTheme('light')

    }, [themeValue])

    const switchTheme = () => {
        if (themeValue === 'dark') {
            setThemeValue('light')
            localStorage.setItem('theme', 'light')
        }
        if (themeValue === 'light') {
            setThemeValue('dark')
            localStorage.setItem('theme', 'dark')
        }
    }

    return (
        <ThemeContext.Provider value={{ themeValue, switchTheme, theme }}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export { ThemeContext, ThemeProviderWrapper }
