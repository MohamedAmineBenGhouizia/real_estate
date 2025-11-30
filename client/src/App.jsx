import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import ClientLayout from './layouts/ClientLayout';
import AdminLayout from './layouts/AdminLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/client/Home';
import PropertyList from './pages/client/PropertyList';
import PropertyDetails from './pages/client/PropertyDetails';
import MyReservations from './pages/client/MyReservations';
import Profile from './pages/client/Profile';
import Dashboard from './pages/admin/Dashboard';
import UsersManagement from './pages/admin/UsersManagement';
import PropertiesManagement from './pages/admin/PropertiesManagement';
import PropertyForm from './components/admin/PropertyForm';
import ReservationsManagement from './pages/admin/ReservationsManagement';
import InvoicesManagement from './pages/admin/InvoicesManagement';

import { NotificationProvider } from './context/NotificationContext';

import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationProvider>
        <AuthProvider>
          <Router>
            <Routes>
              {/* Client Routes */}
              <Route element={<ClientLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/properties" element={<PropertyList />} />
                <Route path="/properties/:id" element={<PropertyDetails />} />
                <Route path="/my-reservations" element={<MyReservations />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>

              {/* Protected Admin Routes */}
              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route element={<AdminLayout />}>
                  <Route path="/admin" element={<Dashboard />} />
                  <Route path="/admin/users" element={<UsersManagement />} />
                  <Route path="/admin/properties" element={<PropertiesManagement />} />
                  <Route path="/admin/properties/new" element={<PropertyForm />} />
                  <Route path="/admin/properties/:id/edit" element={<PropertyForm isEdit={true} />} />
                  <Route path="/admin/reservations" element={<ReservationsManagement />} />
                  <Route path="/admin/invoices" element={<InvoicesManagement />} />
                </Route>
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
