import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navClass = ({ isActive }) =>
    `text-sm font-medium transition ${isActive ? 'text-brand-600' : 'text-slate-600 hover:text-brand-600'}`;

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-lg font-bold text-brand-700">
          Resume Analyzer
        </Link>

        <nav className="flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <NavLink to="/dashboard" className={navClass}>
                Dashboard
              </NavLink>
              <NavLink to="/analysis/new" className={navClass}>
                New Analysis
              </NavLink>
              <NavLink to="/analysis/history" className={navClass}>
                History
              </NavLink>
              <span className="hidden text-sm text-slate-500 sm:inline">Hi, {user?.name}</span>
              <button onClick={handleLogout} className="btn-secondary">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navClass}>
                Login
              </NavLink>
              <Link to="/register" className="btn-primary">
                Get Started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
