import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardLayout from './routes/DashboardLayout'
import DashboardHome from './routes/DashboardLayout/DashboardHome'
import ClientsList from './routes/DashboardLayout/Clients'
import ProcessList from './routes/DashboardLayout/Process'
import AboutUs from './routes/DashboardLayout/AboutUs'
import LoginPage from './routes/Login'
import PrivateRoute from './components/PrivateRoute'
import RegisterPage from './routes/DashboardLayout/Register/index'
import { Toaster } from 'react-hot-toast'
import ProcessDetailsPage from './routes/DashboardLayout/ProcessDetails'

function App() {

  return (
    <BrowserRouter>

      <Toaster
        position="top-right"
        gutter={10}
        toastOptions={{
          duration: 3500,
          style: {
            background: "var(--pf-card)",
            color: "var(--pf-text)",
            border: "1px solid var(--pf-border)",
            borderRadius: "16px",
            padding: "12px 14px",
            boxShadow: "0 10px 30px rgba(2, 6, 23, 0.10)",
          },
          success: {
            duration: 2800,
            iconTheme: { primary: "var(--pf-primary-2)", secondary: "#fff" },
          },
          error: {
            duration: 4500,
            iconTheme: { primary: "var(--pf-danger)", secondary: "#fff" },
          },
        }}
      />

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }>
          <Route path="home" element={<DashboardHome />} />
          <Route path="clients" element={<ClientsList />} />
          <Route path="processes" element={<ProcessList />} />
          <Route path="process/:processId" element={<ProcessDetailsPage />} />
        </Route>

        <Route path="about-us" element={<AboutUs />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
