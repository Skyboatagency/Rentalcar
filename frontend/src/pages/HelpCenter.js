import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaSearch,
  FaHeadset,
  FaEnvelope,
  FaQuestionCircle,
  FaInfoCircle,
  FaTools,
  FaComments,
  FaUserShield
} from 'react-icons/fa';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';

const HelpCenter = () => {
  const storedUser = localStorage.getItem('user');
  let user = null;
  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
  }
  const isLoggedIn = !!user;
  const userName = user ? user.name : '';
  
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });
  
  // Textes multilingues
  const texts = {
    en: {
      // Page-specific translations
      helpTitle: "How can we help you?",
      searchPlaceholder: "Search for help...",
      search: "Search",
      browseTopics: "Browse Our Help Topics",
      stillNeedHelp: "Still need help?",
      supportMessage: "Reach out to our support team via live chat or phone.",
      liveChat: "Live Chat",
      searchingFor: "Searching for",
      placeholder: "Placeholder functionality",
      faqs: "FAQs",
      faqsDesc: "Common questions about bookings, payments, and more.",
      gettingStarted: "Getting Started",
      gettingStartedDesc: "Learn how to create an account, make your first booking, etc.",
      troubleshooting: "Troubleshooting",
      troubleshootingDesc: "Having issues? Find solutions for common problems.",
      contactSupportDesc: "Get in touch with our support team for personalized help",
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
      helpTitle: "Comment pouvons-nous vous aider ?",
      searchPlaceholder: "Recherchez de l'aide...",
      search: "Rechercher",
      browseTopics: "Parcourez nos sujets d'aide",
      stillNeedHelp: "Vous avez toujours besoin d'aide ?",
      supportMessage: "Contactez notre équipe d'assistance via le chat en direct ou par téléphone.",
      liveChat: "Chat en direct",
      searchingFor: "Recherche de",
      placeholder: "Fonctionnalité d'exemple",
      faqs: "FAQ",
      faqsDesc: "Questions courantes sur les réservations, les paiements, et plus.",
      gettingStarted: "Commencer",
      gettingStartedDesc: "Apprenez à créer un compte, effectuer votre première réservation, etc.",
      troubleshooting: "Dépannage",
      troubleshootingDesc: "Des problèmes ? Trouvez des solutions pour les problèmes courants.",
      contactSupportDesc: "Contactez notre équipe de support pour une aide personnalisée",
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
      helpTitle: "كيف يمكننا مساعدتك؟",
      searchPlaceholder: "البحث عن مساعدة...",
      search: "بحث",
      browseTopics: "تصفح مواضيع المساعدة",
      stillNeedHelp: "هل ما زلت بحاجة إلى مساعدة؟",
      supportMessage: "تواصل مع فريق الدعم عبر الدردشة المباشرة أو الهاتف.",
      liveChat: "دردشة مباشرة",
      searchingFor: "البحث عن",
      placeholder: "وظيفة مؤقتة",
      faqs: "الأسئلة الشائعة",
      faqsDesc: "أسئلة شائعة حول الحجوزات والمدفوعات والمزيد.",
      gettingStarted: "البدء",
      gettingStartedDesc: "تعلم كيفية إنشاء حساب وإجراء أول حجز وما إلى ذلك.",
      troubleshooting: "استكشاف الأخطاء وإصلاحها",
      troubleshootingDesc: "هل تواجه مشاكل؟ اعثر على حلول للمشكلات الشائعة.",
      contactSupportDesc: "تواصل مع فريق الدعم للحصول على مساعدة شخصية",
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
  
  const categories = [
    {
      icon: <FaQuestionCircle size={32} color="#1890ff" />,
      title: lang.faqs,
      description: lang.faqsDesc
    },
    {
      icon: <FaInfoCircle size={32} color="#1890ff" />,
      title: lang.gettingStarted,
      description: lang.gettingStartedDesc
    },
    {
      icon: <FaTools size={32} color="#1890ff" />,
      title: lang.troubleshooting,
      description: lang.troubleshootingDesc
    },
    {
      icon: <FaEnvelope size={32} color="#1890ff" />,
      title: lang.contactSupport,
      description: lang.contactSupportDesc
    },
    {
      icon: <FaUserShield size={32} color="#1890ff" />,
      title: 'Account & Security',
      description: 'Manage your account settings, privacy, and security options.'
    }
  ];
  
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = () => {
    alert(`${lang.searchingFor} "${searchTerm}"... (${lang.placeholder})`);
  };
  
  // Add WhatsApp redirection function
  const handleWhatsAppClick = () => {
    const phoneNumber = '+212600000000'; // Replace with your WhatsApp number
    const message = encodeURIComponent('Hello, I need help with my booking');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };
  
  // Responsivité : hook pour largeur d'écran
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const isMobile = windowWidth < 900;
  const isTablet = windowWidth >= 900 && windowWidth < 1200;

  // Styles responsives
  const pageContainerStyle = {
    ...styles.pageContainer,
    marginTop: isMobile ? '80px' : '150px',
  };

  const mainCardStyle = {
    ...styles.mainBox,
    maxWidth: isMobile ? '98vw' : '1100px',
    margin: isMobile ? '0 auto 24px auto' : '40px auto',
    padding: isMobile ? '24px 8px' : '48px 32px 40px 32px',
    borderRadius: '20px',
    boxShadow: '0 8px 32px rgba(24, 144, 255, 0.08)',
    background: '#fff',
    border: '1px solid #f0f0f0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const searchBarWrapperStyle = {
    width: isMobile ? '100%' : '70%',
    margin: '0 auto 32px auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 0,
    background: '#f7f7f7',
    borderRadius: 32,
    boxShadow: '0 2px 8px rgba(24,144,255,0.04)',
    padding: isMobile ? '8px 4px' : '12px 20px',
    border: '1px solid #e0e0e0',
    maxWidth: isMobile ? '98vw' : undefined,
  };

  const searchInputStyle = {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: isMobile ? 14 : 17,
    padding: isMobile ? '8px 6px' : '12px 18px',
    borderRadius: 32,
    background: 'transparent',
  };

  const searchButtonStyle = {
    background: '#1890ff',
    color: '#fff',
    border: 'none',
    borderRadius: 32,
    padding: isMobile ? '8px 10px' : '12px 28px',
    fontWeight: 600,
    fontSize: isMobile ? 14 : 17,
    marginLeft: 8,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    boxShadow: '0 2px 8px rgba(24,144,255,0.08)',
    transition: 'background 0.2s',
  };

  const dividerStyle = {
    width: '100%',
    height: 1,
    background: '#f0f0f0',
    margin: isMobile ? '18px 0' : '32px 0',
  };

  const gradientTitleSectionStyle = {
    width: '100%',
    background: 'linear-gradient(120deg, #f3f1f1, #ffffff)',
    padding: isMobile ? '36px 0 18px 0' : '64px 0 32px 0',
    textAlign: 'center',
  };

  const categoriesGridStyle = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'column',
    alignItems: 'center',
    gap: isMobile ? '18px' : '30px',
    padding: isMobile ? '0 4px' : '0 20px',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const categoriesRowStyle = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'center',
    gap: isMobile ? '12px' : '30px',
    width: '100%',
    marginBottom: 0
  };

  const categoryCardStyle = {
    flex: '1 1 220px',
    maxWidth: isMobile ? '98vw' : '260px',
    minWidth: isMobile ? '0' : '220px',
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: isMobile ? '18px 10px' : '32px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    border: '1px solid rgba(24, 144, 255, 0.1)',
    margin: isMobile ? '0 auto' : undefined,
    width: isMobile ? '96vw' : undefined,
  };

  const directSupportStyle = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: 'center',
    gap: isMobile ? '18px' : '30px',
    backgroundColor: '#fff',
    padding: isMobile ? '18px 10px' : '40px',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    marginBottom: '40px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: isMobile ? '98vw' : '1000px',
    margin: '0 auto',
    border: '1px solid rgba(24, 144, 255, 0.1)'
  };

  const supportContentStyle = {
    flex: 1,
    minWidth: isMobile ? '0' : '300px',
    width: isMobile ? '100%' : undefined,
    textAlign: isMobile ? 'center' : 'left',
  };

  const supportTitleStyle = {
    fontSize: isMobile ? '18px' : '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '12px',
    marginTop: isMobile ? 0 : undefined,
  };

  const chatButtonStyle = {
    backgroundColor: '#52c41a',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    padding: isMobile ? '10px 18px' : '14px 28px',
    cursor: 'pointer',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
    fontSize: isMobile ? '14px' : '16px',
    alignSelf: isMobile ? 'center' : undefined,
    width: isMobile ? '100%' : undefined,
    justifyContent: 'center',
  };

  return (
    <div style={pageContainerStyle}>
      <TopBar
        isLoggedIn={isLoggedIn}
        userName={userName}
        onSignOut={handleSignOut}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        lang={lang}
      />
      <div style={gradientTitleSectionStyle}>
        <h1 style={{ fontSize: isMobile ? 28 : 36, fontWeight: 800, color: '#222', margin: 0, letterSpacing: 0.5 }}>{lang.helpTitle}</h1>
        <div style={{ width: 60, height: 4, background: '#1890ff', borderRadius: 2, margin: '10px auto 0 auto' }} />
      </div>
      <div style={mainCardStyle}>
        <div style={searchBarWrapperStyle}>
          <FaSearch style={{ color: '#1890ff', fontSize: 20, marginRight: 8 }} />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder={lang.searchPlaceholder}
            style={searchInputStyle}
          />
          <button style={searchButtonStyle} onClick={handleSearch}>
            {lang.search}
          </button>
        </div>
        <div style={dividerStyle} />
        <div style={styles.categoriesSection}>
          <div style={categoriesGridStyle}>
            <div style={categoriesRowStyle}>
              {categories.slice(0, 3).map((cat, idx) => (
                <div key={idx} style={categoryCardStyle}>
                  <div style={styles.iconContainer}>{cat.icon}</div>
                  <h3 style={styles.categoryTitle}>{cat.title}</h3>
                  <p style={styles.categoryDesc}>{cat.description}</p>
                </div>
              ))}
            </div>
            <div style={{...categoriesRowStyle, justifyContent: isMobile ? 'center' : 'center'}}>
              {categories.slice(3).map((cat, idx) => (
                <div key={idx + 3} style={categoryCardStyle}>
                  <div style={styles.iconContainer}>{cat.icon}</div>
                  <h3 style={styles.categoryTitle}>{cat.title}</h3>
                  <p style={styles.categoryDesc}>{cat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={dividerStyle} />
        <div style={directSupportStyle}>
          <FaHeadset size={isMobile ? 28 : 36} style={{ color: '#1890ff' }} />
          <div style={supportContentStyle}>
            <h3 style={supportTitleStyle}>{lang.stillNeedHelp}</h3>
            <p style={styles.supportMessage}>{lang.supportMessage}</p>
          </div>
          <button style={chatButtonStyle} onClick={handleWhatsAppClick}>
            <FaComments style={{ marginRight: 6 }} />
            {lang.liveChat}
          </button>
        </div>
      </div>
      <Footer lang={lang} />
    </div>
  );
};

const styles = {
  pageContainer: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    fontFamily: 'sans-serif',
    marginTop: '150px',
    display: 'flex',
    flexDirection: 'column'
  },
  mainBox: {
    background: '#fff',
    borderRadius: '20px',
    boxShadow: '0 8px 32px rgba(24, 144, 255, 0.08)',
    maxWidth: '1100px',
    margin: '60px auto 40px auto',
    padding: '48px 32px 40px 32px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid #f0f0f0',
  },
  heroSection: {
    width: '100%',
    textAlign: 'center',
    marginBottom: '32px',
    padding: 0,
    background: 'none',
    borderRadius: 0,
    boxShadow: 'none',
    color: '#222',
    border: 'none',
  },
  blueUnderline: {
    width: '60px',
    height: '4px',
    background: 'linear-gradient(90deg, #1890ff 0%, #40a9ff 100%)',
    borderRadius: '2px',
    margin: '12px auto 18px auto',
  },
  heroTitle: {
    fontSize: '36px',
    fontWeight: 700,
    marginBottom: 0,
    color: '#111',
    letterSpacing: '0.5px',
    lineHeight: 1.1
  },
  heroSubtitle: {
    fontSize: '18px',
    opacity: 0.93,
    marginBottom: '0',
    fontWeight: 500,
    letterSpacing: '0.2px',
    color: '#555'
  },
  categoriesSection: {
    marginBottom: '60px'
  },
  iconContainer: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
    '& svg': {
      color: '#1890ff',
      transition: 'transform 0.3s ease'
    }
  },
  categoryTitle: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#1890ff',
    marginBottom: '16px'
  },
  categoryDesc: {
    fontSize: '16px',
    color: '#666',
    lineHeight: '1.6'
  },
  directSupport: {
    display: 'flex',
    alignItems: 'center',
    gap: '30px',
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    marginBottom: '40px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: '1000px',
    margin: '0 auto',
    border: '1px solid rgba(24, 144, 255, 0.1)'
  },
  supportContent: {
    flex: 1,
    minWidth: '300px'
  },
  supportTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '12px'
  },
  supportMessage: {
    fontSize: '16px',
    color: '#666',
    margin: 0,
    lineHeight: '1.6'
  },
  chatButton: {
    backgroundColor: '#52c41a',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    padding: '14px 28px',
    cursor: 'pointer',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
    fontSize: '16px',
    '&:hover': {
      backgroundColor: '#389e0d',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(82, 196, 26, 0.3)'
    }
  }
};

export default HelpCenter;