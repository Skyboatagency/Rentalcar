import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import { FaGlobe, FaBell, FaMoneyBillWave } from 'react-icons/fa';

const Preferences = () => {
  // Vérifie si l'utilisateur est connecté
  const storedUser = localStorage.getItem('user');
  let user = null;
  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    // Si erreur de parsing, considérer l'utilisateur comme non connecté
  }
  const isLoggedIn = !!user;
  const userName = user ? user.name : '';

  // État pour la langue sélectionnée
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });
  
  // États pour le mode sombre / devise
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currency, setCurrency] = useState('MAD');

  // Paramètres de notification
  const [promotionalEmails, setPromotionalEmails] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [reminders, setReminders] = useState(false);
  const [accountNotifications, setAccountNotifications] = useState(false);

  // Paramètres de langue
  const [preferredLanguage, setPreferredLanguage] = useState('');
  const [otherLanguage, setOtherLanguage] = useState('');

  // Numéro de téléphone
  const [phoneNumber, setPhoneNumber] = useState('');

  // Préférences de devise
  const [prefMad, setPrefMad] = useState(false);
  const [prefUsd, setPrefUsd] = useState(false);
  const [prefEur, setPrefEur] = useState(false);
  const [prefGbp, setPrefGbp] = useState(false);
  const [otherCurrency, setOtherCurrency] = useState('');

  // Textes multilingues
  const texts = {
    en: {
      // Page-specific translations
      preferences: "Preferences",
      notificationSettings: "Notification Settings",
      receivePromotionalEmails: "Receive promotional emails about offers and discounts",
      receiveSMSNotifications: "Receive SMS notifications for bookings and updates",
      receiveReminders: "Receive reminders about upcoming bookings",
      receiveAccountNotifications: "Receive notifications for changes to your account or settings",
      selectPreferredLanguage: "Select your preferred language",
      other: "Other (Dropdown for additional languages):",
      phoneNumber: "Phone number",
      currencyPreferences: "Currency Preferences",
      savePreferences: "Save Preferences",
      mad: "MAD",
      euro: "EURO",
      dollar: "DOLLAR",
      arabic: "AR",
      preferencesSaved: "Preferences saved!",
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
      // Page-specific translations
      preferences: "Préférences",
      notificationSettings: "Paramètres de notifications",
      receivePromotionalEmails: "Recevoir des emails promotionnels sur les offres et remises",
      receiveSMSNotifications: "Recevoir des notifications SMS pour les réservations et mises à jour",
      receiveReminders: "Recevoir des rappels pour les réservations à venir",
      receiveAccountNotifications: "Recevoir des notifications sur les changements de votre compte ou paramètres",
      selectPreferredLanguage: "Sélectionnez votre langue préférée",
      other: "Autre (menu déroulant pour des langues supplémentaires):",
      phoneNumber: "Numéro de téléphone",
      currencyPreferences: "Préférences de devise",
      savePreferences: "Enregistrer les préférences",
      mad: "MAD",
      euro: "EURO",
      dollar: "DOLLAR",
      arabic: "AR",
      preferencesSaved: "Préférences enregistrées !",
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
      // Page-specific translations
      preferences: "التفضيلات",
      notificationSettings: "إعدادات الإشعارات",
      receivePromotionalEmails: "تلقي رسائل البريد الإلكتروني الترويجية حول العروض والخصومات",
      receiveSMSNotifications: "تلقي إشعارات الرسائل القصيرة للحجوزات والتحديثات",
      receiveReminders: "تلقي تذكيرات حول الحجوزات القادمة",
      receiveAccountNotifications: "تلقي إشعارات عن التغييرات في حسابك أو إعداداتك",
      selectPreferredLanguage: "اختر لغتك المفضلة",
      other: "أخرى (قائمة منسدلة للغات إضافية):",
      phoneNumber: "رقم الهاتف",
      currencyPreferences: "تفضيلات العملة",
      savePreferences: "حفظ التفضيلات",
      mad: "درهم مغربي",
      euro: "يورو",
      dollar: "دولار",
      arabic: "عربي",
      preferencesSaved: "تم حفظ التفضيلات!",
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

  const handleSignOut = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  const handleSavePreferences = () => {
    console.log('Preferences saved:', {
      promotionalEmails,
      smsNotifications,
      reminders,
      accountNotifications,
      preferredLanguage,
      phoneNumber,
      prefMad,
      prefUsd,
      prefEur,
      prefGbp,
      otherCurrency
    });
    alert(lang.savePreferences + ' ' + lang.preferences + '!');
  };

  // Add SettingsStyles for hover effects
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .settings-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
      }
      .action-button:hover {
        opacity: 0.85;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

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
  const mainContentStyle = {
    ...styles.mainContent,
    maxWidth: isMobile ? '98vw' : '60%',
    padding: isMobile ? '16px' : '30px',
    marginTop: isMobile ? '80px' : '200px',
    borderRadius: '18px',
    boxShadow: '0 6px 32px rgba(24, 144, 255, 0.10)',
    background: '#fff',
  };
  const containerStyle = {
    ...styles.container,
    paddingTop: dynamicPaddingTop,
  };
  const mainWrapperStyle = {
    ...styles.mainWrapper,
    background: 'linear-gradient(120deg, #f3f1f1, #ffffff)',
    minHeight: 'calc(100vh - 200px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div style={containerStyle}>
      <TopBar
        isLoggedIn={isLoggedIn}
        userName={userName}
        onSignOut={handleSignOut}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        lang={lang}
      />
      <div style={mainWrapperStyle}>
        <div style={mainContentStyle}>
          {/* Section Title (inside card, like profile) */}
          <div style={{ width: '100%', textAlign: 'center', marginBottom: 24 }}>
            <h1 style={{ fontSize: isMobile ? 22 : 32, fontWeight: 800, color: '#222', margin: 0, letterSpacing: 0.5 }}>{lang.preferences}</h1>
            <div style={{ width: 60, height: 4, background: '#1890ff', borderRadius: 2, margin: '10px auto 0 auto' }} />
          </div>
          {/* Language Preferences Card */}
          <div className="settings-card" style={{ ...styles.settingsCard, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <FaGlobe style={{ color: '#1890ff', fontSize: 22 }} />
              <h2 style={{ ...styles.sectionTitle, margin: 0 }}>{lang.selectPreferredLanguage}</h2>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Language</label>
              <select
                value={preferredLanguage}
                onChange={e => setPreferredLanguage(e.target.value)}
                style={styles.select}
              >
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="Arabic">Arabic</option>
              </select>
            </div>
          </div>
          {/* Divider */}
          <div style={{ height: 1, background: '#f0f0f0', margin: '18px 0' }} />
          {/* Notification Settings Card */}
          <div className="settings-card" style={{ ...styles.settingsCard, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <FaBell style={{ color: '#1890ff', fontSize: 22 }} />
              <h2 style={{ ...styles.sectionTitle, margin: 0 }}>{lang.notificationSettings}</h2>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  checked={promotionalEmails}
                  onChange={() => setPromotionalEmails(!promotionalEmails)}
                  style={styles.checkbox}
                />
                <span style={styles.checkboxLabel}>{lang.receivePromotionalEmails}</span>
              </label>
              <label style={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  checked={smsNotifications}
                  onChange={() => setSmsNotifications(!smsNotifications)}
                  style={styles.checkbox}
                />
                <span style={styles.checkboxLabel}>{lang.receiveSMSNotifications}</span>
              </label>
              <label style={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  checked={reminders}
                  onChange={() => setReminders(!reminders)}
                  style={styles.checkbox}
                />
                <span style={styles.checkboxLabel}>{lang.receiveReminders}</span>
              </label>
              <label style={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  checked={accountNotifications}
                  onChange={() => setAccountNotifications(!accountNotifications)}
                  style={styles.checkbox}
                />
                <span style={styles.checkboxLabel}>{lang.receiveAccountNotifications}</span>
              </label>
            </div>
          </div>
          {/* Divider */}
          <div style={{ height: 1, background: '#f0f0f0', margin: '18px 0' }} />
          {/* Currency Preferences Card */}
          <div className="settings-card" style={{ ...styles.settingsCard, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <FaMoneyBillWave style={{ color: '#1890ff', fontSize: 22 }} />
              <h2 style={{ ...styles.sectionTitle, margin: 0 }}>{lang.currencyPreferences}</h2>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  checked={prefMad}
                  onChange={() => setPrefMad(!prefMad)}
                  style={styles.checkbox}
                />
                <span style={styles.checkboxLabel}>{lang.mad}</span>
              </label>
              <label style={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  checked={prefUsd}
                  onChange={() => setPrefUsd(!prefUsd)}
                  style={styles.checkbox}
                />
                <span style={styles.checkboxLabel}>{lang.dollar}</span>
              </label>
              <label style={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  checked={prefEur}
                  onChange={() => setPrefEur(!prefEur)}
                  style={styles.checkbox}
                />
                <span style={styles.checkboxLabel}>{lang.euro}</span>
              </label>
              {/* Add more currencies if needed */}
            </div>
          </div>
          {/* Save Button */}
          <div style={styles.buttonGroup}>
            <button style={styles.primaryButton} onClick={handleSavePreferences}>
              {lang.savePreferences}
            </button>
          </div>
        </div>
      </div>
      <Footer lang={lang} />
    </div>
  );
};

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
    maxWidth: '60%',
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    marginTop: '200px',
  },
  pageHeader: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  pageTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '8px',
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
  settingsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  settingsCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '500',
    color: '#1a1a1a',
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '16px',
  },
  label: {
    fontSize: '14px',
    color: '#1a1a1a',
    fontWeight: '500',
    marginBottom: '8px',
    display: 'block',
  },
  select: {
    width: '100%',
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #d9d9d9',
    fontSize: '14px',
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '10px',
  },
  checkbox: {
    width: '16px',
    height: '16px',
  },
  checkboxLabel: {
    fontSize: '14px',
    color: '#666',
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
    marginTop: '24px',
  },
  primaryButton: {
    backgroundColor: '#1890ff',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
  },
};

export default Preferences;
