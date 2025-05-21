import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaCar, FaUsers, FaCalendarAlt, FaChartBar, FaCog, FaComments, FaSignOutAlt, FaCalendarCheck } from 'react-icons/fa';
import axios from 'axios';

// Dictionnaire de traductions
const translations = {
  welcome: {
    en: 'Welcome to the Dashboard',
    ar: 'مرحبًا بك في لوحة القيادة',
    es: 'Bienvenido al Panel de Control',
    fr: 'Bienvenue sur le Tableau de Bord',
  },
  subtitle: {
    en: 'Manage your rentals and view your statistics',
    ar: 'إدارة التأجير وعرض الإحصائيات الخاصة بك',
    es: 'Administre sus alquileres y vea sus estadísticas',
    fr: 'Gérez vos locations et consultez vos statistiques',
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
  analyticsReports: {
    fr: "Analytique et rapports",
    en: "Analytics and Reports",
    ar: "التحليلات والتقارير"
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
  },
  totalCars: {
    fr: "Voitures totales",
    en: "Total Cars",
    ar: "إجمالي السيارات"
  },
  activeUsers: {
    fr: "Utilisateurs actifs",
    en: "Active Users",
    ar: "المستخدمين النشطين"
  },
  carsRented: {
    fr: "Voitures louées",
    en: "Cars Rented",
    ar: "السيارات المستأجرة"
  },
  addNewCar: {
    fr: "Ajouter une nouvelle voiture",
    en: "Add New Car",
    ar: "أضف سيارة جديدة"
  },
  viewAllUsers: {
    fr: "Voir tous les utilisateurs",
    en: "View All Users",
    ar: "عرض جميع المستخدمين"
  },
  checkBookings: {
    fr: "Vérifier les réservations",
    en: "Check Bookings",
    ar: "تحقق من الحجوزات"
  },
  featuredCars: {
    fr: "Voitures en vedette",
    en: "Featured Cars",
    ar: "السيارات المميزة"
  },
  noImage: {
    fr: "Pas d'image",
    en: "No Image",
    ar: "لا توجد صورة"
  },
  todaysBookings: {
    fr: "Réservations d'aujourd'hui",
    en: "Today's Bookings",
    ar: "حجوزات اليوم"
  },
};

// Add CSS for hover states via style element
const DashboardStyles = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .nav-link:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
      
      .active-link {
        background-color: #1890ff !important;
      }
      
      .dashboard-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
      }
      
      .action-button:hover {
        background-color: #40a9ff;
      }
      
      .tab-button:hover {
        opacity: 0.9;
      }
      
      .logout-button:hover {
        background-color: #ff4d4f;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return null;
};

const Dashboard = () => {
  const [language, setLanguage] = useState('en');
  const [isOpen, setIsOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [stats, setStats] = useState({
    totalCars: 0,
    activeUsers: 0,
    carsRented: 0,
    todaysBookings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lang = localStorage.getItem('language') || 'en';
    setLanguage(lang);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Fetch actual statistics from the backend
    const fetchStats = async () => {
      try {
        const API_URL = process.env.REACT_APP_API_URL || '';
        
        // Fetch cars data which will give us both total cars and rented cars
        const carsResponse = await axios.get(`${API_URL}/cars`);
        const cars = carsResponse.data;
        
        // Fetch users data
        const usersResponse = await axios.get(`${API_URL}/users`);
        const users = usersResponse.data;
        
        // Fetch bookings data
        const bookingsResponse = await axios.get(`${API_URL}/bookings`);
        const bookings = bookingsResponse.data;
        
        // Calculate statistics
        const totalCars = cars.length;
        const carsRented = cars.filter(car => car.availability === false).length;
        const activeUsers = users.length;
        
        // Calculate today's bookings
        const today = new Date().toISOString().slice(0, 10);
        const todaysBookings = bookings.filter(b => b.createdAt && b.createdAt.slice(0, 10) === today).length;
        
        setStats({
          totalCars,
          activeUsers,
          carsRented,
          todaysBookings,
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  return (
    <div style={styles.container}>
      <DashboardStyles />
      <MainContent language={language} windowWidth={windowWidth} stats={stats} loading={loading} isOpen={isOpen} />
    </div>
  );
};

// ---------------------------------------------------------------------
// Composant MainContent (Dashboard proprement dit)
// ---------------------------------------------------------------------
const MainContent = ({ language, windowWidth, stats, loading, isOpen }) => {
  const [cars, setCars] = useState([]);
  const [contentMarginLeft, setContentMarginLeft] = useState('0px');

  const API_URL = process.env.REACT_APP_API_URL;
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const fetchCars = async () => {
    try {
      const res = await axios.get(`${API_URL}/cars`);
      setCars(res.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des voitures :', error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
      if (windowWidth < 768) {
        setContentMarginLeft('0px');
      } else {
        setContentMarginLeft(isOpen ? '290px' : '0px');
      }
  }, [windowWidth, isOpen]);

  const displayedCars = cars;

  // Responsive: make action buttons same width on mobile
  const isMobile = windowWidth < 768;
  const actionButtonMobileStyle = isMobile ? { width: '98vw', maxWidth: 400, alignSelf: 'center', justifyContent: 'center', textAlign: 'center' } : {};

  return (
    <div 
      style={{ 
        ...styles.mainWrapper,
        marginLeft: contentMarginLeft
      }}
    >
      <div style={styles.mainContent}>
        <div style={styles.pageHeader}>
          <h1 style={styles.pageTitle}>{translations.dashboardOverview[language]}</h1>
          <div style={styles.titleUnderline}></div>
          <p style={styles.pageSubtitle}>Manage your car rental business from one central dashboard</p>
        </div>

        {/* Statistics Cards */}
        <div style={styles.statsContainer}>
          <div style={styles.statsCard}>
            <div style={styles.statsIconContainer}>
              <FaCar style={styles.statsIcon} />
            </div>
            <div style={styles.statsContent}>
              <div style={styles.statsValue}>{stats.totalCars}</div>
              <div style={styles.statsLabel}>{translations.totalCars[language]}</div>
            </div>
          </div>
          
          <div style={styles.statsCard}>
            <div style={{...styles.statsIconContainer, backgroundColor: 'rgba(82, 196, 26, 0.1)'}}>
              <FaUsers style={{...styles.statsIcon, color: '#52c41a'}} />
            </div>
            <div style={styles.statsContent}>
              <div style={styles.statsValue}>{stats.activeUsers}</div>
              <div style={styles.statsLabel}>{translations.activeUsers[language]}</div>
            </div>
          </div>
          
          <div style={styles.statsCard}>
            <div style={{...styles.statsIconContainer, backgroundColor: 'rgba(24, 144, 255, 0.1)'}}>
              <FaCalendarAlt style={{...styles.statsIcon, color: '#1890ff'}} />
            </div>
            <div style={styles.statsContent}>
              <div style={styles.statsValue}>{stats.carsRented}</div>
              <div style={styles.statsLabel}>{translations.carsRented[language]}</div>
            </div>
          </div>
          
          <div style={styles.statsCard}>
            <div style={{...styles.statsIconContainer, backgroundColor: 'rgba(250, 173, 20, 0.1)'}}>
              <FaCalendarCheck style={{...styles.statsIcon, color: '#faad14'}} />
            </div>
            <div style={styles.statsContent}>
              <div style={styles.statsValue}>{stats.todaysBookings}</div>
              <div style={styles.statsLabel}>{translations.todaysBookings[language]}</div>
            </div>
          </div>
        </div>

        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>{translations.featuredCars[language]}</h2>
          <div style={styles.sectionTitleUnderline}></div>
        </div>

        <div style={styles.buttonsContainer}>
          <Link to="/cars" style={{ ...styles.actionButton, ...actionButtonMobileStyle }} className="action-button">
            <FaCar style={styles.actionButtonIcon} />
            {translations.addNewCar[language]}
          </Link>
          <Link to="/users" style={{ ...styles.actionButton, ...actionButtonMobileStyle }} className="action-button">
            <FaUsers style={styles.actionButtonIcon} />
            {translations.viewAllUsers[language]}
          </Link>
          <Link to="/bookings" style={{ ...styles.actionButton, ...actionButtonMobileStyle }} className="action-button">
            <FaCalendarAlt style={styles.actionButtonIcon} />
            {translations.checkBookings[language]}
          </Link>
        </div>

        <div style={styles.cardContainer}>
          {displayedCars.map((car) => (
            <div key={car.id} style={styles.card} className="dashboard-card">
              {car.image_url ? (
                <img
                  src={`${BASE_URL}${car.image_url}`}
                  alt={car.name}
                  style={styles.cardImage}
                />
              ) : (
                <div style={styles.noImage}>
                  <FaCar style={styles.noImageIcon} />
                  <div>{translations.noImage[language]}</div>
                </div>
              )}
              <div style={styles.cardBody}>
                <h3 style={styles.cardTitle}>{car.name}</h3>
                <p style={styles.cardModel}>{car.model}</p>
                <div style={styles.cardDetails}>
                  <div style={styles.cardPrice}>{car.price_per_day} DH/Day</div>
                  <div 
                    style={{
                      ...styles.cardAvailability,
                      backgroundColor: car.availability ? 'rgba(82, 196, 26, 0.2)' : 'rgba(255, 77, 79, 0.2)',
                      color: car.availability ? '#52c41a' : '#ff4d4f'
                    }}
                  >
                    {car.availability ? "Available" : "Rented"}
                  </div>
                </div>
                <div style={styles.cardActions}>
                  <Link 
                    to={`/cars`} 
                    style={{...styles.cardButton, display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                  >
                    Edit
                  </Link>
                  <Link 
                    to={`/cars`} 
                    style={{...styles.cardButton, display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------
const styles = {
  container: {
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  mainWrapper: {
    position: 'relative',
    minHeight: '100vh',
    transition: 'margin-left 0.3s ease',
    padding: '20px',
  },
  // --- MAIN CONTENT ---
  mainContent: {
    margin: '0 auto',
    maxWidth: '1200px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  pageHeader: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  pageTitle: {
    fontSize: '28px',
    fontWeight: '600',
    marginBottom: '10px',
    color: '#001529',
    textAlign: 'center',
  },
  titleUnderline: {
    height: '3px',
    width: '60px',
    background: 'linear-gradient(90deg, #1890ff, #40a9ff)',
    margin: '0 auto',
    marginBottom: '15px',
    borderRadius: '2px',
    boxShadow: '0 2px 4px rgba(24, 144, 255, 0.3)',
  },
  pageSubtitle: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '20px',
  },
  statsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    marginBottom: '40px',
  },
  statsCard: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    flex: '1 1 250px',
    transition: 'transform 0.2s, box-shadow 0.2s',
    border: '1px solid #eee',
  },
  statsIconContainer: {
    backgroundColor: 'rgba(255, 77, 79, 0.1)',
    padding: '20px',
    textAlign: 'center',
  },
  statsIcon: {
    fontSize: '32px',
    color: '#ff4d4f',
  },
  statsContent: {
    padding: '20px',
  },
  statsValue: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#001529',
  },
  statsLabel: {
    fontSize: '14px',
    color: '#666',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '30px',
    marginTop: '100px'
  },
  sectionTitle: {
    fontSize: '22px',
    fontWeight: '600',
    margin: 0,
    color: '#001529',
  },
  sectionTitleUnderline: {
    height: '3px',
    width: '40px',
    background: 'linear-gradient(90deg, #1890ff, #40a9ff)',
    margin: '10px auto',
    borderRadius: '2px',
    boxShadow: '0 2px 4px rgba(24, 144, 255, 0.3)',
  },
  tabBar: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
    marginBottom: '30px',
    justifyContent: 'center',
  },
  tabButton: {
    padding: '10px 20px',
    backgroundColor: '#f0f2f5',
    color: '#333',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontSize: '14px',
  },
  tabButtonActive: {
    padding: '10px 20px',
    backgroundColor: '#1890ff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '500',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(24, 144, 255, 0.3)',
    fontSize: '14px',
  },
  buttonsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
    marginBottom: '30px',
    justifyContent: 'center',
  },
  actionButton: {
    backgroundColor: '#1890ff',
    color: '#fff',
    padding: '12px 20px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '500',
    boxShadow: '0 2px 6px rgba(24, 144, 255, 0.3)',
    display: 'flex',
    alignItems: 'center',
    transition: 'background-color 0.2s',
    fontSize: '14px',
  },
  actionButtonIcon: {
    marginRight: '10px',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '25px',
    width: '100%',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s, box-shadow 0.3s',
    border: '1px solid #eee',
  },
  cardImage: {
    width: '100%',
    height: '160px',
    objectFit: 'cover',
  },
  noImage: {
    width: '100%',
    height: '160px',
    backgroundColor: '#f0f2f5',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#999',
  },
  noImageIcon: {
    fontSize: '32px',
    marginBottom: '10px',
    color: '#ccc',
  },
  cardBody: {
    padding: '15px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0 0 5px 0',
    color: '#001529',
  },
  cardModel: {
    fontSize: '14px',
    margin: '0 0 10px 0',
    color: '#666',
  },
  cardDetails: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '5px 0 15px 0',
  },
  cardPrice: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#1890ff',
  },
  cardAvailability: {
    fontSize: '12px',
    padding: '4px 8px',
    borderRadius: '4px',
    fontWeight: '500',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 'auto',
    gap: '10px',
  },
  cardButton: {
    backgroundColor: '#1890ff',
    color: '#fff',
    padding: '8px 0',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    flex: 1,
    fontWeight: '500',
    transition: 'background-color 0.2s',
  }
};

export default Dashboard;