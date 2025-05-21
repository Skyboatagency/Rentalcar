import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL; // Ex: http://localhost:5000/api

const Password = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  
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
  
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });
  
  // Textes multilingues
  const texts = {
    en: {
      // Page-specific translations
      changePassword: "Change Password",
      oldPassword: "Old password:",
      newPassword: "New password:",
      confirmNewPassword: "Confirm new password:",
      updatePassword: "Update Password",
      passwordsDontMatch: "The new password and its confirmation do not match.",
      passwordChangeError: "Error changing password.",
      passwordChangeSuccess: "Password updated successfully.",
      tryAgain: "An error occurred. Please try again.",
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
      changePassword: "Changer le mot de passe",
      oldPassword: "Ancien mot de passe :",
      newPassword: "Nouveau mot de passe :",
      confirmNewPassword: "Confirmer le nouveau mot de passe :",
      updatePassword: "Mettre à jour le mot de passe",
      passwordsDontMatch: "Le nouveau mot de passe et sa confirmation ne correspondent pas.",
      passwordChangeError: "Erreur lors du changement de mot de passe.",
      passwordChangeSuccess: "Mot de passe mis à jour avec succès.",
      tryAgain: "Une erreur s'est produite. Veuillez réessayer.",
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
      changePassword: "تغيير كلمة المرور",
      oldPassword: "كلمة المرور القديمة:",
      newPassword: "كلمة المرور الجديدة:",
      confirmNewPassword: "تأكيد كلمة المرور الجديدة:",
      updatePassword: "تحديث كلمة المرور",
      passwordsDontMatch: "كلمة المرور الجديدة وتأكيدها غير متطابقين.",
      passwordChangeError: "خطأ في تغيير كلمة المرور.",
      passwordChangeSuccess: "تم تحديث كلمة المرور بنجاح.",
      tryAgain: "حدث خطأ. يرجى المحاولة مرة أخرى.",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword !== confirmNewPassword) {
      setError(lang.passwordsDontMatch);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const response = await fetch(`${API_URL}/users/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: userId, // Passage de l'id récupéré depuis le localStorage
          oldPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || lang.passwordChangeError);
      } else {
        setMessage(data.message || lang.passwordChangeSuccess);
        // Rediriger vers la page d'accueil après 2 secondes
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (err) {
      console.error("Erreur lors du changement de mot de passe :", err);
      setError(lang.tryAgain);
    }
  };

  // Add screenWidth for responsive image
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  React.useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={styles.container}>
      {/* FORM SIDE (Left) */}
      <div style={styles.formSide}>
        <div style={styles.formContainer}>
          <h1 style={styles.title}>{lang.changePassword}</h1>
          <div style={styles.titleUnderline}></div>
          <p style={styles.subtitle}>Enter your old and new password to update your account password.</p>
          {error && <div style={styles.errorBox}>{error}</div>}
          {message && <div style={styles.successBox}>{message}</div>}
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>{lang.oldPassword}</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                style={styles.input}
                className="input-field"
                placeholder="Old password"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>{lang.newPassword}</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                style={styles.input}
                className="input-field"
                placeholder="New password"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>{lang.confirmNewPassword}</label>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
                style={styles.input}
                className="input-field"
                placeholder="Confirm new password"
              />
            </div>
            <button type="submit" style={styles.signInButton} className="sign-in-button">
              {lang.updatePassword}
            </button>
          </form>
          <div style={styles.loginContainer}>
            <p style={styles.loginText}>
              Remembered your password?{' '}
              <Link to="/UserLogin" style={styles.loginLink}>
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* IMAGE SIDE (Right) - Hide on smaller screens */}
      {screenWidth >= 768 && (
        <div style={styles.imageSide}></div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    width: "100%",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  formSide: {
    flex: "1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#001529",
    padding: "40px 20px",
    color: "#fff",
  },
  formContainer: {
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    fontSize: "30px",
    fontWeight: "600",
    marginBottom: "10px",
    color: "#fff",
    textAlign: "center",
  },
  subtitle: {
    fontSize: "14px",
    marginBottom: "30px",
    color: "#ccc",
    textAlign: "center",
  },
  titleUnderline: {
    height: "3px",
    width: "60px",
    background: "linear-gradient(90deg, #1890ff, #40a9ff)",
    margin: "0 auto",
    marginBottom: "15px",
    borderRadius: "2px",
    boxShadow: "0 2px 4px rgba(24, 144, 255, 0.3)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "14px",
    color: "#fff",
    fontWeight: "500",
    textAlign: "left"
  },
  input: {
    padding: "12px 16px",
    fontSize: "14px",
    borderRadius: "4px",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    color: "#fff",
    outline: "none",
    transition: "border-color 0.3s",
  },
  signInButton: {
    padding: "12px",
    fontSize: "16px",
    fontWeight: "600",
    color: "#fff",
    backgroundColor: "#1890ff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  errorBox: {
    backgroundColor: "rgba(255, 77, 79, 0.2)",
    color: "#ff4d4f",
    padding: "10px",
    borderRadius: "4px",
    marginBottom: "15px",
    fontSize: "14px",
    textAlign: "center",
  },
  successBox: {
    backgroundColor: "rgba(82, 196, 26, 0.2)",
    color: "#52c41a",
    padding: "10px",
    borderRadius: "4px",
    marginBottom: "15px",
    fontSize: "14px",
    textAlign: "center",
  },
  loginContainer: {
    textAlign: "center",
    marginTop: "30px",
  },
  loginText: {
    fontSize: "14px",
    color: "#ccc",
    lineHeight: "1.5",
  },
  loginLink: {
    color: "#1890ff",
    textDecoration: "none",
    fontWeight: "600",
  },
  imageSide: {
    flex: "1",
    backgroundImage: 'url("/images/driver.jpg")',
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
};

export default Password;