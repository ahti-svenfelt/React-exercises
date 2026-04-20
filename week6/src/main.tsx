import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import FridgeApp from './FridgeApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <FridgeApp />
  </StrictMode>,
)
