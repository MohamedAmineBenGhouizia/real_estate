import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/client/Home';
import Dashboard from './pages/admin/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<Dashboard />} />
          </Route>

          {/* Protected Client Routes (Example) */}
          {/* <Route element={<ProtectedRoute allowedRoles={['client', 'admin']} />}>
            <Route path="/profile" element={<Profile />} />
          </Route> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
