import { Navigate, Route, Routes } from 'react-router-dom'
import FoundationPage from './pages/FoundationPage'
import PrivacyPlaceholderPage from './pages/PrivacyPlaceholderPage'
import PracticePage from './pages/PracticePage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<FoundationPage />} />
      <Route path="/privacy" element={<PrivacyPlaceholderPage />} />
      <Route path="/practice" element={<PracticePage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  )
}
