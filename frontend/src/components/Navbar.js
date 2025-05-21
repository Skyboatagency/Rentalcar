import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaCar, FaUsers, FaCalendarAlt, FaChartBar, FaCog, FaComments, FaSignOutAlt, FaMapMarkerAlt } from 'react-icons/fa';

// Dictionnaire de traductions
const translations = {
  welcome: {
    en: 'Welcome to the Dashboard',
    ar: 'مرحبًا بك في لوحة القيادة',
    es: 'Bienvenido al Panel de Control',
    fr: 'Bienvenue sur le Tableau de Bord',
  },
  dashboardOverview: {
    fr: "Vue d'ensemble du tableau de bord",
    en: "Dashboard Overview",
    ar: "نظرة عامة على لوحة القيادة"
  },
  carManagement: {
    fr: "Gestion des voitures",
    en: "Car Management",
    ar: "إدارة السيارات"
  },
  userManagement: {
    fr: "Gestion des utilisateurs",
    en: "User Management",
    ar: "إدارة المستخدمين"
  },
  bookingManagement: {
    fr: "Gestion des réservations",
    en: "Booking Management",
    ar: "إدارة الحجوزات"
  },
  bookingCalendar: {
    fr: "Calendrier des réservations",
    en: "Booking Calendar",
    ar: "تقويم الحجوزات"
  },
  analyticsReports: {
    fr: "Analytique et rapports",
    en: "Analytics and Reports",
    ar: "التحليلات والتقارير"
  },
  locationContact: {
    fr: "Localisation & Contact",
    en: "Location & Contact",
    ar: "الموقع والاتصال"
  },
  settingsPreferences: {
    fr: "Paramètres et préférences",
    en: "Settings and Preferences",
    ar: "الإعدادات والتفضيلات"
  },
  feedbackReviews: {
    fr: "Retour d'information et avis",
    en: "Feedback and Reviews",
    ar: "الملاحظات والمراجعات"
  },
  logout: {
    fr: "Se déconnecter",
    en: "Logout",
    ar: "تسجيل الخروج"
  }
};

const Navbar = ({ language = 'en', isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ position: 'relative', zIndex: 1200 }}>
      {/* Icône hamburger visible uniquement quand la navbar est fermée */}
      {!isOpen && (
        <div style={styles.navbarClosedIcon} onClick={toggleMenu}>
          <FaBars />
        </div>
      )}
      {/* Navbar visible uniquement quand isOpen est true */}
      <div
        style={{
          ...styles.navbar,
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
          zIndex: 1201
        }}
      >
        {/* Icône X visible uniquement quand la navbar est ouverte */}
        {isOpen && (
          <div style={styles.toggleIcon} onClick={toggleMenu}>
            <FaTimes />
          </div>
        )}
        <div style={styles.menuContainer}>
          <div style={styles.navHeader}>
            <div style={styles.navLogo}>
              <img src="/images/snaibcarlogo.png" alt="Diab Car" style={styles.navLogoImage} />
            </div>
            <div style={styles.navTitle}>{translations.welcome[language]}</div>
          </div>
          
          <div style={styles.userInfoBox}>
            <div style={styles.avatarCircle}>
              <FaUser />
            </div>
            <div style={styles.userDetails}>
              <div style={styles.userName}>
                {(() => {
                  const storedUser = localStorage.getItem('user');
                  try {
                    return storedUser ? JSON.parse(storedUser).name || 'Admin' : 'Admin';
                  } catch (error) {
                    console.error('Error parsing user data:', error);
                    return 'Admin';
                  }
                })()}
              </div>
              <div style={styles.userRole}>Administrator</div>
            </div>
          </div>
          
          <div style={styles.navSection}>Main Navigation</div>
          
          <ul style={styles.navLinks}>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => isActive ? "active-link nav-link" : "nav-link"}
                style={styles.link}
              >
                <span style={styles.linkIcon}><FaChartBar /></span>
                <span>{translations.dashboardOverview[language]}</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cars"
                className={({ isActive }) => isActive ? "active-link nav-link" : "nav-link"}
                style={styles.link}
              >
                <span style={styles.linkIcon}><FaCar /></span>
                <span>{translations.carManagement[language]}</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/users"
                className={({ isActive }) => isActive ? "active-link nav-link" : "nav-link"}
                style={styles.link}
              >
                <span style={styles.linkIcon}><FaUsers /></span>
                <span>{translations.userManagement[language]}</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/bookings"
                className={({ isActive }) => isActive ? "active-link nav-link" : "nav-link"}
                style={styles.link}
              >
                <span style={styles.linkIcon}><FaCalendarAlt /></span>
                <span>{translations.bookingManagement[language]}</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/calendrier"
                className={({ isActive }) => isActive ? "active-link nav-link" : "nav-link"}
                style={styles.link}
              >
                <span style={styles.linkIcon}><FaCalendarAlt /></span>
                <span>{translations.bookingCalendar[language]}</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/analytics"
                className={({ isActive }) => isActive ? "active-link nav-link" : "nav-link"}
                style={styles.link}
              >
                <span style={styles.linkIcon}><FaChartBar /></span>
                <span>{translations.analyticsReports[language]}</span>
              </NavLink>
            </li>
            
            <div style={styles.navSection}>System</div>
            
            <li>
              <NavLink
                to="/settings"
                className={({ isActive }) => isActive ? "active-link nav-link" : "nav-link"}
                style={styles.link}
              >
                <span style={styles.linkIcon}><FaCog /></span>
                <div style={styles.linkContent}>
                  <span>{translations.settingsPreferences[language]}</span>
                  <span style={styles.settingsNote}>Language settings available here</span>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/feedback"
                className={({ isActive }) => isActive ? "active-link nav-link" : "nav-link"}
                style={styles.link}
              >
                <span style={styles.linkIcon}><FaComments /></span>
                <span>{translations.feedbackReviews[language]}</span>
              </NavLink>
            </li>
          </ul>

          <div style={styles.logoutContainer}>
            <button 
              style={styles.logoutButton} 
              onClick={handleLogout}
              className="logout-button"
            >
              <FaSignOutAlt style={styles.logoutIcon} />
              {translations.logout[language]}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------
const styles = {
  navbarContainer: {
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 1000,
  },
  navbarClosedIcon: {
    position: 'fixed',
    left: '20px',
    top: '20px',
    width: '40px',
    height: '40px',
    backgroundColor: '#001529',
    color: 'white',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 1001,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  },
  navbar: {
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
    width: '280px',
    backgroundColor: '#001529',
    color: 'white',
    transition: 'transform 0.3s ease',
    boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    overflowY: 'auto',
  },
  toggleIcon: {
    color: 'white',
    fontSize: '24px',
    marginLeft: 'auto',
    marginBottom: '10px',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    position: 'absolute',
    top: '20px',
    right: '20px',
  },
  menuContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '20px',
  },
  navHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '25px',
    marginTop: '20px',
  },
  navLogo: {
    marginBottom: '15px',
  },
  navLogoImage: {
    height: '60px',
    width: 'auto',
  },
  navTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  userInfoBox: {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0 30px 0',
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  avatarCircle: {
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    backgroundColor: '#1890ff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '15px',
    fontSize: '20px',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
  },
  userRole: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.7)',
  },
  navSection: {
    fontSize: '13px',
    fontWeight: 'bold',
    marginTop: '20px',
    marginBottom: '12px',
    padding: '0 20px',
    color: 'rgba(255,255,255,0.5)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  navLinks: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 20px',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '8px',
    marginBottom: '5px',
    transition: 'background 0.2s',
    textAlign: 'left',
  },
  linkIcon: {
    marginRight: '15px',
    fontSize: '18px',
    width: '24px',
    textAlign: 'center',
  },
  logoutContainer: {
    padding: '20px 0 15px 0',
    marginTop: '25px',
    borderTop: '1px solid rgba(255,255,255,0.1)',
  },
  logoutButton: {
    backgroundColor: '#ff4d4f',
    border: 'none',
    color: 'white',
    padding: '12px 20px',
    fontSize: '15px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    transition: 'background-color 0.3s',
  },
  logoutIcon: {
    marginRight: '12px',
    fontSize: '16px',
  },
  linkContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  settingsNote: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.7)',
  },
};

export default Navbar;
