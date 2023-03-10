import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProviderWrapper } from './contexts/auth.context'
import { ThemeProviderWrapper } from './contexts/theme.context'
import { MessageProviderWrapper } from './contexts/message.context'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <AuthProviderWrapper>
    <ThemeProviderWrapper>
      <MessageProviderWrapper>
        <Router>
          <App />
        </Router>
      </MessageProviderWrapper>
    </ThemeProviderWrapper>
  </AuthProviderWrapper>
)