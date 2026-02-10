import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardLayout from './routes/DashboardLayout'
import DashboardHome from './routes/DashboardLayout/DashboardHome'
import ClientsList from './routes/DashboardLayout/Clients'
import ProcessList from './routes/DashboardLayout/Process'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route path="home" element={<DashboardHome />} />
          <Route path="clients" element={<ClientsList />} />
          <Route path="processes" element={<ProcessList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
