import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import { FaQuestionCircle } from 'react-icons/fa';

const ContactSupport = () => {
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
      supportTitle: "Customer Support",
      faqTitle: "Frequently Asked Questions (FAQs)",
      faq_1_question: "How do I make a booking?",
      faq_1_answer: "To make a booking, log in to your account, browse the available options, and select the one you prefer. Click 'Book Now' and follow the instructions to confirm your booking.",
      faq_2_question: "How do I update my account information?",
      faq_2_answer: "Go to the Profile section under 'Account Settings'. You can update your name, email, phone, and address. Don't forget to save to confirm the changes.",
      faq_3_question: "How can I recover my account if I forget my password?",
      faq_3_answer: "Click on 'Forgot Password' on the login page. Enter your registered email address, and we will send instructions to reset your password.",
      faq_4_question: "Which payment methods are supported?",
      faq_4_answer: "We accept secure payments with credit cards (Visa, Mastercard, etc.). More payment options may be available in your region.",
      faq_5_question: "Can I cancel or modify a booking?",
      faq_5_answer: "Yes, you can cancel or modify your booking within the allowed timeframe by going to 'My Bookings'. Select the booking you want to edit and choose 'Cancel' or 'Modify' if available.",
      faq_6_question: "How do I contact customer support?",
      faq_6_answer: "You can email us at support@snaibcar.com, use the live chat for immediate assistance, or call our support line.",
      faq_7_question: "How can I get more assistance?",
      faq_7_answer: "For additional help or direct support, click the 'Live Chat' or 'Contact Us' button at the bottom of the page.",
      faq_8_question: "Is my personal information secure?",
      faq_8_answer: "We use the latest encryption technology and security measures to protect your data. For more details, see our Privacy Policy.",
      faq_9_question: "What is the refund policy?",
      faq_9_answer: "Our refund policy depends on your booking type and date. Please refer to our Terms and Conditions or contact support for more details.",
      faq_10_question: "How do I manage my notifications?",
      faq_10_answer: "Go to Notification Settings under Preferences, and use the checkboxes to manage your email and SMS updates.",
      helpTitle: "How can we help you?",
      searchPlaceholder: "Search for help...",
      search: "Search",
      browseTopics: "Browse Our Help Topics",
      stillNeedHelp: "Still need help?",
      supportMessage: "Reach out to our support team via live chat or phone.",
      liveChat: "Live Chat",
      searchingFor: "Searching for",
      placeholder: "Placeholder functionality",
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
      footerCopyright: "©2024 Snaibcar. All rights reserved"
    },
    fr: {
      // Page-specific translations
      supportTitle: "Support client",
      faqTitle: "Questions fréquemment posées (FAQ)",
      faq_1_question: "Comment puis-je effectuer une réservation ?",
      faq_1_answer: "Pour réserver, connectez-vous à votre compte, parcourez les options disponibles et sélectionnez celle que vous préférez. Cliquez sur 'Réserver' et suivez les instructions pour confirmer votre réservation.",
      faq_2_question: "Comment mettre à jour mes informations de compte ?",
      faq_2_answer: "Accédez à la section Profil sous 'Paramètres du compte'. Vous pouvez mettre à jour votre nom, email, téléphone et adresse. N'oubliez pas de sauvegarder pour valider les changements.",
      faq_3_question: "Comment récupérer mon compte en cas d'oubli de mot de passe ?",
      faq_3_answer: "Cliquez sur 'Mot de passe oublié' sur la page de connexion. Entrez votre adresse email enregistrée, et nous vous enverrons les instructions pour réinitialiser votre mot de passe.",
      faq_4_question: "Quels moyens de paiement sont acceptés ?",
      faq_4_answer: "Nous acceptons les paiements sécurisés par carte de crédit (Visa, Mastercard, etc.). D'autres options de paiement peuvent être disponibles selon votre région.",
      faq_5_question: "Puis-je annuler ou modifier une réservation ?",
      faq_5_answer: "Oui, vous pouvez annuler ou modifier votre réservation dans le délai autorisé en accédant à 'Mes réservations'. Sélectionnez la réservation à modifier et choisissez 'Annuler' ou 'Modifier' si disponible.",
      faq_6_question: "Comment contacter le support client ?",
      faq_6_answer: "Vous pouvez nous envoyer un email à support@snaibcar.com, utiliser le chat en direct pour une assistance immédiate ou appeler notre ligne d'assistance.",
      faq_7_question: "Comment obtenir plus d'aide ?",
      faq_7_answer: "Pour une aide supplémentaire ou un support direct, cliquez sur le bouton 'Chat en direct' ou 'Contactez-nous' en bas de la page.",
      faq_8_question: "Mes informations personnelles sont-elles sécurisées ?",
      faq_8_answer: "Nous utilisons les dernières technologies de cryptage et des mesures de sécurité pour protéger vos données. Pour plus de détails, consultez notre Politique de confidentialité.",
      faq_9_question: "Quelle est la politique de remboursement ?",
      faq_9_answer: "Notre politique de remboursement dépend de votre type de réservation et de la date. Veuillez vous référer à nos Conditions Générales ou contacter le support pour plus de détails.",
      faq_10_question: "Comment gérer mes notifications ?",
      faq_10_answer: "Accédez aux Paramètres de notifications dans les Préférences, et utilisez les cases à cocher pour gérer vos mises à jour par email et SMS.",
      helpTitle: "Comment pouvons-nous vous aider ?",
      searchPlaceholder: "Recherchez de l'aide...",
      search: "Rechercher",
      browseTopics: "Parcourez nos sujets d'aide",
      stillNeedHelp: "Vous avez toujours besoin d'aide ?",
      supportMessage: "Contactez notre équipe d'assistance via le chat en direct ou par téléphone.",
      liveChat: "Chat en direct",
      searchingFor: "Recherche de",
      placeholder: "Fonctionnalité d'exemple",
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
      footerCopyright: "©2024 Snaibcar. Tous droits réservés"
    },
    ar: {
      // Page-specific translations
      supportTitle: "دعم العملاء",
      faqTitle: "الأسئلة المتداولة",
      faq_1_question: "كيف أقوم بالحجز؟",
      faq_1_answer: "للحجز، قم بتسجيل الدخول إلى حسابك، وتصفح الخيارات المتاحة، واختر الخيار الذي تفضله. انقر على 'احجز الآن' واتبع التعليمات لتأكيد الحجز.",
      faq_2_question: "كيف يمكنني تحديث معلومات حسابي؟",
      faq_2_answer: "انتقل إلى قسم الملف الشخصي ضمن 'إعدادات الحساب'. يمكنك تحديث اسمك وبريدك الإلكتروني وهاتفك وعنوانك. لا تنس الحفظ لتأكيد التغييرات.",
      faq_3_question: "كيف يمكنني استعادة حسابي إذا نسيت كلمة المرور؟",
      faq_3_answer: "انقر على 'نسيت كلمة المرور' في صفحة تسجيل الدخول. أدخل عنوان بريدك الإلكتروني المسجل، وسنرسل لك تعليمات لإعادة تعيين كلمة المرور.",
      faq_4_question: "ما هي طرق الدفع المدعومة؟",
      faq_4_answer: "نقبل المدفوعات الآمنة ببطاقات الائتمان (فيزا، ماستركارد، إلخ). قد تتوفر خيارات دفع أخرى في منطقتك.",
      faq_5_question: "هل يمكنني إلغاء أو تعديل الحجز؟",
      faq_5_answer: "نعم، يمكنك إلغاء أو تعديل حجزك خلال الفترة المسموح بها من خلال الانتقال إلى 'حجوزاتي'. حدد الحجز الذي ترغب في تحريره واختر 'إلغاء' أو 'تعديل' إذا كان متاحًا.",
      faq_6_question: "كيف يمكنني الاتصال بدعم العملاء؟",
      faq_6_answer: "يمكنك مراسلتنا عبر البريد الإلكتروني على support@snaibcar.com، أو استخدام الدردشة المباشرة للحصول على مساعدة فورية، أو الاتصال بخط الدعم الخاص بنا.",
      faq_7_question: "كيف يمكنني الحصول على مزيد من المساعدة؟",
      faq_7_answer: "للحصول على مساعدة إضافية أو دعم مباشر، انقر على زر 'الدردشة المباشرة' أو 'اتصل بنا' أسفل الصفحة.",
      faq_8_question: "هل معلوماتي الشخصية آمنة؟",
      faq_8_answer: "نستخدم أحدث تقنيات التشفير وتدابير الأمان لحماية بياناتك. لمزيد من التفاصيل، راجع سياسة الخصوصية الخاصة بنا.",
      faq_9_question: "ما هي سياسة الاسترداد؟",
      faq_9_answer: "تعتمد سياسة الاسترداد لدينا على نوع الحجز وتاريخه. يرجى الرجوع إلى الشروط والأحكام أو الاتصال بالدعم لمزيد من التفاصيل.",
      faq_10_question: "كيف أدير إشعاراتي؟",
      faq_10_answer: "انتقل إلى إعدادات الإشعارات ضمن التفضيلات، واستخدم خانات الاختيار لإدارة تحديثات البريد الإلكتروني والرسائل القصيرة.",
      helpTitle: "كيف يمكننا مساعدتك؟",
      searchPlaceholder: "ابحث عن المساعدة...",
      search: "بحث",
      browseTopics: "تصفح مواضيع المساعدة",
      stillNeedHelp: "هل لا تزال بحاجة إلى مساعدة؟",
      supportMessage: "تواصل مع فريق الدعم لدينا عبر الدردشة المباشرة أو الهاتف.",
      liveChat: "دردشة مباشرة",
      searchingFor: "البحث عن",
      placeholder: "وظيفة مؤقتة",
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
  
  // FAQ data traduit
  const faqs = [
    {
      question: lang.faq_1_question,
      answer: lang.faq_1_answer
    },
    {
      question: lang.faq_2_question,
      answer: lang.faq_2_answer
    },
    {
      question: lang.faq_3_question,
      answer: lang.faq_3_answer
    },
    {
      question: lang.faq_4_question,
      answer: lang.faq_4_answer
    },
    {
      question: lang.faq_5_question,
      answer: lang.faq_5_answer
    },
    {
      question: lang.faq_6_question,
      answer: lang.faq_6_answer
    },
    {
      question: lang.faq_7_question,
      answer: lang.faq_7_answer
    },
    {
      question: lang.faq_8_question,
      answer: lang.faq_8_answer
    },
    {
      question: lang.faq_9_question,
      answer: lang.faq_9_answer
    },
    {
      question: lang.faq_10_question,
      answer: lang.faq_10_answer
    }
  ];
  
  // Accordion effect pour les FAQ
  const [activeIndex, setActiveIndex] = useState(null);
  const toggleFAQ = (index) => setActiveIndex(index === activeIndex ? null : index);
  
  // Responsive: detect mobile
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const isMobile = windowWidth < 900;

  // Styles
  const pageContainerStyle = {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    fontFamily: 'sans-serif',
    marginTop: isMobile ? '80px' : '150px',
    display: 'flex',
    flexDirection: 'column',
  };
  const gradientTitleSectionStyle = {
    width: '100%',
    background: 'linear-gradient(120deg, #f3f1f1, #ffffff)',
    padding: isMobile ? '36px 0 18px 0' : '64px 0 32px 0',
    textAlign: 'center',
  };
  const mainCardStyle = {
    background: '#fff',
    borderRadius: '20px',
    boxShadow: '0 8px 32px rgba(24, 144, 255, 0.08)',
    maxWidth: isMobile ? '98vw' : '950px',
    margin: isMobile ? '0 auto 24px auto' : '40px auto',
    padding: isMobile ? '24px 8px' : '48px 32px 40px 32px',
    border: '1px solid #f0f0f0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };
  const faqContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
    marginBottom: '40px',
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
      {/* Gradient Title Section */}
      <div style={gradientTitleSectionStyle}>
        <h1 style={{ fontSize: isMobile ? 28 : 36, fontWeight: 800, color: '#222', margin: 0, letterSpacing: 0.5 }}>{lang.supportTitle}</h1>
        <div style={{ width: 60, height: 4, background: '#1890ff', borderRadius: 2, margin: '10px auto 0 auto' }} />
        <p style={{ fontSize: isMobile ? 16 : 18, opacity: 0.93, margin: '18px 0 0 0', fontWeight: 500, letterSpacing: '0.2px', color: '#555' }}>{lang.faqTitle}</p>
      </div>
      {/* Main Card */}
      <div style={mainCardStyle}>
        <div style={faqContainerStyle}>
          {faqs.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <div key={index} style={{ ...styles.faqItem, ...(isOpen ? styles.faqItemOpen : {}) }} onClick={() => toggleFAQ(index)}>
                <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: '12px'}}>
                  <FaQuestionCircle style={{ color: '#1890ff', fontSize: 22 }} />
                  <span style={{ fontWeight: 'bold', fontSize: 20, color: '#1890ff' }}>{item.question}</span>
                </div>
                {isOpen && <div style={styles.answer}>{item.answer}</div>}
              </div>
            );
          })}
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
    maxWidth: '950px',
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
  supportContainer: { 
    flex: 1,
    padding: '20px', 
    maxWidth: '900px', 
    margin: '0 auto',
    marginBottom: '40px'
  },
  faqContainer: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '30px' 
  },
  faqItem: { 
    backgroundColor: '#fff', 
    padding: '32px', 
    borderRadius: '16px', 
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)', 
    transition: 'all 0.3s ease', 
    cursor: 'pointer',
    border: '1px solid rgba(24, 144, 255, 0.1)',
    textAlign: 'left',
    position: 'relative'
  },
  faqItemOpen: { 
    transform: 'scale(1.02)', 
    boxShadow: '0 12px 24px rgba(24, 144, 255, 0.15)',
    borderColor: '#1890ff'
  },
  question: { 
    fontWeight: 'bold', 
    fontSize: '20px', 
    marginBottom: '12px',
    color: '#1890ff'
  },
  answer: { 
    fontSize: '16px', 
    lineHeight: '1.6', 
    color: '#555', 
    marginTop: '10px' 
  }
};

export default ContactSupport;