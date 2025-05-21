import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';

/*--------------------------------*/
/*         Profile Page           */
/*--------------------------------*/
const Profile = () => {
  // Récupération de l'utilisateur depuis localStorage
  const storedUser = localStorage.getItem("user");
  let localUser = null;
  try {
    localUser = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    // Si erreur de parsing, considérer l'utilisateur comme non connecté
  }

  // État pour le mode sombre / devise
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currency, setCurrency] = useState('MAD');
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  // État pour les informations du profil
  const [name, setName] = useState(localUser ? localUser.name : '');
  const [email, setEmail] = useState(localUser ? localUser.email : '');
  const [phone, setPhone] = useState(localUser ? localUser.phone || '' : '');
  const [joinDate, setJoinDate] = useState(''); 

  // État pour le mode d'édition
  const [isEditing, setIsEditing] = useState(false);

  // URL de l'API
  const API_URL = process.env.REACT_APP_API_URL ;
  
  // Textes multilingues basiques pour le profil
  const texts = {
    en: {
      profileTitle: "My Profile Page",
      name: "Full name",
      email: "Email address",
      save: "Save",
      edit: "Edit",
      joinDate: "Join Date",
      deleteAccount: "Delete my account",
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
      profileTitle: "Ma Page de Profil",
      name: "Nom complet",
      email: "Adresse email",
      save: "Enregistrer",
      edit: "Modifier",
      joinDate: "Date d'inscription",
      deleteAccount: "Supprimer mon compte",
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
      profileTitle: "صفحة ملفي الشخصي",
      name: "الاسم الكامل",
      email: "البريد الإلكتروني",
      save: "حفظ",
      edit: "تعديل",
      joinDate: "تاريخ الانضمام",
      deleteAccount: "حذف حسابي",
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

  // Récupération des données du profil (et du nombre de rentals)
  useEffect(() => {
    if (!localUser) {
      // Si pas connecté, rediriger vers login
      window.location.href = "/UserLogin";
      return;
    }

    // 1) Récupérer l'utilisateur depuis l'API pour avoir la date d'inscription (createdAt)
    axios.get(`${API_URL}/users/${localUser.id}`)
      .then(res => {
        const userData = res.data;
        setName(userData.name);
        setEmail(userData.email);
        setPhone(userData.phone || '');

        // On récupère createdAt et on le formate en "DD.MM.YYYY"
        if (userData.createdAt) {
          let dateObj = moment(userData.createdAt).format("DD.MM.YYYY");
          // Convert Arabic numerals to Western numerals
          dateObj = dateObj.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
          setJoinDate(dateObj);
        } else {
          setJoinDate('N/A');
        }
      })
      .catch(err => {
        console.error("Erreur lors de la récupération du profil :", err);
      });
  }, [API_URL, localUser]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Mettre à jour le profil via l'API si besoin
    // axios.put(`${API_URL}/users/${localUser.id}`, { name, email })
    //   .then(res => {
    //     alert("Profile updated successfully!");
    //     // Mettre à jour localStorage si nécessaire
    //     localStorage.setItem("user", JSON.stringify({ ...localUser, name, email }));
    //     setIsEditing(false);
    //   })
    //   .catch(err => {
    //     console.error("Erreur lors de la mise à jour du profil :", err);
    //     alert("Erreur lors de la mise à jour du profil.");
    //   });

    alert("Profile saved! (Décommentez la requête PUT pour sauvegarder réellement.)");
    setIsEditing(false);
  };

  const handleDeleteAccount = () => {
    // Logique de suppression du compte
    // axios.delete(`${API_URL}/users/${localUser.id}`)
    //   .then(() => {
    //     alert("Account deleted!");
    //     localStorage.removeItem("user");
    //     window.location.href = "/";
    //   })
    //   .catch(err => {
    //     console.error("Erreur lors de la suppression du compte :", err);
    //     alert("Erreur lors de la suppression du compte.");
    //   });

    alert("Account deletion logic here (décommentez la requête DELETE).");
  };

  const handleSignOut = () => { 
    localStorage.removeItem('user'); 
    window.location.reload(); 
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
  const profileCardStyle = {
    ...styles.profileCard,
    flexDirection: isMobile ? 'column' : 'row',
    padding: isMobile ? '24px 8px' : '40px 48px',
    margin: isMobile ? '0 0 24px 0' : '0 0 40px 0',
    gap: isMobile ? '24px' : '48px',
    minHeight: isMobile ? 'auto' : '500px',
    maxWidth: isMobile ? '98vw' : '1200px',
    width: '100%',
    alignItems: isMobile ? 'center' : 'flex-start',
    borderRadius: '18px',
    boxShadow: '0 6px 32px rgba(24, 144, 255, 0.10)',
    background: '#fff',
  };
  const avatarBoxStyle = {
    ...styles.avatarBox,
    minWidth: isMobile ? '180px' : '320px',
    maxWidth: isMobile ? '100%' : '380px',
    marginRight: isMobile ? 0 : '56px',
    marginTop: isMobile ? 0 : '12px',
    marginBottom: isMobile ? 0 : '12px',
    width: isMobile ? '100%' : undefined,
  };
  const pageContainerStyle = {
    ...styles.pageContainer,
    paddingTop: dynamicPaddingTop,
  };
  // Add profile-like background to mainWrapper
  const mainWrapperStyle = {
    ...styles.profileCardWrapper,
    background: 'linear-gradient(120deg, #f3f1f1, #ffffff)',
    minHeight: 'calc(100vh - 200px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  // Gradient title section style
  const gradientTitleSectionStyle = {
    width: '100%',
    background: 'linear-gradient(120deg, #f3f1f1, #ffffff)',
    padding: isMobile ? '36px 0 18px 0' : '64px 0 32px 0',
    textAlign: 'center',
  };
  // White background for TopBar
  const topBarBgStyle = {
    width: '100%',
    background: '#fff',
    position: 'relative',
    zIndex: 2,
  };

  return (
    <div style={pageContainerStyle}>
      {/* TopBar with white background */}
      <div style={topBarBgStyle}>
        <TopBar
          isLoggedIn={!!localUser}
          userName={name}
          onSignOut={handleSignOut}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          lang={lang}
        />
      </div>
      {/* Gradient title section */}
      <div style={gradientTitleSectionStyle}>
        <h1 style={{ fontSize: isMobile ? 22 : 32, fontWeight: 800, color: '#222', margin: 0, letterSpacing: 0.5 }}>Profile Overview</h1>
        <div style={{ width: 60, height: 4, background: '#1890ff', borderRadius: 2, margin: '10px auto 0 auto' }} />
      </div>
      {/* Main wrapper with card */}
      <div style={mainWrapperStyle}>
        <div style={profileCardStyle}>
          {/* Avatar & Contact Section */}
          <div style={avatarBoxStyle}>
            <div style={styles.avatarSection}>
              <div style={styles.avatarCircle}>
                <FaUser style={{ fontSize: '60px', color: '#fff' }} />
              </div>
              <h2 style={styles.profileName}>{name}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '8px 0' }}>
                <FaEnvelope style={{ color: '#1890ff', fontSize: 16 }} />
                <span style={styles.profileEmail}>{email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '2px 0 8px 0' }}>
                <FaPhone style={{ color: '#1890ff', fontSize: 16 }} />
                <span style={styles.profilePhone}>{phone}</span>
              </div>
              {/* Join Date Badge */}
              <div style={{ marginTop: 10 }}>
                <span style={{ background: '#f0f2f5', color: '#1890ff', borderRadius: 8, padding: '4px 14px', fontWeight: 600, fontSize: 14, letterSpacing: 0.5 }}>{lang.joinDate}: {joinDate}</span>
              </div>
            </div>
          </div>
          {/* Divider for desktop */}
          {!isMobile && <div style={{ width: 2, background: '#f0f0f0', minHeight: 220, margin: '0 24px' }} />}
          {/* Info Section */}
          <div style={{ ...styles.infoSection, width: '100%' }}>
            {/* Account Information Section */}
            <div style={{ marginBottom: 18 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#222', margin: '0 0 12px 0', letterSpacing: 0.2 }}>Account Information</h3>
              <form style={styles.formProfileCard}>
                <label style={styles.labelCard}>{lang.name}</label>
                <input
                  style={styles.inputCard}
                  type="text"
                  value={name}
                  disabled={!isEditing}
                  onChange={(e) => setName(e.target.value)}
                />
                <label style={styles.labelCard}>{lang.email}</label>
                <input
                  style={styles.inputCard}
                  type="email"
                  value={email}
                  disabled={!isEditing}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label style={styles.labelCard}>Phone</label>
                <input
                  style={styles.inputCard}
                  type="text"
                  value={phone}
                  disabled={!isEditing}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <div style={styles.actionRowCard}>
                  <span style={styles.deleteSentence} onClick={handleDeleteAccount}>
                    {lang.deleteAccount}
                  </span>
                  <button 
                    style={styles.saveButtonCard} 
                    onClick={handleSave}
                    disabled={!isEditing}
                    type="button"
                  >
                    {lang.save}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer lang={lang} />
    </div>
  );
};

/*--------------------------------*/
/*            STYLES              */
/*--------------------------------*/
const styles = {
  /* ---------- Profile Page Styles ---------- */
  pageContainer: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#FFFF',
    fontFamily: 'sans-serif',
    /* marginTop: '150px', // Removed to avoid top margin on the whole page */
    display: 'flex',
    flexDirection: 'column'
  },
  profileCardWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 200px)',
    background: 'linear-gradient(120deg, #f3f1f1, #ffffff)',
  },
  profileCard: {
    background: '#fff',
    borderRadius: '18px',
    boxShadow: '0 6px 32px rgba(24, 144, 255, 0.10)',
    padding: '40px 48px',
    width: '100%',
    maxWidth: '1200px',
    minHeight: '500px',
    margin: '200px 0 40px 0', // Add 200px top margin, keep 40px bottom margin
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: '48px',
  },
  avatarBox: {
    background: '#fff',
    borderRadius: '18px',
    boxShadow: '0 4px 24px rgba(24, 144, 255, 0.10)',
    border: '1px solid #f0f0f0',
    padding: '40px 32px 32px 32px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '320px',
    maxWidth: '380px',
    marginRight: '56px',
    marginTop: '12px',
    marginBottom: '12px',
  },
  avatarSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  avatarCircle: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #1890ff 60%, #40a9ff 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '18px',
    boxShadow: '0 2px 8px rgba(24, 144, 255, 0.15)',
  },
  profileName: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#001529',
    margin: '0 0 6px 0',
    letterSpacing: '0.5px',
  },
  profileEmail: {
    fontSize: '16px',
    color: '#666',
    margin: '0 0 2px 0',
    fontWeight: 500,
  },
  profilePhone: {
    fontSize: '16px',
    color: '#666',
    margin: '0 0 0 0',
    fontWeight: 500,
  },
  infoSection: {
    flex: 1,
    width: '100%',
    marginBottom: '18px',
  },
  infoRowCard: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '18px',
  },
  infoBlockCard: {
    textAlign: 'center',
    flex: 1,
  },
  infoLabelCard: {
    fontSize: '13px',
    color: '#888',
    marginBottom: '2px',
    marginRight: '12px',
  },
  infoValueCard: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#001529',
  },
  formProfileCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '18px',
  },
  labelCard: {
    textAlign: 'left',
    fontWeight: '500',
    margin: '5px 0',
    marginLeft: '2px',
    fontSize: '14px',
  },
  inputCard: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #d9d9d9',
    outline: 'none',
    fontSize: '14px',
    background: '#fafcff',
  },
  buttonRowCard: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    marginTop: '10px',
  },
  saveButtonCard: {
    backgroundColor: '#1890ff',
    color: '#fff',
    padding: '8px 20px',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '15px',
  },
  actionRowCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: '18px',
  },
  deleteSentence: {
    color: '#ff4d4f',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '15px',
    background: 'none',
    border: 'none',
    padding: 0,
    textDecoration: 'underline',
    transition: 'color 0.2s',
    outline: 'none',
    marginLeft: 0,
  },
};

export default Profile;