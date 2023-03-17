import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import './theme.css'
import Footer from './components/Footer/Footer'
import NavBar from './components/NavBar/NavBar'
import AppRoutes from './routes/AppRoutes'
import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from './contexts/theme.context'
import PopupMessage from './components/PopupMessage/PopupMessage'
import socket from './services/socket.services'
import { ModalQuizContext } from './contexts/modalQuiz.context'
import QuizDetailsModal from './components/QuizDetailsModal/QuizDetailsModal'


function App() {

  const { themeValue } = useContext(ThemeContext)
  const { setShowModalDetails, showModalDetails, selectedQuiz } = useContext(ModalQuizContext)


  useEffect(() => {
    socket.on('connect', () => {
      const transport = socket.io.engine.transport.polling

      socket.io.engine.on("upgrade", () => {
        const upgradedTransport = socket.io.engine.transport.websocket
      });

      console.log('Socket connected')
    })

    socket.on('disconnect', () => {
      console.log('Socket disconnected')
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
    }
  }, [])

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
