import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, BookOpen, MessageCircle, Award, User, LogOut, Menu } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = user ? [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Courses', path: '/courses', icon: BookOpen },
    { name: 'AI Mentor', path: '/mentor', icon: MessageCircle },
    { name: 'Investor Score', path: '/investor-score', icon: Award },
  ] : [];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-extrabold text-xl">S</span>
              </div>
              <span className="text-2xl font-extrabold text-gray-900">Mwamko Ventures</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {user ? (
              <>
                {navItems.map((item) => (
                  <NavLink key={item.name} to={item.path} icon={item.icon}>
                    {item.name}
                  </NavLink>
                ))}
                
                <div className="relative group ml-4">
                  <Link to="/profile" className="flex items-center space-x-2 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition duration-200">
                    <User size={18} className="text-gray-700" />
                    <span className="font-medium text-gray-800">{user.full_name || 'Profile'}</span>
                  </Link>
                  {/* Dropdown for profile options could go here */}
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-4 py-2 rounded-full text-red-600 border border-red-600 hover:bg-red-50 transition duration-200 ml-2"
                >
                  <LogOut size={18} />
                  <span className="font-medium">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-5 py-2 text-gray-700 font-medium hover:text-blue-700 transition duration-200">
                  Login
                </Link>
                <Link to="/register" className="px-5 py-2 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 shadow-md transition duration-200">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {user ? (
              <>
                {navItems.map((item) => (
                  <MobileNavLink key={item.name} to={item.path}>
                    {item.name}
                  </MobileNavLink>
                ))}
                <MobileNavLink to="/profile">Profile</MobileNavLink>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-red-600 font-medium hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <MobileNavLink to="/login">Login</MobileNavLink>
                <MobileNavLink to="/register">Get Started</MobileNavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

// Helper components for cleaner JSX
const NavLink = ({ to, icon: Icon, children }) => (
  <Link 
    to={to} 
    className="flex items-center space-x-2 px-3 py-2 rounded-full text-gray-700 font-medium hover:bg-gray-100 hover:text-blue-700 transition duration-200"
  >
    {Icon && <Icon size={18} className="text-gray-600" />}
    <span>{children}</span>
  </Link>
);

const MobileNavLink = ({ to, children }) => (
  <Link 
    to={to} 
    className="block px-3 py-2 rounded-md text-gray-800 font-medium hover:bg-gray-100 hover:text-blue-700 transition duration-200"
  >
    {children}
  </Link>
);

export default Navbar;