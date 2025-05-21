import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/fr'; // Importer la locale française
import { FaCalendarAlt, FaCar, FaUser, FaMapMarkerAlt, FaCheck, FaTimes } from 'react-icons/fa';

// Dictionnaire de traductions
const translations = {
  calendarTitle: {
    fr: "Calendrier des Réservations",
    en: "Booking Calendar",
    ar: "تقويم الحجوزات"
  },
  calendarDesc: {
    fr: "Consultez et gérez toutes les réservations sur un calendrier.",
    en: "View and manage all bookings on a calendar.",
    ar: "عرض وإدارة جميع الحجوزات على تقويم."
  },
  today: {
    fr: "Aujourd'hui",
    en: "Today",
    ar: "اليوم"
  },
  month: {
    fr: "Mois",
    en: "Month",
    ar: "شهر"
  },
  week: {
    fr: "Semaine",
    en: "Week",
    ar: "أسبوع"
  },
  day: {
    fr: "Jour",
    en: "Day",
    ar: "يوم"
  },
  car: {
    fr: "Voiture",
    en: "Car",
    ar: "سيارة"
  },
  client: {
    fr: "Client",
    en: "Client",
    ar: "عميل"
  },
  location: {
    fr: "Emplacement",
    en: "Location",
    ar: "موقع"
  },
  status: {
    fr: "Statut",
    en: "Status",
    ar: "الحالة"
  },
  pending: {
    fr: "En attente",
    en: "Pending",
    ar: "قيد الانتظار"
  },
  approved: {
    fr: "Approuvé",
    en: "Approved",
    ar: "موافق عليه"
  },
  completed: {
    fr: "Terminé",
    en: "Completed",
    ar: "مكتمل"
  },
  cancelled: {
    fr: "Annulé",
    en: "Cancelled",
    ar: "ملغى"
  },
  denied: {
    fr: "Refusé",
    en: "Denied",
    ar: "مرفوض"
  },
  unknown: {
    fr: "Inconnu",
    en: "Unknown",
    ar: "غير معروف"
  },
  noBookings: {
    fr: "Aucune réservation pour cette période.",
    en: "No bookings for this period.",
    ar: "لا توجد حجوزات لهذه الفترة."
  },
  all: {
    fr: "Tous",
    en: "All",
    ar: "الكل"
  },
  allBookings: {
    fr: "Toutes les réservations",
    en: "All Bookings",
    ar: "جميع الحجوزات"
  },
};

// Style dynamique CSS pour la page
const CalendarStyles = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .calendar-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
      }
      
      .tab-button:hover {
        opacity: 0.9;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return null;
};

const Calendrier = () => {
  const [language, setLanguage] = useState('en');
  const [isOpen, setIsOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(moment());
  const [view, setView] = useState('month');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showDateBookings, setShowDateBookings] = useState(false);
  const [selectedDateBookings, setSelectedDateBookings] = useState([]);

  // API URL
  const API_URL = process.env.REACT_APP_API_URL;

  // Référence pour détecter les clics en dehors du pop-up
  const infoPopupRef = React.useRef(null);
  const dateBookingsPopupRef = React.useRef(null);

  useEffect(() => {
    // Forcer l'utilisation du français pour les dates
    moment.locale('fr');
    
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
    fetchBookings();
  }, []);

  // Gestionnaire de clic global pour fermer les pop-ups
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (infoPopupRef.current && !infoPopupRef.current.contains(event.target)) {
        setShowInfo(false);
      }
      if (dateBookingsPopupRef.current && !dateBookingsPopupRef.current.contains(event.target)) {
        setShowDateBookings(false);
      }
    };

    // Ajouter/supprimer le gestionnaire d'événements de clic sur le document
    if (showInfo || showDateBookings) {
      document.addEventListener('mousedown', handleClickOutside);
      // Bloquer le défilement quand un pop-up est ouvert
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [showInfo, showDateBookings]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      // Utilisation de l'option include pour récupérer les relations
      const response = await axios.get(`${API_URL}/bookings?include=Car,User`);
      console.log("Réponse API des réservations:", response.data);
      setBookings(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des réservations:", error);
      setLoading(false);
    }
  };

  const goToToday = () => {
    setCurrentDate(moment());
  };

  const nextDate = () => {
    if (view === 'month') {
      setCurrentDate(moment(currentDate).add(1, 'month'));
    } else if (view === 'week') {
      setCurrentDate(moment(currentDate).add(1, 'week'));
    } else {
      setCurrentDate(moment(currentDate).add(1, 'day'));
    }
  };

  const prevDate = () => {
    if (view === 'month') {
      setCurrentDate(moment(currentDate).subtract(1, 'month'));
    } else if (view === 'week') {
      setCurrentDate(moment(currentDate).subtract(1, 'week'));
    } else {
      setCurrentDate(moment(currentDate).subtract(1, 'day'));
    }
  };

  const renderCalendarHeader = () => {
    let title;
    
    if (view === 'month') {
      title = currentDate.locale('fr').format('MMMM YYYY');
    } else if (view === 'week') {
      const startOfWeek = moment(currentDate).startOf('week');
      const endOfWeek = moment(currentDate).endOf('week');
      title = `${startOfWeek.locale('fr').format('D MMM')} - ${endOfWeek.locale('fr').format('D MMM YYYY')}`;
    } else {
      title = currentDate.locale('fr').format('dddd, D MMMM YYYY');
    }
    
    return (
      <div style={styles.calendarHeader}>
        <div style={styles.calendarTitle}>{title}</div>
        <div style={styles.calendarActions}>
          <button style={styles.calendarButton} onClick={prevDate}>&lt;</button>
          <button style={styles.calendarButton} onClick={goToToday}>
            {translations.today[language]}
          </button>
          <button style={styles.calendarButton} onClick={nextDate}>&gt;</button>
        </div>
      </div>
    );
  };

  const renderViewTabs = () => {
    return (
      <div style={styles.viewTabs}>
        <button 
          style={view === 'month' ? styles.activeTab : styles.viewTab} 
          onClick={() => setView('month')}
        >
          {translations.month[language]}
        </button>
        <button 
          style={view === 'week' ? styles.activeTab : styles.viewTab} 
          onClick={() => setView('week')}
        >
          {translations.week[language]}
        </button>
        <button 
          style={view === 'day' ? styles.activeTab : styles.viewTab} 
          onClick={() => setView('day')}
        >
          {translations.day[language]}
        </button>
        <button 
          style={view === 'all' ? styles.activeTab : styles.viewTab} 
          onClick={() => setView('all')}
        >
          {translations.all[language]}
        </button>
      </div>
    );
  };

  const getBookingsForDate = (date) => {
    // Retourne les réservations qui commencent ou se terminent à cette date précise
    // (toutes les réservations, pas seulement les "pending")
    return bookings.filter(booking => {
      const bookingStart = moment(booking.start_date).startOf('day');
      const bookingEnd = moment(booking.end_date).startOf('day');
      const currentDay = date.startOf('day');
      
      // Vérifier si c'est le jour de début OU le jour de fin de la réservation
      return (bookingStart.isSame(currentDay) || bookingEnd.isSame(currentDay));
    });
  };

  // Générer une couleur unique basée sur l'ID de réservation
  const getBookingColor = (bookingId, opacity = 1) => {
    // Utiliser les 6 premiers caractères de l'ID (ou l'ID entier s'il est court)
    // comme base pour générer une couleur
    const hash = String(bookingId).substring(0, 6);
    let color = '#';
    
    // Convertir les caractères en valeurs hexadécimales
    for (let i = 0; i < 3; i++) {
      // Extraire deux caractères à la fois ou utiliser une valeur par défaut
      const value = parseInt(hash.substring(i * 2, i * 2 + 2), 36) || 8 + i * 5;
      // Convertir en valeur hexadécimale entre 50 et 200 pour éviter les couleurs trop claires ou trop foncées
      const hex = Math.min(Math.max(50, value * 5), 200).toString(16);
      color += hex.length === 1 ? '0' + hex : hex;
    }
    
    return opacity < 1 ? color + Math.floor(opacity * 255).toString(16) : color;
  };

  // Gérer l'ouverture de l'infobulle
  const handleInfoClick = (event, booking) => {
    event.stopPropagation();
    setSelectedBooking(booking);
    setShowInfo(true);
  };

  // Gérer la fermeture de l'infobulle
  const handleCloseInfo = () => {
    setShowInfo(false);
  };

  // Gérer l'affichage des réservations d'une journée
  const handleShowDateBookings = (event, bookings, date) => {
    event.stopPropagation();
    setSelectedDateBookings(bookings);
    setShowDateBookings(true);
  };

  // Gérer la fermeture du popup des réservations
  const handleCloseDateBookings = () => {
    setShowDateBookings(false);
  };

  // Composant pour l'infobulle
  const InfoTooltip = () => {
    if (!selectedBooking || !showInfo) return null;
    
    return (
      <div className="popup-overlay" style={styles.popupOverlay}>
        <div 
          ref={infoPopupRef}
          style={styles.infoTooltipCentered}
        >
          <div style={styles.infoHeader}>
            <h3 style={styles.infoTitle}>Détails de la réservation</h3>
            <button style={styles.closeButton} onClick={handleCloseInfo}>×</button>
          </div>
          <div style={styles.infoContent}>
            <p><strong>Voiture:</strong> {selectedBooking.Car ? selectedBooking.Car.name : 'Non spécifié'}</p>
            <p><strong>Matricule:</strong> {selectedBooking.Car ? selectedBooking.Car.matricule : 'Non spécifié'}</p>
            <p><strong>Client:</strong> {selectedBooking.User ? selectedBooking.User.name : 'Non spécifié'}</p>
            <p><strong>Début:</strong> {moment(selectedBooking.start_date).locale('fr').format('DD/MM/YYYY')}</p>
            <p><strong>Fin:</strong> {moment(selectedBooking.end_date).locale('fr').format('DD/MM/YYYY')}</p>
            <p><strong>Statut:</strong> {translations[selectedBooking.status.toLowerCase()][language]}</p>
          </div>
        </div>
      </div>
    );
  };

  // Composant pour afficher toutes les réservations d'une journée
  const DateBookingsPopup = () => {
    if (!selectedDateBookings.length || !showDateBookings) return null;
    
    const formattedDate = moment(selectedDateBookings[0].start_date).locale('fr').format('DD/MM/YYYY');
    
    return (
      <div className="popup-overlay" style={styles.popupOverlay}>
        <div 
          ref={dateBookingsPopupRef}
          style={styles.dateBookingsPopupCentered}
        >
          <div style={styles.infoHeader}>
            <h3 style={styles.infoTitle}>Réservations du {formattedDate}</h3>
            <button style={styles.closeButton} onClick={handleCloseDateBookings}>×</button>
          </div>
          <div style={styles.tableContainer}>
            <table style={styles.bookingsTable}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Voiture</th>
                  <th style={styles.tableHeader}>Client</th>
                  <th style={styles.tableHeader}>Début</th>
                  <th style={styles.tableHeader}>Fin</th>
                  <th style={styles.tableHeader}>Statut</th>
                </tr>
              </thead>
              <tbody>
                {selectedDateBookings.map((booking, idx) => {
                  const isStartDate = moment(booking.start_date).startOf('day').isSame(moment(selectedDateBookings[0].start_date).startOf('day'));
                  const statusColor = getStatusColor(booking.status, 0.2);
                  const statusTextColor = getStatusColor(booking.status, 1);
                  
                  return (
                    <tr key={idx} style={{
                      backgroundColor: idx % 2 === 0 ? '#f9f9f9' : '#ffffff',
                      borderLeft: `4px solid ${getBookingColor(booking.id)}`
                    }}>
                      <td style={styles.tableCell}>{booking.Car ? booking.Car.name : 'Non spécifié'}</td>
                      <td style={styles.tableCell}>{booking.User ? booking.User.name : 'Non spécifié'}</td>
                      <td style={styles.tableCell}>{moment(booking.start_date).locale('fr').format('DD/MM/YYYY')}</td>
                      <td style={styles.tableCell}>{moment(booking.end_date).locale('fr').format('DD/MM/YYYY')}</td>
                      <td style={{
                        ...styles.tableCell,
                        backgroundColor: statusColor,
                        color: statusTextColor,
                        fontWeight: 'bold',
                        borderRadius: '4px',
                        padding: '4px 8px',
                        textAlign: 'center'
                      }}>
                        {translations[booking.status.toLowerCase()][language]}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderMonthView = () => {
    const startOfMonth = moment(currentDate).startOf('month');
    const endOfMonth = moment(currentDate).endOf('month');
    const startDate = moment(startOfMonth).startOf('week');
    const endDate = moment(endOfMonth).endOf('week');
    const totalDays = endDate.diff(startDate, 'days') + 1;
    const weeks = totalDays / 7;
    
    const days = [];
    let day = startDate;
    
    // Create an array of day objects for rendering the grid
    for (let i = 0; i < totalDays; i++) {
      days.push(moment(day));
      day = day.clone().add(1, 'day');
    }
    
    // Filter bookings that are visible in the current month view range
    const visibleBookings = bookings.filter(booking => {
      const bookingStart = moment(booking.start_date).startOf('day');
      const bookingEnd = moment(booking.end_date).startOf('day');
      return bookingStart.isSameOrBefore(endDate) && bookingEnd.isSameOrAfter(startDate);
    });
    
    // --- Logic for positioning booking bars --- (Simplified for now)
    // This is a basic approach and might need refinement for complex overlaps
    const bookingBarPositions = {}; // To store vertical position for each booking track
    
    const renderedBookings = visibleBookings.map(booking => {
      const bookingStart = moment(booking.start_date).startOf('day');
      const bookingEnd = moment(booking.end_date).startOf('day');
      
      // Calculate start and end column (day index) and row (week index)
      const startDayIndex = bookingStart.diff(startDate, 'days');
      const endDayIndex = bookingEnd.diff(startDate, 'days');
      
      const startColumn = startDayIndex % 7;
      const startRow = Math.floor(startDayIndex / 7);
      
      const endColumn = endDayIndex % 7;
      const endRow = Math.floor(endDayIndex / 7);
      
      // Calculate the number of days the booking spans within the visible range
      const spanDays = Math.min(endDayIndex, totalDays - 1) - Math.max(startDayIndex, 0) + 1;
      
      // Calculate the width of the bar (relative to day cell width)
      // This is simplified; actual width depends on CSS Grid and day cell size
      const barWidth = `calc(${(spanDays / 7) * 100}% + ${spanDays - 1}px)`; // Approximation
      
      // Calculate the left position
      const barLeft = `calc(${(startColumn / 7) * 100}% + ${startColumn}px)`; // Approximation
      
      // Determine vertical position (track)
      let track = 0;
      while (bookingBarPositions[`${startRow}-${track}`] && moment(bookingBarPositions[`${startRow}-${track}`]).isSameOrBefore(bookingEnd)) {
        track++;
      }
      bookingBarPositions[`${startRow}-${track}`] = bookingEnd; // Mark this track as occupied until bookingEnd
      
      const barTop = `${startRow * 100 + track * 20}px`; // Approximation: adjust vertical spacing
      
      const bookingColor = getBookingColor(booking.id);
      
      return (
        <div
          key={booking.id}
          style={{
            position: 'absolute',
            top: barTop,
            left: barLeft,
            width: barWidth,
            backgroundColor: '#52c41a', // Green background
            height: '18px', // Adjust height as needed
            borderRadius: '4px',
            color: '#fff', // White text for clarity
            fontSize: '12px',
            fontWeight: 'bold', // Make text bold
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            padding: '2px 5px',
            boxSizing: 'border-box',
            zIndex: 1, // Ensure bars are above day cells
            cursor: 'pointer',
          }}
          onClick={(e) => handleInfoClick(e, booking)}
        >
          {booking.Car ? booking.Car.name : 'Booking'}
        </div>
      );
    });
    
    return (
      <div style={styles.calendarContainerModified}> {/* Use a new style for the container */}
        <div style={styles.calendarGridHeader}> {/* Header for weekdays */}
          {days.slice(0, 7).map((day, i) => (
            <div key={`header-${i}`} style={styles.calendarHeaderDay}>
              {day.locale('fr').format('ddd')}
            </div>
          ))}
        </div>
        <div style={styles.calendarGridContent}> {/* Content for days and booking bars */}
          {days.map((day, i) => {
            const isCurrentMonth = day.month() === currentDate.month();
            const isToday = day.isSame(moment(), 'day');
            
            return (
              <div 
                key={day.format('YYYY-MM-DD')} 
                style={{
                  ...styles.calendarDayModified,
                  ...(isCurrentMonth ? {} : styles.otherMonth),
                  ...(isToday ? styles.todayCell : {}),
                }}
              >
                <div style={styles.dateNumber}>{day.date()}</div>
                {/* Bookings are rendered as absolute positioned elements in the parent container */}
              </div>
            );
          })}
          {renderedBookings}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const startOfWeek = moment(currentDate).startOf('week');
    const endOfWeek = moment(currentDate).endOf('week');
    
    const days = [];
    let day = startOfWeek;
    
    while (day <= endOfWeek) {
      const currentDay = moment(day);
      const isToday = currentDay.isSame(moment(), 'day');
      const dayBookings = getBookingsForDate(currentDay);
      
      days.push(
        <div 
          key={day.format('YYYY-MM-DD')} 
          style={{
            ...styles.weekDay,
            ...(isToday ? styles.todayCell : {})
          }}
        >
          <div style={styles.weekDayHeader}>
            <div style={styles.weekDayName}>{day.locale('fr').format('ddd')}</div>
            <div style={styles.weekDayNumber}>{day.date()}</div>
          </div>
          <div style={styles.weekDayContent}>
            {dayBookings.length > 0 ? (
              dayBookings.map((booking, idx) => {
                const isStartDate = moment(booking.start_date).startOf('day').isSame(currentDay.startOf('day'));
                const isEndDate = moment(booking.end_date).startOf('day').isSame(currentDay.startOf('day'));
                const bookingColor = getBookingColor(booking.id);
                
                return (
                  <div 
                    key={`${booking.id}-${idx}`} 
                    style={{
                      ...styles.weekBooking,
                      backgroundColor: `${bookingColor}33`, // Ajouter 33 (20% d'opacité) en hexadécimal
                      borderLeft: `4px solid ${bookingColor}`,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div style={styles.bookingTime}>
                      {isStartDate ? <strong>Début: </strong> : ''}
                      {isStartDate ? moment(booking.start_date).locale('fr').format('DD/MM/YYYY') : ''}
                      
                      {isEndDate ? <strong>Fin: </strong> : ''}
                      {isEndDate ? moment(booking.end_date).locale('fr').format('DD/MM/YYYY') : ''}
                    </div>
                    <button 
                      style={styles.infoButton}
                      onClick={(e) => handleInfoClick(e, booking)}
                    >
                      i
                    </button>
                  </div>
                );
              })
            ) : (
              <div style={styles.noBookings}>{translations.noBookings[language]}</div>
            )}
          </div>
        </div>
      );
      
      day = day.clone().add(1, 'day');
    }
    
    return (
      <div style={styles.weekContainer}>
        {days}
      </div>
    );
  };

  const renderDayView = () => {
    const dayBookings = getBookingsForDate(moment(currentDate));
    
    return (
      <div style={styles.dayContainer}>
        <div style={styles.dayHeader}>
          <div style={styles.dayDate}>{currentDate.locale('fr').format('dddd, D MMMM YYYY')}</div>
        </div>
        <div style={styles.dayContent}>
          {dayBookings.length > 0 ? (
            dayBookings.map((booking, idx) => {
              const isStartDate = moment(booking.start_date).startOf('day').isSame(currentDate.startOf('day'));
              const isEndDate = moment(booking.end_date).startOf('day').isSame(currentDate.startOf('day'));
              const bookingColor = getBookingColor(booking.id);
              
              return (
                <div 
                  key={`${booking.id}-${idx}`} 
                  style={{
                    ...styles.dayBooking,
                    backgroundColor: `${bookingColor}1A`, // 1A = 10% d'opacité en hexadécimal
                    borderLeft: `4px solid ${bookingColor}`
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <h3 style={styles.dayBookingTitle}>
                      <FaCalendarAlt style={{ marginRight: '5px' }} />
                      {isStartDate ? 'Début de réservation' : 'Fin de réservation'}
                    </h3>
                    <button 
                      style={{...styles.infoButton, fontSize: '18px'}}
                      onClick={(e) => handleInfoClick(e, booking)}
                    >
                      i
                    </button>
                  </div>
                  <div style={styles.dayBookingDetails}>
                    <div style={styles.dayBookingInfo}>
                      <FaCalendarAlt style={{ marginRight: '5px' }} />
                      {isStartDate ? (
                        <strong>Date de début: {moment(booking.start_date).locale('fr').format('DD/MM/YYYY')}</strong>
                      ) : (
                        <strong>Date de fin: {moment(booking.end_date).locale('fr').format('DD/MM/YYYY')}</strong>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div style={styles.noDayBookings}>{translations.noBookings[language]}</div>
          )}
        </div>
      </div>
    );
  };

  const getStatusColor = (status, opacity = 1) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return `rgba(82, 196, 26, ${opacity})`;
      case 'pending':
        return `rgba(250, 173, 20, ${opacity})`;
      case 'completed':
        return `rgba(24, 144, 255, ${opacity})`;
      case 'cancelled':
        return `rgba(245, 34, 45, ${opacity})`;
      case 'denied':
        return `rgba(255, 0, 0, ${opacity})`;
      case 'unknown':
        return `rgba(155, 155, 155, ${opacity})`;
      default:
        return `rgba(155, 155, 155, ${opacity})`;
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return <FaCheck style={{ color: 'green', marginRight: '5px' }} />;
      case 'pending':
        return <FaCalendarAlt style={{ color: 'orange', marginRight: '5px' }} />;
      case 'completed':
        return <FaCheck style={{ color: 'blue', marginRight: '5px' }} />;
      case 'cancelled':
        return <FaTimes style={{ color: 'red', marginRight: '5px' }} />;
      case 'denied':
        return <FaTimes style={{ color: 'red', marginRight: '5px' }} />;
      default:
        return null;
    }
  };

  // Nouvel ajout - Rendu de la vue "All"
  const renderAllBookingsView = () => {
    return (
      <div style={styles.allBookingsContainer}>
        <h2 style={styles.allBookingsTitle}>{translations.allBookings[language]}</h2>
        <div style={styles.allBookingsTableContainer}>
          <table style={styles.allBookingsTable}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>{translations.car[language]}</th>
                <th style={styles.tableHeader}>{translations.client[language]}</th>
                <th style={styles.tableHeader}>Début</th>
                <th style={styles.tableHeader}>Fin</th>
                <th style={styles.tableHeader}>{translations.status[language]}</th>
                <th style={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, idx) => {
                const bookingColor = getBookingColor(booking.id);
                const statusColor = getStatusColor(booking.status, 0.2);
                const statusTextColor = getStatusColor(booking.status, 1);
                const bookingStatus = booking.status ? booking.status.toLowerCase() : 'unknown';
                const statusTranslation = translations[bookingStatus] ? translations[bookingStatus][language] : translations.unknown[language];
                
                return (
                  <tr key={idx} style={{
                    backgroundColor: idx % 2 === 0 ? '#f9f9f9' : '#ffffff',
                    borderLeft: `4px solid ${bookingColor}`
                  }}>
                    <td style={styles.tableCell}>{booking.Car ? booking.Car.name : 'Non spécifié'}</td>
                    <td style={styles.tableCell}>{booking.User ? booking.User.name : 'Non spécifié'}</td>
                    <td style={styles.tableCell}>{moment(booking.start_date).locale('fr').format('DD/MM/YYYY')}</td>
                    <td style={styles.tableCell}>{moment(booking.end_date).locale('fr').format('DD/MM/YYYY')}</td>
                    <td style={{
                      ...styles.tableCell,
                      backgroundColor: statusColor,
                      color: statusTextColor,
                      fontWeight: 'bold',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      textAlign: 'center'
                    }}>
                      {statusTranslation}
                    </td>
                    <td style={styles.tableCell}>
                      <button 
                        style={styles.infoButton}
                        onClick={(e) => handleInfoClick(e, booking)}
                      >
                        i
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <CalendarStyles />
      <div 
        style={{ 
          ...styles.mainContent,
          marginLeft: windowWidth >= 768 ? (isOpen ? '280px' : '0px') : '0px'
        }}
      >
        <div style={styles.calendarWrapper}>
          <div style={styles.pageHeader}>
            <h1 style={styles.pageTitle}>{translations.calendarTitle[language]}</h1>
            <div style={styles.titleUnderline}></div>
            <p style={styles.pageSubtitle}>{translations.calendarDesc[language]}</p>
          </div>
          {renderViewTabs()}
          {view !== 'all' && renderCalendarHeader()}
          
          {loading ? (
            <div style={styles.loadingIndicator}>Chargement...</div>
          ) : (
            <>
              {view === 'month' && renderMonthView()}
              {view === 'week' && renderWeekView()}
              {view === 'day' && renderDayView()}
              {view === 'all' && renderAllBookingsView()}
            </>
          )}

          {/* Afficher l'infobulle si nécessaire */}
          <InfoTooltip />
          
          {/* Afficher le popup des réservations d'une journée */}
          <DateBookingsPopup />
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    fontFamily: 'Arial, sans-serif',
  },
  mainContent: {
    position: 'relative',
    transition: 'margin-left 0.3s ease',
    padding: '20px',
    paddingTop: '30px',
  },
  pageHeader: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  pageTitle: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '10px',
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
    fontSize: '16px',
    color: '#666',
    maxWidth: '700px',
    margin: '0 auto',
  },
  calendarWrapper: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  viewTabs: {
    display: 'flex',
    marginBottom: '20px',
    borderBottom: '1px solid #f0f0f0',
    paddingBottom: '15px',
  },
  viewTab: {
    padding: '8px 16px',
    backgroundColor: '#f9f9f9',
    border: 'none',
    borderRadius: '4px',
    marginRight: '10px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '14px',
    color: '#666',
  },
  activeTab: {
    padding: '8px 16px',
    backgroundColor: '#1890ff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    marginRight: '10px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '14px',
    boxShadow: '0 2px 4px rgba(24, 144, 255, 0.3)',
  },
  calendarHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  calendarTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
  },
  calendarActions: {
    display: 'flex',
    gap: '10px',
  },
  calendarButton: {
    padding: '8px 12px',
    backgroundColor: '#f5f5f9',
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  // Month View Styles
  calendarContainerModified: {
    width: '100%',
    overflow: 'hidden', // Prevent horizontal scroll on container
    position: 'relative', // Needed for absolute positioning of booking bars
  },
  calendarGridHeader: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gridGap: '1px',
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    overflow: 'hidden',
  },
  calendarGridContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gridGap: '1px',
    backgroundColor: '#f0f0f0',
    borderBottomLeftRadius: '8px',
    borderBottomRightRadius: '8px',
    overflow: 'hidden',
    position: 'relative', // Needed for absolute positioning of booking bars
    minHeight: '600px', // Adjust minimum height as needed
  },
  calendarHeaderDay: {
    padding: '10px',
    textAlign: 'center',
    backgroundColor: '#fafafa',
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#666',
  },
  calendarDayModified: {
    minHeight: '100px', // Ensure day cells have enough height
    padding: '5px',
    backgroundColor: '#fff',
    position: 'relative', // Needed for positioning content within the day cell (like date number)
    zIndex: 0, // Ensure day cells are behind booking bars
  },
  dateNumber: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '5px',
    position: 'relative', // Position relative to the day cell
    zIndex: 2, // Ensure date number is above booking bars
  },
  otherMonth: {
    backgroundColor: '#f9f9f9',
    color: '#ccc',
  },
  todayCell: {
    backgroundColor: '#e6f7ff',
    border: '1px solid #1890ff',
  },
  // Week View Styles
  weekContainer: {
    display: 'flex',
    overflowX: 'auto',
    gap: '10px',
  },
  weekDay: {
    flex: '1',
    minWidth: '200px',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  weekDayHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  weekDayName: {
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#666',
  },
  weekDayNumber: {
    fontSize: '24px',
    color: '#333',
  },
  weekDayContent: {
    padding: '10px',
    backgroundColor: '#fff',
    minHeight: '300px',
  },
  weekBooking: {
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
  },
  bookingTime: {
    fontSize: '12px',
    color: '#888',
    marginBottom: '5px',
  },
  todayCell: {
    backgroundColor: '#e6f7ff',
    border: '1px solid #1890ff',
  },
  // Day View Styles
  dayContainer: {
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  dayHeader: {
    padding: '15px',
    backgroundColor: '#fafafa',
    borderBottom: '1px solid #f0f0f0',
  },
  dayDate: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
  },
  dayContent: {
    padding: '20px',
    backgroundColor: '#fff',
    minHeight: '400px',
  },
  dayBooking: {
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '15px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
  },
  dayBookingTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
  },
  dayBookingDetails: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '15px',
  },
  dayBookingInfo: {
    fontSize: '14px',
    color: '#666',
    display: 'flex',
    alignItems: 'center',
  },
  noDayBookings: {
    fontSize: '14px',
    color: '#999',
    textAlign: 'center',
    marginTop: '30px',
  },
  loadingIndicator: {
    padding: '30px',
    textAlign: 'center',
    fontSize: '16px',
    color: '#666',
  },
  infoButton: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: '#ffffff',
    color: '#1890ff',
    border: '1px solid #1890ff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold',
    marginLeft: '5px',
    padding: 0,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  
  // Superposition pour bloquer l'interface derrière les pop-ups
  popupOverlay: {
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
  
  infoTooltipCentered: {
    width: '350px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
    zIndex: 1001,
    animation: 'fadeIn 0.3s ease-out',
    maxHeight: '80vh',
    overflow: 'auto',
  },
  
  infoHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 20px',
    borderBottom: '1px solid #f0f0f0',
    backgroundColor: '#f9f9f9',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
  },
  
  infoTitle: {
    margin: 0,
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
  },
  
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    color: '#666',
    cursor: 'pointer',
    transition: 'color 0.2s',
    padding: '0 5px',
    lineHeight: 1,
  },
  
  infoContent: {
    padding: '20px',
    lineHeight: 1.6,
    textAlign: 'left',
  },
  
  dateBookingsPopupCentered: {
    width: '600px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
    zIndex: 1001,
    animation: 'fadeIn 0.3s ease-out',
    maxHeight: '80vh',
    overflow: 'auto',
  },
  
  tableContainer: {
    padding: '15px',
    maxHeight: '60vh',
    overflowY: 'auto',
  },
  
  bookingsTable: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  
  tableHeader: {
    backgroundColor: '#f9f9f9',
    fontWeight: 'bold',
    padding: '12px 8px',
    textAlign: 'left',
    borderBottom: '2px solid #eee',
  },
  
  tableCell: {
    padding: '10px 8px',
    borderBottom: '1px solid #eee',
    verticalAlign: 'middle',
  },
  
  // Styles pour la vue "All"
  allBookingsContainer: {
    width: '100%',
    padding: '20px 0',
  },
  allBookingsTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
    textAlign: 'center',
  },
  allBookingsTableContainer: {
    width: '100%',
    overflowX: 'auto',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    borderRadius: '8px',
  },
  allBookingsTable: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
};

export default Calendrier; 