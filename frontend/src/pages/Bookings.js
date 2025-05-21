import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { 
  FaSun, FaMoon, FaLanguage, FaMoneyBillWave, FaUser, 
  FaChevronDown, FaChevronUp, FaMapMarkerAlt, FaSync, 
  FaTimes, FaUserPlus, FaCheckCircle, FaGasPump, FaCog, 
  FaUsers, FaEnvelope, FaFacebookF, FaInstagram, FaList, FaStar, FaChevronLeft, FaChevronRight, FaCalendarAlt 
} from 'react-icons/fa';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import 'moment/locale/fr';

/*--------------------------------*/
/*         Bookings Page          */
/*--------------------------------*/
const Bookings = () => {
  const storedUser = localStorage.getItem("user");
  let localUser = null;
  try {
    localUser = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    // Si erreur de parsing, considérer l'utilisateur comme non connecté
  }
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currency, setCurrency] = useState('MAD');
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'pending' | 'approved' | 'completed' | 'denied'
  const [feedbackStates, setFeedbackStates] = useState({}); // { [bookingId]: { hasFeedback: bool, loading: bool } }
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackBooking, setFeedbackBooking] = useState(null);
  const [feedbackStars, setFeedbackStars] = useState(0);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false);
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);
  
  // Add pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of bookings per page

  // Calculate paginated bookings
  const getPaginatedBookings = () => {
    const filteredBookings = bookings.filter(b => 
      activeTab === 'all' ? true : (b.status && b.status.toLowerCase() === activeTab.toLowerCase())
    );
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = filteredBookings.slice(startIndex, endIndex);
    
    return {
      items: paginatedItems,
      totalPages: Math.ceil(filteredBookings.length / itemsPerPage)
    };
  };

  const paginatedBookings = getPaginatedBookings();

  // Reset to first page when tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);
  
  // Textes multilingues
  const texts = {
    en: {
      // Bookings page translations
      bookingsTitle: "My Bookings",
      pending: "Pending",
      approved: "Approved",
      completed: "Completed",
      denied: "Denied",
      noBookings: "No bookings found for {status} status.",
      pricePerDay: "Price per day",
      bookingDate: "Booking Date",
      returnDate: "Return Date",
      duration: "Duration",
      day: "day",
      days: "days",
      totalCost: "Total cost",
      details: "Details",
      // TopBar translations
      navHome: "Home",
      navAvailableCars: "Available Cars",
      navContactUs: "Contact Us",
      signIn: "Sign in",
      signOut: "Sign Out",
      login: "Login",
      register: "Register",
      myProfile: "My Profile",
      myBookings: "My Bookings",
      accountSettings: "Account Settings",
      notifications: "Notifications",
      preferences: "Preferences",
      changePassword: "Change Password",
      customerSupport: "Customer Support",
      helpCenter: "Help Center",
      contactSupport: "Contact Support",
      notLoggedIn: "Not logged in",
      profileOverview: "Profile Overview",
      // Footer translations
      footerAbout: "About Us",
      footerQuickLinks: "Quick Links",
      footerContact: "Contact Us",
      footerHome: "Home",
      footerLocation: "Contact Info",
      footerCopyright: "©2024 Diabcar. All rights reserved"
    },
    fr: {
      // Bookings page translations
      bookingsTitle: "Mes Réservations",
      pending: "En attente",
      approved: "Approuvées",
      completed: "Terminées",
      denied: "Refusées",
      noBookings: "Aucune réservation trouvée avec le statut {status}.",
      pricePerDay: "Prix par jour",
      bookingDate: "Date de réservation",
      returnDate: "Date de retour",
      duration: "Durée",
      day: "jour",
      days: "jours",
      totalCost: "Coût total",
      details: "Détails",
      // TopBar translations
      navHome: "Accueil",
      navAvailableCars: "Voitures Disponibles",
      navContactUs: "Contactez-nous",
      signIn: "Se connecter",
      signOut: "Se déconnecter",
      login: "Connexion",
      register: "Inscription",
      myProfile: "Mon Profil",
      myBookings: "Mes Réservations",
      accountSettings: "Paramètres du compte",
      notifications: "Notifications",
      preferences: "Préférences",
      changePassword: "Modifier le mot de passe",
      customerSupport: "Support client",
      helpCenter: "Centre d'aide",
      contactSupport: "Contacter le support",
      notLoggedIn: "Non connecté",
      profileOverview: "Vue d'ensemble du profil",
      // Footer translations
      footerAbout: "À propos",
      footerQuickLinks: "Liens rapides",
      footerContact: "Contactez-nous",
      footerHome: "Accueil",
      footerLocation: "Informations de contact",
      footerCopyright: "©2024 Diabcar. Tous droits réservés"
    },
    ar: {
      // Bookings page translations
      bookingsTitle: "حجوزاتي",
      pending: "قيد الانتظار",
      approved: "تمت الموافقة",
      completed: "مكتملة",
      denied: "مرفوضة",
      noBookings: "لم يتم العثور على حجوزات ذات حالة {status}.",
      pricePerDay: "السعر لليوم الواحد",
      bookingDate: "تاريخ الحجز",
      returnDate: "تاريخ العودة",
      duration: "المدة",
      day: "يوم",
      days: "أيام",
      totalCost: "التكلفة الإجمالية",
      details: "التفاصيل",
      // TopBar translations
      navHome: "الرئيسية",
      navAvailableCars: "السيارات المتاحة",
      navContactUs: "اتصل بنا",
      signIn: "تسجيل الدخول",
      signOut: "تسجيل الخروج",
      login: "دخول",
      register: "تسجيل",
      myProfile: "ملفي الشخصي",
      myBookings: "حجوزاتي",
      accountSettings: "إعدادات الحساب",
      notifications: "الإشعارات",
      preferences: "التفضيلات",
      changePassword: "تغيير كلمة المرور",
      customerSupport: "دعم العملاء",
      helpCenter: "مركز المساعدة",
      contactSupport: "اتصل بالدعم",
      notLoggedIn: "غير مسجل الدخول",
      profileOverview: "نظرة عامة على الملف الشخصي",
      // Footer translations
      footerAbout: "من نحن",
      footerQuickLinks: "روابط سريعة",
      footerContact: "اتصل بنا",
      footerHome: "الرئيسية",
      footerLocation: "معلومات الاتصال",
      footerCopyright: "2024© دياب كار. جميع الحقوق محفوظة"
    }
  };
  
  const lang = texts[selectedLanguage];
  
  const API_URL = process.env.REACT_APP_API_URL;
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  
  useEffect(() => {
    if (!localUser) {
      window.location.href = "/UserLogin";
      return;
    }
  }, [localUser]);
  
  // Récupération des réservations par la nouvelle route optimisée
  useEffect(() => {
    if (!localUser) return;
    axios.get(`${API_URL}/bookings/user/${localUser.id}/with-cars-feedbacks`)
      .then((res) => {
        setBookings(res.data);
      })
      .catch(err => {
        console.error("Erreur lors de la récupération des réservations :", err);
      });
  }, [API_URL, localUser]);
  
  const convertPrice = (price) => {
    const conversionRates = { MAD: 1, EURO: 0.09, DOLLAR: 0.10 };
    return (price * (conversionRates[currency] || 1)).toFixed(2);
  };
  
  const getTotalCost = (booking) => {
    if (booking.total_price) return booking.total_price;
    if (!booking.start_date || !booking.end_date || !booking.car) return 0;
    const days = moment(booking.end_date).diff(moment(booking.start_date), 'days') + 1;
    if (days < 1) return 0;
    return days * (booking.car.price_per_day || 0);
  };
  
  const openFeedbackModal = (booking) => {
    setFeedbackBooking(booking);
    setFeedbackStars(0);
    setFeedbackComment('');
    setFeedbackSuccess(false);
    setShowFeedbackModal(true);
  };
  const closeFeedbackModal = () => {
    setShowFeedbackModal(false);
  };
  const handleFeedbackSubmit = async () => {
    if (!feedbackBooking || feedbackStars === 0 || feedbackComment.trim() === '') return;
    console.log('feedbackBooking:', feedbackBooking);
    if (!feedbackBooking.start_date || !feedbackBooking.end_date) {
      alert("Impossible d'envoyer un avis : dates de réservation manquantes.");
      return;
    }
    setFeedbackSubmitting(true);
    try {
      await axios.post(`${API_URL}/feedbacks`, {
        user_id: localUser.id,
        car_id: feedbackBooking.car_id,
        start_date: feedbackBooking.start_date,
        end_date: feedbackBooking.end_date,
        description: feedbackComment,
        stars: feedbackStars
      });
      setFeedbackSuccess(true);
      setFeedbackStates(prev => ({ ...prev, [feedbackBooking.id]: { hasFeedback: true, loading: false } }));
      setTimeout(() => {
        setShowFeedbackModal(false);
      }, 1500);
    } catch (e) {
      alert("Erreur lors de l'envoi du feedback.");
    }
    setFeedbackSubmitting(false);
  };
  
  // Responsivité : hook pour largeur d'écran
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const isMobile = windowWidth < 900;
  const dynamicPaddingTop = isMobile ? 60 : 90;

  // Styles responsives
  const bookingsContainerStyle = {
    ...styles.bookingsContainer,
    maxWidth: isMobile ? '99vw' : '60%',
    width: isMobile ? '99vw' : '60%',
    padding: isMobile ? '12px' : '40px 32px',
    marginTop: isMobile ? '80px' : '200px',
  };
  const pageContainerStyle = {
    ...styles.pageContainer,
    paddingTop: dynamicPaddingTop,
  };
  const managementCardStyle = {
    ...styles.managementCard,
    flexDirection: isMobile ? 'column' : 'row',
    width: isMobile ? '100%' : '80%',
    maxWidth: isMobile ? '98vw' : '700px',
    gap: isMobile ? '10px' : '20px',
    alignItems: isMobile ? 'flex-start' : 'center',
    padding: isMobile ? '12px' : '20px',
  };
  const managementCardImageContainerStyle = {
    ...styles.managementCardImageContainer,
    width: isMobile ? '100%' : '180px',
    height: isMobile ? '90px' : '120px',
    borderRadius: '12px',
  };
  const managementCardImageStyle = {
    ...styles.managementCardImage,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };
  const tabsRowStyle = {
    ...styles.tabsRow,
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: isMobile ? 'center' : undefined,
    justifyContent: isMobile ? 'center' : 'center',
    gap: isMobile ? '12px' : '16px',
    flexWrap: isMobile ? 'nowrap' : 'wrap',
    overflowX: isMobile ? 'visible' : 'visible',
    width: isMobile ? '100%' : undefined,
    marginBottom: isMobile ? '24px' : '32px',
  };
  const managementTitleStyle = {
    ...styles.managementTitle,
    fontSize: isMobile ? '24px' : (windowWidth < 1200 ? '28px' : '32px'),
  };
  const managementSubtitleStyle = {
    ...styles.managementSubtitle,
    fontSize: isMobile ? '13px' : (windowWidth < 1200 ? '14px' : '15px'),
  };
  
  const tabButtonMobileStyle = isMobile ? { width: '90vw', maxWidth: 400, alignSelf: 'center' } : {};
  
  const renderBookingCard = (booking) => {
    const car = booking.Car || booking.car;
    const carName = car ? car.name : 'Unknown Car';
    const location = car ? car.location : 'Unknown Location';
    const pricePerDay = car ? car.price_per_day : 0;
    const bookingDateStr = booking.start_date ? moment(booking.start_date).locale('en').format('LL') : 'N/A';
    const returnDateStr = booking.end_date ? moment(booking.end_date).locale('en').format('LL') : 'N/A';
    const days = booking.start_date && booking.end_date ? moment(booking.end_date).diff(moment(booking.start_date), 'days') + 1 : 0;
    const totalCostMAD = getTotalCost(booking);
    const totalCostConverted = convertPrice(totalCostMAD);
    const feedback = booking.Feedback || booking.feedback;

    return (
      <div key={booking.id} style={managementCardStyle}>
        {/* Car Image */}
        <div style={managementCardImageContainerStyle}>
          {car && car.image_url ? (
            <img src={`${BASE_URL}${car.image_url}`} alt={carName} style={managementCardImageStyle} />
          ) : (
            <img src="/images/no-car.png" alt="No Car" style={managementCardImageStyle} />
          )}
        </div>
        {/* Card Info */}
        <div style={{...styles.managementCardInfoWrapper, width: '100%'}}>
          {/* Header: Car Name & Status */}
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6}}>
            <h3 style={{...styles.managementCardTitle, fontSize: 18, margin: 0, fontWeight: 700}}>{carName}</h3>
            <span style={{
              ...styles.managementStatusBadge,
              backgroundColor:
                booking.status === 'completed' ? '#52c41a' :
                booking.status === 'approved' ? '#1890ff' :
                booking.status === 'pending' ? '#faad14' :
                booking.status === 'denied' ? '#ff4d4f' :
                '#666',
              fontWeight: 600,
              fontSize: 13,
              padding: '4px 14px',
              marginLeft: 8
            }}>
              {lang[booking.status] || booking.status}
            </span>
          </div>
          {/* Location */}
          <div style={{display: 'flex', alignItems: 'center', color: '#555', fontSize: 14, marginBottom: 10}}>
            <FaMapMarkerAlt style={{marginRight: 6, color: '#1890ff'}} />
            <span>{location}</span>
          </div>
          {/* Divider */}
          <div style={{height: 1, background: '#eaeaea', margin: '8px 0 12px 0', width: '100%'}} />
          {/* Dates & Duration */}
          <div style={{display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 6 : 24, alignItems: isMobile ? 'flex-start' : 'center', marginBottom: 10}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 6}}>
              <FaCalendarAlt style={{color: '#111', marginRight: 4}} />
              <span style={{fontWeight: 500, color: '#333'}}>{lang.bookingDate}:</span>
              <span style={{marginLeft: 4}}>{bookingDateStr}</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: 6}}>
              <FaCalendarAlt style={{color: '#111', marginRight: 4}} />
              <span style={{fontWeight: 500, color: '#333'}}>{lang.returnDate}:</span>
              <span style={{marginLeft: 4}}>{returnDateStr}</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: 6, background: '#f0f2f5', borderRadius: 8, padding: '2px 10px', fontWeight: 600, color: '#1890ff', fontSize: 14, marginTop: isMobile ? 6 : 0}}>
              <FaUsers style={{color: '#1890ff', marginRight: 2}} />
              {lang.duration}: {days} {days > 1 ? lang.days : lang.day}
            </div>
          </div>
          {/* Divider */}
          <div style={{height: 1, background: '#eaeaea', margin: '8px 0 12px 0', width: '100%'}} />
          {/* Price Details */}
          <div style={{display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 6 : 32, alignItems: isMobile ? 'flex-start' : 'center', marginBottom: 6}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 6}}>
              <FaMoneyBillWave style={{color: '#52c41a', marginRight: 4}} />
              <span style={{fontWeight: 500, color: '#333'}}>{lang.pricePerDay}:</span>
              <span style={{marginLeft: 4}}>{pricePerDay} {currency}</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: 6}}>
              <FaMoneyBillWave style={{color: '#111', marginRight: 4}} />
              <span style={{fontWeight: 700, color: '#111'}}>{lang.totalCost}:</span>
              <span style={{marginLeft: 4, fontWeight: 700, color: '#111', fontSize: 16}}>{totalCostConverted} {currency}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const handleSignOut = () => { 
    localStorage.removeItem('user'); 
    window.location.reload(); 
  };
  
  const renderPagination = () => {
    const totalPages = paginatedBookings.totalPages;
    if (totalPages <= 1) return null;

    return (
      <div style={styles.paginationContainer}>
        <div style={styles.paginationWrapper}>
          <button
            style={{
              ...styles.paginationButton,
              opacity: currentPage === 1 ? 0.5 : 1,
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            }}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <FaChevronLeft style={{ fontSize: '12px' }} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              style={{
                ...styles.paginationButton,
                ...(currentPage === page ? styles.paginationButtonActive : {}),
              }}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            style={{
              ...styles.paginationButton,
              opacity: currentPage === totalPages ? 0.5 : 1,
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            }}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <FaChevronRight style={{ fontSize: '12px' }} />
          </button>
        </div>
      </div>
    );
  };
  
  return (
    <div style={pageContainerStyle}>
      <TopBar
        isLoggedIn={!!localUser}
        userName={localUser ? localUser.name : ''}
        onSignOut={handleSignOut}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        lang={lang}
      />
      
      <div style={bookingsContainerStyle}>
        {/* Header Section */}
        <div style={styles.headerSection}> 
          <h1 style={managementTitleStyle}>Booking History</h1>
          <div style={styles.managementTitleUnderline}></div>
          <div style={managementSubtitleStyle}>View details and track booking activity & history</div>
        </div>
        <div style={tabsRowStyle}>
          <button 
            style={{ ...(activeTab === 'all' ? styles.tabButtonActive : styles.tabButton), ...tabButtonMobileStyle }}
            onClick={() => setActiveTab('all')}
          >
            All Bookings
          </button>
          <button 
            style={{ ...(activeTab === 'pending' ? styles.tabButtonActive : styles.tabButton), ...tabButtonMobileStyle }}
            onClick={() => setActiveTab('pending')}
          >
            Pending
          </button>
          <button 
            style={{ ...(activeTab === 'approved' ? styles.tabButtonActive : styles.tabButton), ...tabButtonMobileStyle }}
            onClick={() => setActiveTab('approved')}
          >
            Approved
          </button>
          <button 
            style={{ ...(activeTab === 'completed' ? styles.tabButtonActive : styles.tabButton), ...tabButtonMobileStyle }}
            onClick={() => setActiveTab('completed')}
          >
            Completed
          </button>
          <button 
            style={{ ...(activeTab === 'denied' ? styles.tabButtonActive : styles.tabButton), ...tabButtonMobileStyle }}
            onClick={() => setActiveTab('denied')}
          >
            Cancelled
          </button>
        </div>
        
        <div style={styles.cardsList}>
          {paginatedBookings.items.length === 0 ? (
            <p style={styles.noBookings}>{lang.noBookings.replace('{status}', activeTab)}</p>
          ) : (
            paginatedBookings.items.map(booking => renderBookingCard(booking))
          )}
        </div>

        {renderPagination()}
      </div>
      
      {/* Footer */}
      <Footer lang={lang} />
      {/* Modal Feedback */}
      {showFeedbackModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={{ marginBottom: 16, color: '#722637' }}>Donnez votre avis</h2>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
              {[1,2,3,4,5].map(star => (
                <FaStar
                  key={star}
                  style={{
                    color: star <= feedbackStars ? '#FFD700' : '#e4e5e9',
                    fontSize: 32,
                    cursor: 'pointer',
                    transition: 'color 0.2s'
                  }}
                  onClick={() => setFeedbackStars(star)}
                />
              ))}
            </div>
            <textarea
              style={styles.textarea}
              rows={4}
              placeholder="Votre avis..."
              value={feedbackComment}
              onChange={e => setFeedbackComment(e.target.value)}
              disabled={feedbackSubmitting || feedbackSuccess}
            />
            {feedbackSuccess && <div style={{ color: '#52c41a', margin: '12px 0', fontWeight: 600 }}>Merci pour votre avis !</div>}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 16 }}>
              <button
                style={{ ...styles.modalButton, background: '#eee', color: '#333' }}
                onClick={closeFeedbackModal}
                disabled={feedbackSubmitting}
              >Annuler</button>
              <button
                style={{ ...styles.modalButton, background: '#722637', color: '#fff', opacity: feedbackStars === 0 || feedbackComment.trim() === '' ? 0.6 : 1 }}
                onClick={handleFeedbackSubmit}
                disabled={feedbackSubmitting || feedbackStars === 0 || feedbackComment.trim() === ''}
              >{feedbackSubmitting ? 'Envoi...' : 'Envoyer mon avis'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/*--------------------------------*/
/*            STYLES              */
/*--------------------------------*/
const styles = {
  pageContainer: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
  },
  bookingsContainer: {
    margin: '0 auto',
    width: '60%',
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '40px 32px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.10)',
    marginTop: '200px',
    marginBottom: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  bookingsTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '24px',
    textAlign: 'center',
  },
  tabsRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    marginBottom: '32px',
  },
  tabButton: {
    padding: '10px 24px',
    backgroundColor: '#f0f2f5',
    color: '#666',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
  },
  tabButtonActive: {
    padding: '10px 24px',
    backgroundColor: '#1890ff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '500',
    boxShadow: '0 2px 6px rgba(24, 144, 255, 0.3)',
  },
  cardsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%',
    alignItems: 'center',
  },
  managementCard: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    padding: '20px',
    gap: '20px',
    width: '80%',
    maxWidth: '700px',
  },
  managementCardImageContainer: {
    width: '180px',
    height: '120px',
    borderRadius: '12px',
    overflow: 'hidden',
    flexShrink: 0,
  },
  managementCardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  managementCardInfoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    flex: 1,
  },
  managementCardHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  managementCardTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: 0,
  },
  managementStatusBadge: {
    color: '#fff',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '13px',
  },
  managementCardLocation: {
    fontSize: '14px',
    color: '#555',
    margin: 0,
  },
  managementCardInfoGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px 32px',
    margin: '16px 0 8px 0',
  },
  managementCardInfoCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  managementCardInfoLabel: {
    fontSize: '13px',
    color: '#888',
    marginBottom: '2px',
  },
  managementCardInfoValue: {
    fontSize: '14px',
    color: '#222',
    fontWeight: 500,
    marginBottom: '6px',
  },
  managementCardDivider: {
    height: '1px',
    background: '#f0f0f0',
    margin: '10px 0',
    width: '100%',
  },
  managementCardFooterRow: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: '8px',
  },
  managementCardTotal: {
    fontSize: '16px',
    fontWeight: 'bold',
    margin: 0,
  },
  noBookings: {
    textAlign: 'center',
    color: '#666',
    marginTop: '40px',
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  paginationWrapper: {
    display: 'flex',
    gap: '8px',
    background: '#f0f2f5',
    padding: '8px',
    borderRadius: '6px',
  },
  paginationButton: {
    border: 'none',
    background: 'transparent',
    color: '#666',
    fontSize: '14px',
    cursor: 'pointer',
    padding: 0,
  },
  paginationButtonActive: {
    color: '#1890ff',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0,0,0,0.35)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    background: '#fff',
    borderRadius: 18,
    boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
    padding: '32px 28px',
    minWidth: 340,
    maxWidth: '90vw',
    minHeight: 220,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    position: 'relative',
  },
  modalButton: {
    border: 'none',
    borderRadius: 16,
    padding: '10px 22px',
    fontWeight: 600,
    fontSize: 15,
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(114,38,55,0.08)',
    transition: 'background 0.2s, color 0.2s',
  },
  textarea: {
    borderRadius: 10,
    border: '1px solid #ddd',
    padding: 12,
    fontSize: 15,
    marginBottom: 8,
    resize: 'vertical',
    outline: 'none',
    minHeight: 80,
    maxHeight: 180,
    boxShadow: '0 1px 4px rgba(114,38,55,0.04)',
  },
  headerSection: {
    textAlign: 'center',
    marginBottom: '24px',
  },
  managementTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#111',
    marginBottom: '8px',
    marginTop: 0,
  },
  managementTitleUnderline: {
    height: '3px',
    width: '60px',
    background: '#1890ff',
    margin: '0 auto 12px auto',
    borderRadius: '2px',
  },
  managementSubtitle: {
    fontSize: '15px',
    color: '#222',
    marginBottom: '24px',
  },
};

export default Bookings;