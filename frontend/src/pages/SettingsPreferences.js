import React, { useState, useEffect } from 'react';

// Objet de traductions
const translations = {
  settingsPreferences: {
    fr: "Paramètres et Préférences",
    en: "Settings and Preferences",
    ar: "الإعدادات والتفضيلات"
  },
  siteTheme: {
    fr: "Thème du site",
    en: "Site Theme",
    ar: "ثيم الموقع"
  },
  emailNotifications: {
    fr: "Notifications par email",
    en: "Email notifications",
    ar: "إشعارات البريد الإلكتروني"
  },
  saveChanges: {
    fr: "Enregistrer les modifications",
    en: "Save Changes",
    ar: "حفظ التغييرات"
  },
  resetDefault: {
    fr: "Réinitialiser par défaut",
    en: "Reset to default",
    ar: "إعادة التعيين إلى الافتراضي"
  },
  // Traductions pour la Navbar
  welcome: {
    fr: "Bienvenue!",
    en: "Welcome!",
    ar: "مرحبا!"
  },
  dashboardOverview: {
    fr: "Vue d'ensemble du tableau de bord",
    en: "Dashboard overview",
    ar: "نظرة عامة على لوحة القيادة"
  },
  carManagement: {
    fr: "Gestion des voitures",
    en: "Car management",
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
    fr: "Analytique & Rapports",
    en: "Analytics and Reports",
    ar: "التحليلات والتقارير"
  },
  locationContact: {
    fr: "Localisation & Contact",
    en: "Location & Contact",
    ar: "الموقع والاتصال"
  },
  feedbackReviews: {
    fr: "Retour d'information et Avis",
    en: "Feedback and Reviews",
    ar: "الملاحظات والمراجعات"
  },
  logout: {
    fr: "Se déconnecter",
    en: "Logout",
    ar: "تسجيل الخروج"
  },
  languageSettings: {
    fr: "Paramètres de langue",
    en: "Language Settings",
    ar: "إعدادات اللغة"
  },
  language: {
    fr: "Langue",
    en: "Language",
    ar: "لغة"
  },
  selectLanguage: {
    fr: "Sélectionner la langue",
    en: "Select Language",
    ar: "اختر اللغة"
  },
};

// Composant LanguageSwitcher
const LanguageSwitcher = ({ language, setLanguage }) => {
  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <div style={styles.formGroup}>
      <label style={styles.label}>{translations.language[language]}</label>
      <select
        value={language}
        onChange={(e) => changeLanguage(e.target.value)}
        style={styles.select}
      >
        <option value="en">English</option>
        <option value="fr">Français</option>
        <option value="ar">العربية</option>
      </select>
    </div>
  );
};

// Add SettingsStyles component for consistent styling
const SettingsStyles = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .nav-link:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
      
      .active-link {
        background-color: #1890ff !important;
      }
      
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
  
  return null;
};

const SettingsPreferences = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const [language, setLanguage] = useState('en');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [contentMarginLeft, setContentMarginLeft] = useState('280px');

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

  // Update margin-left based on navbar state and screen size
  useEffect(() => {
    if (windowWidth < 768) {
      setContentMarginLeft('0px');
    } else {
      setContentMarginLeft(isOpen ? '280px' : '0px');
    }
  }, [isOpen, windowWidth]);

  const handleSaveChanges = () => {
    alert(`${translations.saveChanges[language]}:
- ${translations.language[language]}: ${language}
- ${translations.emailNotifications[language]}: ${emailNotifications ? 'Enabled' : 'Disabled'}`);
  };

  const handleResetToDefault = () => {
    setLanguage('en');
    setEmailNotifications(true);
    localStorage.setItem('language', 'en');
  };

  return (
    <div style={styles.container}>
      <SettingsStyles />
      <div style={{ 
        ...styles.mainWrapper,
        marginLeft: contentMarginLeft,
        transition: 'all 0.3s ease'
      }}>
        <div style={styles.mainContent}>
          <div style={styles.pageHeader}>
            <h1 style={styles.pageTitle}>{translations.settingsPreferences[language]}</h1>
            <div style={styles.titleUnderline}></div>
          </div>

          <div style={styles.settingsContainer}>
            <div style={styles.settingsCard}>
              <h2 style={styles.sectionTitle}>{translations.languageSettings[language]}</h2>
              <LanguageSwitcher language={language} setLanguage={setLanguage} />
            </div>

            <div style={styles.settingsCard}>
              <h2 style={styles.sectionTitle}>{translations.emailNotifications[language]}</h2>
              <div style={styles.formGroup}>
                <label style={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                    style={styles.checkbox}
                  />
                  <span style={styles.checkboxLabel}>
                    {emailNotifications ? "Enabled" : "Disabled"}
                  </span>
                </label>
              </div>
            </div>

            <div style={styles.buttonGroup}>
              <button style={styles.primaryButton} onClick={handleSaveChanges}>
                {translations.saveChanges[language]}
              </button>
              <button style={styles.secondaryButton} onClick={handleResetToDefault}>
                {translations.resetDefault[language]}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Update styles to match other pages
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
  secondaryButton: {
    backgroundColor: '#f0f0f0',
    color: '#666',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
  }
};

export default SettingsPreferences;
