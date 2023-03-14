import './Footer.css'
import { useContext } from 'react'
import { ThemeContext } from '../../contexts/theme.context'

const Footer = () => {
    const { themeValue } = useContext(ThemeContext)

    return (
        <footer className={`${themeValue} footer`} style={{ letterSpacing: '2px' }}>
            &copy; 2023 Quiz App.  All rights reserved.  Created by Ivan and Gonzalo
        </footer>)
}

export default Footer