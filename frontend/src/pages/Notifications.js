import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';

const Notifications = () => {
  const storedUser = localStorage.getItem('user');
  let user = null;
  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
  }
  const isLoggedIn = !!user;
  const userName = user ? user.name : '';
  
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currency, setCurrency] = useState('MAD');
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });
  
  const [generalNotifications, setGeneralNotifications] = useState(false);
  const [bookingReminders, setBookingReminders] = useState(false);
  const [offersDiscounts, setOffersDiscounts] = useState(false);
  
  // Textes multilingues
  const texts = {
    en: {
      // Notifications page translations
      notifications: "Notifications",
      generalNotifications: "General Notifications",
      generalNotificationsText: "Enable or disable notifications for important updates about your account and the platform.",
      bookingReminders: "Booking Reminders",
      bookingRemindersText: "Stay informed with reminders for upcoming or pending bookings.",
      offersDiscounts: "Offers and Discounts",
      offersDiscountsText: "Get notified about exclusive offers, deals, and promotions tailored for you.",
      saveNotificationSettings: "Save Notification Settings",
      settingsSaved: "Notification settings saved!",
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
      // Notifications page translations
      notifications: "Notifications",
      generalNotifications: "Notifications générales",
      generalNotificationsText: "Activez ou désactivez les notifications pour les mises à jour importantes concernant votre compte et la plateforme.",
      bookingReminders: "Rappels de réservation",
      bookingRemindersText: "Restez informé avec des rappels pour les réservations à venir ou en attente.",
      offersDiscounts: "Offres et réductions",
      offersDiscountsText: "Soyez informé des offres exclusives, promotions et réductions adaptées pour vous.",
      saveNotificationSettings: "Enregistrer les paramètres de notification",
      settingsSaved: "Paramètres de notification enregistrés !",
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
      // Notifications page translations
      notifications: "الإشعارات",
      generalNotifications: "الإشعارات العامة",
      generalNotificationsText: "تمكين أو تعطيل الإشعارات للتحديثات المهمة حول حسابك والمنصة.",
      bookingReminders: "تذكيرات الحجز",
      bookingRemindersText: "ابق على اطلاع بتذكيرات للحجوزات القادمة أو المعلقة.",
      offersDiscounts: "العروض والخصومات",
      offersDiscountsText: "احصل على إشعارات حول العروض الحصرية والصفقات والعروض الترويجية المصممة خصيصًا لك.",
      saveNotificationSettings: "حفظ إعدادات الإشعارات",
      settingsSaved: "تم حفظ إعدادات الإشعارات!",
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
  
  const handleSaveNotifications = () => {
    console.log('Notification settings saved:', { generalNotifications, bookingReminders, offersDiscounts });
    alert(lang.settingsSaved);
  };
  
  return (
    <div style={styles.pageContainer}>
      <TopBar
        isLoggedIn={isLoggedIn}
        userName={userName}
        onSignOut={handleSignOut}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        lang={lang}
      />
      
      <div style={styles.notificationsContainer}>
        <h1 style={styles.pageTitle}>{lang.notifications}</h1>
        
        <div style={styles.prefSection}>
          <h2 style={styles.sectionHeader}>{lang.generalNotifications}</h2>
          <label style={styles.checkboxLabel}>
            <input type="checkbox" checked={generalNotifications} onChange={() => setGeneralNotifications(!generalNotifications)} />
            {lang.generalNotificationsText}
          </label>
        </div>
        
        <div style={styles.prefSection}>
          <h2 style={styles.sectionHeader}>{lang.bookingReminders}</h2>
          <label style={styles.checkboxLabel}>
            <input type="checkbox" checked={bookingReminders} onChange={() => setBookingReminders(!bookingReminders)} />
            {lang.bookingRemindersText}
          </label>
        </div>
        
        <div style={styles.prefSection}>
          <h2 style={styles.sectionHeader}>{lang.offersDiscounts}</h2>
          <label style={styles.checkboxLabel}>
            <input type="checkbox" checked={offersDiscounts} onChange={() => setOffersDiscounts(!offersDiscounts)} />
            {lang.offersDiscountsText}
          </label>
        </div>
        
        <button style={styles.saveButton} onClick={handleSaveNotifications}>
          {lang.saveNotificationSettings}
        </button>
      </div>
      
      <Footer lang={lang} />
    </div>
  );
};

const styles = {
  pageContainer: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#FFF',
    fontFamily: 'sans-serif',
    marginTop: '150px',
    display: 'flex',
    flexDirection: 'column'
  },
  notificationsContainer: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    flex: '1'
  },
  pageTitle: {
    marginBottom: '30px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center'
  },
  prefSection: { 
    marginBottom: '30px', 
    backgroundColor: '#f9f9f9', 
    padding: '20px', 
    borderRadius: '8px', 
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)' 
  },
  sectionHeader: { 
    marginBottom: '15px', 
    fontSize: '20px', 
    color: '#722637' 
  },
  checkboxLabel: { 
    display: 'block', 
    marginBottom: '10px', 
    cursor: 'pointer' 
  },
  saveButton: { 
    backgroundColor: '#2FD596', 
    color: '#fff', 
    padding: '12px 40px', 
    fontSize: '16px', 
    borderRadius: '8px', 
    border: 'none', 
    cursor: 'pointer', 
    fontWeight: 'bold',
    display: 'block',
    margin: '0 auto'
  }
};

export default Notifications;
