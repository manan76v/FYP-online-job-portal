import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { 
  FaSignOutAlt, 
  FaChartBar, 
  FaBriefcase, 
  FaBuilding, 
  FaUsers, 
  FaUserCircle,
  FaSearch, 
  FaBlog, 
  FaEnvelope,
  FaHome,
  FaCalendarAlt,
  FaClipboardList,
  FaUserCheck
} from 'react-icons/fa';
import DropdownMenu from './DropdownMenu';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  console.log("Current user:", user); // Debug log

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Navigation items for jobseeker
  const jobSeekerNavItems = [
    { name: 'Find Jobs', path: '/find-jobs', icon: <FaSearch /> },
    { name: 'Applied Jobs', path: '/applied-jobs', icon: <FaBriefcase /> },
    { name: 'Interviews', path: '/interviews', icon: <FaCalendarAlt /> },
    { name: 'My Profile', path: '/profile', icon: <FaUserCircle /> },
  ];

  // Additional items for recruiters
  const interviewMenuItems = [
    { 
      name: 'Schedule Interview', 
      path: '/admin/interview-scheduling', 
      icon: <FaCalendarAlt className="w-4 h-4" /> 
    },
    { 
      name: 'Evaluations', 
      path: '/admin/interview-scheduling/evaluations', 
      icon: <FaClipboardList className="w-4 h-4" /> 
    },
    { 
      name: 'Candidates', 
      path: '/admin/interview-scheduling/candidates', 
      icon: <FaUserCheck className="w-4 h-4" /> 
    }
  ];

  const recruiterNavItems = [
    { id: 'rec-dashboard', name: 'Dashboard', path: '/admin/dashboard', icon: <FaChartBar key="rec-chart" /> },
    { id: 'rec-companies', name: 'Companies', path: '/admin/companies', icon: <FaBuilding key="rec-building" /> },
    { id: 'rec-jobs', name: 'Jobs', path: '/admin/jobs', icon: <FaBriefcase key="rec-briefcase" /> },
    { 
      id: 'rec-interview', 
      name: 'Interview Scheduling', 
      path: '/admin/interview-scheduling', 
      icon: <FaCalendarAlt key="rec-calendar" />,
      isDropdown: true,
      items: interviewMenuItems
    },
    { id: 'rec-applicants', name: 'Applicants', path: '/admin/applicants', icon: <FaUsers key="rec-users" /> },
    { id: 'rec-profile', name: 'Profile', path: '/admin/profile', icon: <FaUserCircle key="rec-user" /> },
  ];

  // Public navigation items
  const publicNavItems = [
    { name: 'Home', path: '/', icon: <FaHome /> },
    { name: 'Find Jobs', path: '/find-jobs', icon: <FaSearch /> },
    { name: 'Blogs', path: '/blogs', icon: <FaBlog /> },
    { name: 'Contact', path: '/contact', icon: <FaEnvelope /> },
  ];

  // Function to render navigation items based on user role
  const renderNavItems = () => {
    if (!user) {
      return (
        <div className="flex items-center gap-4">
          {publicNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center px-4 py-2 text-white hover:text-yellow-400 transition duration-300"
            >
              {item.icon}
              <span className="ml-2">{item.name}</span>
            </Link>
          ))}
          <Link
            to="/login"
            className="px-6 py-2 text-white border border-white rounded-full hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-105"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-6 py-2 text-white border border-white rounded-full hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-105"
          >
            Sign Up
          </Link>
        </div>
      );
    }

    // Match the role from the login form (case-sensitive)
    const navItems = user.role === 'recruiter' || user.role === 'admin' ? recruiterNavItems : jobSeekerNavItems;
    console.log("Selected nav items:", navItems); // Debug log
    
    return (
      <div className="flex items-center space-x-6">
        {navItems.map((item) => (
          item.isDropdown ? (
            <DropdownMenu key={item.id} items={item.items}>
              <div className="flex items-center gap-2 text-white hover:text-yellow-400 transition duration-300">
                {item.icon}
                <span>{item.name}</span>
              </div>
            </DropdownMenu>
          ) : (
            <Link
              key={item.id}
              to={item.path}
              className="flex items-center gap-2 text-white hover:text-yellow-400 transition duration-300"
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          )
        ))}
        <button
          onClick={handleLogout}
          className="flex items-center text-white hover:text-yellow-400 transition duration-300"
        >
          <FaSignOutAlt className="mr-1" />
          <span>Logout</span>
        </button>
      </div>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-purple-600 shadow-lg transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-white text-2xl font-bold">Job<span className="text-yellow-400">Portal</span></span>
          </Link>
          {renderNavItems()}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
