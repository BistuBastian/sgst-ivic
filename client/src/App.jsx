import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Importación de Componentes
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/MainLayout';

// Importación de Páginas
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import TechPanel from './pages/TechPanel';
import PublicStatus from './pages/PublicStatus';

function AppContent() {
  const { user } = useAuth(); // Obtenemos el usuario del contexto

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/login" 
          element={user ? <Navigate to={user.role === 'Coordinador' ? "/admin/dashboard" : "/tecnico/tasks"} replace /> : <Login />} 
        />
        
        <Route path="/status" element={<PublicStatus />} />

        {/* --- RUTAS PROTEGIDAS --- */}
        <Route element={<ProtectedRoute allowedRoles={['Coordinador', 'Técnico']} />}>
          <Route element={<MainLayout />}>
            <Route element={<ProtectedRoute allowedRoles={['Coordinador']} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<div>User Management Page</div>} />
              <Route path="/admin/tickets" element={<div>Ticket Management Page</div>} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['Técnico']} />}>
              <Route path="/tecnico/tasks" element={<TechPanel />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;