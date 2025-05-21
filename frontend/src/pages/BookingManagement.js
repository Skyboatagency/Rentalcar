import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { FaExclamationCircle, FaSyncAlt, FaCheckCircle, FaBars, FaTimes, FaDownload, FaPlus } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/fr';
import jsPDF from 'jspdf';

// ------------------------------
// Dictionnaire de traductions
// ------------------------------
const translations = {
  bookingManagementTitle: {
    fr: "Gestion des réservations",
    en: "Booking Management",
    ar: "إدارة الحجوزات"
  },
  manageBookingsDesc: {
    fr: "Gérez toutes les réservations ici.",
    en: "Manage all bookings here.",
    ar: "قم بإدارة جميع الحجوزات هنا."
  },
  all: {
    fr: "Toutes les réservations",
    en: "All Bookings",
    ar: "جميع الحجوزات"
  },
  pending: {
    fr: "En attente",
    en: "Pending",
    ar: "قيد الانتظار"
  },
  approved: {
    fr: "Approuvées",
    en: "Approved",
    ar: "معتمدة"
  },
  ongoing: {
    fr: "En cours",
    en: "Ongoing",
    ar: "جارية"
  },
  completed: {
    fr: "Terminées",
    en: "Completed",
    ar: "مكتملة"
  },
  approve: {
    fr: "Approuver",
    en: "Approve",
    ar: "اعتماد"
  },
  complete: {
    fr: "Compléter",
    en: "Complete",
    ar: "إكمال"
  },
  deny: {
    fr: "Refuser",
    en: "Deny",
    ar: "رفض"
  },
  markAsCompleted: {
    fr: "Marquer comme terminé",
    en: "Mark as Completed",
    ar: "وضع علامة مكتمل"
  },
  cancelled: {
    fr: "Annulées",
    en: "Cancelled",
    ar: "ملغاة"
  },
  nav: {
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
    locationContact: {
      fr: "Localisation et contact",
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
    welcome: {
      fr: "Bienvenue!",
      en: "Welcome!",
      ar: "مرحبا!"
    },
    logout: {
      fr: "Se déconnecter",
      en: "Logout",
      ar: "تسجيل الخروج"
    }
  }
};

// ------------------------------
// BookingStyles component
// ------------------------------
const BookingStyles = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .nav-link:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
      
      .active-link {
        background-color: #1890ff !important;
      }
      
      .booking-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
      }
      
      .action-button:hover {
        opacity: 0.85;
      }
      
      .tab-button:hover {
        background-color: #f5f5f5;
      }
      
      .logout-button:hover {
        background-color: #ff7875;
      }
      
      .approve-button:hover {
        background-color: #73d13d;
      }
      
      .complete-button:hover {
        background-color: #40a9ff;
      }
      
      .lang-button:hover {
        background-color: #40a9ff;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return null;
};

// ------------------------------
// Fonction utilitaire pour formater le numéro de téléphone
// ------------------------------
const formatPhoneNumber = (phone) => {
  if (!phone) return null;
  let formatted = phone.trim();
  if (formatted.startsWith('+')) {
    formatted = formatted.substring(1);
  }
  if (formatted.startsWith('0')) {
    formatted = formatted.substring(1);
  }
  if (!formatted.startsWith('212')) {
    formatted = '212' + formatted;
  }
  return formatted;
};

// ------------------------------
// Composant principal BookingManagement
// ------------------------------
const BookingManagement = () => {
  const [language, setLanguage] = useState('en');
  const [isOpen, setIsOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [contentMarginLeft, setContentMarginLeft] = useState('0px');
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [cars, setCars] = useState([]);
  const [users, setUsers] = useState([]);
  const [newBooking, setNewBooking] = useState({
    user_id: '',
    car_id: '',
    start_date: '',
    end_date: '',
    locataire1: '',
    adresse1: '',
    cin1: '',
    permis1: '',
    locataire2: '',
    adresse2: '',
    cin2: '',
    permis2: '',
    status: 'approved'
  });

  // Responsive: detect mobile
  const isMobile = windowWidth < 768;

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
    if (windowWidth < 768) {
      setContentMarginLeft('0px');
    } else {
      setContentMarginLeft(isOpen ? '290px' : '0px');
    }
  }, [isOpen, windowWidth]);

  // Récupération des bookings depuis l'API
  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API_URL}/bookings`);
      setBookings(res.data);
      setFilteredBookings(res.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des réservations :', error);
      setError('Erreur lors de la récupération des réservations.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Filtrer les bookings en fonction de l'onglet actif
  const displayedBookings = activeTab === 'all' 
    ? bookings
    : bookings.filter((booking) => booking.status.toLowerCase() === activeTab);

  // Rendre le nom de la voiture
  const renderCarName = (booking) => {
    if (booking.Car) {
      return `${booking.Car.name} (${booking.Car.model || ''})`;
    }
    return 'Unknown Car';
  };

  // Rendre le nom de l'utilisateur
  const renderUserName = (booking) => {
    if (booking.User) {
      return booking.User.name;
    }
    return 'Unknown User';
  };

  // Rendre l'icône en fonction du statut
  const renderStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <FaExclamationCircle style={{ color: 'orange', fontSize: '24px' }} />;
      case 'approved':
        return (
          <FaSyncAlt
            style={{
              color: '#722637',
              fontSize: '24px',
              animation: 'spin 2s linear infinite',
            }}
          />
        );
      case 'completed':
        return <FaCheckCircle style={{ color: 'green', fontSize: '24px' }} />;
      default:
        return <FaExclamationCircle style={{ color: 'gray', fontSize: '24px' }} />;
    }
  };

  // Ouvrir WhatsApp avec un message
  const openWhatsApp = (phoneNumber, message) => {
    const formattedPhone = formatPhoneNumber(phoneNumber);
    const whatsappURL = `https://web.whatsapp.com/send?phone=${formattedPhone}&text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  // Approuver une réservation
  const handleApprove = async (bookingId) => {
    try {
      const booking = bookings.find((b) => b.id === bookingId);
      if (!booking) {
        throw new Error('Réservation non trouvée');
      }

      console.log('Données de la réservation avant approbation:', {
        booking,
        car: booking.Car,
        price_per_day: booking.Car?.price_per_day
      });

      // Vérifier que tous les champs requis sont présents
      if (!booking.user_id || !booking.car_id || !booking.start_date || !booking.end_date) {
        throw new Error('Données de réservation incomplètes');
      }

      // Vérifier les dates
      const startDate = new Date(booking.start_date);
      const endDate = new Date(booking.end_date);
      
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new Error('Format de date invalide');
      }

      if (startDate > endDate) {
        throw new Error('La date de début doit être avant la date de fin');
      }

      // Calculer le total_price
      const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
      const pricePerDay = parseFloat(booking.Car?.price_per_day) || 0;
      const totalPrice = parseFloat((days * pricePerDay).toFixed(2));

      console.log('Calcul du prix:', {
        startDate,
        endDate,
        days,
        pricePerDay,
        totalPrice
      });

      // Formater les données pour l'envoi
      const updateData = {
        status: 'approved',
        user_id: Number(booking.user_id),
        car_id: Number(booking.car_id),
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        total_price: totalPrice,
        // Inclure les champs optionnels existants
        locataire1: booking.locataire1 || null,
        adresse1: booking.adresse1 || null,
        cin1: booking.cin1 || null,
        permis1: booking.permis1 || null,
        locataire2: booking.locataire2 || null,
        adresse2: booking.adresse2 || null,
        cin2: booking.cin2 || null,
        permis2: booking.permis2 || null
      };

      console.log('Données complètes envoyées pour l\'approbation:', JSON.stringify(updateData, null, 2));

      const response = await axios.put(`${API_URL}/bookings/${bookingId}`, updateData);
      console.log('Réponse du serveur:', response.data);

      // Mettre à jour la disponibilité de la voiture à false
      if (booking && booking.car_id) {
        try {
          await axios.put(`${API_URL}/cars/${booking.car_id}`, { availability: false });
          console.log(`Car ${booking.car_id} marked as unavailable`);
        } catch (error) {
          console.error("Erreur lors de la mise à jour de la disponibilité de la voiture :", error);
        }
      }

      // ENVOI DU MESSAGE AU CLIENT
      if (booking && booking.User && booking.User.phone) {
        moment.locale('fr');
        const startStr = booking.start_date ? moment(booking.start_date).format('LL') : '';
        const endStr = booking.end_date ? moment(booking.end_date).format('LL') : '';
        const message =
          `✅ Votre réservation a été approuvée !\n\n` +
          `Merci de votre confiance. Voici les détails de votre réservation :\n\n` +
          `👤 Nom : ${booking.User.name}\n` +
          `📞 Téléphone : ${booking.User.phone}\n` +
          `🚗 Véhicule : ${booking.Car ? booking.Car.name : ''}\n` +
          `📍 Lieu de retour : ${booking.return_location || ''}\n` +
          `📅 Du : ${startStr}\n` +
          `📅 Au : ${endStr}\n` +
          `💰 Prix total : ${totalPrice} MAD\n\n` +
          `Nous restons à votre disposition pour toute question. Bonne route ! 🚗✨`;
        openWhatsApp(booking.User.phone, message);
      }
      fetchBookings();
    } catch (error) {
      console.error("Erreur lors de l'approbation :", error);
      if (error.response) {
        console.error("Détails de l'erreur:", error.response.data);
      }
      alert("Erreur lors de l'approbation.");
    }
  };

  // Marquer une réservation comme complétée
  const handleComplete = async (bookingId) => {
    try {
      const booking = bookings.find((b) => b.id === bookingId);
      if (!booking) {
        throw new Error('Réservation non trouvée');
      }

      console.log('Données de la réservation:', {
        booking,
        car: booking.Car,
        price_per_day: booking.Car?.price_per_day
      });

      // Vérifier que tous les champs requis sont présents
      if (!booking.user_id || !booking.car_id || !booking.start_date || !booking.end_date) {
        throw new Error('Données de réservation incomplètes');
      }

      // Vérifier les dates
      const startDate = new Date(booking.start_date);
      const endDate = new Date(booking.end_date);
      
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new Error('Format de date invalide');
      }

      if (startDate > endDate) {
        throw new Error('La date de début doit être avant la date de fin');
      }

      // Calculer le total_price
      const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
      const pricePerDay = parseFloat(booking.Car?.price_per_day) || 0;
      const totalPrice = parseFloat((days * pricePerDay).toFixed(2));

      console.log('Calcul du prix:', {
        startDate,
        endDate,
        days,
        pricePerDay,
        totalPrice
      });

      // Formater les données pour l'envoi
      const updateData = {
        status: 'completed',
        user_id: Number(booking.user_id),
        car_id: Number(booking.car_id),
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        total_price: totalPrice,
        // Inclure les champs optionnels existants
        locataire1: booking.locataire1 || null,
        adresse1: booking.adresse1 || null,
        cin1: booking.cin1 || null,
        permis1: booking.permis1 || null,
        locataire2: booking.locataire2 || null,
        adresse2: booking.adresse2 || null,
        cin2: booking.cin2 || null,
        permis2: booking.permis2 || null
      };

      console.log('Données complètes envoyées pour la mise à jour:', JSON.stringify(updateData, null, 2));

      const response = await axios.put(`${API_URL}/bookings/${bookingId}`, updateData);
      console.log('Réponse du serveur:', response.data);

      // Remettre la disponibilité de la voiture à true
      if (booking && booking.car_id) {
        try {
          await axios.put(`${API_URL}/cars/${booking.car_id}`, { availability: true });
          console.log(`Car ${booking.car_id} marked as available again`);
        } catch (error) {
          console.error("Erreur lors de la mise à jour de la disponibilité de la voiture :", error);
        }
      }
      if (booking && booking.User && booking.User.phone) {
        moment.locale('fr');
        const startStr = booking.start_date ? moment(booking.start_date).format('LL') : 'Non renseigné';
        const endStr = booking.end_date ? moment(booking.end_date).format('LL') : 'Non renseigné';
        const totalPrice = booking.total_price != null ? booking.total_price : 'Non renseigné';
        const carName = booking.Car ? booking.Car.name : 'Non renseigné';
        const feedbackUrl = `${window.location.origin}/my-bookings`;
        const message =
          `✅ Votre location est terminée !\n\n` +
          `Merci d'avoir utilisé notre site et nos véhicules. Nous espérons que votre expérience a été agréable.\n\n` +
          `📝 Détails de votre réservation :\n` +
          `👤 Nom : ${booking.User.name}\n` +
          `🚗 Véhicule : ${carName}\n` +
          `📅 Du : ${startStr}\n` +
          `📅 Au : ${endStr}\n` +
          `💰 Prix total : ${totalPrice} MAD\n\n` +
          `⭐️ Nous serions ravis d'avoir votre avis !\n` +
          `Donnez votre feedback ici :\n${feedbackUrl}\n\n` +
          `Au plaisir de vous revoir bientôt. Bonne route ! 🚗✨`;
        openWhatsApp(booking.User.phone, message);
      }
      fetchBookings();
    } catch (error) {
      console.error('Erreur lors de la complétion :', error);
      alert('Erreur lors de la complétion.');
    }
  };

  // Refuser une réservation
  const handleDeny = async (bookingId) => {
    try {
      const booking = bookings.find((b) => b.id === bookingId);
      if (!booking) {
        throw new Error('Réservation non trouvée');
      }

      console.log('Données de la réservation avant annulation:', {
        booking,
        car: booking.Car,
        price_per_day: booking.Car?.price_per_day
      });

      // Vérifier que tous les champs requis sont présents
      if (!booking.user_id || !booking.car_id || !booking.start_date || !booking.end_date) {
        throw new Error('Données de réservation incomplètes');
      }

      // Vérifier les dates
      const startDate = new Date(booking.start_date);
      const endDate = new Date(booking.end_date);
      
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new Error('Format de date invalide');
      }

      if (startDate > endDate) {
        throw new Error('La date de début doit être avant la date de fin');
      }

      // Calculer le total_price
      const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
      const pricePerDay = parseFloat(booking.Car?.price_per_day) || 0;
      const totalPrice = parseFloat((days * pricePerDay).toFixed(2));

      console.log('Calcul du prix:', {
        startDate,
        endDate,
        days,
        pricePerDay,
        totalPrice
      });

      // Formater les données pour l'envoi
      const updateData = {
        status: 'cancelled',
        user_id: Number(booking.user_id),
        car_id: Number(booking.car_id),
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        total_price: totalPrice,
        // Inclure les champs optionnels existants
        locataire1: booking.locataire1 || null,
        adresse1: booking.adresse1 || null,
        cin1: booking.cin1 || null,
        permis1: booking.permis1 || null,
        locataire2: booking.locataire2 || null,
        adresse2: booking.adresse2 || null,
        cin2: booking.cin2 || null,
        permis2: booking.permis2 || null
      };

      console.log('Données complètes envoyées pour l\'annulation:', JSON.stringify(updateData, null, 2));

      const response = await axios.put(`${API_URL}/bookings/${bookingId}`, updateData);
      console.log('Réponse du serveur:', response.data);

      // ENVOI DU MESSAGE AU CLIENT
      if (booking && booking.User && booking.User.phone) {
        moment.locale('fr');
        const startStr = booking.start_date ? moment(booking.start_date).format('LL') : '';
        const endStr = booking.end_date ? moment(booking.end_date).format('LL') : '';
        const message =
          `❌ Votre réservation a été annulée.\n\n` +
          `Détails de la réservation annulée :\n\n` +
          `👤 Nom : ${booking.User.name}\n` +
          `📞 Téléphone : ${booking.User.phone}\n` +
          `🚗 Véhicule : ${booking.Car ? booking.Car.name : ''}\n` +
          `📍 Lieu de retour : ${booking.return_location || ''}\n` +
          `📅 Du : ${startStr}\n` +
          `📅 Au : ${endStr}\n` +
          `💰 Prix total : ${totalPrice} MAD\n\n` +
          `Pour toute question, n'hésitez pas à nous contacter.`;
        openWhatsApp(booking.User.phone, message);
      }
      fetchBookings();
    } catch (error) {
      console.error('Error cancelling booking:', error);
      if (error.response) {
        console.error("Détails de l'erreur:", error.response.data);
      }
      alert("Erreur lors de l'annulation.");
    }
  };

  const handleEndDateChange = async (bookingId, newEndDate) => {
    try {
      const booking = bookings.find((b) => b.id === bookingId);
      if (!booking) {
        throw new Error('Réservation non trouvée');
      }

      const startDate = new Date(booking.start_date);
      const endDate = new Date(newEndDate);
      
      if (startDate > endDate) {
        alert('La date de fin doit être après la date de début');
        return;
      }

      // Calculer le nouveau prix
      const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
      const pricePerDay = parseFloat(booking.Car?.price_per_day) || 0;
      const totalPrice = parseFloat((days * pricePerDay).toFixed(2));

      const updateData = {
        ...booking,
        end_date: endDate.toISOString(),
        total_price: totalPrice
      };

      await axios.put(`${API_URL}/bookings/${bookingId}`, updateData);
      fetchBookings();
    } catch (error) {
      console.error('Erreur lors de la modification de la date:', error);
      alert('Erreur lors de la modification de la date.');
    }
  };

  // Fetch cars and users for the create booking form
  const fetchCarsAndUsers = async () => {
    try {
      const [carsRes, usersRes] = await Promise.all([
        axios.get(`${API_URL}/cars`),
        axios.get(`${API_URL}/users`)
      ]);
      setCars(carsRes.data);
      setUsers(usersRes.data);
    } catch (error) {
      console.error('Error fetching cars and users:', error);
    }
  };

  useEffect(() => {
    fetchCarsAndUsers();
  }, []);

  const handleCreateBooking = async () => {
    try {
      const selectedCar = cars.find(car => car.id === parseInt(newBooking.car_id));
      const days = moment(newBooking.end_date).diff(moment(newBooking.start_date), 'days') + 1;
      const totalPrice = days * (selectedCar?.price_per_day || 0);

      const bookingData = {
        ...newBooking,
        total_price: totalPrice,
        status: 'approved'
      };

      const response = await axios.post(`${API_URL}/bookings`, bookingData);
      
      // Update car availability
      await axios.put(`${API_URL}/cars/${newBooking.car_id}`, { availability: false });
      
      // Send WhatsApp message to user
      const user = users.find(u => u.id === parseInt(newBooking.user_id));
      if (user && user.phone) {
        const message = `✅ Une nouvelle réservation a été créée pour vous !\n\n` +
          `Merci de votre confiance. Voici les détails de votre réservation :\n\n` +
          `👤 Nom : ${user.name}\n` +
          `📞 Téléphone : ${user.phone}\n` +
          `🚗 Véhicule : ${selectedCar?.name || ''}\n` +
          `📅 Du : ${moment(newBooking.start_date).format('LL')}\n` +
          `📅 Au : ${moment(newBooking.end_date).format('LL')}\n` +
          `💰 Prix total : ${totalPrice} MAD\n\n` +
          `Nous restons à votre disposition pour toute question. Bonne route ! 🚗✨`;
        openWhatsApp(user.phone, message);
      }

      setShowCreateModal(false);
      setNewBooking({
        user_id: '',
        car_id: '',
        start_date: '',
        end_date: '',
        locataire1: '',
        adresse1: '',
        cin1: '',
        permis1: '',
        locataire2: '',
        adresse2: '',
        cin2: '',
        permis2: '',
        status: 'approved'
      });
      fetchBookings();
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Error creating booking. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <Navbar language={language} isOpen={isOpen} setIsOpen={setIsOpen} />
      <BookingStyles />
      <MainContent
        language={language}
        contentMarginLeft={contentMarginLeft}
        bookings={bookings}
        setBookings={setBookings}
        filteredBookings={filteredBookings}
        setFilteredBookings={setFilteredBookings}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        loading={loading}
        setLoading={setLoading}
        error={error}
        setError={setError}
        handleApprove={handleApprove}
        handleComplete={handleComplete}
        handleDeny={handleDeny}
        handleEndDateChange={handleEndDateChange}
        renderCarName={renderCarName}
        renderUserName={renderUserName}
        renderStatusIcon={renderStatusIcon}
        isMobile={isMobile}
        showCreateModal={showCreateModal}
        setShowCreateModal={setShowCreateModal}
        newBooking={newBooking}
        setNewBooking={setNewBooking}
        cars={cars}
        users={users}
        handleCreateBooking={handleCreateBooking}
      />
    </div>
  );
};

// ------------------------------
// Composant MainContent pour afficher les réservations
// ------------------------------
const MainContent = ({
  language,
  contentMarginLeft,
  bookings,
  activeTab,
  setActiveTab,
  loading,
  error,
  handleApprove,
  handleComplete,
  handleDeny,
  handleEndDateChange,
  renderCarName,
  renderUserName,
  renderStatusIcon,
  isMobile,
  showCreateModal,
  setShowCreateModal,
  newBooking,
  setNewBooking,
  cars,
  users,
  handleCreateBooking
}) => {

  // Update the formatDate function to use a more direct approach
  const formatDate = (date) => {
    if (!date) return '';
    try {
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  // Filtrer les bookings en fonction de l'onglet actif
  const displayedBookings = activeTab === 'all'
    ? bookings
    : bookings.filter((booking) => booking.status.toLowerCase() === activeTab);

  const generateContractPDF = (booking) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Contrat de Location', 20, 20);

    doc.setFontSize(12);
    doc.text(`Réservation ID: ${booking.id}`, 20, 35);
    doc.text(`Statut: ${booking.status}`, 20, 45);

    // Infos utilisateur principal (User)
    doc.text('--- Informations Utilisateur (compte) ---', 20, 60);
    doc.text(`Nom: ${booking.User?.name || ''}`, 20, 70);
    doc.text(`Email: ${booking.User?.email || ''}`, 20, 80);
    doc.text(`Téléphone: ${booking.User?.phone || ''}`, 20, 90);

    let y = 100;

    // Infos Locataire
    if (booking.locataire1) {
      doc.text('--- Locataire ---', 20, y);
      y += 10;
      doc.text(`Nom: ${booking.locataire1}`, 20, y);
      y += 10;
      if (booking.adresse1) { doc.text(`Adresse: ${booking.adresse1}`, 20, y); y += 10; }
      if (booking.cin1) { doc.text(`CIN: ${booking.cin1}`, 20, y); y += 10; }
      if (booking.permis1) { doc.text(`Permis: ${booking.permis1}`, 20, y); y += 10; }
    }

    // Infos Autre Conducteur
    if (booking.locataire2) {
      doc.text('--- Autre Conducteur ---', 20, y);
      y += 10;
      doc.text(`Nom: ${booking.locataire2}`, 20, y);
      y += 10;
      if (booking.adresse2) { doc.text(`Adresse: ${booking.adresse2}`, 20, y); y += 10; }
      if (booking.cin2) { doc.text(`CIN: ${booking.cin2}`, 20, y); y += 10; }
      if (booking.permis2) { doc.text(`Permis: ${booking.permis2}`, 20, y); y += 10; }
    }

    // Infos voiture
    y += 5;
    doc.text('--- Informations Voiture ---', 20, y);
    y += 10;
    doc.text(`Nom: ${booking.Car?.name || ''}`, 20, y);
    y += 10;
    doc.text(`Modèle: ${booking.Car?.model || ''}`, 20, y);
    y += 10;
    doc.text(`Matricule: ${booking.Car?.matricule || ''}`, 20, y);

    // Infos réservation
    y += 15;
    doc.text('--- Détails Réservation ---', 20, y);
    y += 10;
    doc.text(`Début: ${booking.start_date ? new Date(booking.start_date).toLocaleDateString() : ''}`, 20, y);
    y += 10;
    doc.text(`Fin: ${booking.end_date ? new Date(booking.end_date).toLocaleDateString() : ''}`, 20, y);
    y += 10;
    doc.text(`Prix total: ${booking.total_price} MAD`, 20, y);

    doc.save(`contrat_booking_${booking.id}.pdf`);
  };

  if (loading) {
    return (
      <div style={{
        ...styles.mainWrapper,
        marginLeft: contentMarginLeft,
        transition: 'all 0.3s ease'
      }}>
        <div style={styles.mainContent}>
          <p style={{ textAlign: 'center', padding: '20px' }}>Chargement...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        ...styles.mainWrapper,
        marginLeft: contentMarginLeft,
        transition: 'all 0.3s ease'
      }}>
        <div style={styles.mainContent}>
          <p style={{ textAlign: 'center', padding: '20px', color: 'red' }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      ...styles.mainWrapper,
      marginLeft: contentMarginLeft,
      transition: 'all 0.3s ease'
    }}>
      <div
        style={
          isMobile
            ? {
                margin: '0 auto',
                maxWidth: 430,
                backgroundColor: '#fff',
                borderRadius: 14,
                padding: '14px 4px 24px 4px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                minHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
              }
            : styles.mainContent
        }
      >
        <div style={styles.headerContainer}>
          <h1 style={isMobile ? { ...styles.pageTitle, fontSize: 20 } : styles.pageTitle}>
            Booking Management
          </h1>
        </div>
        <div
          style={
            isMobile
              ? {
                  ...styles.titleUnderline,
                  marginBottom: 8,
                }
              : styles.titleUnderline
          }
        ></div>
        <p
          style={
            isMobile
              ? {
                  ...styles.pageSubtitle,
                  fontSize: 13,
                  marginBottom: 10,
                }
              : styles.pageSubtitle
          }
        >
          Manage bookings, view details, and track booking activity
        </p>

        {/* Status Filter Tabs */}
        <div
          style={
            isMobile
              ? {
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  width: '100%',
                  alignItems: 'center',
                  marginBottom: '24px',
                }
              : styles.tabBar
          }
        >
          {['all', 'pending', 'approved', 'completed', 'cancelled'].map((status) => (
            <button
              key={status}
              style={
                isMobile
                  ? {
                      ...(activeTab === status ? styles.tabButtonActive : styles.tabButton),
                      width: '100%',
                      maxWidth: 400,
                      alignSelf: 'center',
                      margin: 0,
                    }
                  : activeTab === status
                  ? styles.tabButtonActive
                  : styles.tabButton
              }
              onClick={() => setActiveTab(status)}
              className="tab-button"
            >
              {translations[status][language]}
            </button>
          ))}
        </div>

        {/* Filter Input, Reset Button, and Create Booking Button Row */}
        <div style={styles.filterRow}>
          {/* Filter Input and Reset Button */}
          <div style={styles.filterContainer}>
            <input
              type="text"
              placeholder="Filter by:"
              style={
                isMobile
                  ? {
                      ...styles.filterInput,
                      width: '100%',
                      maxWidth: 400,
                      alignSelf: 'center',
                      margin: 0,
                    }
                  : styles.filterInput
              }
            />
            <button
              style={
                isMobile
                  ? {
                      ...styles.resetButton,
                      width: '100%',
                      maxWidth: 400,
                      alignSelf: 'center', 
                      margin: 0, // Corrected margin here
                    }
                  : styles.resetButton
              }
            >
              Reset
            </button>
          </div>
          {/* Create Booking Button */}
          <button
            style={styles.createButton}
            onClick={() => setShowCreateModal(true)}
          >
            <FaPlus style={{ marginRight: '8px' }} />
            Create Booking
          </button>
        </div>

        {/* Table */}
        <div
          style={
            isMobile
              ? {
                  ...styles.tableContainer,
                  marginTop: 8,
                  borderRadius: 10,
                  boxShadow: '0 1px 6px rgba(0,0,0,0.07)',
                  background: '#fff',
                  overflowX: 'auto',
                  WebkitOverflowScrolling: 'touch',
                }
              : styles.tableContainer
          }
        >
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>User</th>
                <th style={styles.tableHeader}>Car</th>
                <th style={styles.tableHeader}>Prix/Jour</th>
                <th style={styles.tableHeader}>Start Date</th>
                <th style={styles.tableHeader}>End Date</th>
                <th style={styles.tableHeader}>Price (MAD)</th>
                <th style={styles.tableHeader}>Status</th>
                <th style={styles.tableHeader}>Actions</th>
                <th style={styles.tableHeader}>Contrat</th>
              </tr>
            </thead>
            <tbody>
              {displayedBookings.length === 0 ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '20px' }}>
                    No bookings found
                  </td>
                </tr>
              ) : (
                displayedBookings.map((booking) => (
                  <tr key={booking.id} style={styles.tableRow}>
                    <td style={styles.tableCell}>{renderUserName(booking)}</td>
                    <td style={styles.tableCell}>{renderCarName(booking)}</td>
                    <td style={styles.tableCell}>{booking.Car?.price_per_day || '0'} MAD</td>
                    <td style={styles.tableCell}>{formatDate(booking.start_date)}</td>
                    <td style={styles.tableCell}>{formatDate(booking.end_date)}</td>
                    <td style={styles.tableCell}>{booking.total_price || '0'} MAD</td>
                    <td style={styles.tableCell}>
                      <span style={{
                        ...styles.statusBadge,
                        backgroundColor:
                          booking.status === 'completed' ? '#52c41a' :
                          booking.status === 'approved' ? '#1890ff' :
                          booking.status === 'pending' ? 'faad14' :
                          booking.status === 'cancelled' ? 'ff4d4f' :
                          '#666'
                      }}>
                        {booking.status}
                      </span>
                    </td>
                    <td style={styles.tableCell}>
                      {booking.status === 'pending' && (
                        <>
                          <button
                            style={styles.approveButton}
                            onClick={() => handleApprove(booking.id)}
                            className="action-button"
                          >
                            {translations.approve[language]}
                          </button>
                          <button
                            style={styles.denyButton}
                            onClick={() => handleDeny(booking.id)}
                            className="action-button"
                          >
                            {translations.deny[language]}
                          </button>
                        </>
                      )}
                      {booking.status === 'approved' && (
                        <button
                          style={styles.completeButton}
                          onClick={() => handleComplete(booking.id)}
                          className="action-button"
                        >
                          {translations.markAsCompleted[language]}
                        </button>
                      )}
                      {booking.status === 'completed' && (
                        <span style={styles.completedText}>Completed</span>
                      )}
                      {booking.status === 'cancelled' && (
                        <span style={styles.deniedText}>Cancelled</span>
                      )}
                    </td>
                    <td style={styles.tableCell}>
                      {(booking.status === 'approved' || booking.status === 'completed') && (
                        <button
                          style={{ ...styles.approveButton, margin: 0, padding: '6px 10px' }}
                          onClick={() => generateContractPDF(booking)}
                          title="Télécharger le contrat PDF"
                        >
                          <FaDownload size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Create Booking Modal */}
        {showCreateModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
              <div style={styles.modalHeader}>
                <h2>Create New Booking</h2>
                <button
                  style={styles.closeButton}
                  onClick={() => setShowCreateModal(false)}
                >
                  <FaTimes />
                </button>
              </div>
              <div style={styles.modalBody}>
                <div style={styles.formGroup}>
                  <label>User</label>
                  <select
                    value={newBooking.user_id}
                    onChange={(e) => setNewBooking({ ...newBooking, user_id: e.target.value })}
                    style={styles.select}
                  >
                    <option value="">Select User</option>
                    {users.map(user => (
                      <option key={user.id} value={user.id}>
                        {user.name} ({user.email})
                      </option>
                    ))}
                  </select>
                </div>
                <div style={styles.formGroup}>
                  <label>Car</label>
                  <select
                    value={newBooking.car_id}
                    onChange={(e) => setNewBooking({ ...newBooking, car_id: e.target.value })}
                    style={styles.select}
                  >
                    <option value="">Select Car</option>
                    {cars.map(car => (
                      <option key={car.id} value={car.id}>
                        {car.name} - {car.model} ({car.price_per_day} MAD/day)
                      </option>
                    ))}
                  </select>
                </div>
                <div style={styles.formGroup}>
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={newBooking.start_date}
                    onChange={(e) => setNewBooking({ ...newBooking, start_date: e.target.value })}
                    style={styles.input}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label>End Date</label>
                  <input
                    type="date"
                    value={newBooking.end_date}
                    onChange={(e) => setNewBooking({ ...newBooking, end_date: e.target.value })}
                    style={styles.input}
                    min={newBooking.start_date || new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label>Primary Driver Name</label>
                  <input
                    type="text"
                    value={newBooking.locataire1}
                    onChange={(e) => setNewBooking({ ...newBooking, locataire1: e.target.value })}
                    style={styles.input}
                    placeholder="Enter primary driver name"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label>Primary Driver Address</label>
                  <input
                    type="text"
                    value={newBooking.adresse1}
                    onChange={(e) => setNewBooking({ ...newBooking, adresse1: e.target.value })}
                    style={styles.input}
                    placeholder="Enter primary driver address"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label>Primary Driver CIN</label>
                  <input
                    type="text"
                    value={newBooking.cin1}
                    onChange={(e) => setNewBooking({ ...newBooking, cin1: e.target.value })}
                    style={styles.input}
                    placeholder="Enter primary driver CIN"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label>Primary Driver License</label>
                  <input
                    type="text"
                    value={newBooking.permis1}
                    onChange={(e) => setNewBooking({ ...newBooking, permis1: e.target.value })}
                    style={styles.input}
                    placeholder="Enter primary driver license"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label>Secondary Driver Name (Optional)</label>
                  <input
                    type="text"
                    value={newBooking.locataire2}
                    onChange={(e) => setNewBooking({ ...newBooking, locataire2: e.target.value })}
                    style={styles.input}
                    placeholder="Enter secondary driver name"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label>Secondary Driver Address (Optional)</label>
                  <input
                    type="text"
                    value={newBooking.adresse2}
                    onChange={(e) => setNewBooking({ ...newBooking, adresse2: e.target.value })}
                    style={styles.input}
                    placeholder="Enter secondary driver address"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label>Secondary Driver CIN (Optional)</label>
                  <input
                    type="text"
                    value={newBooking.cin2}
                    onChange={(e) => setNewBooking({ ...newBooking, cin2: e.target.value })}
                    style={styles.input}
                    placeholder="Enter secondary driver CIN"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label>Secondary Driver License (Optional)</label>
                  <input
                    type="text"
                    value={newBooking.permis2}
                    onChange={(e) => setNewBooking({ ...newBooking, permis2: e.target.value })}
                    style={styles.input}
                    placeholder="Enter secondary driver license"
                  />
                </div>
              </div>
              <div style={styles.modalFooter}>
                <button
                  style={styles.cancelButton}
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button
                  style={styles.submitButton}
                  onClick={handleCreateBooking}
                >
                  Create Booking
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Animation CSS pour l'icône "approved" */}
      <style>
        {
          `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `
        }
      </style>
    </div>
  );
};

// ------------------------------
// Styles
// ------------------------------
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
  mainContent: {
    margin: '0 auto',
    maxWidth: '1200px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '8px',
    position: 'relative',
  },
  pageTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '8px',
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
    marginBottom: '24px',
    textAlign: 'center',
  },
  filterRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px',
  },
  filterContainer: {
    display: 'flex',
    gap: '12px',
    flex: 1,
  },
  filterInput: {
    flex: 1,
    padding: '8px 12px',
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
    fontSize: '14px',
  },
  resetButton: {
    backgroundColor: '#1890ff',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  tableContainer: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
  },
  tableHeader: {
    padding: '12px 16px',
    textAlign: 'left',
    borderBottom: '1px solid #f0f0f0',
    fontSize: '14px',
    fontWeight: '500',
    color: '#1a1a1a',
  },
  tableRow: {
    borderBottom: '1px solid #f0f0f0',
  },
  tableCell: {
    padding: '12px 16px',
    fontSize: '14px',
    color: '#666',
    textAlign: 'left',
  },
  statusBadge: {
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    color: 'white',
    display: 'inline-block',
  },
  viewButton: {
    backgroundColor: '#1890ff',
    color: 'white',
    border: 'none',
    padding: '4px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    marginRight: '8px',
  },
  deleteButton: {
    backgroundColor: '#ff4d4f',
    color: 'white',
    border: 'none',
    padding: '4px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  tabBar: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    marginBottom: '24px',
  },
  tabButton: {
    padding: '8px 16px',
    backgroundColor: '#f0f2f5',
    color: '#666',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
  },
  tabButtonActive: {
    padding: '8px 16px',
    backgroundColor: '#1890ff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    boxShadow: '0 2px 6px rgba(24, 144, 255, 0.3)',
  },
  approveButton: {
    backgroundColor: '#52c41a',
    color: 'white',
    border: 'none',
    padding: '4px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    marginRight: '8px',
    transition: 'all 0.3s ease',
  },
  denyButton: {
    backgroundColor: '#ff4d4f',
    color: 'white',
    border: 'none',
    padding: '4px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.3s ease',
  },
  completeButton: {
    backgroundColor: '#1890ff',
    color: 'white',
    border: 'none',
    padding: '4px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.3s ease',
  },
  completedText: {
    color: '#52c41a',
    fontWeight: '500',
  },
  deniedText: {
    color: '#ff4d4f',
    fontWeight: '500',
  },
  dateInput: {
    padding: '4px 8px',
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
    fontSize: '14px',
    width: '140px'
  },
  createButton: {
    backgroundColor: '#1890ff',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    transition: 'all 0.3s ease',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  modalHeader: {
    padding: '16px',
    borderBottom: '1px solid #f0f0f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalBody: {
    padding: '16px',
  },
  modalFooter: {
    padding: '16px',
    borderTop: '1px solid #f0f0f0',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
  },
  formGroup: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    color: '#666',
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
    fontSize: '14px',
  },
  select: {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
    fontSize: '14px',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#666',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    color: '#666',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  submitButton: {
    backgroundColor: '#1890ff',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default BookingManagement;
