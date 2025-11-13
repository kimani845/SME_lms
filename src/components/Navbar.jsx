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

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold text-gray-800">SME Platform</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/dashboard" className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-gray-100">
                  <Home size={18} />
                  <span>Dashboard</span>
                </Link>
                <Link to="/courses" className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-gray-100">
                  <BookOpen size={18} />
                  <span>Courses</span>
                </Link>
                <Link to="/mentor" className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-gray-100">
                  <MessageCircle size={18} />
                  <span>AI Mentor</span>
                </Link>
                <Link to="/investor-score" className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-gray-100">
                  <Award size={18} />
                  <span>Score</span>
                </Link>
                
                <div className="flex items-center space-x-2 pl-4 border-l">
                  <Link to="/profile" className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100">
                    <User size={18} />
                    <span>{user.full_name}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 px-3 py-2 rounded-md text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-gray-700 hover:text-primary-600">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {user ? (
              <>
                <Link to="/dashboard" className="block px-3 py-2 rounded-md hover:bg-gray-100">
                  Dashboard
                </Link>
                <Link to="/courses" className="block px-3 py-2 rounded-md hover:bg-gray-100">
                  Courses
                </Link>
                <Link to="/mentor" className="block px-3 py-2 rounded-md hover:bg-gray-100">
                  AI Mentor
                </Link>
                <Link to="/investor-score" className="block px-3 py-2 rounded-md hover:bg-gray-100">
                  Investor Score
                </Link>
                <Link to="/profile" className="block px-3 py-2 rounded-md hover:bg-gray-100">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 rounded-md hover:bg-gray-100">
                  Login
                </Link>
                <Link to="/register" className="block px-3 py-2 rounded-md hover:bg-gray-100">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;