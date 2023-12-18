import { Routes, Route } from 'react-router-dom'

import Login from './pages/general/Login'
// import Versions from './components/Versions' // DO NOT DELETE YET

// text: #F80 background: #222 font-family: League Gothic font-variant: Regular 400 normal

// 1. TEST UI PAGE RESPONSIVENESS
// 2. HASH THE PASSWORDS AT SOME POINT IN NEAR FUTURE
const App = () => {
  return (
    <Routes>
      <Route path="" exact element={<Login />} />
      {/*<Route path="admin/dashboard" exact element={<AdminDashboard />} />*/}
    </Routes>
  )
}

export default App
