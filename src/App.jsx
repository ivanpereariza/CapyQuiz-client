import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import './theme.css'
import Footer from './components/Footer/Footer'
import NavBar from './components/NavBar/NavBar'
import AppRoutes from './routes/AppRoutes'
import { useContext, useEffect } from 'react'
import { ThemeContext } from './contexts/theme.context'
import PopupMessage from './components/PopupMessage/PopupMessage'
import socket from './services/socket.services'
import io from 'socket.io-client'
import { ModalQuizContext } from './contexts/modalQuiz.context'
import QuizDetailsModal from './components/QuizDetailsModal/QuizDetailsModal'
import { AuthContext } from './contexts/auth.context'


function App() {

  const { themeValue } = useContext(ThemeContext)
  const { setShowModalDetails, showModalDetails, selectedQuiz } = useContext(ModalQuizContext)
  const { user } = useContext(AuthContext)

  useEffect(() => {
    if (user) {
      socket.current = io.connect('https://capyquiz.vercel.app', { transports: ['websocket'] })

      socket.current.on('connect', () => {
        console.log('Socket connected')
      })

    }

    return () => {
      if (socket.current) {
        socket.current.disconect()
      }
    }
  }, [user])

  return (
    <>
      <div className={`${themeValue} primary`}>
        <NavBar />
        <AppRoutes />
      </div >
      <Footer />
      <PopupMessage />
      <QuizDetailsModal selectedQuiz={selectedQuiz} showModalDetails={showModalDetails} setShowModalDetails={setShowModalDetails} />
    </>
  )
}

export default App;
