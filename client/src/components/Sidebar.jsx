import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ClipboardList, 
  Users, 
  LogOut, 
  Wrench, 
  Search 
} from 'lucide-react';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Definición de menús por rol
  const menuItems = {
    Coordinador: [
      { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20}/> },
      { name: 'Ticket Management', path: '/admin/tickets', icon: <ClipboardList size={20}/> },
      { name: 'Staff/Users', path: '/admin/users', icon: <Users size={20}/> },
    ],
    Técnico: [
      { name: 'My Tasks', path: '/tecnico/tasks', icon: <Wrench size={20}/> },
      { name: 'Inventory', path: '/tecnico/inventory', icon: <Search size={20}/> },
    ]
  };

  const currentMenu = menuItems[user?.role] || [];

  return (
    <div className="h-screen w-64 bg-primary text-background flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-primary">
        <h2 className="text-3xl text-center font-jost font-bold text-backgroud">SGST - IVIC</h2>
        <p className="text-xs text-center text-background/50 mt-2">{user?.name}</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {currentMenu.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors"
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <button 
        onClick={handleLogout}
        className="m-4 p-3 flex items-center gap-3 text-red-400 hover:bg-red-400/12 rounded-lg transition-colors"
      >
        <LogOut size={20}/>
        <span>Logout</span>
      </button>
    </div>
  );
}