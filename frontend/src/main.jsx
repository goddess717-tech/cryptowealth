import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import Apple from './Apple.jsx'
import { UnlockProvider } from './UnlockContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UnlockProvider>
      <Apple />
    </UnlockProvider>
  </StrictMode>,
)
