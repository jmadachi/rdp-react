import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'normalize.css';
import './index.css'
import App from './App.tsx'
import {PurchaseProvider} from "./context/PurchaseContext";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <PurchaseProvider>
        <App />
      </PurchaseProvider>
  </StrictMode>,
)
