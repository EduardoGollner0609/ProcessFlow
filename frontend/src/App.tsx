import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardLayout from './routes/DashboardLayout'
import DashboardHome from './routes/DashboardLayout/DashboardHome'
import ClientsList from './routes/DashboardLayout/Clients'
import ProcessList from './routes/DashboardLayout/Process'
import AboutUs from './routes/DashboardLayout/AboutUs'
import LoginPage from './routes/Login'
import PrivateRoute from './components/PrivateRoute'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }>
          <Route path="home" element={<DashboardHome />} />
          <Route path="clients" element={<ClientsList />} />
          <Route path="processes" element={<ProcessList />} />
        </Route>

        <Route path="about-us" element={<AboutUs />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
