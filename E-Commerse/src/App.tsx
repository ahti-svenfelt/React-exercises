import { Route, Routes } from 'react-router-dom'
import { StorePage } from './pages/StorePage'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  return (
    <Routes>
      <Route path='/' element={<StorePage />}/>
      <Route path='/login' element={<AdminLogin />}/>
      <Route path='/admin' element={<AdminDashboard />}/>
    </Routes>
  )
}

export default App
