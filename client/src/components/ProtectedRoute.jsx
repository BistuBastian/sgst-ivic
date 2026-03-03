import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();

  // Espera a que AuthContext lea localStorage antes de decidir
  if (loading) return null;

  // Si no está logueado, al Login
  if (!user) return <Navigate to="/login" replace />;

  // Redirige a /login
  if (allowedRoles && !allowedRoles.includes(user.rol)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;