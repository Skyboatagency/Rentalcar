import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CarManagement from './pages/CarManagement';
import UserManagement from './pages/UserManagement';
import BookingManagement from './pages/BookingManagement';
import Calendrier from './pages/Calendrier';
import AnalyticsReports from './pages/AnalyticsReports';
import LocationContact from './pages/LocationContact';
import SettingsPreferences from './pages/SettingsPreferences';
import FeedbackReviews from './pages/FeedbackReviews';
import AvailableCar from './pages/AvailableCar'; 
import ProtectedRoute from './components/ProtectedRoute';
import ContactUs from './pages/ContactUs';
import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import Profile from './pages/profile';
import Bookings from './pages/Bookings';
import Preferences from './pages/Preferences';
import Notifications from './pages/Notifications';
import HelpCenter from './pages/HelpCenter';
import ContactSupport from './pages/ContactSupport';
import Terms from './pages/Terms';
import Policy from './pages/Policy';
import Password from './pages/Password';
import VidangeManagement from './pages/VidangeManagement';
import { LanguageProvider } from './LanguageContext';
import RoleProtectedRoute from './components/RoleProtectedRoute';
import './App.css';

// Create a wrapper component to handle navbar visibility
const AppContent = () => {
    const [isOpen, setIsOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    // List of routes where the *admin* should NOT be able to access
    const restrictedAdminRoutes = [
        '/', // Home
        '/available-cars',
        '/contact-us',
        '/UserLogin',
        '/UserRegister',
        '/terms',
        '/policy',
        '/profile',
        '/my-profile',
        '/my-bookings',
        '/preferences',
        '/notifications',
        '/help-center',
        '/contact-support',
        '/password',
        '/change-password'
    ];

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        const user = userStr ? JSON.parse(userStr) : null;

        // If an admin is logged in and tries to access a restricted public/client route
        if (user && user.role === 'admin' && restrictedAdminRoutes.includes(location.pathname)) {
            console.log('Admin attempting to access restricted route, logging out.', location.pathname);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            // Redirect to admin login page
            navigate('/login');
        }
    }, [location.pathname, navigate]);

    // List of routes where navbar should not be shown
    const noNavbarRoutes = [
        '/available-cars',
        '/contact-us',
        '/UserLogin',
        '/UserRegister',
        '/profile',
        '/my-profile',
        '/bookings',
        '/my-bookings',
        '/preferences',
        '/notifications',
        '/help-center',
        '/contact-support',
        '/terms',
        '/policy',
        '/password',
        '/change-password',
        '/login',
        '/'  // home page
    ];

    // Check if navbar should be shown
    const shouldShowNavbar = !noNavbarRoutes.includes(location.pathname);

    return (
        <div className="App">
            {shouldShowNavbar && <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />}
            <div className="main-content">
            <Routes>
                {/* Pages publiques */}
                <Route path="/" element={<Home />} />
                <Route path="/available-cars" element={<AvailableCar />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/login" element={<Login />} />
                <Route path="/UserLogin" element={<UserLogin />} />
                <Route path="/UserRegister" element={<UserRegister />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/policy" element={<Policy />} />

                {/* Pages protégées - nécessitent une authentification utilisateur */}
                <Route path="/profile" element={<RoleProtectedRoute allowedRoles={["client"]}><Profile /></RoleProtectedRoute>} />
                <Route path="/my-profile" element={<RoleProtectedRoute allowedRoles={["client"]}><Profile /></RoleProtectedRoute>} />
                <Route path="/my-bookings" element={<RoleProtectedRoute allowedRoles={["client"]}><Bookings /></RoleProtectedRoute>} />
                <Route path="/preferences" element={<RoleProtectedRoute allowedRoles={["client"]}><Preferences /></RoleProtectedRoute>} />
                <Route path="/notifications" element={<RoleProtectedRoute allowedRoles={["client"]}><Notifications /></RoleProtectedRoute>} />
                <Route path="/help-center" element={<RoleProtectedRoute allowedRoles={["client"]}><HelpCenter /></RoleProtectedRoute>} />
                <Route path="/contact-support" element={<RoleProtectedRoute allowedRoles={["client"]}><ContactSupport /></RoleProtectedRoute>} />
                <Route path="/password" element={<RoleProtectedRoute allowedRoles={["client"]}><Password /></RoleProtectedRoute>} />
                <Route path="/change-password" element={<RoleProtectedRoute allowedRoles={["client"]}><Password /></RoleProtectedRoute>} />

                {/* Pages admin protégées */}
                <Route path="/dashboard" element={<RoleProtectedRoute allowedRoles={["admin"]}><Dashboard /></RoleProtectedRoute>} />
                <Route path="/cars" element={<RoleProtectedRoute allowedRoles={["admin"]}><CarManagement /></RoleProtectedRoute>} />
                <Route path="/users" element={<RoleProtectedRoute allowedRoles={["admin"]}><UserManagement /></RoleProtectedRoute>} />
                <Route path="/bookings" element={<RoleProtectedRoute allowedRoles={["admin"]}><BookingManagement /></RoleProtectedRoute>} />
                <Route path="/calendrier" element={<RoleProtectedRoute allowedRoles={["admin"]}><Calendrier /></RoleProtectedRoute>} />
                <Route path="/analytics" element={<RoleProtectedRoute allowedRoles={["admin"]}><AnalyticsReports /></RoleProtectedRoute>} />
                <Route path="/location" element={<RoleProtectedRoute allowedRoles={["admin"]}><LocationContact /></RoleProtectedRoute>} />
                <Route path="/settings" element={<RoleProtectedRoute allowedRoles={["admin"]}><SettingsPreferences /></RoleProtectedRoute>} />
                <Route path="/feedback" element={<RoleProtectedRoute allowedRoles={["admin"]}><FeedbackReviews /></RoleProtectedRoute>} />
                <Route path="/vidanges/:carId" element={<RoleProtectedRoute allowedRoles={["admin"]}><VidangeManagement /></RoleProtectedRoute>} />
            </Routes>
            </div>
        </div>
    );
};

function App() {
    return (
        <Router>
            <LanguageProvider>
                <AppContent />
            </LanguageProvider>
        </Router>
    );
}

export default App;
