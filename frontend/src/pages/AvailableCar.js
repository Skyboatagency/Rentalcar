import React, { useState, useEffect, useRef } from 'react';
import { 
  FaBookmark, FaLanguage, FaMoneyBillWave, FaUser, FaChevronDown, FaChevronUp, 
  FaMapMarkerAlt, FaSync, FaTimes, FaUserPlus, FaCheckCircle, FaGasPump, FaCog, 
  FaUsers, FaEnvelope, FaInstagram, FaList, FaFacebook, FaCalendarAlt, FaBars, FaChevronLeft, FaChevronRight, FaFilter, FaWindowClose, FaStar, 
  FaPlus, FaMinus // Utilisé aussi comme tiret
} from 'react-icons/fa';
import axios from 'axios';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import 'moment/locale/ar';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollToTopButton from '../components/ScrollToTopButton';

// Style global pour garantir une cohérence entre les pages


/* ------------------------------------------------------------------
   TEXTES MULTILINGUES
------------------------------------------------------------------ */
const texts = {
  en: {
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
    heroTitle: "Find your perfect car for the perfect price !",
    heroSubtitle: "Search and find your best car..",
    pickUpLabel: "Pick up location",
    pickUpDateLabel: "Pick Up & Return Dates",
    returnDateLabel: "Return Date & Time",
    findButton: "Find a vehicle",
    setYourPrice: "Set your price",
    fuelTypeFilter: "Fuel type",
    transmissionFilter: "Transmission",
    apply: "Apply",
    clear: "Clear",
    itemsFound: "Items found",
    sortByPrice: "Sort by price:",
    lowestPrice: "lowest price",
    highestPrice: "highest price",
    all: "All",
    petrol: "Petrol",
    diesel: "Diesel",
    hybrid: "Hybrid",
    electric: "Electric",
    manual: "Manual",
    automatic: "Automatic",
    yearLabel: "Year",
    transmissionLabel: "Transmission",
    seatsLabel: "Seats",
    fuelTypeLabel: "Fuel type",
    pricePerDayLabel: "Price/Day",
    bookNow: "Book now",
    heroMainTitle: "Our Available Vehicles",
    heroSubtitles: "Turning dreams into reality with versatile vehicles.",
    footerQuickLinks: "Quick Access Links",
    footerInfoPages: "Informational Pages",
    footerLocation: "Our location",
    followUs: "Follow us on:",
    footerHome: "Home",
    footerFAQs: "FAQs",
    footerContact: "Contact Us",
    footerAbout: "About Us",
    footerTerms: "Terms & Conditions",
    footerPrivacy: "Privacy Policy",
    chatButton: "Chat with Us",
    locationPlaceholder: "365, Boulevard Zerktouni - Casablanca, Morocco.",
    mad: "MAD",
    euro: "EURO",
    dollar: "DOLLAR",
    seats: "seats",
    estimatedPrice: "Estimated Price",
    chooseDates: "Choose the start and end dates for your car rental.",
    book: "Confirm",
    viewAllCars: "View All Cars",
  },
  fr: {
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
    heroTitle: "Trouvez la voiture idéale au meilleur prix !",
    heroSubtitle: "Cherchez et réservez votre voiture de location en quelques clics !",
    pickUpLabel: "Lieu de prise en charge",
    pickUpDateLabel: "Dates de prise et retour",
    returnDateLabel: "Date & Heure de retour",
    findButton: "Trouver un véhicule",
    setYourPrice: "Définissez votre prix",
    fuelTypeFilter: "Type de carburant",
    transmissionFilter: "Transmission",
    apply: "Appliquer",
    clear: "Effacer",
    itemsFound: "Éléments trouvés",
    sortByPrice: "Trier par prix :",
    lowestPrice: "le prix le plus bas",
    highestPrice: "le prix le plus élevé",
    all: "Tous",
    petrol: "Essence",
    diesel: "Diesel",
    hybrid: "Hybride",
    electric: "Électrique",
    manual: "Manuelle",
    automatic: "Automatique",
    yearLabel: "Année",
    transmissionLabel: "Transmission",
    seatsLabel: "Places",
    fuelTypeLabel: "Carburant",
    pricePerDayLabel: "Prix/Jour",
    bookNow: "Réserver",
    heroMainTitle: "Nos véhicules",
    heroSubtitles: "Transformez vos rêves en réalité avec des véhicules polyvalents.",
    footerQuickLinks: "Liens rapides",
    footerInfoPages: "Pages d'information",
    footerLocation: "Notre emplacement",
    followUs: "Suivez-nous sur :",
    footerHome: "Accueil",
    footerFAQs: "FAQs",
    footerContact: "Contactez-nous",
    footerAbout: "À propos",
    footerTerms: "Conditions Générales",
    footerPrivacy: "Politique de confidentialité",
    chatButton: "Chattez avec nous",
    locationPlaceholder: "365, Boulevard Zerktouni - Casablanca, Maroc.",
    mad: "MAD",
    euro: "EURO",
    dollar: "DOLLAR",
    seats: "places",
    estimatedPrice: "Prix estimé",
    chooseDates: "Choisissez les dates de début et de fin pour votre location.",
    book: "Confirmer",
    viewAllCars: "Voir toutes les voitures",
  },
  ar: {
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
    heroTitle: "ابحث عن السيارة المثالية بالسعر المثالي!",
    heroSubtitle: "ابحث واحجز أفضل سيارة للإيجار!",
    pickUpLabel: "موقع الاستلام",
    pickUpDateLabel: "تاريخ الاستلام والإرجاع",
    returnDateLabel: "تاريخ ووقت الإرجاع",
    findButton: "ابحث عن مركبة",
    setYourPrice: "حدد سعرك",
    fuelTypeFilter: "نوع الوقود",
    transmissionFilter: "ناقل الحركة",
    apply: "تطبيق",
    clear: "مسح",
    itemsFound: "عناصر موجودة",
    sortByPrice: "فرز حسب السعر:",
    lowestPrice: "الأقل سعراً",
    highestPrice: "الأعلى سعراً",
    all: "الكل",
    petrol: "بنزين",
    diesel: "ديزل",
    hybrid: "هايبرد",
    electric: "كهرباء",
    manual: "يدوي",
    automatic: "أوتوماتيك",
    yearLabel: "السنة",
    transmissionLabel: "ناقل الحركة",
    seatsLabel: "عدد المقاعد",
    fuelTypeLabel: "نوع الوقود",
    pricePerDayLabel: "السعر/اليوم",
    bookNow: "احجز الآن",
    heroMainTitle: "مركباتنا",
    heroSubtitles: "حقق أحلامك مع مركبات متعددة الاستخدامات.",
    footerQuickLinks: "روابط سريعة",
    footerInfoPages: "صفحات المعلومات",
    footerLocation: "موقعنا",
    followUs: "تابعنا على:",
    footerHome: "الرئيسية",
    footerFAQs: "أسئلة شائعة",
    footerContact: "اتصل بنا",
    footerAbout: "معلومات عنا",
    footerTerms: "الأحكام والشروط",
    footerPrivacy: "سياسة الخصوصية",
    chatButton: "تحدث معنا",
    locationPlaceholder: "شارع زركتوني ٣٦٥ - الدار البيضاء، المغرب.",
    mad: "درهم",
    euro: "يورو",
    dollar: "دولار",
    seats: "مقاعد",
    estimatedPrice: "السعر التقديري",
    chooseDates: "اختر تواريخ البداية والنهاية لاستئجار سيارتك.",
    book: "تأكيد",
    viewAllCars: "مشاهدة كل السيارات",
  }
};

/* ------------------------------------------------------------------
   BARRE DU HAUT (NAVIGATION, CHOIX LANGUE, MONNAIE, PROFIL)
------------------------------------------------------------------ */
// Removed inline TopBar component

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return width;
}

/* ------------------------------------------------------------------
   PAGE DES VOITURES DISPONIBLES
------------------------------------------------------------------ */
const AvailableCar = () => {
  const navigate = useNavigate();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent || navigator.vendor);
  const isMobile = screenWidth < 600;

  // Définir la locale de moment selon la langue sélectionnée
  const [selectedLanguage, setSelectedLanguage] = useState(
    () => localStorage.getItem('language') || 'en'
  );

  // Force la page à défiler vers le haut au montage du composant
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (selectedLanguage === 'ar') {
      moment.locale('ar');
    } else if (selectedLanguage === 'fr') {
      moment.locale('fr');
    } else {
      moment.locale('en');
    }
  }, [selectedLanguage]);

  const lang = texts[selectedLanguage];

  useEffect(() => {
    document.body.setAttribute('dir', selectedLanguage === 'ar' ? 'rtl' : 'ltr');
  }, [selectedLanguage]);

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Récupération de l'utilisateur depuis localStorage
  const storedUser = localStorage.getItem("user");
  let user = null;
  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    // Si erreur de parsing, considérer l'utilisateur comme non connecté
  }
  const isLoggedIn = !!user;
  const userName = user ? user.name : '';

  const handleSignOut = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currency, setCurrency] = useState('MAD');
  const conversionRates = { MAD: 1, EURO: 0.09, DOLLAR: 0.1 };

  /* --------------------------
     États pour la section de recherche
  -------------------------- */
  const [pickupLocation, setPickupLocation] = useState('All');
  const [pickupDate, setPickupDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [searchFocusedInput, setSearchFocusedInput] = useState(null);
  const [showSearchDatePicker, setShowSearchDatePicker] = useState(false);

  /* --------------------------
     États pour la modale de réservation
  -------------------------- */
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [bookingStartDate, setBookingStartDate] = useState(null);
  const [bookingEndDate, setBookingEndDate] = useState(null);
  const [bookingFocusedInput, setBookingFocusedInput] = useState(null);
  const [showBookingDatePicker, setShowBookingDatePicker] = useState(false);

  /* --------------------------
     États & fonctions pour la liste de voitures
  -------------------------- */
  const [cars, setCars] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [priceValue, setPriceValue] = useState(5000);
  const [fuelSelected, setFuelSelected] = useState([]);
  const [transSelected, setTransSelected] = useState([]);
  const [seatsFilter, setSeatsFilter] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [locations, setLocations] = useState([]);
  const [sortValue, setSortValue] = useState('lowest');

  const API_URL = process.env.REACT_APP_API_URL;
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    fetchCars();
    
    // Récupérer les filtres depuis l'URL
    const searchParams = new URLSearchParams(window.location.search);
    const pickupLocationParam = searchParams.get('pickupLocation');
    const priceValueParam = searchParams.get('priceValue');
    const fuelTypeParam = searchParams.get('fuelType');
    const transmissionParam = searchParams.get('transmission');
    const seatsNumberParam = searchParams.get('seatsNumber');

    if (pickupLocationParam) setPickupLocation(pickupLocationParam);
    if (priceValueParam) setPriceValue(Number(priceValueParam));
    if (fuelTypeParam && fuelTypeParam !== 'All') setFuelSelected([fuelTypeParam.toLowerCase()]);
    if (transmissionParam && transmissionParam !== 'All') setTransSelected([transmissionParam.toLowerCase()]);
    if (seatsNumberParam && seatsNumberParam !== 'All') setSeatsFilter([Number(seatsNumberParam)]);
  }, []);

  const fetchCars = async () => {
    try {
      const [carsRes, bookingsRes] = await Promise.all([
        axios.get(`${API_URL}/cars`),
        axios.get(`${API_URL}/bookings`)
      ]);

      let cars = carsRes.data;
      const bookings = bookingsRes.data;

      if (!Array.isArray(cars) && cars.cars && Array.isArray(cars.cars)) {
        cars = cars.cars;
      }

      // Calculer la date de disponibilité pour chaque voiture
      const carsWithAvailability = cars.map(car => {
        // Filtrer uniquement les réservations approuvées pour cette voiture
        const carBookings = bookings.filter(booking => 
          booking.car_id === car.id && 
          booking.status === 'approved'
        );

        if (carBookings.length === 0) {
          return { ...car, availability: true, next_available_date: null };
        }

        // Trier les réservations par date de fin
        const sortedBookings = carBookings.sort((a, b) => 
          new Date(b.end_date) - new Date(a.end_date)
        );

        const lastBooking = sortedBookings[0];
        const lastEndDate = new Date(lastBooking.end_date);
        const now = new Date();

        // Si la dernière réservation est terminée, la voiture est disponible
        if (lastEndDate < now) {
          return { ...car, availability: true, next_available_date: null };
        }

        // Sinon, la voiture sera disponible le jour après la fin de la dernière réservation
        const nextAvailableDate = new Date(lastEndDate);
        nextAvailableDate.setDate(nextAvailableDate.getDate() + 1);

        return { 
          ...car, 
          availability: false, 
          next_available_date: nextAvailableDate.toISOString()
        };
      });

      if (Array.isArray(carsWithAvailability)) {
        setCars(carsWithAvailability);
        setTotalItems(carsWithAvailability.length);
      } else {
        setCars([]);
        setTotalItems(0);
      }
    } catch (error) {
      console.error('Error fetching cars:', error);
      setCars([]);
      setTotalItems(0);
    }
  };

  useEffect(() => {
    const uniqueLocs = [...new Set(cars.map(c => c.location).filter(Boolean))];
    setLocations(uniqueLocs);
  }, [cars]);

  const getFilteredCars = () => {
    let filtered = cars.filter(car => {
      const locationOK = pickupLocation === 'All' ? true : car.location === pickupLocation;
      const cityOK = !selectedCity || car.location === selectedCity;
      const priceOK = car.price_per_day <= priceValue;
      const fuelOK = fuelSelected.length === 0 || fuelSelected.includes(car.fuel_type);
      const transOK = transSelected.length === 0 || transSelected.includes(car.transmission);
      const seatsOK = seatsFilter.length === 0 || seatsFilter.includes(car.seats);
      return locationOK && cityOK && priceOK && fuelOK && transOK && seatsOK;
    });

    if (sortValue === 'lowest') {
      filtered.sort((a, b) => a.price_per_day - b.price_per_day);
    } else {
      filtered.sort((a, b) => b.price_per_day - a.price_per_day);
    }
    return filtered;
  };

  const filteredCars = getFilteredCars();
  const displayedCars = filteredCars;

  /* --------------------------
     Handlers
  -------------------------- */
  const handleFindVehicle = () => {
    setShowSearchDatePicker(false);
  };

  const handleRefresh = () => {
    setPickupLocation('All');
    setPickupDate(null);
    setReturnDate(null);
    setPriceValue(5000);
    setFuelSelected([]);
    setTransSelected([]);
    setSeatsFilter([]);
    setSortValue('lowest');
    fetchCars();
  };

  const handleClearPrice = () => {
    setPriceValue(5000);
  };

  const handleApplyPrice = () => {
    // Price filter applied directly to displayed cars
  };

  const handleFuelCheck = (fuel) => {
    if (fuelSelected.includes(fuel)) {
      setFuelSelected(fuelSelected.filter(f => f !== fuel));
    } else {
      setFuelSelected([...fuelSelected, fuel]);
    }
  };

  const handleTransCheck = (transType) => {
    if (transSelected.includes(transType)) {
      setTransSelected(transSelected.filter(item => item !== transType));
    } else {
      setTransSelected([...transSelected, transType]);
    }
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  const handleSortChange = (e) => {
    setSortValue(e.target.value);
  };

  const convertPrice = (price) => {
    return (price * conversionRates[currency]).toFixed(2);
  };

  const getCurrencySymbol = () => {
    switch(currency) {
      case 'EURO': return '€';
      case 'DOLLAR': return '$';
      case 'MAD': 
      default: return 'MAD';
    }
  };

  /* --------------------------
     Rendu de la carte d'une voiture
  -------------------------- */
  const renderCarCard = (car) => {
    // Check car availability
    const isAvailable = car.availability === true;
    const nextAvailableDate = car.next_available_date ? new Date(car.next_available_date) : null;
    
    if (isMobile) {
      // MOBILE CARD
      return (
        <div key={car.id} style={styles.mobileCardContainer}>
          {/* Availability Badge */}
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            padding: '4px 8px',
            borderRadius: '4px',
            backgroundColor: isAvailable ? '#4CAF50' : '#FF9800',
            color: 'white',
            fontSize: '10px',
            fontWeight: 'bold',
            zIndex: 2,
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            opacity: 1,
            display: 'block'
          }}>
            {isAvailable ? 'Disponible maintenant' : 
              nextAvailableDate ? `Disponible le ${moment(nextAvailableDate).format('DD/MM/YYYY')}` : 
              'Contactez-nous pour la disponibilité'}
          </div>
          <div style={styles.mobileImageWrapper}>
            <img
              src={car.image_url ? `${BASE_URL}${car.image_url}` : '/images/no-car.png'}
              alt={car.name}
              style={styles.mobileImage}
            />
          </div>
          <div style={styles.mobileInfoWrapper}>
            <h3 style={styles.mobileCarName}>
              {car.name ? car.name.toUpperCase() : ''} - {car.model}
            </h3>
            {/* Reviews row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <span style={{ fontWeight: 'bold', fontSize: 13 }}>{car.rating || 0}</span>
              <FaStar style={{ color: '#FFD700', fontSize: '14px', verticalAlign: 'middle' }} />
              <span style={{ fontSize: '11px', color: '#666' }}>({car.reviews || reviewsCountMap[car.id] || 0} reviews)</span>
            </div>
            <div style={styles.mobileLocation}>
              <FaMapMarkerAlt style={{ color: '#333', marginRight: '5px' }} />
              <span>{car.location}</span>
            </div>
            <div style={styles.mobileRowThreeColumns}>
              <div style={styles.mobileDetailLine}>
                <FaCalendarAlt style={styles.featureIcon} />
                <span>{car.year}</span>
              </div>
              <div style={styles.mobileDetailLine}>
                <FaCog style={styles.featureIcon} />
                <span>{car.transmission}</span>
              </div>
              <div style={styles.mobileDetailLine}>
                <FaGasPump style={styles.featureIcon} />
                <span>{car.fuel_type}</span>
              </div>
            </div>
            <div style={styles.mobileDetailLine}>
              <FaUsers style={styles.featureIcon} />
              <span>{car.seats} {lang.seats}</span>
            </div>
            <div style={styles.priceText}>
              {convertPrice(car.price_per_day)} {getCurrencySymbol()} <span style={styles.priceLabel}>/ Day{lang.day}</span>
            </div>
            <button
              style={styles.mobileBookButton}
              onClick={() => {
                setBookingStartDate(null);
                setBookingEndDate(null);
                setSelectedCar(car);
                setBookingModalOpen(true);
                setShowBookingDatePicker(false);
              }}
            >
              {lang.bookNow}
            </button>
          </div>
        </div>
      );
    }
    // DESKTOP CARD (unchanged)
    return (
      <div 
        key={car.id} 
        style={styles.desktopCardContainer}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 8px 15px rgba(0,0,0,0.1)';
          e.currentTarget.style.transition = 'all 0.3s ease';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
          e.currentTarget.style.transition = 'all 0.3s ease';
        }}
      >
        {/* Availability Badge - Only visible in car cards */}
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          padding: '5px 10px',
          borderRadius: '4px',
          backgroundColor: isAvailable ? '#4CAF50' : '#FF9800',
          color: 'white',
          fontSize: '12px',
          fontWeight: 'bold',
          zIndex: 2,
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          opacity: 1,
          display: 'block'
        }}>
          {isAvailable ? 'Disponible maintenant' : 
            nextAvailableDate ? `Disponible le ${moment(nextAvailableDate).format('DD/MM/YYYY')}` : 
            'Contactez-nous pour la disponibilité'}
        </div>

        <div style={styles.desktopImageWrapper}>
          <img
            src={car.image_url ? `${BASE_URL}${car.image_url}` : '/images/no-car.png'}
            alt={car.name}
            style={styles.desktopImage}
          />
        </div>
        
        <div style={styles.desktopInfoWrapper}>
          {/* Rating section */}
          <div style={styles.ratingContainer}>
            <div style={styles.starRating}>
              <span style={{ fontWeight: 'bold', marginRight: 4 }}>{car.rating || 0}</span>
              <FaStar style={{ color: '#FFD700', fontSize: '16px', verticalAlign: 'middle', marginRight: 4 }} />
              <span style={{ fontSize: '12px', color: '#666' }}>({car.reviews || 0} reviews)</span>
            </div>
          </div>
          
          {/* Car name */}
          <h3 style={styles.desktopCarName}>
            {car.name ? car.name.toUpperCase() : ''} - {car.model}
          </h3>
          
          {/* Location */}
          <div style={styles.locationContainer}>
            <FaMapMarkerAlt style={{ color: '#333', marginRight: '5px' }} />
            <span>{car.location}</span>
          </div>
          
          {/* Divider */}
          <div style={styles.divider}></div>
          
          {/* Features in a single row */}
          <div style={styles.featuresRow}>
            <div style={styles.featureItem}>
              <FaCalendarAlt style={styles.featureIcon} />
              <span style={styles.featureText}>{car.year}</span>
            </div>
            
            <div style={styles.featureItem}>
              <FaCog style={styles.featureIcon} />
              <span style={styles.featureText}>{car.transmission}</span>
            </div>
            
            <div style={styles.featureItem}>
              <FaGasPump style={styles.featureIcon} />
              <span style={styles.featureText}>{car.fuel_type}</span>
            </div>
            
            <div style={styles.featureItem}>
              <FaUsers style={styles.featureIcon} />
              <span style={styles.featureText}>{car.seats} {lang.seats}</span>
            </div>
          </div>
          
          {/* Price and booking */}
          <div style={styles.priceBookRow}>
            <div style={styles.priceDisplay}>
              <span style={styles.priceValue}>{convertPrice(car.price_per_day)} {getCurrencySymbol()} / Day{lang.day}</span>
            </div>
            
            <button
              style={styles.bookNowBtn}
              onClick={() => {
                setBookingStartDate(null);
                setBookingEndDate(null);
                setSelectedCar(car);
                setBookingModalOpen(true);
                setShowBookingDatePicker(false);
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#333';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#fff';
                e.currentTarget.style.color = '#333';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {lang.bookNow}
            </button>
          </div>
        </div>
      </div>
    );
  };

  /* --------------------------
     Modale de réservation
  -------------------------- */
  const handleModalOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setBookingModalOpen(false);
    }
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    start_date: null,
    end_date: null,
    locataire1: '',
    adresse1: '',
    cin1: '',
    permis1: '',
    locataire2: '',
    adresse2: '',
    cin2: '',
    permis2: ''
  });

  const handleBooking = async () => {
    if (!isLoggedIn) {
      window.location.href = '/UserLogin';
      return;
    }
    try {
      const days = bookingData.start_date && bookingData.end_date
        ? moment(bookingData.end_date).diff(moment(bookingData.start_date), 'days') + 1
        : 0;
      const totalPrice = days * (selectedCar.price_per_day || 0);
      
      const data = {
        user_id: user.id,
        car_id: selectedCar.id,
        start_date: bookingData.start_date ? formatDateForInput(bookingData.start_date) : null,
        end_date: bookingData.end_date ? formatDateForInput(bookingData.end_date) : null,
        total_price: totalPrice,
        ...bookingData,
        status: 'pending'
      };

      await axios.post(`${API_URL}/bookings`, data);

      const startStr = bookingData.start_date ? formatDateInEnglish(bookingData.start_date) : '';
      const endStr = bookingData.end_date ? formatDateInEnglish(bookingData.end_date) : '';
      const message = `🚗 Demande de location de voiture

Bonjour,

Je souhaite réserver une voiture avec les détails suivants :

🔹 Nom du client : ${user?.name || ''}
📞 Numéro de téléphone : ${user?.phone || ''}
📍 Lieu de retour : ${selectedCar?.location || ''}
📅 Date de début : ${startStr}
📅 Date de fin : ${endStr}
🚘 Modèle du véhicule : ${selectedCar?.name ? selectedCar.name.toUpperCase() : ''} - ${selectedCar?.model || ''}
💰 Prix total : ${convertPrice(totalPrice)} ${getCurrencySymbol()}

Locataire:
- Nom: ${bookingData.locataire1}
- Adresse: ${bookingData.adresse1}
- CIN: ${bookingData.cin1}
- Permis: ${bookingData.permis1}

Autre Conducteur:
- Nom: ${bookingData.locataire2}
- Adresse: ${bookingData.adresse2}
- CIN: ${bookingData.cin2}
- Permis: ${bookingData.permis2}

Pourriez-vous confirmer la disponibilité pour finaliser cette réservation ? ✅

Merci d'avance !`;
      
      const whatsappURL = `https://web.whatsapp.com/send?phone=212770256968&text=${encodeURIComponent(message)}&app_absent=0`;
      window.open(whatsappURL, '_blank');
      setBookingModalOpen(false);
      setCurrentStep(1);
      setBookingData({
        start_date: null,
        end_date: null,
        locataire1: '',
        adresse1: '',
        cin1: '',
        permis1: '',
        locataire2: '',
        adresse2: '',
        cin2: '',
        permis2: ''
      });
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Unable to create booking. Please try again later.');
    }
  };

  // Update the renderBookingModal function to match the image design
  const renderBookingModal = () => {
    if (!selectedCar) return null;
    
    const days = bookingData.start_date && bookingData.end_date
      ? moment(bookingData.end_date).diff(moment(bookingData.start_date), 'days') + 1
      : 0;
    const totalPrice = days * (selectedCar.price_per_day || 0);
    
    return (
      <div style={styles.modalOverlay} onClick={handleModalOverlayClick}>
        <div
          style={
            isMobile
              ? {
                  background: '#fff',
                  margin: '24px auto',
                  width: '95vw',
                  maxWidth: 500,
                  borderRadius: 16,
                  boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
                  padding: 16,
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }
              : styles.modalContent
          }
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            style={
              isMobile
                ? {
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    width: 40,
                    height: 40,
                    padding: 0,
                    background: '#fff',
                    border: 'none',
                    borderRadius: '50%',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10,
                  }
                : styles.closeButton
            }
            onClick={() => {
              setSelectedCar(null);
              setCurrentStep(1);
              setBookingData({
                start_date: null,
                end_date: null,
                locataire1: '',
                adresse1: '',
                cin1: '',
                permis1: '',
                locataire2: '',
                adresse2: '',
                cin2: '',
                permis2: ''
              });
            }}
          >
            <img 
              src="/images/fermer.png" 
              alt="Close" 
              style={
                isMobile
                  ? { width: 18, height: 18 }
                  : styles.closeIconImage
              }
            />
          </button>
          <div
            style={
              isMobile
                ? {
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: 12,
                    padding: 0,
                  }
                : styles.newBookingContainer
            }
          >
            {/* Left side - Car Image */}
            <div
              style={
                isMobile
                  ? {
                      width: '100%',
                      minHeight: 'unset',
                      padding: 0,
                      alignItems: 'center',
                      justifyContent: 'center',
                      display: 'flex',
                      background: 'transparent',
                      borderRadius: '12px 12px 0 0',
                      position: 'relative',
                      flexDirection: 'column',
                      marginBottom: 12,
                    }
                  : styles.newImageColumn
              }
            >
              <img
                src={selectedCar.image_url ? `${BASE_URL}${selectedCar.image_url}` : '/images/no-car.png'}
                alt={`${selectedCar.name ? selectedCar.name.toUpperCase() : ''} ${selectedCar.model}`}
                style={
                  isMobile
                    ? {
                        maxHeight: 120,
                        width: '100%',
                        objectFit: 'contain',
                        margin: '0 auto',
                        display: 'block',
                        borderRadius: 10,
                      }
                    : styles.newCarImage
                  }
              />
              {isMobile ? (
                <div style={{
                  textAlign: 'center',
                  margin: '12px 0 0 0',
                  fontWeight: 600,
                  fontSize: 15,
                  color: '#444',
                  padding: '8px 0',
                  borderBottom: '1px solid #eee',
                  width: '100%',
                }}>
                  Estimated price : {convertPrice(totalPrice)}{getCurrencySymbol()}
                </div>
              ) : (
                <div style={styles.newPriceContainer}>
                  <p style={styles.newPriceText}>
                    Estimated price : {convertPrice(totalPrice)}{getCurrencySymbol()}
                  </p>
                </div>
              )}
            </div>
            {/* Right side - Car Details */}
            <div
              style={
                isMobile
                  ? {
                      width: '100%',
                      padding: 0,
                      minWidth: 0,
                      textAlign: 'left',
                      marginTop: 10,
                    }
                  : styles.newDetailsColumn
              }
            >
              <div style={
                isMobile
                  ? {
                      marginBottom: 10,
                      marginTop: 0,
                      padding: 0,
                    }
                  : styles.newCarHeader
              }>
                <h2 style={
                  isMobile
                    ? {
                        fontSize: 18,
                        fontWeight: 700,
                        margin: '0 0 6px 0',
                        textAlign: 'left',
                        lineHeight: 1.2,
                      }
                    : styles.newCarTitle
                }>
                  {selectedCar.name ? selectedCar.name.toUpperCase() : ''} - {selectedCar.model}
                </h2>
                <div style={
                  isMobile
                    ? {
                        fontSize: 13,
                        color: '#666',
                        marginBottom: 10,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                      }
                    : styles.newLocationRow
                }>
                  <FaMapMarkerAlt style={styles.newLocationIcon} />
                  <span>{selectedCar.location || 'Location not available'}</span>
                </div>
              </div>
              <div style={
                isMobile
                  ? {
                      display: 'grid',
                      gridTemplateColumns: '1fr',
                      gap: 7,
                      padding: 0,
                      marginBottom: 12,
                      fontSize: 13,
                      background: '#f8f8f8',
                      borderRadius: 8,
                      paddingTop: 8,
                      paddingBottom: 8,
                      paddingLeft: 10,
                      paddingRight: 10,
                    }
                  : styles.newSpecsGrid
              }>
                <div style={styles.newSpecItem}>
                  <FaCalendarAlt style={styles.newSpecIcon} />
                  <span>
                    <strong>Year : </strong> {selectedCar.year || 'Not available'}
                  </span>
                </div>
                <div style={styles.newSpecItem}>
                  <FaCog style={styles.newSpecIcon} />
                  <span>
                    <strong>Transmission : </strong> {selectedCar.transmission || 'Not available'}
                  </span>
                </div>
                <div style={styles.newSpecItem}>
                  <FaGasPump style={styles.newSpecIcon} />
                  <span>
                    <strong>Fuel Type : </strong> {selectedCar.fuel_type || 'Not available'}
                  </span>
                </div>
                <div style={styles.newSpecItem}>
                  <FaUsers style={styles.newSpecIcon} />
                  <span>
                    <strong>Seats : </strong> {selectedCar.seats ? `${selectedCar.seats}` : 'Not available'}
                  </span>
                </div>
              </div>
              {/* Steps Navigation */}
              <div style={{
                ...styles.stepsContainer,
                padding: isMobile ? '6px 0' : '10px 0',
                marginBottom: isMobile ? '10px' : '20px',
              }}>
                <div style={styles.progressBarOuter}>
                  {[1, 2, 3].map((stepIndex, idx) => (
                    <React.Fragment key={stepIndex}>
                      <div style={styles.progressStepColumn}>
                        <div
                          style={{
                            ...styles.progressStep,
                            ...(currentStep >= stepIndex ? styles.progressStepCompleted : {}),
                            width: isMobile ? 32 : 48,
                            height: isMobile ? 32 : 48,
                            fontSize: isMobile ? 15 : 18,
                          }}
                        >
                          {stepIndex}
                        </div>
                        <div style={{
                          ...styles.progressLabel,
                          ...(currentStep === stepIndex ? styles.progressLabelActive : {}),
                          fontSize: isMobile ? 11 : 14,
                          marginTop: isMobile ? 4 : 8,
                        }}>
                          {stepIndex === 1 ? 'Dates' : stepIndex === 2 ? 'Locataires' : 'Confirmation'}
                        </div>
                      </div>
                      {stepIndex < 3 && (
                        <div style={{
                          ...styles.progressBarLine,
                          ...(currentStep > stepIndex ? styles.progressBarLineCompleted : {}),
                          width: isMobile ? 6 : 40,
                          marginTop: isMobile ? '-2px' : '-25px',
                          marginLeft: isMobile ? 2 : undefined,
                          marginRight: isMobile ? 2 : undefined,
                        }} />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              {/* Step 1: Date Selection */}
              {currentStep === 1 && (
                <div style={{
                  ...styles.newDateContainer,
                  gap: isMobile ? '8px' : '15px',
                  marginTop: isMobile ? '5px' : '20px',
                }}>
                  <div 
                    style={{
                      ...styles.newDatePickerRow,
                      padding: isMobile ? '8px 8px' : '12px 15px',
                      fontSize: isMobile ? '13px' : '14px',
                    }}
                    onClick={() => {
                      document.getElementById('startDateInput').showPicker();
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <span style={{ 
                        fontSize: isMobile ? '12px' : '14px', 
                        color: bookingData.start_date ? '#000' : '#666',
                        fontWeight: bookingData.start_date ? '500' : 'normal'
                      }}>
                        {bookingData.start_date ? formatDateInEnglish(bookingData.start_date) : 'Start Date'}
                      </span>
                    </div>
                    <span style={{ ...styles.newDateArrow, fontSize: isMobile ? '13px' : '16px' }}>→</span>
                    <div 
                      style={{ display: 'flex', flexDirection: 'column', flex: 1, cursor: 'pointer' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        document.getElementById('endDateInput').showPicker();
                      }}
                    >
                      <span style={{ 
                        fontSize: isMobile ? '12px' : '14px', 
                        color: bookingData.end_date ? '#000' : '#666',
                        fontWeight: bookingData.end_date ? '500' : 'normal'
                      }}>
                        {bookingData.end_date ? formatDateInEnglish(bookingData.end_date) : 'End Date'}
                      </span>
                    </div>
                  </div>

                  {/* Hidden date inputs */}
                  <div style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}>
                    <input
                      id="startDateInput"
                      type="date"
                      value={bookingData.start_date ? formatDateForInput(bookingData.start_date) : ''}
                      onChange={(e) => setBookingData({...bookingData, start_date: moment(e.target.value)})}
                      min={getCurrentDateFormatted()}
                    />
                    <input
                      id="endDateInput"
                      type="date"
                      value={bookingData.end_date ? formatDateForInput(bookingData.end_date) : ''}
                      onChange={(e) => setBookingData({...bookingData, end_date: moment(e.target.value)})}
                      min={bookingData.start_date ? formatDateForInput(bookingData.start_date) : getCurrentDateFormatted()}
                    />
                  </div>

                  <button 
                    style={{
                      ...styles.newConfirmButton,
                      ...((!bookingData.start_date || !bookingData.end_date) && styles.newConfirmButtonDisabled)
                    }}
                    onClick={() => {
                      if (bookingData.start_date && bookingData.end_date) {
                        setCurrentStep(2);
                      }
                    }}
                    disabled={!bookingData.start_date || !bookingData.end_date}
                  >
                    Next Step
                  </button>
                </div>
              )}

              {/* Step 2: Tenant Information */}
              {currentStep === 2 && (
                <div style={styles.tenantInfoContainer}>
                  <h3 style={styles.tenantInfoTitle}>Locataire</h3>
                  <div style={styles.inputGroup}>
                    <input
                      type="text"
                      placeholder="Nom complet"
                      value={bookingData.locataire1}
                      onChange={(e) => setBookingData({...bookingData, locataire1: e.target.value})}
                      style={styles.input}
                    />
                    <input
                      type="text"
                      placeholder="Adresse"
                      value={bookingData.adresse1}
                      onChange={(e) => setBookingData({...bookingData, adresse1: e.target.value})}
                      style={styles.input}
                    />
                    <input
                      type="text"
                      placeholder="CIN"
                      value={bookingData.cin1}
                      onChange={(e) => setBookingData({...bookingData, cin1: e.target.value})}
                      style={styles.input}
                    />
                    <input
                      type="text"
                      placeholder="Numéro de permis"
                      value={bookingData.permis1}
                      onChange={(e) => setBookingData({...bookingData, permis1: e.target.value})}
                      style={styles.input}
                    />
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', gap: 8, marginTop: 20}}>
                    <h3 style={styles.tenantInfoTitle}>Autre Conducteur (Optionnel)</h3>
                    {!showTenant2 && (
                      <button
                        type="button"
                        style={{
                          background: '#eee',
                          border: 'none',
                          borderRadius: '50%',
                          width: 28,
                          height: 28,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 20,
                          cursor: 'pointer',
                          marginLeft: 8,marginTop:-10
                        }}
                        onClick={() => setShowTenant2(true)}
                        aria-label="Ajouter Autre Conducteur"
                      >
                        <FaPlus />
                      </button>
                    )}
                    {showTenant2 && (
                      <button
                        type="button"
                        style={{
                          background: '#eee',
                          border: 'none',
                          borderRadius: '50%',
                          width: 28,
                          height: 28,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 20,
                          cursor: 'pointer',
                          marginLeft: 8
                        }}
                        onClick={() => setShowTenant2(false)}
                        aria-label="Masquer Autre Conducteur"
                      >
                        <FaMinus />
                      </button>
                    )}
                  </div>
                  {showTenant2 && (
                    <div style={styles.inputGroup}>
                      <input
                        type="text"
                        placeholder="Nom complet"
                        value={bookingData.locataire2}
                        onChange={(e) => setBookingData({...bookingData, locataire2: e.target.value})}
                        style={styles.input}
                      />
                      <input
                        type="text"
                        placeholder="Adresse"
                        value={bookingData.adresse2}
                        onChange={(e) => setBookingData({...bookingData, adresse2: e.target.value})}
                        style={styles.input}
                      />
                      <input
                        type="text"
                        placeholder="CIN"
                        value={bookingData.cin2}
                        onChange={(e) => setBookingData({...bookingData, cin2: e.target.value})}
                        style={styles.input}
                      />
                      <input
                        type="text"
                        placeholder="Numéro de permis"
                        value={bookingData.permis2}
                        onChange={(e) => setBookingData({...bookingData, permis2: e.target.value})}
                        style={styles.input}
                      />
                    </div>
                  )}
                  <div style={styles.tenantButtonsContainer}>
                    <button 
                      style={styles.backButton}
                      onClick={() => setCurrentStep(1)}
                    >
                      Back
                    </button>
                    <button 
                      style={{
                        ...styles.newConfirmButton,
                        ...((!bookingData.locataire1 || !bookingData.adresse1 || !bookingData.cin1 || !bookingData.permis1) && styles.newConfirmButtonDisabled)
                      }}
                      onClick={() => setCurrentStep(3)}
                      disabled={!bookingData.locataire1 || !bookingData.adresse1 || !bookingData.cin1 || !bookingData.permis1}
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Confirmation */}
              {currentStep === 3 && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: isMobile ? 12 : 24 }}>
                  <div style={{ width: '100%', maxWidth: isMobile ? '100%' : 500, background: '#f9f9f9', borderRadius: 8, padding: isMobile ? 10 : 24, marginBottom: isMobile ? 10 : 20 }}>
                    {/* Titre principal */}
                    <div style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', fontSize: 20, color: '#222', marginBottom: 18, textAlign: 'left', paddingLeft: 12 }}>
                      <FaMinus style={{ fontSize: 14, color: '#222', marginRight: 8 }} />
                      Informations de réservation :
                    </div>
                    {/* Sous-titres réservation */}
                    <div style={{ marginBottom: 8, textAlign: 'left', fontSize: isMobile ? 13 : 15 }}><b>Voiture :</b> {selectedCar.name ? selectedCar.name.toUpperCase() : ''} - {selectedCar.model}</div>
                    <div style={{ marginBottom: 8, textAlign: 'left', fontSize: isMobile ? 13 : 15 }}><b>Lieu :</b> {selectedCar.location}</div>
                    <div style={{ marginBottom: 8, textAlign: 'left', fontSize: isMobile ? 13 : 15 }}><b>Dates :</b> {bookingData.start_date ? formatDateInEnglish(bookingData.start_date) : ''} → {bookingData.end_date ? formatDateInEnglish(bookingData.end_date) : ''}</div>
                    <div style={{ marginBottom: 18, textAlign: 'left' }}><b>Prix total :</b> {convertPrice(totalPrice)} {getCurrencySymbol()}</div>
                    {/* Titre Locataire */}
                    <div style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', fontSize: 20, color: '#222', margin: '24px 0 12px 0', textAlign: 'left', paddingLeft: 12 }}>
                      <FaMinus style={{ fontSize: 14, color: '#222', marginRight: 8 }} />
                      Locataire
                    </div>
                    <div style={{ marginBottom: 6, textAlign: 'left' }}><b>Nom :</b> {bookingData.locataire1}</div>
                    <div style={{ marginBottom: 6, textAlign: 'left' }}><b>Adresse :</b> {bookingData.adresse1}</div>
                    <div style={{ marginBottom: 6, textAlign: 'left' }}><b>CIN :</b> {bookingData.cin1}</div>
                    <div style={{ marginBottom: 18, textAlign: 'left' }}><b>Permis :</b> {bookingData.permis1}</div>
                    {/* Autre Conducteur si présent */}
                    {bookingData.locataire2 && (
                      <>
                        <div style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', fontSize: 20, color: '#222', margin: '24px 0 12px 0', textAlign: 'left', paddingLeft: 12 }}>
                          <FaMinus style={{ fontSize: 14, color: '#222', marginRight: 8 }} />
                          Autre Conducteur
                        </div>
                        <div style={{ marginBottom: 6, textAlign: 'left' }}><b>Nom :</b> {bookingData.locataire2}</div>
                        <div style={{ marginBottom: 6, textAlign: 'left' }}><b>Adresse :</b> {bookingData.adresse2}</div>
                        <div style={{ marginBottom: 6, textAlign: 'left' }}><b>CIN :</b> {bookingData.cin2}</div>
                        <div style={{ marginBottom: 6, textAlign: 'left' }}><b>Permis :</b> {bookingData.permis2}</div>
                      </>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: 16 }}>
                    <button 
                      style={styles.backButton}
                      onClick={() => setCurrentStep(2)}
                    >
                      Back
                    </button>
                    <button 
                      style={styles.newConfirmButton}
                      onClick={handleBooking}
                    >
                      Confirm Booking
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  /* ------------------------------------------------------------------
     NOUVEAU FOOTER (Styles identiques à Home.js)
  ------------------------------------------------------------------ */
  // Removed local Footer component implementation - now using imported Footer component
  
  /* ------------------------------------------------------------------
     Rendu Final
  ------------------------------------------------------------------ */
  useEffect(() => {
    // Add the CSS for nav-link to match Home.js
    const style = document.createElement('style');
    style.textContent = `
      * {
        font-family: 'Poppins', Arial, sans-serif;
      }

      body {
        font-family: 'Poppins', Arial, sans-serif;
      }

      .nav-link {
        position: relative;
        text-decoration: none;
        color: #333;
        font-family: 'Poppins', Arial, sans-serif;
        font-size: 16px;
        font-weight: 600;
        letter-spacing: 1px;
        padding: 8px 0;
        margin: 0 15px;
        transition: color 0.4s ease;
      }
      
      .nav-link::after {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        bottom: 1px;
        left: 0;
        background-color: #722637;
        transition: width 0.4s ease-in-out;
        opacity: 0;
      }
      
      .nav-link:hover {
        color: #722637;
      }
      
      .nav-link:hover::after {
        width: 100%;
        opacity: 1;
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes fadeInLeft {
        from {
          opacity: 0;
          transform: translateX(-20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      .hero-title {
        animation: fadeInLeft 1s ease-out forwards;
      }

      .hero-subtitle {
        animation: fadeInUp 1s ease-out 0.5s forwards;
        opacity: 0;
      }

      .section-title {
        animation: fadeInLeft 1s ease-out forwards;
      }

      .section-subtitle {
        animation: fadeInUp 1s ease-out 0.5s forwards;
        opacity: 0;
      }

      select, input, button {
        font-family: 'Poppins', Arial, sans-serif;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Nouveaux états pour le composant de recherche
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  
  // Fonction de recherche
  const handleSearch = () => {
    // Vérifiez si les dates et l'emplacement sont sélectionnés
    if (startDate && endDate && pickupLocation) {
      // Filtrer les voitures en fonction des critères
      const newFilteredCars = cars.filter(car => {
        // Logique de filtrage selon l'emplacement
        if (pickupLocation !== 'all' && car.location !== pickupLocation) {
          return false;
        }
        // Vous pouvez ajouter d'autres critères de filtrage ici
        return true;
      });
      
      // Mettre à jour les voitures affichées
      setCars(newFilteredCars);
   // Réinitialiser à la première page
      
      // Faire défiler jusqu'à la section des résultats
      const resultsSection = document.getElementById('results-section');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Afficher un message si tous les champs ne sont pas remplis
      alert(lang.selectAllFields || 'Please select all fields');
    }
  };

  // Add the button state back
  const [buttonVisible, setButtonVisible] = useState(false);

  // Add the useEffect for button animation back
  useEffect(() => {
    // Set button visible after a small delay for a nice entrance
    const timer = setTimeout(() => {
      setButtonVisible(true);
    }, 1500); // Delay after page load
    
    return () => clearTimeout(timer);
  }, []);

  // Fix the function to count cars by fuel type
  const countCarsByFuelType = (fuelType) => {
    // First check if cars array exists and has items
    if (!cars || cars.length === 0) {
      return 0;
    }
    
    // Handle different possible property names for fuel type
    return cars.filter(car => {
      const carFuelType = car.fuelType || car.fuel_type || car.fuel || '';
      return carFuelType.toLowerCase() === fuelType.toLowerCase();
    }).length;
  };

  // Add a useEffect to update the slider's appearance
  useEffect(() => {
    // Update slider appearance based on value
    const slider = document.querySelector('input[type="range"]');
    if (slider) {
      const progress = (priceValue / 5000) * 100;
      slider.style.setProperty('--progress', `${progress}%`);
    }
  }, [priceValue]);

  // Update the useEffect for slider styling to include the track coloring
  useEffect(() => {
    // Create a style element
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      input[type=range] {
        -webkit-appearance: none;
        width: 100%;
        height: 4px;
        border-radius: 2px;
        background: #e0e0e0;
        outline: none;
        margin: 10px 0; /* Add margin to ensure proper positioning */
        position: relative;
      }
      
      input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: #fff;
        cursor: pointer;
        border: 2px solid #722637;
        boxShadow: 0 1px 3px rgba(0,0,0,0.2);
        margin-top: -7px; /* This centers the thumb on the track */
        position: relative;
        z-index: 2;
      }
      
      input[type=range]::-moz-range-thumb {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: #fff;
        cursor: pointer;
        border: 2px solid #722637;
        boxShadow: 0 1px 3px rgba(0,0,0,0.2);
        position: relative;
        z-index: 2;
      }
      
      input[type=range]::-ms-thumb {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: #fff;
        cursor: pointer;
        border: 2px solid #722637;
        boxShadow: 0 1px 3px rgba(0,0,0,0.2);
        margin-top: 0; /* For IE */
        position: relative;
        z-index: 2;
      }
      
      /* Add these styles for the colored track */
      input[type=range]::-webkit-slider-runnable-track {
        background: linear-gradient(to right, #722637 0%, #722637 calc(${priceValue / 5000 * 100}%), #e0e0e0 calc(${priceValue / 5000 * 100}%), #e0e0e0 100%);
        height: 4px;
        border-radius: 2px;
        position: relative;
        z-index: 1;
      }
      
      input[type=range]::-moz-range-track {
        background: linear-gradient(to right, #722637 0%, #722637 calc(${priceValue / 5000 * 100}%), #e0e0e0 calc(${priceValue / 5000 * 100}%), #e0e0e0 100%);
        height: 4px;
        border-radius: 2px;
        position: relative;
        z-index: 1;
      }
      
      input[type=range]::-ms-track {
        background: linear-gradient(to right, #722637 0%, #722637 calc(${priceValue / 5000 * 100}%), #e0e0e0 calc(${priceValue / 5000 * 100}%), #e0e0e0 100%);
        height: 4px;
        border-radius: 2px;
        position: relative;
        z-index: 1;
      }
    `;
    
    // Add the style to the head
    document.head.appendChild(styleEl);
    
    // Clean up on unmount
    return () => {
      document.head.removeChild(styleEl);
    };
  }, [priceValue]);

  // Add new state variables for transmission and seats filters
  const [seatsSelected, setSeatsSelected] = useState([]);

  // Add handlers for the new filters
  const handleSeatsCheck = (seatCount) => {
    if (seatsFilter.includes(seatCount)) {
      setSeatsFilter(seatsFilter.filter(item => item !== seatCount));
    } else {
      setSeatsFilter([...seatsFilter, seatCount]);
    }
  };

  // Add a function to count cars by seat number
  const countCarsBySeats = (seatCount) => {
    if (!cars || cars.length === 0) {
      return 0;
    }
    
    return cars.filter(car => {
      const carSeats = car.seats || car.seatCount || 0;
      return Number(carSeats) === Number(seatCount);
    }).length;
  };

  // Add a function to count cars by transmission type
  const countCarsByTransmission = (transmissionType) => {
    if (!cars || cars.length === 0) {
      return 0;
    }
    
    return cars.filter(car => {
      const carTransmission = car.transmission || car.transmissionType || '';
      return carTransmission.toLowerCase() === transmissionType.toLowerCase();
    }).length;
  };

  // Update the filterCars function to include the new filters
  const filterCars = () => {
    return cars.filter(car => {
      // Price filter
      if (priceValue > 0 && car.price > priceValue) {
        return false;
      }
      
      // Fuel type filter
      if (fuelSelected.length > 0) {
        const carFuelType = car.fuelType || car.fuel_type || car.fuel || '';
        if (!fuelSelected.some(fuel => carFuelType.toLowerCase().includes(fuel.toLowerCase()))) {
          return false;
        }
      }
      
      // Transmission filter
      if (transSelected.length > 0) {
        const carTransmission = car.transmission || car.transmissionType || '';
        if (!transSelected.some(trans => carTransmission.toLowerCase().includes(trans.toLowerCase()))) {
          return false;
        }
      }
      
      // Seats filter
      if (seatsFilter.length > 0) {
        const carSeats = car.seats || car.seatCount || 0;
        if (!seatsFilter.includes(Number(carSeats))) {
          return false;
        }
      }
      
      return true;
    });
  };

  // Add new state for the sort dropdown
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  // Add the handler function for clearing all filters
  const handleClearAllFilters = () => {
    setPriceValue(5000);
    setSelectedCity('');
    setFuelSelected([]);
    setTransSelected([]);
    setSeatsFilter([]);
    setSortValue('lowest');
  };

  /* --------------------------
     Date Formatting Helper
  -------------------------- */
  const formatDateInEnglish = (date) => {
    // Temporarily set locale to English for formatting
    const currentLocale = moment.locale();
    moment.locale('en');
    const formattedDate = date.format('DD MMM YYYY');
    // Set locale back to original
    moment.locale(currentLocale);
    return formattedDate;
  };

  const formatDateForInput = (date) => {
    // For input[type="date"], we need YYYY-MM-DD format in English locale
    const currentLocale = moment.locale();
    moment.locale('en');
    const formattedDate = date.format('YYYY-MM-DD');
    moment.locale(currentLocale);
    return formattedDate;
  };

  // Helper to get current date in English locale
  const getCurrentDateFormatted = () => {
    const currentLocale = moment.locale();
    moment.locale('en');
    const formattedDate = moment().format('YYYY-MM-DD');
    moment.locale(currentLocale);
    return formattedDate;
  };

  // Add specific styles for scroll animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .modal-close-button {
        position: absolute;
        top: 15px;
        right: 15px;
        background: #F5F5F5;
        border: none;
        cursor: pointer;
        padding: 10px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
        transition: background-color 0.3s ease;
      }
      
      .modal-close-button:hover {
        background-color: #D0D0D0;
      }
      
      .modal-close-button:hover img {
        filter: brightness(0.7);
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage] = useState(5);

  // Réinitialiser la page courante à 1 lorsque les filtres changent
  useEffect(() => {
    setCurrentPage(1);
  }, [pickupLocation, priceValue, fuelSelected, transSelected, seatsFilter, sortValue]);

  const renderPagination = () => {
    const totalPages = Math.ceil(filteredCars.length / carsPerPage);
    const pages = [];
    
    // Previous button
    pages.push(
      <button
        key="prev"
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
                      style={{
          ...styles.paginationButton,
          opacity: currentPage === 1 ? 0.5 : 1,
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
        }}
      >
        <FaChevronLeft style={{ fontSize: '12px' }} />
      </button>
    );

    // Page numbers with ellipsis
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // First page
        i === totalPages || // Last page
        (i >= currentPage - 1 && i <= currentPage + 1) // Pages around current
      ) {
        pages.push(
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            style={{
              ...styles.paginationButton,
              ...(currentPage === i ? styles.paginationButtonActive : {}),
            }}
          >
            {i}
          </button>
        );
      } else if (
        i === currentPage - 2 ||
        i === currentPage + 2
      ) {
        // Add ellipsis
        pages.push(
          <span key={`ellipsis${i}`} style={styles.paginationEllipsis}>...</span>
        );
      }
    }

    // Next button
    pages.push(
      <button
        key="next"
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        style={{
          ...styles.paginationButton,
          opacity: currentPage === totalPages ? 0.5 : 1,
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
        }}
      >
        <FaChevronRight style={{ fontSize: '12px' }} />
      </button>
    );

    return (
      <div style={styles.paginationContainer}>
        <div style={styles.paginationWrapper}>
          {pages}
        </div>
      </div>
    );
  };

  // Calcul des cartes à afficher pour la page courante
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  const [reviewsCountMap, setReviewsCountMap] = useState({});

  useEffect(() => {
    // Génère un mapping aléatoire si pas déjà en localStorage
    let stored = localStorage.getItem('reviewsCountMap');
    let map = stored ? JSON.parse(stored) : {};
    let changed = false;
    cars.forEach(car => {
      if (!map[car.id]) {
        // Génère un nombre aléatoire entre 50 et 500
        map[car.id] = Math.floor(Math.random() * 451) + 50;
        changed = true;
      }
    });
    if (changed) {
      localStorage.setItem('reviewsCountMap', JSON.stringify(map));
    }
    setReviewsCountMap(map);
  }, [cars]);

  // Ajoute l'état pour afficher/masquer les champs Autre Conducteur
  const [showTenant2, setShowTenant2] = useState(false);

  // Inject Poppins font and global font-family
  useEffect(() => {
    // Add Google Fonts link
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    // Add global style for font-family
    const style = document.createElement('style');
    style.textContent = `
      html, body, * {
        font-family: 'Poppins', Arial, sans-serif !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(fontLink);
      document.head.removeChild(style);
    };
  }, []);

  // Add state for filter dropdowns
  const [openFilters, setOpenFilters] = useState({
    map: true,
    price: true,
    fuel: true,
    transmission: true,
    seats: true,
    city: true
  });

  const toggleFilter = (key) => {
    setOpenFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div style={styles.bodyStyle}>
      <TopBar
        isLoggedIn={isLoggedIn}
        userName={userName}
        onSignOut={handleSignOut}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        lang={lang}
      />
      <div style={styles.mainContentWrapper}>
        {/* Hero */}
        <div style={styles.heroContainer}>
          <div style={styles.heroOverlay}></div>
          <div style={{
            ...styles.heroContent,
            padding: isMobile ? '0 20px' : '0 40px',
            marginTop: isMobile ? '50px' : '100px'
          }}>
            <h1 style={{
              ...styles.heroTitle,
              fontSize: isMobile ? '38px' : '60px',
              margin: isMobile ? '0 0 15px 0' : '0 0 25px 0',
              lineHeight: isMobile ? '1.2' : '1.3'
            }} className="hero-title">{lang.heroTitle}</h1>
            <p style={{
              ...styles.heroSubtitle,
              fontSize: isMobile ? '18px' : '26px',
              margin: isMobile ? '0 0 25px 0' : '0 0 45px 0',
              lineHeight: isMobile ? '1.4' : '1.5'
            }} className="hero-subtitle">{lang.heroSubtitle}</p>
            
            <button 
              onClick={() => {
                const carsSection = document.querySelector('.section-container');
                if (carsSection) {
                  carsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              style={{
                ...styles.viewAllCarsBtn,
                padding: isMobile ? '10px 20px' : '12px 24px',
                fontSize: isMobile ? '14px' : '16px',
                marginTop: isMobile ? '5px' : '10px',
                backgroundColor: '#fff',
                color: '#111',
                opacity: buttonVisible ? 1 : 0,
                transform: buttonVisible ? 'translateY(0)' : 'translateY(20px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#111';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.boxShadow = '0 7px 14px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#fff';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                e.currentTarget.style.color = '#111';
              }}
            >
              <span style={styles.btnText}>{lang.viewAllCars}</span>
              <span style={styles.btnIcon}>→</span>
            </button>
          </div>
        </div>

        {/* Section "Our Vehicles" */}
        <div style={{
          ...styles.heroTitleContainer,
          margin: isMobile ? '80px 20px 30px 20px' : '150px auto 50px 150px',
          padding: isMobile ? '0 10px' : '0 20px'
        }} className="section-container">
          <h1 style={{
            ...styles.heroMainTitle,
            fontSize: isMobile ? '32px' : '48px',
            paddingLeft: isMobile ? '10px' : '20px',
            textAlign: isMobile ? 'center' : 'left'
          }}>{lang.heroMainTitle}</h1>
          <p style={{
            ...styles.heroSubtitles,
            fontSize: isMobile ? '18px' : '28px',
            marginBottom: isMobile ? '30px' : '50px',
            paddingLeft: isMobile ? '10px' : '20px',
            textAlign: isMobile ? 'center' : 'left'
          }}>{lang.heroSubtitles}</p>
        </div>

        {/* Contenu principal */}
        <div style={{ 
          ...styles.container, 
          flexDirection: isMobile ? 'column' : 'row',
          padding: isMobile ? '10px' : '20px'
        }}>
          <div style={{
            ...styles.sidebar,
            width: isMobile ? '100%' : '400px',
            padding: isMobile ? '0 10px' : '0 20px',
            marginRight: isMobile ? '0' : '20px',
            marginBottom: isMobile ? '20px' : '80px'
          }}>
            {/* Map Card */}
            <div style={{
              ...styles.filterCard,
              marginBottom: isMobile ? '15px' : '20px'
            }}>
              <div style={styles.filterHeader} onClick={() => toggleFilter('map')}>
                <h3 style={{
                  ...styles.filterTitle,
                  fontSize: isMobile ? '14px' : '16px'
                }}>Show on map</h3>
                <FaChevronDown style={{
                  transition: 'transform 0.3s',
                  transform: openFilters.map ? 'rotate(0deg)' : 'rotate(-90deg)'
                }} />
              </div>
              {openFilters.map && (
                <div style={{
                  ...styles.mapBox,
                  height: isMobile ? '150px' : '180px'
                }}>
                  <iframe
                    title="Map"
                    src="https://www.google.com/maps?q=33.59751431921369%2C-7.638157746004392&z=15&output=embed"
                    style={styles.mapIframe}
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
            
            {/* Price Filter Card */}
            <div style={{
              ...styles.filterCard,
              marginBottom: isMobile ? '15px' : '20px'
            }}>
              <div style={styles.filterHeader} onClick={() => toggleFilter('price')}>
                <h3 style={{
                  ...styles.filterTitle,
                  fontSize: isMobile ? '14px' : '16px'
                }}>Filter Price</h3>
                <FaChevronDown style={{
                  transition: 'transform 0.3s',
                  transform: openFilters.price ? 'rotate(0deg)' : 'rotate(-90deg)'
                }} />
              </div>
              {openFilters.price && (
                <>
                  <div style={styles.sliderContainer}>
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      value={priceValue}
                      onChange={(e) => setPriceValue(Number(e.target.value))}
                      style={styles.slider}
                    />
                  </div>
                  <div style={{
                    ...styles.priceRange,
                    fontSize: isMobile ? '12px' : '14px'
                  }}>
                    0{getCurrencySymbol()} - {convertPrice(priceValue)}{getCurrencySymbol()}
                  </div>
                  <div style={styles.buttonGroup}>
                    <button onClick={handleClearPrice} style={{
                      ...styles.clearBtn,
                      fontSize: isMobile ? '12px' : '14px',
                      padding: isMobile ? '6px 10px' : '8px 12px'
                    }}>
                      <FaTimes style={{ marginRight: 5 }} /> Clear
                    </button>
                  </div>
                </>
              )}
            </div>
            
            {/* Fuel Type Filter Card */}
            <div style={{
              ...styles.filterCard,
              marginBottom: isMobile ? '15px' : '20px'
            }}>
              <div style={styles.filterHeader} onClick={() => toggleFilter('fuel')}>
                <h3 style={{
                  ...styles.filterTitle,
                  fontSize: isMobile ? '14px' : '16px'
                }}>Fuel Type</h3>
                <FaChevronDown style={{
                  transition: 'transform 0.3s',
                  transform: openFilters.fuel ? 'rotate(0deg)' : 'rotate(-90deg)'
                }} />
              </div>
              {openFilters.fuel && (
                <div>
                  <div style={styles.checkboxContainer}>
                    <input
                      type="checkbox"
                      id="petrol" 
                      checked={fuelSelected.includes('petrol')}
                      onChange={() => handleFuelCheck('petrol')}
                      style={{
                        ...styles.checkbox,
                        width: isMobile ? '16px' : '20px',
                        height: isMobile ? '16px' : '20px'
                      }}
                    />
                    <label htmlFor="petrol" style={{
                      ...styles.checkboxLabel,
                      fontSize: isMobile ? '12px' : '14px'
                    }}>
                      Petrol
                      <span style={{
                        ...styles.countBadge,
                        fontSize: isMobile ? '10px' : '12px',
                        padding: isMobile ? '1px 6px' : '2px 8px'
                      }}>{countCarsByFuelType('petrol')}</span>
                    </label>
                  </div>
                  <div style={styles.checkboxContainer}>
                    <input
                      type="checkbox"
                      id="diesel" 
                      checked={fuelSelected.includes('diesel')}
                      onChange={() => handleFuelCheck('diesel')}
                      style={{
                        ...styles.checkbox,
                        width: isMobile ? '16px' : '20px',
                        height: isMobile ? '16px' : '20px'
                      }}
                    />
                    <label htmlFor="diesel" style={{
                      ...styles.checkboxLabel,
                      fontSize: isMobile ? '12px' : '14px'
                    }}>
                      Diesel
                      <span style={{
                        ...styles.countBadge,
                        fontSize: isMobile ? '10px' : '12px',
                        padding: isMobile ? '1px 6px' : '2px 8px'
                      }}>{countCarsByFuelType('diesel')}</span>
                    </label>
                  </div>
                  <div style={styles.checkboxContainer}>
                    <input
                      type="checkbox"
                      id="hybrid" 
                      checked={fuelSelected.includes('hybrid')}
                      onChange={() => handleFuelCheck('hybrid')}
                      style={{
                        ...styles.checkbox,
                        width: isMobile ? '16px' : '20px',
                        height: isMobile ? '16px' : '20px'
                      }}
                    />
                    <label htmlFor="hybrid" style={{
                      ...styles.checkboxLabel,
                      fontSize: isMobile ? '12px' : '14px'
                    }}>
                      Hybrid
                      <span style={{
                        ...styles.countBadge,
                        fontSize: isMobile ? '10px' : '12px',
                        padding: isMobile ? '1px 6px' : '2px 8px'
                      }}>{countCarsByFuelType('hybrid')}</span>
                    </label>
                  </div>
                  <div style={styles.checkboxContainer}>
                    <input
                      type="checkbox"
                      id="electric" 
                      checked={fuelSelected.includes('electric')}
                      onChange={() => handleFuelCheck('electric')}
                      style={{
                        ...styles.checkbox,
                        width: isMobile ? '16px' : '20px',
                        height: isMobile ? '16px' : '20px'
                      }}
                    />
                    <label htmlFor="electric" style={{
                      ...styles.checkboxLabel,
                      fontSize: isMobile ? '12px' : '14px'
                    }}>
                      Electric
                      <span style={{
                        ...styles.countBadge,
                        fontSize: isMobile ? '10px' : '12px',
                        padding: isMobile ? '1px 6px' : '2px 8px'
                      }}>{countCarsByFuelType('electric')}</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
            
            {/* Transmission Filter Card */}
            <div style={{
              ...styles.filterCard,
              marginBottom: isMobile ? '15px' : '20px'
            }}>
              <div style={styles.filterHeader} onClick={() => toggleFilter('transmission')}>
                <h3 style={{
                  ...styles.filterTitle,
                  fontSize: isMobile ? '14px' : '16px'
                }}>Transmission</h3>
                <FaChevronDown style={{
                  transition: 'transform 0.3s',
                  transform: openFilters.transmission ? 'rotate(0deg)' : 'rotate(-90deg)'
                }} />
              </div>
              {openFilters.transmission && (
                <div>
                  <div style={styles.checkboxContainer}>
                    <input
                      type="checkbox"
                      id="automatic" 
                      checked={transSelected.includes('automatic')}
                      onChange={() => handleTransCheck('automatic')}
                      style={{
                        ...styles.checkbox,
                        width: isMobile ? '16px' : '20px',
                        height: isMobile ? '16px' : '20px'
                      }}
                    />
                    <label htmlFor="automatic" style={{
                      ...styles.checkboxLabel,
                      fontSize: isMobile ? '12px' : '14px'
                    }}>
                      Automatic
                      <span style={{
                        ...styles.countBadge,
                        fontSize: isMobile ? '10px' : '12px',
                        padding: isMobile ? '1px 6px' : '2px 8px'
                      }}>{countCarsByTransmission('automatic')}</span>
                    </label>
                  </div>
                  <div style={styles.checkboxContainer}>
                    <input 
                      type="checkbox" 
                      id="manual" 
                      checked={transSelected.includes('manual')}
                      onChange={() => handleTransCheck('manual')}
                      style={{
                        ...styles.checkbox,
                        width: isMobile ? '16px' : '20px',
                        height: isMobile ? '16px' : '20px'
                      }}
                    />
                    <label htmlFor="manual" style={{
                      ...styles.checkboxLabel,
                      fontSize: isMobile ? '12px' : '14px'
                    }}>
                      Manual
                      <span style={{
                        ...styles.countBadge,
                        fontSize: isMobile ? '10px' : '12px',
                        padding: isMobile ? '1px 6px' : '2px 8px'
                      }}>{countCarsByTransmission('manual')}</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
            
            {/* Seats Filter Card */}
            <div style={{
              ...styles.filterCard,
              marginBottom: isMobile ? '15px' : '20px'
            }}>
              <div style={styles.filterHeader} onClick={() => toggleFilter('seats')}>
                <h3 style={{
                  ...styles.filterTitle,
                  fontSize: isMobile ? '14px' : '16px'
                }}>Seats</h3>
                <FaChevronDown style={{
                  transition: 'transform 0.3s',
                  transform: openFilters.seats ? 'rotate(0deg)' : 'rotate(-90deg)'
                }} />
              </div>
              {openFilters.seats && (
                <div>
                  <div style={styles.checkboxContainer}>
                    <input
                      type="checkbox"
                      id="seats2" 
                      checked={seatsFilter.includes(2)}
                      onChange={() => handleSeatsCheck(2)}
                      style={{
                        ...styles.checkbox,
                        width: isMobile ? '16px' : '20px',
                        height: isMobile ? '16px' : '20px'
                      }}
                    />
                    <label htmlFor="seats2" style={{
                      ...styles.checkboxLabel,
                      fontSize: isMobile ? '12px' : '14px'
                    }}>
                      2 Seats
                      <span style={{
                        ...styles.countBadge,
                        fontSize: isMobile ? '10px' : '12px',
                        padding: isMobile ? '1px 6px' : '2px 8px'
                      }}>{countCarsBySeats(2)}</span>
                    </label>
                  </div>
                  <div style={styles.checkboxContainer}>
                    <input 
                      type="checkbox" 
                      id="seats5" 
                      checked={seatsFilter.includes(5)}
                      onChange={() => handleSeatsCheck(5)}
                      style={{
                        ...styles.checkbox,
                        width: isMobile ? '16px' : '20px',
                        height: isMobile ? '16px' : '20px'
                      }}
                    />
                    <label htmlFor="seats5" style={{
                      ...styles.checkboxLabel,
                      fontSize: isMobile ? '12px' : '14px'
                    }}>
                      5 Seats
                      <span style={{
                        ...styles.countBadge,
                        fontSize: isMobile ? '10px' : '12px',
                        padding: isMobile ? '1px 6px' : '2px 8px'
                      }}>{countCarsBySeats(5)}</span>
                    </label>
                  </div>
                  <div style={styles.checkboxContainer}>
                    <input 
                      type="checkbox" 
                      id="seats7" 
                      checked={seatsFilter.includes(7)}
                      onChange={() => handleSeatsCheck(7)}
                      style={{
                        ...styles.checkbox,
                        width: isMobile ? '16px' : '20px',
                        height: isMobile ? '16px' : '20px'
                      }}
                    />
                    <label htmlFor="seats7" style={{
                      ...styles.checkboxLabel,
                      fontSize: isMobile ? '12px' : '14px'
                    }}>
                      7 Seats
                      <span style={{
                        ...styles.countBadge,
                        fontSize: isMobile ? '10px' : '12px',
                        padding: isMobile ? '1px 6px' : '2px 8px'
                      }}>{countCarsBySeats(7)}</span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* City Filter Card */}
            <div style={{
              ...styles.filterCard,
              marginBottom: isMobile ? '15px' : '20px'
            }}>
              <div style={styles.filterHeader} onClick={() => toggleFilter('city')}>
                <h3 style={{
                  ...styles.filterTitle,
                  fontSize: isMobile ? '14px' : '16px'
                }}>City</h3>
                <FaChevronDown style={{
                  transition: 'transform 0.3s',
                  transform: openFilters.city ? 'rotate(0deg)' : 'rotate(-90deg)'
                }} />
              </div>
              {openFilters.city && (
                <div>
                  {locations.map((city) => (
                    <div key={city} style={styles.checkboxContainer}>
                      <input
                        type="checkbox"
                        id={`city-${city}`}
                        checked={selectedCity === city}
                        onChange={() => handleCityChange(selectedCity === city ? '' : city)}
                        style={{
                          ...styles.checkbox,
                          width: isMobile ? '16px' : '20px',
                          height: isMobile ? '16px' : '20px'
                        }}
                      />
                      <label htmlFor={`city-${city}`} style={{
                        ...styles.checkboxLabel,
                        fontSize: isMobile ? '12px' : '14px'
                      }}>
                        {city}
                        <span style={{
                          ...styles.countBadge,
                          fontSize: isMobile ? '10px' : '12px',
                          padding: isMobile ? '1px 6px' : '2px 8px'
                        }}>{cars.filter(car => car.location === city).length}</span>
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div style={styles.main}>
            <div style={{
              ...styles.topBarWrapper,
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'stretch' : 'center',
              gap: isMobile ? '10px' : '0',
              padding: isMobile ? '0 5px' : '0 20px',
            }}>
            <div style={{
              ...styles.topBarSection,
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'stretch' : 'center',
              gap: isMobile ? '10px' : '0',
              width: '100%',
            }}>
                <div style={{
                  ...styles.leftContainer,
                  flexDirection: isMobile ? 'column' : 'row',
                  alignItems: isMobile ? 'stretch' : 'center',
                  gap: isMobile ? '10px' : '15px',
                        width: isMobile ? '100%' : 'auto',
                }}>
                  <div style={styles.sortByContainer}>
                    <span style={styles.sortByLabel}>Sort by:</span>
                    <div style={styles.sortByValue}>
                      <span>{sortValue === 'lowest' ? 'Lower to High' : 'Higher to Low'}</span>
                      <FaChevronDown style={styles.sortIcon} />
                    </div>
                  </div>
                 
                  <div style={styles.itemsFoundContainer}>
                    <FaList style={styles.listIcon} />
                    <span style={styles.itemsFoundText}>{displayedCars.length} items found</span>
                  </div>
                  <button 
                    onClick={handleClearAllFilters} 
                    style={styles.clearAllFiltersBtn}
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
              <div style={styles.topBarDivider}></div>
            </div>
            {/* <hr style={styles.horizontalLine} /> */}
            <div style={styles.carList}>
              {currentCars.map(car => (
                <div key={car.id} style={styles.cardOuterContainer}>
                  {renderCarCard(car)}
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            {filteredCars.length > carsPerPage && renderPagination()}
          </div>
        </div>

        {/* Footer */}
        <Footer />

        {renderBookingModal()}
      </div>
      
      <WhatsAppButton 
        phoneNumber="+212770256968" 
        message="🚗 Car Rental Request

Hello,

I would like to book a car with the following details:

🔹 Customer name: farid bouazi
📞 Contact number: 0645473763
📍 Return location: Rabat Airport
📅 Start date: 23 Apr 2025
📅 End date: 04 May 2025
🚘 Vehicle model: D - d
💰 Total price: 600.00 MAD

Could you please confirm availability to finalize this reservation? ✅

Thank you in advance!" 
      />
      <ScrollToTopButton />
    </div>
  );
};

export default AvailableCar;
/* ------------------------------------------------------------------
   STYLES GLOBAUX
------------------------------------------------------------------ */
const styles = {
  bodyStyle: {
    margin: 0,
    padding: 0,
    overflowX: "hidden",
    fontFamily: "'Poppins', Arial, sans-serif"
  },
  /* TopBar */
  // Styles pour TopBar supprimés car ils sont maintenant dans le composant TopBar
  mainContentWrapper: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  heroContainer: {
    width: "100%",
    height: "600px",
    backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url('/images/av-cars-cover.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    position: "relative",
    overflow: 'hidden',
    '@media (max-width: 600px)': {
      height: '400px',
    }
  },
  heroContent: {
    textAlign: 'center',
    maxWidth: '1500px',
    width: '100%',
    padding: '0 40px',
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    marginTop: '100px',
    '@media (max-width: 600px)': {
      padding: '0 20px',
      marginTop: '50px',
    }
  },
  heroTitle: {
    fontSize: '60px',
    fontWeight: '600',
    color: '#fff',
    margin: '0 0 25px 0',
    lineHeight: '1.3',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.38)',
    fontFamily: "'Poppins', Arial, sans-serif",
    maxWidth: '1200px',
    textTransform: 'uppercase',
    '@media (max-width: 600px)': {
      fontSize: '38px',
      margin: '0 0 15px 0',
      lineHeight: '1.2',
    }
  },
  heroSubtitle: {
    fontSize: '26px',
    fontWeight: '400',
    color: '#fff',
    margin: '0 0 45px 0',
    lineHeight: '1.5',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.38)',
    fontFamily: "'Poppins', Arial, sans-serif",
    maxWidth: '600px',
    textTransform: 'uppercase',
    '@media (max-width: 600px)': {
      fontSize: '18px',
      margin: '0 0 25px 0',
      lineHeight: '1.4',
    }
  },
  searchContainer: {
    position: 'absolute',
    bottom: 0,
    left: '35%',
    transform: 'translate(-50%, 50%)',
    width: '90%',
    maxWidth: '850px',
    backgroundColor: '#fff',
    border: '2px solid #2FD596',
    borderRadius: '40px',
    boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    zIndex: 2
  },
  searchRow: {
    display: 'flex',
    gap: '30px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '100%'
  },
  searchField: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '200px'
  },
  searchLabel: {
    fontWeight: 'bold',
    marginBottom: '6px',
    fontSize: '14px'
  },
  select: {
    border: 'none',
    outline: 'none',
    fontSize: '16px',
    backgroundColor: 'transparent',
    borderBottom: '1px solid #ccc',
    paddingBottom: '4px'
  },
  datePickerButton: {
    padding: '8px 12px',
    fontSize: '14px',
    borderRadius: '25px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left'
  },
  absoluteDatePicker: {
    position: 'absolute',
    top: '105%',
    left: 0,
    zIndex: 999,
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 3px 6px rgba(0,0,0,0.15)',
    marginTop: '4px'
  },
  findButton: {
    backgroundColor: '#2FD596',
    color: '#fff',
    padding: '12px 40px',
    fontSize: '16px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  heroTitleContainer: {
    textAlign: 'left',
    maxWidth: '1200px',
    margin: '150px auto 50px 150px',
    padding: '0 20px'
  },
  heroMainTitle: {
    fontSize: "48px",
    fontWeight: "600",
    textAlign: "left",
    marginBottom: "0px",
    fontFamily: "'Poppins', Arial, sans-serif",
    paddingLeft: "20px",
  },
  heroSubtitles: {
    fontSize: "28px",
    color: "#666",
    textAlign: "left",
    marginTop: "0",
    marginBottom: "50px",
    paddingLeft: "20px",
    fontFamily: "'Poppins', Arial, sans-serif"
  },
  container: {
    display: 'flex',
    backgroundColor: '#fff',
    minHeight: '100vh',
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '20px'
  },
  sidebar: {
    padding: '0 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '400px',
    marginRight: '20px',
    marginBottom: '80px', // Add margin bottom to match pagination spacing
  },
  filterCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    border: '1px solid #eee',
    transition: 'all 0.3s ease', // Add smooth transition for any hover effects
    '&:hover': {
      boxShadow: '0 2px 5px rgba(0,0,0,0.15)' // Subtle lift effect on hover
    }
  },
  filterHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '15px',
    cursor: 'pointer'
  },
  filterTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#333',
    margin: 0
  },
  mapBox: {
    width: '100%',
    height: '180px',
    borderRadius: '0',
    overflow: 'hidden',
    marginTop: '15px'
  },
  mapIframe: {
    width: '100%',
    height: '100%',
    border: 'none'
  },
  sliderContainer: {
    marginTop: '20px',
    marginBottom: '10px'
  },
  slider: {
    width: '100%',
    height: '4px',
    appearance: 'none',
    backgroundColor: '#e0e0e0',
    borderRadius: '2px',
    outline: 'none',
    marginBottom: '15px',
    // Update these styles for the thumb
    '&::-webkit-slider-thumb': {
      appearance: 'none',
      width: '18px',
      height: '18px',
      borderRadius: '50%',
      backgroundColor: '#fff',
      cursor: 'pointer',
      border: '2px solid #722637',
      boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
    },
    '&::-webkit-slider-runnable-track': {
      height: '4px',
      borderRadius: '2px',
      background: 'linear-gradient(to right, #722637 var(--progress), #e0e0e0 var(--progress))'
    }
  },
  priceRange: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#333',
    marginBottom: '20px'
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '15px'
  },
  clearBtn: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 12px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#333',
    fontSize: '14px',
    cursor: 'pointer'
  },
  applyBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px 16px',
    backgroundColor: '#722637', // Changed from green to burgundy
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer'
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '14px', // Slightly increase spacing between items
    padding: '2px 0' // Add some vertical padding
  },
  checkbox: {
    marginRight: '10px',  // Increase from default size
    width: '20px',  // Increase from default size
    height: '20px', // Increase from default size
    accentColor: '#722637' // Add accent color for better visibility
  },
  checkboxLabel: {
    fontSize: '14px',
    color: '#333',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  countBadge: {
    backgroundColor: '#f0f0f0',
    color: '#666',
    fontSize: '12px',
    padding: '2px 8px',
    borderRadius: '12px'
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    flex: 1,
    minHeight: 'calc(100vh - 400px)', // Ensure minimum height for content area
  },
  topBarSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start', // Changed to align items to the left
    padding: '0',
    marginBottom: '15px',
  },
  
  leftContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px' // Space between sort by and items found
  },
  
  sortByContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    border: '1px solid #ddd',
    padding: '5px 10px',
    borderRadius: '4px',
    position: 'relative', // Add this for dropdown positioning
    cursor: 'pointer'
  },
  
  sortByLabel: {
    fontSize: '14px',
    color: '#666',
    fontWeight: '400'
  },
  
  sortByValue: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '14px',
    color: '#333',
    fontWeight: '500',
    cursor: 'pointer'
  },
  
  sortIcon: {
    fontSize: '12px',
    color: '#666'
  },
  
  itemsFoundContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#333'
  },
  
  listIcon: {
    fontSize: '16px',
    color: '#666'
  },
  
  itemsFoundText: {
    fontSize: '14px',
    fontWeight: '500'
  },
  horizontalLine: {
    margin: 0,
    border: 'none',
    height: '1px',
    backgroundColor: '#ccc'
  },
  carList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
    padding: '0 20px',
    flex: 1, // Allow it to grow
    marginBottom: 'auto', // Push content to the top
  },
  
  cardOuterContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  
  desktopCardContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#fff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    margin: '0 auto',
    width: '100%',
    maxWidth: '800px',
    border: '1px solid #eee',
    transition: 'transform 0.3s ease, boxShadow 0.3s ease',
    cursor: 'pointer',
        position: 'relative',    // ← ici !

  },
  
  
  desktopImageWrapper: {
    width: '40%',
    height: 'auto',
    minHeight: '250px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    overflow: 'hidden'
  },
  
  desktopImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    padding: '10px'
  },
  
  desktopInfoWrapper: {
    width: '60%',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column'
  },
  
  ratingContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    marginBottom: '10px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '5px',
    marginBottom: '10px',
    width: 'fit-content',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    border: '0.5px solid #ddd'
  },
  
  starRating: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '14px'
  },
  
  starIcon: {
    color: '#4CAF50',
    marginRight: '3px'
  },
  
  reviewCount: {
    color: '#666',
    fontSize: '14px'
  },
  
  desktopCarName: {
    fontSize: '22px',
    fontWeight: '600',
    color: '#333',
    margin: '0 0 8px 0'
  },
  
  locationContainer: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    color: '#666',
    marginBottom: '15px'
  },
  
  divider: {
    height: '1px',
    backgroundColor: '#eee',
    width: '100%',
    margin: '5px 0 15px'
  },
  
  featuresRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px'
  },
  
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  
  featureIcon: {
    fontSize: '20px',
    color: '#333'
  },
  
  featureText: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333'
  },
  
  priceBookRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto'
  },
  
  priceDisplay: {
    display: 'flex',
    flexDirection: 'column'
  },
  
  priceValue: {
    fontSize: '23px',
    fontWeight: 'bold',
    color: 'black'
  },
  
  bookNowBtn: {
    backgroundColor: '#fff',
    color: '#333',
    border: '1px solid #ddd',
    borderRadius: '6px',
    padding: '8px 16px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  mobileCardContainer: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '19px',
    overflow: 'hidden',
    backgroundColor: '#fff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    margin: '0 auto',
    width: '100%',
    maxWidth: '400px',
    padding: '15px'
  },
  mobileImageWrapper: {
    width: '100%',
    height: '220px',
    borderRadius: '12px',
    overflow: 'hidden',
    marginBottom: '15px',
    backgroundColor: '#f9f9f9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mobileImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    borderRadius: '12px',
    padding: '10px'
  },
  mobileInfoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  mobileCarName: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#333',
    margin: '0'
  },
  mobileLocation: {
    fontSize: '14px',
    color: '#666',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  },
  mobileRowThreeColumns: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '15px',
    padding: '15px 0',
    borderTop: '1px solid #eee',
    borderBottom: '1px solid #eee'
  },
  mobileDetailLine: {
    fontSize: '14px',
    color: '#666',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  },
  priceText: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#333',
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  },
  priceLabel: {
    fontSize: '14px',
    color: '#666',
    fontWeight: 'normal'
  },
  mobileBookButton: {
    backgroundColor: '#f5f5f5',
    color: '#666',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 20px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    marginTop: '15px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    '&:hover': {
      backgroundColor: '#8B4513',
      color: '#fff'
    }
  },
  footer: {
    backgroundColor: "#111",
    color: "#fff",
    padding: "80px 20px 20px"
  },
  newFooterContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "40px",
    maxWidth: "1200px",
    margin: "0 auto"
  },
  footerColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  footerTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#fff",
    marginBottom: "10px"
  },
  footerDescription: {
    fontSize: "14px",
    color: "#999",
    lineHeight: "1.6",
    margin: 0
  },
  socialLinks: {
    display: "flex",
    gap: "15px",
    marginTop: "10px"
  },
  socialLink: {
    color: "#fff",
    transition: "color 0.3s ease",
    "&:hover": {
      color: "#E31837"
    }
  },
  footerList: {
    listStyle: "none",
    padding: 0,
    margin: 0
  },
  footerListItem: {
    marginBottom: "12px"
  },
  footerLink: {
    color: "#999",
    textDecoration: "none",
    fontSize: "14px",
    transition: "color 0.3s ease",
    "&:hover": {
      color: "#E31837"
    }
  },
  contactInfo: {
    display: "block",
    color: "#999",
    fontSize: "14px",
    marginBottom: "5px"
  },
  locationPlaceholder: {
    fontSize: "14px",
    color: "#999",
    marginBottom: "10px"
  },
  mapWrapper: {
    width: "100%",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 5px rgba(0,0,0,0.3)"
  },
  footerBottom: {
    textAlign: "center",
    paddingTop: "30px",
    marginTop: "40px",
    borderTop: "1px solid #333"
  },
  footerCopyright: {
    color: "#999",
    fontSize: "14px",
    margin: 0
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 2000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '8px',
    width: '80%',
    maxWidth: '1000px',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative'
  },
  closeButton: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: '#F5F5F5',
    border: 'none',
    cursor: 'pointer',
    padding: '10px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    transition: 'all 0.2s ease'
  },
  closeIconImage: {
    width: '16px',
    height: '16px',
    objectFit: 'contain',
    transition: 'all 0.2s ease'
  },
  bookingContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  bookingImageContainer: {
    flex: 1,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image3DContainer: {
    flex: 1,
    perspective: '1000px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  image3D: {
    width: '90%',
    height: 'auto',
    maxWidth: '400px',
    maxHeight: '300px',
    borderRadius: '10px',
    // boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
    transform: 'rotateY(5deg)',
    transformOrigin: 'center',
    transition: 'transform 0.3s ease'
  },
  carName: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginTop: '10px',
    color: '#333'
  },
  estimatedPrice: {
    fontSize: '16px',
    color: '#666',
    marginTop: '5px'
  },
  bookingInfoContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    textAlign: 'left',
    width: '100%',
  },
  bookingInfoText: {
    fontSize: '16px',
    color: '#333',
    marginBottom: '5px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  bookButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px'
  },
  bookButtonBottom: {
    width: '80%',
    margin: '0 auto',
    backgroundColor: '#fff',
    border: '2px solid #1EB564',
    color: '#1EB564',
    padding: '10px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px'
  },
  
  viewAllCarsBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px 24px',
    backgroundColor: '#fff',
    color: '#111',
    border: '1px solid #111',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '10px',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
    '@media (max-width: 600px)': {
      padding: '10px 20px',
      fontSize: '14px',
      marginTop: '5px',
    }
  },
  
  btnText: {
    position: 'relative',
    zIndex: 1,
    transition: 'transform 0.3s ease',
  },
  
  btnIcon: {
    marginLeft: '10px',
    position: 'relative',
    zIndex: 1,
    transition: 'transform 0.3s ease',
  },
  
  sortDropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    zIndex: 10,
    marginTop: '5px'
  },
  
  sortOption: {
    padding: '8px 12px',
    fontSize: '14px',
    color: '#333',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: '#f5f5f5'
    }
  },
  
  topBarWrapper: {
    width: '100%',
    maxWidth: '850px',
    margin: '0 auto',
    padding: '0 20px'
  },
  
  topBarSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '0',
    marginBottom: '10px'
  },
  
  topBarDivider: {
    width: '100%',
    height: '1px',
    backgroundColor: '#eee',
    marginBottom: '15px'
  },
  clearAllFiltersBtn: {
    backgroundColor: '#f5f5f5',
    color: '#333',
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '6px 12px',
    fontSize: '14px',
    cursor: 'pointer',
    marginLeft: '15px',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: '#eee',
      borderColor: '#ccc'
    }
  },
  confirmButton: {
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '15px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: '100%'
  },
  carSpecsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '15px',
    margin: '20px 0',
  },
  datePickerContainer: {
    margin: '20px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateInput: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    width: '45%'
  },
  dateArrow: {
    margin: '0 10px',
    fontSize: '18px'
  },
  bookingCarImage: {
    width: '100%',
    maxWidth: '400px',
    height: 'auto',
    objectFit: 'contain'
  },
  carTitleHeading: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0 0 10px 0',
    color: '#333'
  },
  locationContainer: {
    display: 'flex',
    alignItems: 'center',
    color: '#666',
    marginBottom: '10px'
  },
  locationIcon: {
    marginRight: '8px',
    fontSize: '16px',
  },
  specIcon: {
    color: '#333',
    fontSize: '18px',
    marginRight: '10px'
  },
  estimatedPriceTag: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '10px'
  },
  estimatedPriceText: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333'
  },
  newBookingContainer: {
    display: 'flex',
    width: '100%',
    height: '100%',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  newImageColumn: {
    width: '40%',
    position: 'relative',
    backgroundColor: '#f9f9f9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  },
  newCarImage: {
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
    maxHeight: '300px'
  },
  newDetailsColumn: {
    width: '60%',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  newPriceContainer: {
    position: 'absolute',
    bottom: '30px',
    left: '30px'
  },
  newPriceText: {
    fontSize: '18px',
    fontWeight: '600',
    margin: 0,
    color: '#333'
  },
  newCarHeader: {
    marginBottom: '25px'
  },
  newCarTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0 0 10px 0',
    color: '#333'
  },
  newLocationRow: {
    display: 'flex',
    alignItems: 'center',
    color: '#666'
  },
  newLocationIcon: {
    marginRight: '8px',
    fontSize: '16px'
  },
  newSpecsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '15px',
    marginBottom: '25px',
    // borderBottom: '1px solid #eee',
    paddingBottom: '25px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    padding: '10px', 
    marginBottom: '10px'
  },
  newSpecItem: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '15px',
    fontWeight: '600',
    color: '#333',
  },
  newSpecIcon: {
    color: '#444',
    fontSize: '18px',
    marginRight: '12px'
  },
  newDateContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginTop: '20px'
  },
  newDatePickerRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '15px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '12px 15px',
    backgroundColor: '#fff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    transition: 'all 0.3s ease'
  },
  newDateInput: {
    border: 'none',
    padding: '8px 0',
    flex: 1,
    fontSize: '14px',
    color: '#666',
    backgroundColor: 'transparent',
    outline: 'none'
  },
  newDateArrow: {
    margin: '0 10px',
    fontSize: '16px',
    color: '#666'
  },
  newConfirmButton: {
    backgroundColor: '#222',
    backgroundImage: 'linear-gradient(to right, #000, #333)',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '14px',
    fontSize: '15px',
    fontWeight: 'bold',
    cursor: 'pointer',
    textAlign: 'center',
    width: '100%',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    height: '48px', // Added fixed height
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundImage: 'linear-gradient(to right, #333, #000)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      transform: 'translateY(-2px)'
    }
  },
  newConfirmButtonHover: {
    backgroundColor: 'linear-gradient(to right, #333, #000)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    transform: 'translateY(-2px)'
  },
  newConfirmButtonDisabled: {
    backgroundImage: 'none',
    backgroundColor: '#999',
    cursor: 'not-allowed',
    boxShadow: 'none',
    transform: 'none',
    height: '48px', // Added fixed height
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundImage: 'none',
      backgroundColor: '#999',
      boxShadow: 'none',
      transform: 'none'
    }
  },
  paginationContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 0',
    backgroundColor: '#fff',
    marginTop: 'auto', // Push to bottom of container
    borderTop: '1px solid #eee', // Add subtle separator
    marginBottom: '80px', // Keep margin before footer
  },
  
  paginationWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  
  paginationButton: {
    minWidth: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    color: '#333',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    padding: '0 12px',
    '&:hover': {
      backgroundColor: '#f5f5f5',
      borderColor: '#999',
    },
  },
  
  paginationButtonActive: {
    backgroundColor: '#000',
    borderColor: '#000',
    color: '#fff',
    transform: 'scale(1.05)',
    '&:hover': {
      backgroundColor: '#333',
    },
  },
  
  paginationEllipsis: {
    color: '#666',
    padding: '0 4px',
    userSelect: 'none',
  },

  stepsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    padding: '10px 0',
    borderBottom: '1px solid #eee'
  },

  step: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '10px 20px',
    borderRadius: '8px',
    transition: 'all 0.3s ease'
  },

  activeStep: {
    backgroundColor: '#f5f5f5'
  },

  stepNumber: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: '#333',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '5px',
    fontWeight: 'bold'
  },

  stepLabel: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#333'
  },

  stepDivider: {
    width: '50px',
    height: '2px',
    backgroundColor: '#ddd',
    margin: '0 10px'
  },

  tenantInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },

  tenantInfoTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#333',
    margin: '0 0 10px 0'
  },

  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },

  input: {
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    '&:focus': {
      outline: 'none',
      borderColor: '#333'
    }
  },

  tenantButtonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
    gap: '16px' // Added gap between buttons
  },

  backButton: {
    backgroundColor: '#f5f5f5',
    color: '#333',
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    height: '48px', // Added fixed height
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: '#eee'
    }
  },
  progressBarOuter: {
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    margin: '32px 0 16px 0', 
    gap: 0,
    position: 'relative'
  },
  progressStepColumn: {
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    minWidth: 120, 
    position: 'relative',
    zIndex: 2
  },
  progressBarLine: {
    height: 4, 
    width: 40, 
    background: '#eee', 
    margin: '0 2px', 
    borderRadius: 2, 
    transition: 'all 0.5s ease', 
    zIndex: 1,
    marginTop: '-25px', // Increased from 24px to move line higher
    position: 'relative',
    overflow: 'hidden',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '0%',
      background: '#222',
      transition: 'width 0.5s ease'
    }
  },
  progressBarLineCompleted: {
    background: '#222',
    '&::after': {
      width: '100%'
    }
  },
  progressStep: {
    width: 48,
    height: 48,
    borderRadius: '50%',
    backgroundColor: '#eee', // Gris clair par défaut (étapes futures)
    border: '2px solid #eee',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#fff', // Numéro toujours blanc
    transition: 'all 0.5s ease',
    position: 'relative',
    zIndex: 2,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
    }
  },
  progressStepActive: {
    backgroundColor: '#222', // Cercle noir pour l'étape active
    borderColor: '#222',
    color: '#fff',
  },
  progressStepCompleted: {
    backgroundColor: '#222', // Cercle noir pour les étapes passées
    borderColor: '#222',
    color: '#fff',
  },
  progressLabel: {
    marginTop: '8px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#666',
    transition: 'all 0.3s ease',
    textAlign: 'center'
  },
  progressLabelActive: {
    color: '#222',
    fontWeight: '600',
    transform: 'scale(1.05)'
  },
  citySelect: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    width: '100%',
    fontSize: '14px',
    '&:focus': {
      outline: 'none',
      borderColor: '#333'
    }
  },
  cityFilterContainer: {
    width: '100%',
    marginBottom: '15px'
  },
};

