import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ParentDashboard from './pages/parent/ParentDashboard'
import HomePage from './pages/child/HomePage'
import MissionsPage from './pages/child/MissionsPage'
import MoneyPage from './pages/child/MoneyPage'
import BooksPage from './pages/child/BooksPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/parent/dashboard" element={<ParentDashboard />} />
        <Route path="/child/home"        element={<HomePage />} />
        <Route path="/child/missions"    element={<MissionsPage />} />
        <Route path="/child/money"       element={<MoneyPage />} />
        <Route path="/child/books"       element={<BooksPage />} />
        <Route path="*" element={<Navigate to="/parent/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
