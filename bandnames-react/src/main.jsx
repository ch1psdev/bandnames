import { createRoot } from 'react-dom/client'
import './index.css'
import App from './Pages/HomePage.jsx'
import { BandNamesApp } from './BandNamesApp.jsx'

createRoot(document.getElementById('root')).render(
    <BandNamesApp />
)
