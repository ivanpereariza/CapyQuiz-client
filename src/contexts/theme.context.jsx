import { createContext, useEffect, useState } from "react"

const ThemeContext = createContext()

function ThemeProviderWrapper(props) {


    const [themeValue, setThemeValue] = useState('dark')

    useEffect(() => {
        const theme = localStorage.getItem('theme')
        if (theme) {
            setThemeValue(theme)
        }

    }, [])

    // 

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
        <ThemeContext.Provider value={{ themeValue, switchTheme }}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export { ThemeContext, ThemeProviderWrapper }
