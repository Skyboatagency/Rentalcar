import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronUp, FaBars, FaTimes } from 'react-icons/fa';

const TopBar = ({
  isLoggedIn,
  userName,
  onSignOut,
  selectedLanguage,
  setSelectedLanguage,
  lang,
  isContactPage = false
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Ajout de styles globaux pour assurer une cohérence entre les pages
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      * {
        font-family: 'Poppins', Arial, sans-serif;
      }
      
      body, html {
        margin: 0;
        padding: 0;
        overflow-x: hidden;
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
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLanguageSelectFn = (langCode) => {
    setSelectedLanguage(langCode);
    localStorage.setItem("language", langCode);
    setShowLanguageDropdown(false);
  };

  const topBarStyle = {
    width: "100%",
    position: "fixed",
    top: 0,
    zIndex: 1000,
    padding: "0",
    boxSizing: "border-box",
    backgroundColor: windowWidth < 900 ? '#FFFFFF' : (isContactPage ? '#FFFFFF' : (scrolled ? '#fff' : 'transparent')),
    boxShadow: windowWidth < 900 ? '0 2px 10px rgba(0,0,0,0.1)' : (scrolled ? '0 2px 10px rgba(0,0,0,0.1)' : 'none'),
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease'
  };

  const logoHeight = windowWidth < 900 ? 48 : 80;

  return (
    <header style={topBarStyle}>
      <div style={styles.topBarContainer}>
        <div style={{...styles.topBarLogo, marginRight: windowWidth < 900 ? 12 : 0}}>
          <Link to="/">
            <img src="/images/snaibcarlogo.png" alt="Diab Car" style={{...styles.logoImage, height: logoHeight}} />
          </Link>
        </div>

        {/* Hamburger for mobile */}
        {windowWidth < 900 && (
          <button
            style={{
              background: 'none',
              border: 'none',
              fontSize: 28,
              cursor: 'pointer',
              color: '#333',
              marginLeft: 'auto',
              zIndex: 1200
            }}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        )}

        {/* Navigation links (desktop) */}
        {windowWidth >= 900 && (
        <div style={styles.topBarNav}>
          <Link to="/" className="nav-link">{lang.navHome.toUpperCase()}</Link>
          <Link to="/available-cars" className="nav-link">{lang.navAvailableCars.toUpperCase()}</Link>
          <Link to="/contact-us" className="nav-link">{lang.navContactUs.toUpperCase()}</Link>
        </div>
        )}

        {/* Controls (desktop) */}
        {windowWidth >= 900 && (
        <div style={styles.topBarControls}>
          <div style={styles.languageContainer}>
            <div
              onClick={() => setShowLanguageDropdown((prev) => !prev)}
              style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            >
              <img
                src="/images/lang.png"
                alt="Language"
                style={{ width: "22px", height: "22px", marginRight: "8px" }}
              />
              <span>{selectedLanguage.toUpperCase()}</span>
              {showLanguageDropdown ? <FaChevronUp style={{ marginLeft: 6 }} /> : <FaChevronDown style={{ marginLeft: 6 }} />}
            </div>
            {showLanguageDropdown && (
              <div style={{
                ...styles.languageDropdown,
                width: "120px",
                padding: "6px"
              }}>
                <div
                  style={{
                    ...styles.languageItem,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    padding: "8px 12px"
                  }}
                  onClick={() => handleLanguageSelectFn("en")}
                >
                  <img
                    src="/images/uk.png"
                    alt="UK"
                    style={{ width: "24px", height: "16px", marginRight: "12px", verticalAlign: "middle" }}
                  />
                  <span style={{ fontWeight: "500" }}>EN</span>
                </div>
                <div
                  style={{
                    ...styles.languageItem,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    padding: "8px 12px"
                  }}
                  onClick={() => handleLanguageSelectFn("fr")}
                >
                  <img
                    src="/images/fr.png"
                    alt="France"
                    style={{ width: "24px", height: "16px", marginRight: "12px", verticalAlign: "middle" }}
                  />
                  <span style={{ fontWeight: "500" }}>FR</span>
                </div>
              </div>
            )}
          </div>

          <div style={styles.profileContainer} ref={menuRef}>
            <div style={styles.profileButton} onClick={() => setMenuOpen((prev) => !prev)}>
              <img
                src="/images/user.png"
                alt="User"
                style={{ width: "18px", height: "18px", marginRight: "6px" }}
              />
              <span style={{ marginLeft: 4 }}>{isLoggedIn ? userName : lang.signIn.toUpperCase()}</span>
              {menuOpen ? <FaChevronUp style={styles.profileArrow} /> : <FaChevronDown style={styles.profileArrow} />}
            </div>
            {menuOpen && (
              <div style={styles.profileMenu}>
                {isLoggedIn ? (
                  <>
                    {/* Account Section */}
                    <div style={styles.menuSectionTitle}>Account</div>
                    <div style={styles.menuSubSection}>
                      <Link to="/my-profile" style={styles.menuItem}>Personal Information</Link>
                      <Link to="/change-password" style={styles.menuItem}>Password & Security</Link>
                      <Link to="/preferences" style={styles.menuItem}>{lang.preferences}</Link>
                    </div>

                    {/* My Booking Section */}
                    <div style={styles.menuSectionTitle}>My Booking</div>
                    <div style={styles.menuSubSection}>
                      <Link to="/my-bookings" style={styles.menuItem}>Booking History</Link>
                    </div>

                    {/* Help and Support Section */}
                    <div style={styles.menuSectionTitle}>Help and Support</div>
                    <div style={styles.menuSubSection}>
                      <Link to="/help-center" style={styles.menuItem}>Customer Support</Link>
                      <Link to="/contact-support" style={styles.menuItem}>Help and FAQ</Link>
                    </div>

                    <button style={styles.signOutButton} onClick={onSignOut}>{lang.signOut}</button>
                  </>
                ) : (
                  <>
                    <div style={styles.menuSectionTitle}>{lang.notLoggedIn}</div>
                    <Link to="/UserLogin" style={styles.menuItem}>{lang.login}</Link>
                    <Link to="/UserRegister" style={styles.menuItem}>{lang.register}</Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        )}
      </div>

      {/* Mobile menu overlay */}
      {windowWidth < 900 && isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.5)',
            zIndex: 1100
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <nav
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '80vw',
              maxWidth: 320,
              height: '100vh',
              background: '#fff',
              boxShadow: '-2px 0 8px rgba(0,0,0,0.1)',
              zIndex: 1200,
              display: 'flex',
              flexDirection: 'column',
              padding: 32,
              overflowY: 'auto',
              alignItems: 'flex-start',
              gap: 0
            }}
            onClick={e => e.stopPropagation()}
          >
            <Link to="/" className="nav-link" style={{ marginBottom: 16, textAlign: 'left', width: '100%', padding: '10px 0', fontWeight: 600, letterSpacing: 1 }} onClick={() => setIsMobileMenuOpen(false)}>{lang.navHome.toUpperCase()}</Link>
            <Link to="/available-cars" className="nav-link" style={{ marginBottom: 16, textAlign: 'left', width: '100%', padding: '10px 0', fontWeight: 600, letterSpacing: 1 }} onClick={() => setIsMobileMenuOpen(false)}>{lang.navAvailableCars.toUpperCase()}</Link>
            <Link to="/contact-us" className="nav-link" style={{ marginBottom: 24, textAlign: 'left', width: '100%', padding: '10px 0', fontWeight: 600, letterSpacing: 1 }} onClick={() => setIsMobileMenuOpen(false)}>{lang.navContactUs.toUpperCase()}</Link>
            <div style={{ margin: '12px 0' }} />
            {/* Langue */}
            <div style={{ marginBottom: 20, width: '100%', textAlign: 'left' }}>
              <div
                onClick={() => setShowLanguageDropdown((prev) => !prev)}
                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', justifyContent: 'flex-start', padding: '8px 0' }}
              >
                <img src="/images/lang.png" alt="Language" style={{ width: 22, height: 22, marginRight: 8 }} />
                <span>{selectedLanguage.toUpperCase()}</span>
                {showLanguageDropdown ? <FaChevronUp style={{ marginLeft: 6 }} /> : <FaChevronDown style={{ marginLeft: 6 }} />}
              </div>
              {showLanguageDropdown && (
                <div style={{ background: '#f5f5f5', borderRadius: 8, marginTop: 8, textAlign: 'left', padding: '8px 0' }}>
                  <div style={{ padding: '8px 16px', cursor: 'pointer' }} onClick={() => handleLanguageSelectFn('en')}>EN</div>
                  <div style={{ padding: '8px 16px', cursor: 'pointer' }} onClick={() => handleLanguageSelectFn('fr')}>FR</div>
                </div>
              )}
            </div>
            {/* Profil complet */}
            <div style={{ marginBottom: 12, width: '100%', textAlign: 'left' }}>
              {isLoggedIn ? (
                <>
                  <div style={{ fontWeight: 'bold', marginBottom: 8, padding: '8px 0' }}>{userName}</div>
                  <Link to="/my-profile" style={{ display: 'block', marginBottom: 2, textAlign: 'left', padding: '8px 0', color: '#333' }} onClick={() => setIsMobileMenuOpen(false)}>{lang.myProfile || 'Mon Profil'}</Link>
                  <Link to="/preferences" style={{ display: 'block', marginBottom: 2, textAlign: 'left', padding: '8px 0', color: '#333' }} onClick={() => setIsMobileMenuOpen(false)}>{lang.preferences || 'Préférences'}</Link>
                  <Link to="/password" style={{ display: 'block', marginBottom: 2, textAlign: 'left', padding: '8px 0', color: '#333' }} onClick={() => setIsMobileMenuOpen(false)}>{lang.changePassword || 'Mot de passe & sécurité'}</Link>
                  <Link to="/my-bookings" style={{ display: 'block', marginBottom: 2, textAlign: 'left', padding: '8px 0', color: '#333' }} onClick={() => setIsMobileMenuOpen(false)}>{lang.myBookings || 'Historique'}</Link>
                  <Link to="/help-center" style={{ display: 'block', marginBottom: 2, textAlign: 'left', padding: '8px 0', color: '#333' }} onClick={() => setIsMobileMenuOpen(false)}>{lang.customerSupport || 'Support'}</Link>
                  <Link to="/contact-support" style={{ display: 'block', marginBottom: 12, textAlign: 'left', padding: '8px 0', color: '#333' }} onClick={() => setIsMobileMenuOpen(false)}>{lang.helpCenter || 'Aide'}</Link>
                  <button style={{ ...styles.signOutButton, width: '100%', textAlign: 'center', marginTop: 8 }} onClick={() => { onSignOut(); setIsMobileMenuOpen(false); }}>{lang.signOut || 'Déconnexion'}</button>
                </>
              ) : (
                <>
                  <Link to="/UserLogin" style={{ display: 'block', marginBottom: 8, textAlign: 'left', padding: '8px 0', color: '#333' }} onClick={() => setIsMobileMenuOpen(false)}>{lang.login || 'Se connecter'}</Link>
                  <Link to="/UserRegister" style={{ display: 'block', marginBottom: 8, textAlign: 'left', padding: '8px 0', color: '#333' }} onClick={() => setIsMobileMenuOpen(false)}>{lang.register || 'S\'inscrire'}</Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

const styles = {
  topBarHeader: {
    width: "100%",
    position: "fixed",
    top: 0,
    zIndex: 1000,
    padding: "0",
    boxSizing: "border-box"
  },
  topBarContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px"
  },
  topBarLogo: {
    display: "flex",
    alignItems: "center"
  },
  logoImage: {
    height: "80px",
    objectFit: "contain"
  },
  topBarNav: {
    display: "flex",
    gap: "20px",
    fontFamily: "'Poppins', Arial, sans-serif",
    fontWeight: "900",
    transform: "scaleY(0.9)"
  },
  topBarControls: {
    display: "flex",
    alignItems: "center",
    gap: "20px"
  },
  languageContainer: {
    position: "relative"
  },
  languageDropdown: {
    position: "absolute",
    top: "110%",
    right: 0,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: 4,
    boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
    zIndex: 10
  },
  languageItem: {
    padding: "6px 12px",
    cursor: "pointer"
  },
  profileContainer: {
    position: "relative"
  },
  profileButton: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#333"
  },
  profileArrow: {
    fontSize: "20px"
  },
  profileMenu: {
    position: "absolute",
    top: "100%",
    right: 0,
    width: "180px",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: 8,
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    padding: 10,
    zIndex: 99,
    display: "flex",
    flexDirection: "column"
  },
  menuSectionTitle: {
    fontWeight: "bold",
    margin: "10px 0 5px",
    fontSize: "14px",
    color: "#722637",
    textTransform: "uppercase",
    textAlign: "left"
  },
  menuSubSection: {
    marginBottom: "10px",
    textAlign: "left"
  },
  menuSubTitle: {
    fontSize: "12px",
    color: "#666",
    margin: "5px 0",
    fontWeight: "500",
    textAlign: "left"
  },
  menuItem: {
    color: "#333",
    textDecoration: "none",
    fontSize: "14px",
    padding: "4px 0",
    fontFamily: "'Poppins', Arial, sans-serif",
    display: "block",
    textAlign: "left"
  },
  signOutButton: {
    marginTop: "10px",
    padding: 8,
    fontSize: "14px",
    color: "#fff",
    backgroundColor: "#8B0000",
    border: "none",
    borderRadius: 4,
    cursor: "pointer"
  }
};

export default TopBar; 