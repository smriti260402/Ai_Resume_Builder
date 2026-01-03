import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ResumeProvider, useResume } from './context/ResumeContext';
import ResumeBuilder from './components/ResumeBuilder';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/Dashboard';
import './index.css'
import './print.css'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, token } = useResume();
  // Simple check, real app might check token expiry
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Header Component
const Header = () => {
  const { user } = useResume();
  return (
    <header className="app-header" style={{
      backgroundColor: 'var(--surface-color)',
      padding: 'var(--spacing-md) var(--spacing-xl)',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }}>
      <h1 style={{ fontSize: 'var(--font-size-xl)', color: 'var(--primary-color)', fontWeight: 'bold' }}>AI Resume Builder</h1>
      <nav>
        {user && <span style={{ marginRight: '15px', fontWeight: 'bold' }}>Welcome, {user.name}</span>}
      </nav>
    </header>
  );
}

function App() {
  return (
    <Router>
      <ResumeProvider>
        <div className="app-container">
          <Header />
          <main className="main-content" style={{
            minHeight: 'calc(100vh - 73px)',
            overflow: 'auto',
            backgroundColor: '#f8fafc'
          }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/editor" element={
                <ProtectedRoute>
                  <div style={{
                    padding: 'var(--spacing-lg)',
                    maxWidth: '1600px',
                    margin: '0 auto',
                    height: 'calc(100vh - 73px)',
                    overflow: 'hidden'
                  }}>
                    <ResumeBuilder />
                  </div>
                </ProtectedRoute>
              } />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </ResumeProvider>
    </Router>
  )
}

export default App
