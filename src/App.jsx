import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import './theme.css'
import Footer from './components/Footer/Footer'
import NavBar from './components/NavBar/NavBar'
import AppRoutes from './routes/AppRoutes'
import { useContext } from 'react'
import { ThemeContext } from './contexts/theme.context'
import PopupMessage from './components/PopupMessage/PopupMessage'

function App() {

  const { themeValue } = useContext(ThemeContext)


  return (
    <>
      <div className={`${themeValue} primary`}>
        <NavBar />
        <AppRoutes />
      </div >
      <Footer />
      <PopupMessage />
    </>
  )
}

export default App;
