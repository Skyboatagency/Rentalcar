import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  FaLanguage,
  FaMoneyBillWave,
  FaUser,
  FaChevronDown,
  FaChevronUp,
  FaEnvelope,
  FaInstagram,
  FaFacebook,
  FaPhone,
  FaMapMarkerAlt
} from 'react-icons/fa';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { fadeIn, slideIn, scaleIn, staggerContainer } from '../components/Animations';

/*---------------------------------------------------------*/
/*        i18n texts: English, French, Arabic            */
/*---------------------------------------------------------*/
const texts = {
  en: {
    heroTitle: "Looking for the Perfect Car? \nFind the Best Car for Your Journey.",
    features: ["Affordable rates", "Premium services", "24/7 Roadside assistance"],
    pickUpLabel: "Pick up location",
    pickUpDateLabel: "Pick Up Date & Time",
    returnDateLabel: "Return Date & Time",
    findButton: "Find a vehicle",
    overlayText: "Get in Touch",
    infoCardTitle: "Morocco",
    infoAddress: "3Projet Hassane 2 imm.34 N09 Hay El Mohammadi Casablanca",
    infoPhone1: "05 22 62 34 62",
    infoPhone2: "06 61 45 80 49",
    infoEmail: "snaibcar@gmail.com",
    formTitle: "Get in touch",
    labelFirstName: "First name",
    labelLastName: "Last name",
    labelEmail: "Email address",
    labelPhone: "Phone number",
    labelMessage: "Your Message",
    placeholderFirstName: "First name",
    placeholderLastName: "Last name",
    placeholderEmail: "Email@domain.com",
    placeholderPhone: "Phone number",
    placeholderMessage: "Leave us a message...",
    checkboxTextStart: "I agree to the",
    termsText: "Terms of Service",
    checkboxTextMiddle: "and",
    privacyText: "Privacy Policy",
    submitButton: "Send message",
    mapTitle: "Our location",
    mapAddress: "Projet Hassane 2 imm.34 N09 Hay El Mohammadi Casablanca",
    footerQuickLinks: "Quick Access Links",
    footerInfoPages: "Informational Pages",
    footerLocation: "Our location",
    followUs: "follow us on:",
    footerHome: "Home",
    footerFAQs: "FAQs",
    footerContact: "Contact Us",
    footerAbout: "About Us",
    footerTerms: "Terms & Conditions",
    footerPrivacy: "Privacy Policy",
    chatButton: "Chat with Us",
    topBarHome: "Home",
    topBarAvailableCars: "Available Cars",
    topBarContact: "Contact Us",
    profileSignIn: "Sign in",
    footerCopyright: "©2024 Snaibcar. All rights reserved",
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
    profileOverview: "Profile Overview"
  },
  fr: {
    heroTitle: "Vous cherchez la voiture idéale? \nTrouvez la meilleure voiture pour votre voyage.",
    features: ["Tarifs abordables", "Services premium", "Assistance routière 24/7"],
    pickUpLabel: "Lieu de prise en charge",
    pickUpDateLabel: "Date & Heure de prise en charge",
    returnDateLabel: "Date & Heure de retour",
    findButton: "Trouver un véhicule",
    overlayText: "Contactez-nous",
    infoCardTitle: "Maroc",
    infoAddress: "Projet Hassane 2 imm.34 N09 Hay El Mohammadi Casablanca",
    infoPhone1: "05 22 62 34 62",
    infoPhone2: "06 61 45 80 49",
    infoEmail: "snaibcar@gmail.com",
    formTitle: "Contactez-nous",
    labelFirstName: "Prénom",
    labelLastName: "Nom",
    labelEmail: "Adresse e-mail",
    labelPhone: "Numéro de téléphone",
    labelMessage: "Votre message",
    placeholderFirstName: "Prénom",
    placeholderLastName: "Nom",
    placeholderEmail: "Email@domaine.com",
    placeholderPhone: "Numéro de téléphone",
    placeholderMessage: "Laissez-nous un message...",
    checkboxTextStart: "J'accepte les",
    termsText: "Conditions d'Utilisation",
    checkboxTextMiddle: "et",
    privacyText: "Politique de Confidentialité",
    submitButton: "Envoyer le message",
    mapTitle: "Notre emplacement",
    mapAddress: "Projet Hassane 2 imm.34 N09 Hay El Mohammadi Casablanca",
    footerQuickLinks: "Liens rapides",
    footerInfoPages: "Pages d'information",
    footerLocation: "Notre emplacement",
    followUs: "suivez-nous sur:",
    footerHome: "Accueil",
    footerFAQs: "FAQs",
    footerContact: "Contactez-nous",
    footerAbout: "À propos",
    footerTerms: "Conditions Générales",
    footerPrivacy: "Politique de confidentialité",
    chatButton: "Chattez avec nous",
    topBarHome: "Accueil",
    topBarAvailableCars: "Voitures disponibles",
    topBarContact: "Contactez-nous",
    profileSignIn: "Se connecter",
    footerCopyright: "©2024 Snaibcar. Tous droits réservés",
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
    profileOverview: "Vue d'ensemble du profil"
  },
  ar: {
    heroTitle: "هل تبحث عن السيارة المثالية؟ \nاعثر على أفضل سيارة لرحلتك.",
    features: ["أسعار معقولة", "خدمات متميزة", "مساعدة الطرق 24/7"],
    pickUpLabel: "مكان الاستلام",
    pickUpDateLabel: "تاريخ ووقت الاستلام",
    returnDateLabel: "تاريخ ووقت العودة",
    findButton: "ابحث عن سيارة",
    overlayText: "تواصل معنا",
    infoCardTitle: "المغرب",
    infoAddress: "356، شارع زركتوني - الدار البيضاء",
    infoPhone1: "05 22 62 34 62",
    infoPhone2: "06 61 45 80 49",
    infoEmail: "snaibcar@gmail.com",
    formTitle: "تواصل معنا",
    labelFirstName: "الاسم الأول",
    labelLastName: "اسم العائلة",
    labelEmail: "البريد الإلكتروني",
    labelPhone: "رقم الهاتف",
    labelMessage: "رسالتك",
    placeholderFirstName: "الاسم الأول",
    placeholderLastName: "اسم العائلة",
    placeholderEmail: "Email@domain.com",
    placeholderPhone: "رقم الهاتف",
    placeholderMessage: "اترك رسالتك هنا...",
    checkboxTextStart: "أوافق على",
    termsText: "الشروط",
    checkboxTextMiddle: "و",
    privacyText: "سياسة الخصوصية",
    submitButton: "أرسل الرسالة",
    mapTitle: "موقعنا",
    mapAddress: "365، شارع زركتوني - الدار البيضاء، المغرب.",
    footerQuickLinks: "روابط الوصول السريع",
    footerInfoPages: "صفحات المعلومات",
    footerLocation: "موقعنا",
    followUs: "تابعنا على:",
    footerHome: "الرئيسية",
    footerFAQs: "الأسئلة الشائعة",
    footerContact: "اتصل بنا",
    footerAbout: "من نحن",
    footerTerms: "الشروط والأحكام",
    footerPrivacy: "سياسة الخصوصية",
    chatButton: "تحدث معنا",
    topBarHome: "الرئيسية",
    topBarAvailableCars: "السيارات المتاحة",
    topBarContact: "اتصل بنا",
    profileSignIn: "تسجيل الدخول",
    footerCopyright: "©2024 Snaibcar. كل الحقوق محفوظة",
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
    profileOverview: "نظرة عامة على الملف الشخصي"
  }
};

/*---------------------------------------------------------*/
/*                  ContactUs Component                  */
/*---------------------------------------------------------*/
const ContactUs = () => {
  // Authentification
  const storedUser = localStorage.getItem("user");
  let user = null;
  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    // Si erreur de parsing, considérer l'utilisateur comme non connecté
  }
  const isLoggedIn = !!user;
  const userName = user ? user.name : "";
  const handleSignOut = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  // Dark mode, currency et langue
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currency, setCurrency] = useState('MAD');
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });
  // Utilisation directe de l'objet texts selon la langue sélectionnée
  const lang = texts[selectedLanguage];

  // Form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    agree: false,
  });

  // Add refs for animation sections
  const heroRef = useRef(null);
  const infoCardsRef = useRef(null);
  const formSectionRef = useRef(null);
  const mapSectionRef = useRef(null);

  // Add visibility states for animations
  const [heroVisible, setHeroVisible] = useState(false);
  const [infoCardsVisible, setInfoCardsVisible] = useState(false);
  const [formSectionVisible, setFormSectionVisible] = useState(false);
  const [mapSectionVisible, setMapSectionVisible] = useState(false);

  // Specific useEffect for hero animations
  useEffect(() => {
    function handleHeroAnimation() {
      const heroSection = document.querySelector('.hero-section');
      const heroTitle = document.querySelector('.hero-title');
      const heroSubtitle = document.querySelector('.hero-subtitle');
      
      if (heroSection && heroTitle && heroSubtitle) {
        // Initial animation on page load
        setTimeout(() => {
          heroTitle.style.opacity = '1';
          heroTitle.style.transform = 'translateY(0)';
          
          setTimeout(() => {
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
          }, 300);
        }, 300);
      }
    }
    
    handleHeroAnimation();
    
    // No cleanup needed for this effect
  }, []);

  // Taille de l'écran pour responsive
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  
  // Set up intersection observers for animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setHeroVisible(true);
          heroObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const infoCardsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setInfoCardsVisible(true);
          infoCardsObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const formSectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setFormSectionVisible(true);
          formSectionObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const mapSectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setMapSectionVisible(true);
          mapSectionObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (heroRef.current) heroObserver.observe(heroRef.current);
    if (infoCardsRef.current) infoCardsObserver.observe(infoCardsRef.current);
    if (formSectionRef.current) formSectionObserver.observe(formSectionRef.current);
    if (mapSectionRef.current) mapSectionObserver.observe(mapSectionRef.current);

    return () => {
      if (heroRef.current) heroObserver.unobserve(heroRef.current);
      if (infoCardsRef.current) infoCardsObserver.unobserve(infoCardsRef.current);
      if (formSectionRef.current) formSectionObserver.unobserve(formSectionRef.current);
      if (mapSectionRef.current) mapSectionObserver.unobserve(mapSectionRef.current);
    };
  }, []);
  
  // For responsive layout
  const isMobile = screenWidth < 768;
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.agree) {
      alert('You must agree to the Terms and Privacy Policy');
      return;
    }
    
    // Would normally submit the form data to an API here
    console.log('Form submitted with data:', formData);
    
    // Reset form after submission
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
      agree: false,
    });
    
    // Show success message
    alert('Your message has been sent successfully!');
  };
  
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

  return (
    <div style={styles.pageContainer}>
      <TopBar 
        isLoggedIn={isLoggedIn}
        userName={userName}
        onSignOut={handleSignOut}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        lang={lang}
        isContactPage={true}
      />

      {/* Hero Section with Animation */}
      <div 
        ref={heroRef}
        style={{
          ...styles.heroSection,
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
        }}
      >
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent}>
          <h1 
            style={{
              ...styles.heroTitle,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
            }}
          >
            {lang.overlayText}
          </h1>
          <p 
            style={{
              ...styles.heroSubtitle,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.6s ease-out 0.3s, transform 0.6s ease-out 0.3s'
            }}
          >
            Snaibcar - {lang.infoCardTitle}
          </p>
        </div>
      </div>

      {/* Contact Info Cards with Stagger Animation */}
      <div 
        ref={infoCardsRef}
        style={styles.contactInfoSection}
      >
        {[
          {
            icon: <FaMapMarkerAlt size={30} />,
            title: selectedLanguage === 'en' ? "Our Location" : 
                  (selectedLanguage === 'fr' ? "Notre Emplacement" : "موقعنا"),
            text: lang.infoAddress
          },
          {
            icon: <FaPhone size={30} />,
            title: selectedLanguage === 'en' ? "Phone Numbers" : 
                  (selectedLanguage === 'fr' ? "Numéros de Téléphone" : "أرقام الهاتف"),
            text: <div>
              <p style={styles.contactInfoText}>{lang.infoPhone1}</p>
              <p style={styles.contactInfoText}>{lang.infoPhone2}</p>
            </div>
          },
          {
            icon: <FaEnvelope size={30} />,
            title: selectedLanguage === 'en' ? "Email" : 
                  (selectedLanguage === 'fr' ? "Adresse Email" : "البريد الإلكتروني"),
            text: lang.infoEmail
          },
          {
            icon: <FaInstagram size={30} />,
            title: selectedLanguage === 'en' ? "Social Media" : 
                  (selectedLanguage === 'fr' ? "Réseaux Sociaux" : "وسائل التواصل الاجتماعي"),
            text: "Follow us on social media"
          }
        ].map((card, index) => (
          <div
            key={index}
            style={{
              ...styles.contactInfoCard,
              opacity: infoCardsVisible ? 1 : 0,
              transform: infoCardsVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`
            }}
          >
            <div style={styles.contactIconBox}>
              {card.icon}
            </div>
            <h3 style={styles.contactInfoTitle}>{card.title}</h3>
            <p style={styles.contactInfoText}>{card.text}</p>
          </div>
        ))}
      </div>

      {/* Contact Form and Map Section with Animation */}
      <div 
        ref={formSectionRef}
        style={{
          ...styles.contactMainSection,
          opacity: formSectionVisible ? 1 : 0,
          transform: formSectionVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
        }}
      >
        {/* Form Section */}
        <div 
          style={{
            ...styles.formContainer,
            opacity: formSectionVisible ? 1 : 0,
            transform: formSectionVisible ? 'translateX(0)' : 'translateX(-50px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
          }}
        >
          <h2 style={styles.sectionTitle}>{lang.formTitle}</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>{lang.labelFirstName}</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  style={styles.formInput}
                  placeholder={lang.placeholderFirstName}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>{lang.labelLastName}</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  style={styles.formInput}
                  placeholder={lang.placeholderLastName}
                  required
                />
              </div>
            </div>
            
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>{lang.labelEmail}</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={styles.formInput}
                  placeholder={lang.placeholderEmail}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>{lang.labelPhone}</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={styles.formInput}
                  placeholder={lang.placeholderPhone}
                  required
                />
              </div>
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>{lang.labelMessage}</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                style={styles.formTextarea}
                placeholder={lang.placeholderMessage}
                rows={6}
                required
              />
            </div>
            
            <div style={styles.checkboxContainer}>
              <input
                type="checkbox"
                id="agree"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                style={styles.checkbox}
              />
              <label htmlFor="agree" style={styles.checkboxLabel}>
                {lang.checkboxTextStart}&nbsp;
                <a href="/terms" style={styles.formLink}>{lang.termsText}</a>
                &nbsp;{lang.checkboxTextMiddle}&nbsp;
                <a href="/privacy" style={styles.formLink}>{lang.privacyText}</a>
              </label>
            </div>
            
            <button type="submit" style={styles.formButton}>
              {lang.submitButton}
            </button>
          </form>
        </div>

        {/* Map Section */}
        <div 
          ref={mapSectionRef}
          style={{
            ...styles.mapContainer,
            opacity: mapSectionVisible ? 1 : 0,
            transform: mapSectionVisible ? 'translateX(0)' : 'translateX(50px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
          }}
        >
          <h2 style={styles.sectionTitle}>{lang.mapTitle}</h2>
          <div style={styles.mapWrapper}>
            <iframe
              title="Our Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.9980075513337!2d-7.643954084800436!3d33.59400188082776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7b0e18d23b05f%3A0xc83a0f7ec5a3edc6!2s365%20Boulevard%20Zerktouni%2C%20Casablanca%2C%20Morocco!5e0!3m2!1sen!2sma!4v1678731361201!5m2!1sen!2sma"
              width="100%"
              height="400"
              style={styles.mapIframe}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div style={styles.mapAddressBox}>
            <FaMapMarkerAlt style={styles.mapAddressIcon} />
            <p style={styles.mapAddressText}>{lang.mapAddress}</p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <Footer lang={lang} />

      <WhatsAppButton phoneNumber="+971501231234" message="Hello, I'm interested in renting a car." />
      <ScrollToTopButton />
    </div>
  );
};

/*---------------------------------------------------------*/
/*                Styles / Inline Objects                */
/*---------------------------------------------------------*/
const styles = {
  // Page Container
  pageContainer: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#FFF',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'sans-serif'
  },

  // Hero Section
  heroSection: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '80px 5%',
    backgroundImage: 'url("/images/contact-cover.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    marginBottom: '100px',
    textAlign: 'center',
    minHeight: '550px',
    transition: 'all 0.5s ease'
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 1,
    transition: 'background-color 0.5s ease'
  },
  heroContent: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '800px',
    padding: '20px',
    animation: 'fadeIn 1s ease-out'
  },
  heroTitle: {
    fontSize: '56px',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#fff',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    opacity: 0,
    transform: 'translateY(30px)',
    transition: 'opacity 1s ease-out, transform 1s ease-out',
    willChange: 'opacity, transform'
  },
  heroSubtitle: {
    fontSize: '24px',
    color: '#fff',
    lineHeight: '1.6',
    maxWidth: '500px',
    margin: '0 auto',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
    opacity: 0,
    transform: 'translateY(30px)',
    transition: 'opacity 1s ease-out 0.3s, transform 1s ease-out 0.3s',
    willChange: 'opacity, transform'
  },

  // Contact Info Cards Section
  contactInfoSection: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '25px',
    width: '90%',
    maxWidth: '1200px',
    margin: '0 auto 50px'
  },
  contactInfoCard: {
    flex: '1',
    minWidth: '250px',
    maxWidth: '300px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    padding: '25px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    transition: 'transform 0.4s ease, box-shadow 0.4s ease',
    cursor: 'default',
    animation: 'fadeInUp 0.6s ease forwards',
    animationFillMode: 'both',
    '&:hover': {
      transform: 'translateY(-10px)',
      boxShadow: '0 15px 30px rgba(0,0,0,0.15)'
    }
  },
  contactIconBox: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    backgroundColor: '#f0f2f5',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '15px',
    transition: 'all 0.4s ease',
    '&:hover': {
      backgroundColor: '#e0e3e8',
      transform: 'scale(1.1) rotate(5deg)'
    }
  },
  contactIcon: {
    fontSize: '30px',
    color: '#333'
  },
  contactInfoTitle: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '15px',
    color: '#333',
    transition: 'transform 0.3s ease, color 0.3s ease',
    '&:hover': {
      color: '#000',
      transform: 'scale(1.05)'
    }
  },
  contactInfoText: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '5px',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#333'
    }
  },
  socialLinksContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginTop: '10px'
  },
  socialLink: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#f0f2f5',
    color: '#333',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#333',
      color: '#fff'
    }
  },

  // Main Contact Section
  contactMainSection: {
    display: 'flex',
    width: '90%',
    maxWidth: '1200px',
    margin: '0 auto 50px',
    gap: '30px'
  },
  formContainer: {
    flex: '1',
    minWidth: '300px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    padding: '30px'
  },
  mapContainer: {
    flex: '1',
    minWidth: '300px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column'
  },
  sectionTitle: {
    fontSize: '28px',
    fontWeight: '600',
    marginBottom: '25px',
    color: '#333',
    textAlign: 'center'
  },
  formRow: {
    display: 'flex',
    gap: '15px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  },
  formGroup: {
    flex: '1',
    minWidth: '250px',
    marginBottom: '20px'
  },
  formLabel: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '500',
    color: '#333'
  },
  formInput: {
    width: '100%',
    padding: '12px 15px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    backgroundColor: '#f9f9f9',
    '&:focus': {
      borderColor: '#333',
      outline: 'none',
      boxShadow: '0 0 0 2px rgba(0,0,0,0.1)',
      backgroundColor: '#fff'
    },
    '&:hover:not(:focus)': {
      borderColor: '#bbb'
    }
  },
  formTextarea: {
    width: '100%',
    padding: '12px 15px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '16px',
    resize: 'vertical',
    minHeight: '120px',
    transition: 'all 0.3s ease',
    backgroundColor: '#f9f9f9',
    '&:focus': {
      borderColor: '#333',
      outline: 'none',
      boxShadow: '0 0 0 2px rgba(0,0,0,0.1)',
      backgroundColor: '#fff'
    },
    '&:hover:not(:focus)': {
      borderColor: '#bbb'
    }
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '20px'
  },
  checkbox: {
    marginRight: '10px',
    marginTop: '5px'
  },
  checkboxLabel: {
    fontSize: '14px',
    color: '#555',
    lineHeight: '1.4'
  },
  formLink: {
    color: '#333',
    textDecoration: 'underline',
    '&:hover': {
      color: '#000'
    }
  },
  formButton: {
    display: 'block',
    width: '100%',
    padding: '14px',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      backgroundColor: '#000',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
    },
    '&:active': {
      transform: 'translateY(0)',
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
    }
  },
  mapWrapper: {
    width: '100%',
    borderRadius: '8px',
    overflow: 'hidden',
    marginBottom: '20px',
    flex: '1'
  },
  mapIframe: {
    border: 'none',
    borderRadius: '8px'
  },
  mapAddressBox: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    backgroundColor: '#f0f2f5',
    borderRadius: '6px',
    marginTop: '10px'
  },
  mapAddressIcon: {
    fontSize: '20px',
    marginRight: '10px',
    color: '#333'
  },
  mapAddressText: {
    fontSize: '14px',
    color: '#555',
    margin: 0
  },
  
  // FOOTER
  // Footer styles removed as we're now using the imported Footer component
  
};

export default ContactUs;
