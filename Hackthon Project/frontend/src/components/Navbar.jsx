import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/weather', label: 'Weather' },
  { to: '/advisory', label: 'Advisory' },
  { to: '/pest-detection', label: 'Pest Detection' },
  { to: '/irrigation', label: 'Irrigation' },
  { to: '/market', label: 'Market' },
  { to: '/fertilizer', label: 'Fertilizer' },
  { to: '/alerts', label: 'Alerts' },
  { to: '/profile', label: 'Profile' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const linkClasses = ({ isActive }) =>
    `relative px-3 py-2 rounded-md text-sm font-medium transition ${
      isActive
        ? 'text-primary-dark after:absolute after:bottom-1 after:left-3 after:right-3 after:h-0.5 after:bg-primary'
        : 'text-slate-600 hover:text-primary'
    }`;

  return (
    <nav className="sticky top-0 z-40 border-b border-white/40 bg-white/80 shadow-sm backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-lg font-bold text-primary transition hover:text-primary-dark">
              SmartFarm AI
            </Link>
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <NavLink key={item.to} to={item.to} className={linkClasses}>
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <LanguageSwitcher />
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:shadow-none"
              >
                Logout
              </button>
            ) : (
              <div className="space-x-2">
                <Link
                  to="/login"
                  className="rounded-full border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:shadow-none"
                >
                  Sign Up
                </Link>
              </div>
            )}
            <button
              className="md:hidden rounded-md border border-slate-200 p-2 text-slate-600"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              ☰
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="space-y-1 px-4 pb-3 pt-2 md:hidden">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClasses} onClick={() => setIsOpen(false)}>
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

