import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCamera, FaEdit, FaTrash, FaFilter, FaSort, FaPlus, FaCar, FaGasPump, FaCogs, FaCalendarAlt, FaUser, FaUsers, FaMapMarker, FaChartBar, FaChevronDown, FaTimes, FaBars, FaChevronRight, FaCircle, FaEnvelope, FaPhone, FaLocationArrow, FaComments, FaCog, FaSignOutAlt, FaSearch, FaStar, FaStarHalfAlt, FaOilCan } from 'react-icons/fa';

// Dictionnaire de traductions
const translations = {
  welcome: {
    en: 'Welcome to the Dashboard',
    ar: 'مرحبًا بك في لوحة القيادة',
    es: 'Bienvenido al Panel de Control',
    fr: 'Bienvenue sur le Tableau de Bord',
  },
  carManagement: {
    fr: "Gestion des voitures",
    en: "Car Management",
    ar: "إدارة السيارات"
  },
  carManagementTitle: {
    fr: "Gestion des voitures",
    en: "Car Management",
    ar: "إدارة السيارات"
  },
  carsRented: {
    fr: "Voitures louées",
    en: "Rented Cars",
    ar: "السيارات المؤجرة"
  },
  editCar: {
    fr: "Modifier la voiture",
    en: "Edit Car",
    ar: "تعديل السيارة"
  },
  addCar: {
    fr: "Ajouter une voiture",
    en: "Add Car",
    ar: "إضافة سيارة"
  },
  updateCar: {
    fr: "Mettre à jour la voiture",
    en: "Update Car",
    ar: "تحديث السيارة"
  },
  addCarButton: {
    fr: "Ajouter une voiture",
    en: "Add Car",
    ar: "إضافة سيارة"
  },
  filterBy: {
    fr: "Filtrer par...",
    en: "Filter by...",
    ar: "تصفية حسب..."
  },
  reset: {
    fr: "Réinitialiser",
    en: "Reset",
    ar: "إعادة تعيين"
  },
  noImage: {
    fr: "Pas d'image",
    en: "No image",
    ar: "لا توجد صورة"
  },
  pricePerDay: {
    fr: "Prix par jour",
    en: "Price per day",
    ar: "السعر في اليوم"
  },
  dashboardOverview: {
    fr: "Vue d'ensemble du tableau de bord",
    en: "Dashboard Overview",
    ar: "نظرة عامة على لوحة القيادة"
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
  allCars: {
    fr: "Toutes les voitures",
    en: "All Cars",
    ar: "جميع السيارات"
  },
  available: {
    fr: "Disponibles",
    en: "Available",
    ar: "متوفرة"
  },
  rented: {
    fr: "Louées",
    en: "Rented",
    ar: "مؤجرة"
  },
  search: {
    fr: "Rechercher",
    en: "Search",
    ar: "بحث"
  },
  carDetails: {
    fr: "Détails de la voiture",
    en: "Car Details",
    ar: "تفاصيل السيارة"
  },
  name: {
    fr: "Nom",
    en: "Name",
    ar: "اسم"
  },
  model: {
    fr: "Modèle",
    en: "Model",
    ar: "نموذج"
  },
  year: {
    fr: "Année",
    en: "Year",
    ar: "عام"
  },
  price: {
    fr: "Prix par jour",
    en: "Price per day",
    ar: "السعر في اليوم"
  },
  fuelType: {
    fr: "Type de carburant",
    en: "Fuel Type",
    ar: "نوع الوقود"
  },
  transmission: {
    fr: "Transmission",
    en: "Transmission",
    ar: "نقل"
  },
  location: {
    fr: "Emplacement",
    en: "Location",
    ar: "موقع"
  },
  seats: {
    fr: "Sièges",
    en: "Seats",
    ar: "مقاعد"
  },
  availability: {
    fr: "Disponibilité",
    en: "Availability",
    ar: "التوفر"
  },
  image: {
    fr: "Image",
    en: "Image",
    ar: "صورة"
  },
  actions: {
    fr: "Actions",
    en: "Actions",
    ar: "أجراءات"
  },
  save: {
    fr: "Enregistrer",
    en: "Save",
    ar: "يحفظ"
  },
  cancel: {
    fr: "Annuler",
    en: "Cancel",
    ar: "يلغي"
  },
  petrol: {
    fr: "Essence",
    en: "Petrol",
    ar: "بنزين"
  },
  diesel: {
    fr: "Diesel",
    en: "Diesel",
    ar: "ديزل"
  },
  electric: {
    fr: "Électrique",
    en: "Electric",
    ar: "كهربائي"
  },
  hybrid: {
    fr: "Hybride",
    en: "Hybrid",
    ar: "هجين"
  },
  manual: {
    fr: "Manuelle",
    en: "Manual",
    ar: "يدوي"
  },
  automatic: {
    fr: "Automatique",
    en: "Automatic",
    ar: "أوتوماتيكي"
  },
  chooseImage: {
    fr: "Choisir une image",
    en: "Choose Image",
    ar: "اختر صورة"
  },
  logout: {
    fr: "Se déconnecter",
    en: "Logout",
    ar: "تسجيل الخروج"
  },
  rating: {
    fr: "Nombre d'étoiles",
    en: "Rating",
    ar: "التقييم"
  },
};

// ---------------------------------------------------------------------
// Composant pour le sélecteur de langue
// ---------------------------------------------------------------------
const LanguageSwitcher = ({ language, setLanguage }) => {
  console.log('LanguageSwitcher component rendering');
  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <div style={styles.languageSwitcher}>
      <button 
        onClick={() => changeLanguage('en')} 
        style={{
          ...styles.langButton,
          backgroundColor: language === 'en' ? '#1890ff' : '#f0f2f5'
        }}
      >
        EN
      </button>
      <button 
        onClick={() => changeLanguage('fr')} 
        style={{
          ...styles.langButton,
          backgroundColor: language === 'fr' ? '#1890ff' : '#f0f2f5'
        }}
      >
        FR
      </button>
      <button 
        onClick={() => changeLanguage('ar')} 
        style={{
          ...styles.langButton,
          backgroundColor: language === 'ar' ? '#1890ff' : '#f0f2f5'
        }}
      >
        AR
      </button>
    </div>
  );
};

// ---------------------------------------------------------------------
// Composant pour les styles CSS
// ---------------------------------------------------------------------
const CarManagementStyles = () => {
  console.log('CarManagementStyles component rendering');
  useEffect(() => {
    console.log('CarManagementStyles useEffect running');
    const style = document.createElement('style');
    style.innerHTML = `
      .nav-link:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
      
      .active-link {
        background-color: #1890ff !important;
      }
      
      .car-card:hover {
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
      
      .edit-button:hover {
        background-color: #40a9ff;
      }
      
      .delete-button:hover {
        background-color: #ff4d4f;
      }
      
      .lang-button:hover {
        background-color: #40a9ff;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      console.log('CarManagementStyles cleanup running');
      document.head.removeChild(style);
    };
  }, []);
  
  return null;
};

// ---------------------------------------------------------------------
// Composant principal
// ---------------------------------------------------------------------
const CarManagement = () => {
  console.log('CarManagement component rendering');
  const [language, setLanguage] = useState('en');
  const [isOpen, setIsOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    console.log('CarManagement useEffect [language] running');
    const lang = localStorage.getItem('language') || 'en';
    setLanguage(lang);
    
    const handleResize = () => {
      console.log('Resizing window');
      setWindowWidth(window.innerWidth);
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => {
      console.log('CarManagement resize cleanup running');
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={styles.container}>
      <CarManagementStyles />
      <MainContent language={language} isOpen={isOpen} windowWidth={windowWidth} />
    </div>
  );
};

// ---------------------------------------------------------------------
// Composant MainContent (logique de gestion des voitures)
// ---------------------------------------------------------------------
const MainContent = ({ language, isOpen, windowWidth }) => {
  console.log('MainContent component rendering');
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('allCars');
  const [editingCar, setEditingCar] = useState(null);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null);
  
  // État pour le formulaire d'ajout/édition de voiture
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    year: new Date().getFullYear(),
    price_per_day: '',
    fuel_type: 'petrol',
    transmission: 'manual',
    location: '',
    seats: 5,
    availability: true,
    image: null,
    rating: 0,
    matricule: '',
    kilometrage: ''
  });
  
  // État pour les voitures
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contentMarginLeft, setContentMarginLeft] = useState('0px');
  
  // API URLs
  const API_URL = process.env.REACT_APP_API_URL;
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // Add isMobile definition
  const isMobile = windowWidth < 768;

  // Récupération des voitures
  const fetchCars = async () => {
    console.log('Fetching cars...');
    try {
      setLoading(true);
      console.log('Making API call to:', `${API_URL}/cars`);
      const response = await axios.get(`${API_URL}/cars`);
      console.log('Cars fetched successfully:', response.data);
      setCars(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching cars:', err);
      setError('Error fetching cars');
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('MainContent useEffect [] running (initial fetch)');
    fetchCars();
  }, []);

  // Mise à jour du margin-left basé sur l'état de la navbar et la taille de l'écran
  useEffect(() => {
    console.log('MainContent useEffect [isOpen, windowWidth] running');
    if (windowWidth < 768) {
      setContentMarginLeft('0px');
    } else {
      setContentMarginLeft(isOpen ? '290px' : '0px');
    }
  }, [isOpen, windowWidth]);
  
  // Réinitialiser le formulaire
  const resetForm = () => {
    console.log('Resetting form');
    setFormData({
      name: '',
      model: '',
      year: new Date().getFullYear(),
      price_per_day: '',
      fuel_type: 'petrol',
      transmission: 'manual',
      location: '',
      seats: 5,
      availability: true,
      image: null,
      rating: 0,
      matricule: '',
      kilometrage: ''
    });
    setEditingCar(null);
  };
  
  // Soumission du formulaire (ajout ou édition)
  const handleSubmit = async (e) => {
    console.log('Handling form submission');
    e.preventDefault();
    setFormError(null); // Réinitialiser l'erreur du formulaire
    
    const formDataToSend = new FormData();
    for (const key in formData) {
      // Ne pas inclure reviews dans le FormData, il sera géré côté backend
      if (key === 'reviews') continue;
      if (key === 'image' && formData[key] && formData[key] instanceof File) {
        formDataToSend.append('image', formData[key]);
      } else if (key !== 'image') {
        formDataToSend.append(key, formData[key]);
      }
    }
    
    try {
      console.log('Submitting form data:', formData);
      if (editingCar) {
        // Mode édition
        console.log('Editing car with ID:', editingCar.id);
        await axios.put(`${API_URL}/cars/${editingCar.id}`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log('Car updated successfully');
      } else {
        // Mode ajout
        console.log('Adding new car');
        await axios.post(`${API_URL}/cars`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log('Car added successfully');
      }
      fetchCars();
      resetForm();
      setActiveTab('allCars');
    } catch (err) {
      console.error('Error submitting form:', err);
      if (err.response && err.response.data && err.response.data.error) {
        if (err.response.data.error.includes('matricule must be unique')) {
          setFormError('Ce matricule est déjà utilisé. Veuillez en choisir un autre.');
        } else {
          setFormError(err.response.data.error);
        }
      } else {
        setFormError('Une erreur est survenue lors de la création de la voiture.');
      }
    }
  };
  
  // Suppression d'une voiture
  const handleDelete = async (id) => {
    console.log('Handling delete for car ID:', id);
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        console.log('Deleting car with ID:', id);
        await axios.delete(`${API_URL}/cars/${id}`);
        console.log('Car deleted successfully');
        fetchCars();
      } catch (err) {
        console.error('Error deleting car:', err);
        setError('Error deleting car');
      }
    }
  };

  // Édition d'une voiture
  const handleEdit = (car) => {
    console.log('Editing car:', car);
    setFormData({
      name: car.name,
      model: car.model,
      year: car.year,
      price_per_day: car.price_per_day,
      fuel_type: car.fuel_type,
      transmission: car.transmission,
      location: car.location,
      seats: car.seats,
      availability: car.availability,
      image: null,
      rating: car.rating || 0,
      matricule: car.matricule || '',
      kilometrage: car.kilometrage || ''
    });
    setEditingCar(car);
    setActiveTab('addCar');
  };
  
  // Filtre et tri
  const [filterText, setFilterText] = useState('');

  const resetFilter = () => {
    console.log('Resetting filter');
    setFilterText('');
  };

  // Responsive car actions style
  const carActionsMobileStyle = isMobile ? { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%' } : {};
  const carActionButtonMobileStyle = isMobile ? { width: '100%', margin: 0 } : {};

  // Responsive tab bar style
  const tabBarMobileStyle = isMobile ? { 
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
    marginBottom: '30px'
  } : {};

  // Responsive filter container style
  const filterContainerMobileStyle = isMobile ? {
    marginTop: '20px',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px'
  } : {};

  // Responsive tab button style
  const tabButtonMobileStyle = isMobile ? {
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto'
  } : {};

  // Responsive form container style
  const formContainerMobileStyle = isMobile ? {
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
    padding: '15px'
  } : {};

  // Responsive form row style
  const formRowMobileStyle = isMobile ? {
    flexDirection: 'column',
    gap: '15px'
  } : {};

  // Responsive form group style
  const formGroupMobileStyle = isMobile ? {
    width: '100%'
  } : {};

  // Responsive input style
  const inputMobileStyle = isMobile ? {
    width: '100%',
    boxSizing: 'border-box'
  } : {};

  // Responsive select style
  const selectMobileStyle = isMobile ? {
    width: '100%',
    boxSizing: 'border-box'
  } : {};

  // Responsive form buttons style
  const formButtonsMobileStyle = isMobile ? {
    flexDirection: 'column',
    gap: '10px',
    width: '100%'
  } : {};

  // Responsive submit/cancel button style
  const formButtonMobileStyle = isMobile ? {
    width: '100%'
  } : {};

  return (
    <div 
      style={{ 
        ...styles.mainWrapper,
        marginLeft: contentMarginLeft
      }}
    >
      <div style={styles.mainContent}>
        <div style={styles.pageHeader}>
          <h1 style={styles.pageTitle}>{translations.carManagementTitle[language]}</h1>
          <div style={styles.titleUnderline}></div>
          <p style={styles.pageSubtitle}>Manage your car inventory, add new cars, and track availability</p>
        </div>
        
        <div style={{ ...styles.tabBar, ...tabBarMobileStyle }}>
          <button
            className="tab-button"
            style={{ ...(activeTab === 'allCars' ? styles.tabButtonActive : styles.tabButton), ...tabButtonMobileStyle }}
            onClick={() => setActiveTab('allCars')}
          >
            {translations.allCars[language]}
          </button>
          <button
            className="tab-button"
            style={{ ...(activeTab === 'rented' ? styles.tabButtonActive : styles.tabButton), ...tabButtonMobileStyle }}
            onClick={() => setActiveTab('rented')}
          >
            {translations.carsRented[language]}
          </button>
          <button
            className="tab-button"
            style={{ ...(activeTab === 'addCar' ? styles.tabButtonActive : styles.tabButton), ...tabButtonMobileStyle }}
            onClick={() => {
              resetForm();
              setActiveTab('addCar');
            }}
          >
            {editingCar ? translations.editCar[language] : translations.addCar[language]}
          </button>
        </div>
        
        {activeTab === 'allCars' && (
          <div>
            <div style={{ ...styles.filterContainer, ...filterContainerMobileStyle }}>
              <input
                type="text"
                placeholder={translations.filterBy[language]}
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                style={styles.filterInput}
              />
              <button
                style={styles.resetButton} 
                onClick={resetFilter}
              >
                {translations.reset[language]}
              </button>
            </div>
            
            {loading ? (
              <div style={styles.loading}>Loading...</div>
            ) : error ? (
              <div style={styles.error}>{error}</div>
            ) : (
              <div style={styles.carsGrid}>
                {cars
                  .filter(car => {
                    const matchesSearch = car.name.toLowerCase().includes(filterText.toLowerCase()) ||
                                        car.model.toLowerCase().includes(filterText.toLowerCase());
                    return matchesSearch;
                  })
                  .map(car => (
                    <div key={car.id} style={styles.carCard} className="car-card">
                      {car.image_url ? (
                        <img
                          src={`${BASE_URL}${car.image_url}`}
                          alt={car.name}
                          style={styles.carImage}
                        />
                      ) : (
                        <div style={styles.noImage}>
                          <FaCar style={styles.noImageIcon} />
                          <div>{translations.noImage[language]}</div>
                        </div>
                      )}
                      <div style={styles.carBody}>
                        <h3 style={styles.carTitle}>{car.name}</h3>
                        <p style={styles.carModel}>{car.model} - {car.year}</p>
                        <div style={{marginBottom: '12px'}}>
                          <div><strong>Fuel:</strong> {car.fuel_type}</div>
                          <div><strong>Transmission:</strong> {car.transmission}</div>
                          <div><strong>Seats:</strong> {car.seats}</div>
                          <div><strong>Rating:</strong> {car.rating} ⭐</div>
                          <div><strong>Matricule :</strong> {car.matricule}</div>
                          <div><strong>Kilométrage :</strong> {car.kilometrage} km</div>
                        </div>
                        <div style={styles.carDetails}>
                          <div style={styles.carPrice}>{car.price_per_day} DH/Day</div>
                          <div 
                            style={{
                              ...styles.carAvailability,
                              backgroundColor: car.availability ? 'rgba(82, 196, 26, 0.2)' : 'rgba(255, 77, 79, 0.2)',
                              color: car.availability ? '#52c41a' : '#ff4d4f'
                            }}
                          >
                            {car.availability ? "Available" : "Rented"}
                          </div>
                        </div>
                        <div style={{ ...styles.carActions, ...carActionsMobileStyle }}>
                          <button 
                            style={{ ...styles.editButton, ...carActionButtonMobileStyle }} 
                            onClick={() => handleEdit(car)}
                            className="edit-button card-icon-button"
                          >
                            <FaEdit style={styles.actionIcon} /> Edit
                          </button>
                          <button 
                            style={{ ...styles.vidangeButton, ...carActionButtonMobileStyle }}
                            onClick={() => navigate(`/vidanges/${car.id}`)}
                            className="vidange-button card-icon-button"
                          >
                            <FaOilCan style={styles.actionIcon} /> Vidange
                          </button>
                          <button 
                            style={{ ...styles.deleteButton, ...carActionButtonMobileStyle }}
                            onClick={() => handleDelete(car.id)}
                            className="delete-button card-icon-button"
                          >
                            <FaTrash style={styles.actionIcon} /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'rented' && (
          <div>
            <div style={styles.filterContainer}>
              <input
                type="text"
                placeholder={translations.filterBy[language]}
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                style={styles.filterInput}
              />
              <button
                style={styles.resetButton} 
                onClick={resetFilter}
              >
                {translations.reset[language]}
              </button>
            </div>
            
            {loading ? (
              <div style={styles.loading}>Loading...</div>
            ) : error ? (
              <div style={styles.error}>{error}</div>
            ) : (
              <div style={styles.carsGrid}>
                {cars
                  .filter(car => {
                    const matchesSearch = car.name.toLowerCase().includes(filterText.toLowerCase()) ||
                                        car.model.toLowerCase().includes(filterText.toLowerCase());
                    return !car.availability && matchesSearch;
                  })
                  .map(car => (
                    <div key={car.id} style={styles.carCard} className="car-card">
                      {car.image_url ? (
                        <img
                          src={`${BASE_URL}${car.image_url}`}
                          alt={car.name}
                          style={styles.carImage}
                        />
                      ) : (
                        <div style={styles.noImage}>
                          <FaCar style={styles.noImageIcon} />
                          <div>{translations.noImage[language]}</div>
                        </div>
                      )}
                      <div style={styles.carBody}>
                        <h3 style={styles.carTitle}>{car.name}</h3>
                        <p style={styles.carModel}>{car.model} - {car.year}</p>
                        <div style={{marginBottom: '12px'}}>
                          <div><strong>Fuel:</strong> {car.fuel_type}</div>
                          <div><strong>Transmission:</strong> {car.transmission}</div>
                          <div><strong>Seats:</strong> {car.seats}</div>
                          <div><strong>Rating:</strong> {car.rating} ⭐</div>
                          <div><strong>Matricule :</strong> {car.matricule}</div>
                          <div><strong>Kilométrage :</strong> {car.kilometrage} km</div>
                        </div>
                        <div style={styles.carDetails}>
                          <div style={styles.carPrice}>{car.price_per_day} DH/Day</div>
                          <div 
                            style={{
                              ...styles.carAvailability,
                              backgroundColor: car.availability ? 'rgba(82, 196, 26, 0.2)' : 'rgba(255, 77, 79, 0.2)',
                              color: car.availability ? '#52c41a' : '#ff4d4f'
                            }}
                          >
                            {car.availability ? "Available" : "Rented"}
                          </div>
                        </div>
                        <div style={{ ...styles.carActions, ...carActionsMobileStyle }}>
                          <button 
                            style={{ ...styles.editButton, ...carActionButtonMobileStyle }} 
                            onClick={() => handleEdit(car)}
                            className="edit-button card-icon-button"
                          >
                            <FaEdit style={styles.actionIcon} /> Edit
                          </button>
                          <button 
                            style={{ ...styles.vidangeButton, ...carActionButtonMobileStyle }}
                            onClick={() => navigate(`/vidanges/${car.id}`)}
                            className="vidange-button card-icon-button"
                          >
                            <FaOilCan style={styles.actionIcon} /> Vidange
                          </button>
                          <button 
                            style={{ ...styles.deleteButton, ...carActionButtonMobileStyle }}
                            onClick={() => handleDelete(car.id)}
                            className="delete-button card-icon-button"
                          >
                            <FaTrash style={styles.actionIcon} /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'addCar' && (
          <div style={{ ...styles.formContainer, ...formContainerMobileStyle }}>
            <h2 style={styles.formTitle}>
              {editingCar ? translations.editCar[language] : translations.addCar[language]}
            </h2>
            
            {formError && (
              <div style={{
                backgroundColor: '#fff2f0',
                border: '1px solid #ffccc7',
                color: '#ff4d4f',
                padding: '10px',
                borderRadius: '4px',
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                {formError}
              </div>
            )}
            
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={{ ...styles.formRow, ...formRowMobileStyle }}>
                <div style={{ ...styles.formGroup, ...formGroupMobileStyle }}>
                  <label style={styles.label}>{translations.name[language]}</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    style={{ ...styles.input, ...inputMobileStyle }}
                    required
                  />
                </div>
                
                <div style={{ ...styles.formGroup, ...formGroupMobileStyle }}>
                  <label style={styles.label}>{translations.model[language]}</label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => setFormData({...formData, model: e.target.value})}
                    style={{ ...styles.input, ...inputMobileStyle }}
                    required
                  />
                </div>
              </div>
              
              <div style={{ ...styles.formRow, ...formRowMobileStyle }}>
                <div style={{ ...styles.formGroup, ...formGroupMobileStyle }}>
                  <label style={styles.label}>{translations.year[language]}</label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({...formData, year: e.target.value})}
                    style={{ ...styles.input, ...inputMobileStyle }}
                    required
                  />
                </div>
                
                <div style={{ ...styles.formGroup, ...formGroupMobileStyle }}>
                  <label style={styles.label}>{translations.pricePerDay[language]}</label>
                  <input
                    type="number"
                    value={formData.price_per_day}
                    onChange={(e) => setFormData({...formData, price_per_day: e.target.value})}
                    style={{ ...styles.input, ...inputMobileStyle }}
                    required
                  />
                </div>
              </div>
              
              <div style={{ ...styles.formRow, ...formRowMobileStyle }}>
                <div style={{ ...styles.formGroup, ...formGroupMobileStyle }}>
                  <label style={styles.label}>{translations.fuelType[language]}</label>
                  <select
                    value={formData.fuel_type}
                    onChange={(e) => setFormData({...formData, fuel_type: e.target.value})}
                    style={{ ...styles.select, ...selectMobileStyle }}
                  >
                    <option value="petrol">Petrol</option>
                    <option value="diesel">Diesel</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="electric">Electric</option>
                  </select>
                </div>
                
                <div style={{ ...styles.formGroup, ...formGroupMobileStyle }}>
                  <label style={styles.label}>{translations.transmission[language]}</label>
                  <select
                    value={formData.transmission}
                    onChange={(e) => setFormData({...formData, transmission: e.target.value})}
                    style={{ ...styles.select, ...selectMobileStyle }}
                  >
                    <option value="manual">Manual</option>
                    <option value="automatic">Automatic</option>
                  </select>
                </div>
              </div>
              
              <div style={{ ...styles.formRow, ...formRowMobileStyle }}>
                <div style={{ ...styles.formGroup, ...formGroupMobileStyle }}>
                  <label style={styles.label}>{translations.location[language]}</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    style={{ ...styles.input, ...inputMobileStyle }}
                    required
                  />
                </div>
                
                <div style={{ ...styles.formGroup, ...formGroupMobileStyle }}>
                  <label style={styles.label}>{translations.seats[language]}</label>
                  <input
                    type="number"
                    value={formData.seats}
                    onChange={(e) => setFormData({...formData, seats: e.target.value})}
                    style={{ ...styles.input, ...inputMobileStyle }}
                    required
                  />
                </div>
              </div>
              
              <div style={{ ...styles.formRow, ...formRowMobileStyle }}>
                <div style={{ ...styles.formGroup, ...formGroupMobileStyle }}>
                  <label style={styles.label}>{translations.availability[language]}</label>
                  <select
                    value={formData.availability.toString()}
                    onChange={(e) => setFormData({...formData, availability: e.target.value === 'true'})}
                    style={{ ...styles.select, ...selectMobileStyle }}
                  >
                    <option value="true">Available</option>
                    <option value="false">Not Available</option>
                  </select>
                </div>
                
                <div style={{ ...styles.formGroup, ...formGroupMobileStyle }}>
                  <label style={styles.label}>{translations.image[language]}</label>
                  <input
                    type="file"
                    onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
                    style={{ ...styles.fileInput, ...inputMobileStyle }}
                    accept=".jpg,.jpeg"
                  />
                </div>
              </div>
              
              <div style={{ ...styles.formRow, ...formRowMobileStyle }}>
                <div style={{ ...styles.formGroup, ...formGroupMobileStyle }}>
                  <label style={styles.label}>Matricule</label>
                  <input
                    type="text"
                    value={formData.matricule}
                    onChange={(e) => setFormData({...formData, matricule: e.target.value})}
                    style={{ ...styles.input, ...inputMobileStyle }}
                    required
                  />
                </div>
                <div style={{ ...styles.formGroup, ...formGroupMobileStyle }}>
                  <label style={styles.label}>Kilométrage</label>
                  <input
                    type="number"
                    value={formData.kilometrage}
                    onChange={(e) => setFormData({...formData, kilometrage: e.target.value})}
                    style={{ ...styles.input, ...inputMobileStyle }}
                    required
                  />
                </div>
              </div>
              
              <div style={{ ...styles.formButtons, ...formButtonsMobileStyle }}>
                <button 
                  type="submit" 
                  style={{ ...styles.submitButton, ...formButtonMobileStyle }}
                  className="form-button"
                >
                  {editingCar ? translations.updateCar[language] : translations.addCarButton[language]}
                </button>
                <button
                  type="button" 
                  style={{ ...styles.cancelButton, ...formButtonMobileStyle }}
                  onClick={() => {
                    resetForm();
                    setActiveTab('allCars');
                  }}
                  className="form-button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------
const styles = {
  container: {
    position: 'relative',
    minHeight: '100vh',
    background: 'linear-gradient(120deg, #f3f1f1, #ffffff)',
  },
  navbar: {
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
    width: '280px',
    backgroundColor: '#001529',
    color: 'white',
    transition: 'all 0.3s ease',
    boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    overflowY: 'auto',
    '@media (max-width: 768px)': {
      transform: 'translateX(-100%)',
      width: '100%',
    },
  },
  toggleIcon: {
    color: 'white',
    fontSize: '24px',
    marginLeft: 'auto',
    marginBottom: '10px',
    cursor: 'pointer',
  },
  navbarClosedIcon: {
    position: 'fixed',
    top: '15px',
    left: '15px',
    fontSize: '24px',
    color: 'white',
    backgroundColor: '#722637',
    padding: '8px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
    zIndex: 1100,
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
  mainContainer: {
    padding: '20px',
    minHeight: '100vh',
    boxSizing: 'border-box',
  },
  tabContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
    gap: '10px',
  },
  tabButton: {
    padding: '10px 20px',
    backgroundColor: '#ccc',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    boxShadow: '0 3px 6px rgba(0,0,0,0.15)',
    transition: 'transform 0.2s',
  },
  activeTabButton: {
    padding: '10px 20px',
    backgroundColor: '#722637',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 3px 6px rgba(0,0,0,0.15)',
    transform: 'scale(1.02)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '15px',
  },
  formGroupRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
  },
  input: {
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  checkbox: {
    marginLeft: '10px',
    transform: 'scale(1.2)',
  },
  submitButton: {
    padding: '12px 24px',
    backgroundColor: '#1890ff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    boxShadow: '0 2px 6px rgba(24, 144, 255, 0.2)',
    transition: 'all 0.3s ease',
    minWidth: '120px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  addButton: {
    backgroundColor: '#722637',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 15px',
    cursor: 'pointer',
    fontSize: '16px',
    boxShadow: '0 3px 8px rgba(0,0,0,0.2)',
    transition: 'transform 0.2s',
  },
  filterContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '25px',
  },
  filterInput: {
    padding: '10px 15px',
    borderRadius: '8px',
    border: '1px solid #e8e8e8',
    fontSize: '14px',
    width: '300px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  resetButton: {
    padding: '10px 20px',
    backgroundColor: '#1890ff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'background-color 0.3s',
  },
  carsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '25px',
  },
  carCard: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s, box-shadow 0.3s',
    border: '1px solid #eee',
  },
  carImage: {
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
  carBody: {
    padding: '15px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
  },
  carTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0 0 5px 0',
    color: '#001529',
  },
  carModel: {
    fontSize: '14px',
    margin: '0 0 10px 0',
    color: '#666',
  },
  carDetails: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '5px 0 15px 0',
  },
  carPrice: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#1890ff',
  },
  carAvailability: {
    fontSize: '12px',
    padding: '4px 8px',
    borderRadius: '4px',
    fontWeight: '500',
  },
  carSpecs: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    fontSize: '13px',
    color: '#666',
  },
  carSpec: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  carActions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
    gap: '12px',
    padding: '5px 0',
  },
  actionIcon: {
    fontSize: '15px',
    marginRight: '4px',
  },
  editButton: {
    backgroundColor: '#1890ff',
    color: '#fff',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    flex: 1,
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 4px rgba(24, 144, 255, 0.2)',
    transition: 'all 0.3s ease',
    fontSize: '13px',
    letterSpacing: '0.3px',
  },
  deleteButton: {
    backgroundColor: '#ff4d4f',
    color: '#fff',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    flex: 1,
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 4px rgba(255, 77, 79, 0.2)',
    transition: 'all 0.3s ease',
    fontSize: '13px',
    letterSpacing: '0.3px',
  },
  formContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
  },
  formTitle: {
    margin: 0,
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  formRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
  },
  select: {
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  fileInput: {
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  formButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '15px',
    marginTop: '30px',
    paddingTop: '20px',
    borderTop: '1px solid #f0f0f0',
  },
  cancelButton: {
    padding: '12px 24px',
    backgroundColor: '#f5f5f5',
    color: '#666',
    border: '1px solid #d9d9d9',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
    minWidth: '120px',
  },
  languageSwitcher: {
    position: 'absolute',
    top: '10px',
    right: '10px',
  },
  langButton: {
    backgroundColor: '#fff',
    border: 'none',
    color: '#722637',
    padding: '5px 10px',
    marginLeft: '5px',
    cursor: 'pointer',
  },
  linkContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  settingsNote: {
    fontSize: '12px',
    color: '#ccc',
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
  loading: {
    textAlign: 'center',
    margin: '20px 0',
  },
  error: {
    textAlign: 'center',
    margin: '20px 0',
    color: 'red',
  },
  ratingContainer: {
    display: 'flex',
    gap: '5px',
    alignItems: 'center',
  },
  starWrapper: {
    position: 'relative',
    cursor: 'pointer',
  },
  star: {
    fontSize: '32px',
    margin: '0 2px',
  },
  halfStar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '50%',
    height: '100%',
    backgroundColor: '#ffd700',
    clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
  },
  ratingValue: {
    marginLeft: '10px',
    fontSize: '16px',
    color: '#666',
  },
  vidangeButton: {
    backgroundColor: '#722637',
    color: '#fff',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    flex: 1,
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 4px rgba(114, 38, 55, 0.2)',
    transition: 'all 0.3s ease',
    fontSize: '13px',
    letterSpacing: '0.3px',
  },
};

export default CarManagement;
