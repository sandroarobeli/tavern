import { Routes, Route } from 'react-router-dom'

import Login from './pages/general/Login'
import Tables from './pages/general/Tables'

// 2. CHECK OUT POSSIBLE LAZY LOADING
// 3. PUT TOGETHER A SCRIPT AND TEST BUILD IT BY ALL MEANS TODAY!

const App = () => {
  return (
    <Routes>
      <Route path="" exact element={<Login />} />
      <Route path="tables" element={<Tables />} />
      {/*<Route path="admin/dashboard" exact element={<AdminDashboard />} />*/}
    </Routes>
  )
}

export default App
