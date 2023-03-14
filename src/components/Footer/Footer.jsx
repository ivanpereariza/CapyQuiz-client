import './Footer.css'
import { useContext } from 'react'
import { ThemeContext } from '../../contexts/theme.context'

const Footer = () => {
    const { themeValue } = useContext(ThemeContext)

    return <footer className={`${themeValue} footer`}>© All rigths reserved. Created by Ivan and Gonzalo</footer>
}

export default Footer