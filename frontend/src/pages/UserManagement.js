import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaChartBar, FaCar, FaUsers, FaCalendarAlt, FaMapMarkerAlt, FaCog, FaComments, FaSignOutAlt, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';

const DEFAULT_AVATAR = '/images/default_avatar.png';
const API_URL = process.env.REACT_APP_API_URL;

// Dictionnaire de traductions
const translations = {
  userManagementTitle: {
    fr: "Gestion des utilisateurs",
    en: "User Management",
    ar: "إدارة المستخدمين"
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
    en: "Booking management",
    ar: "إدارة الحجوزات"
  },
  analyticsReports: {
    fr: "Analytique et rapports",
    en: "Analytics and Reports",
    ar: "التحليلات والتقارير"
  },
  locationContact: {
    fr: "Localisation et contact",
    en: "Location & Contact",
    ar: "الموقع والاتصال"
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
  logout: {
    fr: "Se déconnecter",
    en: "Logout",
    ar: "تسجيل الخروج"
  },
  welcome: {
    fr: "Bienvenue!",
    en: "Welcome!",
    ar: "مرحبا!"
  },
  allUsers: {
    fr: "Tous les utilisateurs",
    en: "All Users",
    ar: "جميع المستخدمين"
  },
  addUser: {
    fr: "Ajouter un utilisateur",
    en: "Add User",
    ar: "إضافة مستخدم"
  },
  editUser: {
    fr: "Modifier l'utilisateur",
    en: "Edit User",
    ar: "تعديل المستخدم"
  },
  userDetails: {
    fr: "Détails de l'utilisateur",
    en: "User Details",
    ar: "تفاصيل المستخدم"
  },
  filterBy: {
    fr: "Filtrer par :",
    en: "Filter by :",
    ar: "تصفية بواسطة:"
  },
  reset: {
    fr: "Réinitialiser",
    en: "Reset",
    ar: "إعادة تعيين"
  }
};

// Composant LanguageSwitcher en haut à droite
const LanguageSwitcher = ({ language, setLanguage }) => {
  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <div style={styles.languageSwitcher}>
      <button style={styles.langButton} onClick={() => changeLanguage('fr')}>FR</button>
      <button style={styles.langButton} onClick={() => changeLanguage('ar')}>AR</button>
      <button style={styles.langButton} onClick={() => changeLanguage('en')}>EN</button>
    </div>
  );
};

// Add UserStyles component for consistent styling
const UserStyles = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .nav-link:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
      
      .active-link {
        background-color: #1890ff !important;
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

const UserManagement = () => {
  const [language, setLanguage] = useState('en');
  const [users, setUsers] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isOpen, setIsOpen] = useState(true);
  // State for user filter and tabs
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState('allUsers');
  const [filterText, setFilterText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contentMarginLeft, setContentMarginLeft] = useState('0px');

  // Function to fetch user details
  const fetchUserDetails = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/users/${userId}`);
      setSelectedUser(response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  // Check localStorage for language on load
  useEffect(() => {
    const lang = localStorage.getItem('language') || 'en';
    setLanguage(lang);
  }, []);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/users`);
        setUsers(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Error fetching users');
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Handle window resize
  useEffect(() => {
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
      setContentMarginLeft(isOpen ? '290px' : '0px');
    }
  }, [isOpen, windowWidth]);

  // Reset filter
  const resetFilter = () => {
    setFilterText('');
  };

  // Get filtered users
  const getFilteredUsers = () => {
    return users.filter(user => 
      user.name?.toLowerCase().includes(filterText.toLowerCase()) ||
      user.email?.toLowerCase().includes(filterText.toLowerCase())
    );
  };

  // Responsive: detect mobile
  const isMobile = windowWidth < 768;

  return (
    <div style={styles.container}>
      <UserStyles />
      <div 
        style={{ 
          ...styles.mainWrapper,
          marginLeft: contentMarginLeft
        }}
      >
        <div style={
          isMobile
            ? {
                margin: '0 auto',
                maxWidth: 430,
                backgroundColor: '#fff',
                borderRadius: 14,
                padding: '14px 4px 24px 4px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                minHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
              }
            : styles.mainContent
        }>
          <div style={
            isMobile
              ? {
                  ...styles.pageHeader,
                  marginBottom: 18,
                }
              : styles.pageHeader
          }>
            <h1 style={isMobile ? { ...styles.pageTitle, fontSize: 20, marginBottom: 4, marginTop: 8 } : styles.pageTitle}>
              {translations.userManagementTitle[language]}
            </h1>
            <div style={isMobile ? { ...styles.titleUnderline, marginBottom: 8 } : styles.titleUnderline}></div>
            <p style={isMobile ? { ...styles.pageSubtitle, fontSize: 13, marginBottom: 10 } : styles.pageSubtitle}>
              Manage users, view profiles, and track user activity
            </p>
          </div>
          
          <div
            style={
              isMobile
                ? {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    width: '100%',
                    alignItems: 'center',
                    marginBottom: '18px',
                  }
                : styles.tabBar
            }
          >
            <button
              className="tab-button"
              style={
                isMobile
                  ? {
                      ...(activeTab === 'allUsers' ? styles.tabButtonActive : styles.tabButton),
                      width: '100%',
                      maxWidth: 400,
                      alignSelf: 'center',
                      margin: 0,
                    }
                  : activeTab === 'allUsers'
                  ? styles.tabButtonActive
                  : styles.tabButton
              }
              onClick={() => setActiveTab('allUsers')}
            >
              {translations.allUsers[language]}
            </button>
            <button
              className="tab-button"
              style={
                isMobile
                  ? {
                      ...(activeTab === 'addUser' ? styles.tabButtonActive : styles.tabButton),
                      width: '100%',
                      maxWidth: 400,
                      alignSelf: 'center',
                      margin: 0,
                    }
                  : activeTab === 'addUser'
                  ? styles.tabButtonActive
                  : styles.tabButton
              }
              onClick={() => setActiveTab('addUser')}
            >
              {translations.addUser[language]}
            </button>
          </div>
          
          {activeTab === 'allUsers' && (
            <div>
              <div
                style={
                  isMobile
                    ? {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        gap: '10px',
                        marginBottom: '18px',
                      }
                    : styles.filterContainer
                }
              >
                <input
                  type="text"
                  placeholder={translations.filterBy[language]}
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                  style={
                    isMobile
                      ? {
                          ...styles.filterInput,
                          width: '100%',
                          maxWidth: 400,
                          alignSelf: 'center',
                          margin: 0,
                        }
                      : styles.filterInput
                  }
                />
                <button
                  style={
                    isMobile
                      ? {
                          ...styles.resetButton,
                          width: '100%',
                          maxWidth: 400,
                          alignSelf: 'center',
                          margin: 0,
                        }
                      : styles.resetButton
                  }
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
                <div
                  style={
                    isMobile
                      ? {
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '14px',
                        }
                      : styles.usersListContainer
                  }
                >
                  {!isMobile && (
                    <div style={styles.usersListHeader}>
                      <div style={styles.headerColumn}>Avatar</div>
                      <div style={styles.headerColumn}>Name</div>
                      <div style={styles.headerColumn}>Email</div>
                      <div style={styles.headerColumn}>Status</div>
                      <div style={styles.headerColumn}>Role</div>
                      <div style={styles.headerColumn}>Joined</div>
                      <div style={styles.headerColumnActions}>Actions</div>
                    </div>
                  )}
                  {getFilteredUsers().length === 0 ? (
                    <div style={styles.noUsers}>No users found matching your search criteria</div>
                  ) : (
                    getFilteredUsers().map((user) => (
                      <div
                        key={user.id}
                        style={
                          isMobile
                            ? {
                                background: '#fff',
                                borderRadius: 10,
                                boxShadow: '0 1px 6px rgba(0,0,0,0.07)',
                                padding: '14px 10px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 8,
                              }
                            : styles.userRow
                        }
                        className="user-row"
                      >
                        <div style={isMobile ? { display: 'flex', alignItems: 'center', gap: 10 } : styles.userColumn} data-label="Avatar">
                          <div style={styles.listAvatar}>
                            <img
                              src={DEFAULT_AVATAR}
                              alt="Avatar"
                              style={styles.listAvatarImage}
                            />
                          </div>
                          {isMobile && (
                            <span style={{ ...styles.userName, fontSize: 15, fontWeight: 700 }}>{user.name}</span>
                          )}
                        </div>
                        {!isMobile && (
                          <div style={styles.userColumn} data-label="Name">
                            <span style={styles.userName}>{user.name}</span>
                          </div>
                        )}
                        <div style={isMobile ? { display: 'flex', flexDirection: 'column', gap: 2 } : styles.userColumn} data-label="Email">
                          <span style={styles.userEmail}>{user.email}</span>
                        </div>
                        <div style={isMobile ? { display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'center' } : styles.userColumn} data-label="Status">
                          <span
                            style={{
                              ...styles.statusBadge,
                              backgroundColor: user.status === 'active' ? 'rgba(82, 196, 26, 0.2)' : 'rgba(255, 77, 79, 0.2)',
                              color: user.status === 'active' ? '#52c41a' : '#ff4d4f',
                              fontSize: isMobile ? 12 : 12,
                            }}
                          >
                            {user.status || 'N/A'}
                          </span>
                          {isMobile && (
                            <span style={{ ...styles.userRole, fontSize: 12, color: '#888' }}>{user.role || 'User'}</span>
                          )}
                        </div>
                        {!isMobile && (
                          <div style={styles.userColumn} data-label="Role">
                            <span style={styles.userRole}>{user.role || 'User'}</span>
                          </div>
                        )}
                        <div style={isMobile ? { fontSize: 12, color: '#888' } : styles.userColumn} data-label="Joined">
                          <span style={styles.userJoined}>{new Date(user.created_at || Date.now()).toLocaleDateString()}</span>
                        </div>
                        <div style={isMobile ? { marginTop: 6 } : styles.userColumnActions} data-label="Actions">
                          <div style={isMobile ? { display: 'flex', gap: 8 } : styles.rowActions}>
                            <button
                              style={isMobile ? { ...styles.editButton, fontSize: 13, padding: '8px 0', minWidth: 0, flex: 1 } : styles.editButton}
                              onClick={() => {
                                fetchUserDetails(user.id);
                              }}
                              className="edit-button card-icon-button"
                            >
                              <FaEdit style={styles.actionIcon} /> View
                            </button>
                            <button
                              style={isMobile ? { ...styles.deleteButton, fontSize: 13, padding: '8px 0', minWidth: 0, flex: 1 } : styles.deleteButton}
                              onClick={() => {
                                if (window.confirm('Are you sure you want to delete this user?')) {
                                  // Delete logic would go here
                                  console.log('Delete user:', user.id);
                                }
                              }}
                              className="delete-button card-icon-button"
                            >
                              <FaTrash style={styles.actionIcon} /> Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'addUser' && (
            <div
              style={
                isMobile
                  ? {
                      ...styles.formContainer,
                      maxWidth: 430,
                      padding: '14px 4px 24px 4px',
                      borderRadius: 14,
                    }
                  : styles.formContainer
              }
            >
              <h2 style={isMobile ? { ...styles.formTitle, fontSize: 18, marginBottom: 12 } : styles.formTitle}>
                {translations.addUser[language]}
              </h2>
              
              <form style={isMobile ? { ...styles.form, gap: 0 } : styles.form}>
                <div
                  style={
                    isMobile
                      ? { display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 10 }
                      : styles.formRow
                  }
                >
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Name</label>
                    <input
                      type="text"
                      style={isMobile ? { ...styles.input, width: '100%' } : styles.input}
                      required
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Email</label>
                    <input
                      type="email"
                      style={isMobile ? { ...styles.input, width: '100%' } : styles.input}
                      required
                    />
                  </div>
                </div>
                <div
                  style={
                    isMobile
                      ? { display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 10 }
                      : styles.formRow
                  }
                >
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Password</label>
                    <input
                      type="password"
                      style={isMobile ? { ...styles.input, width: '100%' } : styles.input}
                      required
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Role</label>
                    <select
                      style={isMobile ? { ...styles.select, width: '100%' } : styles.select}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
                <div
                  style={
                    isMobile
                      ? { display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }
                      : styles.formButtons
                  }
                >
                  <button
                    type="submit"
                    style={isMobile ? { ...styles.submitButton, width: '100%' } : styles.submitButton}
                    className="form-button"
                  >
                    Add User
                  </button>
                  <button
                    type="button"
                    style={isMobile ? { ...styles.cancelButton, width: '100%' } : styles.cancelButton}
                    onClick={() => setActiveTab('allUsers')}
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
      
      {/* User Details Modal */}
      {selectedUser && (
        <div
          style={isMobile ? { ...styles.modalOverlay, padding: 0 } : styles.modalOverlay}
          onClick={() => setSelectedUser(null)}
        >
          <div
            style={
              isMobile
                ? {
                    ...styles.modalContent,
                    width: '98vw',
                    maxWidth: 430,
                    padding: '12px 6px',
                  }
                : styles.modalContent
            }
            onClick={(e) => e.stopPropagation()}
          >
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>{translations.userDetails[language]}</h2>
              <button 
                style={styles.modalClose}
                onClick={() => setSelectedUser(null)}
              >
                &times;
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.modalUserHeader}>
                <div style={styles.modalAvatar}>
                  <img
                    src={DEFAULT_AVATAR}
                    alt="Avatar"
                    style={styles.modalAvatarImage}
                  />
                </div>
                <div>
                  <h3 style={styles.modalUserName}>{selectedUser.name}</h3>
                </div>
              </div>
              
              <div style={styles.modalDetailSection}>
                <h4 style={styles.modalSectionTitle}>Account Information</h4>
                <div style={styles.modalDetail}>
                  <span style={styles.modalDetailLabel}>User ID:</span>
                  <span style={styles.modalDetailValue}>{selectedUser.id}</span>
                </div>
                <div style={styles.modalDetail}>
                  <span style={styles.modalDetailLabel}>Status:</span>
                  <span 
                    style={{
                      ...styles.modalStatusBadge,
                      backgroundColor: selectedUser.status === 'active' ? 'rgba(82, 196, 26, 0.2)' : 'rgba(255, 77, 79, 0.2)',
                      color: selectedUser.status === 'active' ? '#52c41a' : '#ff4d4f'
                    }}
                  >
                    {selectedUser.status || 'N/A'}
                  </span>
                </div>
                <div style={styles.modalDetail}>
                  <span style={styles.modalDetailLabel}>Role:</span>
                  <span style={styles.modalDetailValue}>{selectedUser.role || 'User'}</span>
                </div>
                <div style={styles.modalDetail}>
                  <span style={styles.modalDetailLabel}>Email:</span>
                  <span style={styles.modalDetailValue}>{selectedUser.email}</span>
                </div>
                <div style={styles.modalDetail}>
                  <span style={styles.modalDetailLabel}>Phone:</span>
                  <span style={styles.modalDetailValue}>{selectedUser.phone || 'No phone number'}</span>
                </div>
                <div style={styles.modalDetail}>
                  <span style={styles.modalDetailLabel}>Joined:</span>
                  <span style={styles.modalDetailValue}>{new Date(selectedUser.created_at || Date.now()).toLocaleDateString()}</span>
                </div>
              </div>

              <div style={styles.modalDetailSection}>
                <h4 style={styles.modalSectionTitle}>Booking History</h4>
                <div style={styles.modalDetail}>
                  <span style={styles.modalDetailLabel}>Total Bookings:</span>
                  <span style={styles.modalDetailValue}>{selectedUser.total_bookings || 0}</span>
                </div>
                <div style={styles.modalDetail}>
                  <span style={styles.modalDetailLabel}>Pending Bookings:</span>
                  <span style={styles.modalDetailValue}>{selectedUser.pending_bookings || 0}</span>
                </div>
                <div style={styles.modalDetail}>
                  <span style={styles.modalDetailLabel}>Active Bookings:</span>
                  <span style={styles.modalDetailValue}>{selectedUser.active_bookings || 0}</span>
                </div>
                <div style={styles.modalDetail}>
                  <span style={styles.modalDetailLabel}>Completed Bookings:</span>
                  <span style={styles.modalDetailValue}>{selectedUser.completed_bookings || 0}</span>
                </div>
                <div style={styles.modalDetail}>
                  <span style={styles.modalDetailLabel}>Cancelled Bookings:</span>
                  <span style={styles.modalDetailValue}>{selectedUser.cancelled_bookings || 0}</span>
                </div>
                <div style={styles.modalDetail}>
                  <span style={styles.modalDetailLabel}>Total Amount Spent:</span>
                  <span style={styles.modalDetailValue}>
                    {selectedUser.total_spent ? `${selectedUser.total_spent.toFixed(2)} MAD` : '0.00 MAD'}
                  </span>
                </div>
              </div>
              
              <div style={styles.modalActions}>
                <button
                  style={isMobile ? { ...styles.modalDeleteButton, width: '100%' } : styles.modalDeleteButton}
                  className="delete-button"
                >
                  <FaTrash style={styles.actionIcon} /> Delete User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

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
    backgroundColor: '#001529',
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
  navUserName: {
    fontWeight: '600',
    color: 'white',
  },
  navUserRole: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: '14px',
  },
  userName: {
    color: '#001529',
    fontSize: '15px',
    fontWeight: '600',
  },
  userRole: {
    color: '#666',
    fontSize: '14px',
    fontWeight: '500',
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
  loading: {
    textAlign: 'center',
    margin: '20px 0',
    fontSize: '16px',
    color: '#666',
  },
  error: {
    textAlign: 'center',
    margin: '20px 0',
    color: '#ff4d4f',
    fontSize: '16px',
  },
  usersListContainer: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  usersListHeader: {
    display: 'flex',
    backgroundColor: '#f9fafc',
    padding: '15px 20px',
    fontWeight: '600',
    color: '#001529',
    borderBottom: '1px solid #e8e8e8',
  },
  headerColumn: {
    flex: 1,
    padding: '0 10px',
  },
  headerColumnActions: {
    flex: 1.5,
    padding: '0 10px',
  },
  userRow: {
    display: 'flex',
    padding: '15px 20px',
    alignItems: 'center',
    borderBottom: '1px solid #f0f0f0',
    backgroundColor: '#fff',
    transition: 'all 0.3s ease',
  },
  userColumn: {
    flex: 1,
    padding: '0 10px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  userColumnActions: {
    flex: 1.5,
    padding: '0 10px',
  },
  listAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    overflow: 'hidden',
    border: '2px solid #f0f0f0',
  },
  listAvatarImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  rowActions: {
    display: 'flex',
    gap: '8px',
    width: '100%',
    minWidth: '170px',
  },
  noUsers: {
    padding: '30px',
    textAlign: 'center',
    color: '#999',
    fontSize: '16px',
  },
  userEmail: {
    color: '#666',
    fontSize: '14px',
  },
  userJoined: {
    color: '#666',
    fontSize: '14px',
  },
  statusBadge: {
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '500',
  },
  actionIcon: {
    fontSize: '15px',
    marginRight: '4px',
  },
  editButton: {
    backgroundColor: '#1890ff',
    color: '#fff',
    padding: '6px 10px',
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
    fontSize: '12px',
    letterSpacing: '0.3px',
    minWidth: '70px',
    whiteSpace: 'nowrap',
  },
  deleteButton: {
    backgroundColor: '#ff4d4f',
    color: '#fff',
    padding: '6px 10px',
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
    fontSize: '12px',
    letterSpacing: '0.3px',
    minWidth: '70px',
    whiteSpace: 'nowrap',
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
    color: '#001529',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '8px',
    color: '#666',
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #d9d9d9',
    fontSize: '14px',
    transition: 'border-color 0.3s',
  },
  select: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #d9d9d9',
    fontSize: '14px',
    transition: 'border-color 0.3s',
  },
  formButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
    gap: '15px',
  },
  submitButton: {
    padding: '12px 0',
    backgroundColor: '#1890ff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
    flex: '1',
    fontSize: '14px',
    transition: 'background-color 0.3s',
  },
  cancelButton: {
    padding: '12px 0',
    backgroundColor: '#ff7875',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
    flex: '1',
    fontSize: '14px',
    transition: 'background-color 0.3s',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1500,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '25px',
    width: '90%',
    maxWidth: '500px',
    maxHeight: '80vh',
    overflow: 'auto',
    boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    borderBottom: '1px solid #f0f0f0',
    paddingBottom: '15px',
  },
  modalTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: 0,
    color: '#001529',
  },
  modalClose: {
    fontSize: '24px',
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
    color: '#666',
  },
  modalBody: {
    textAlign: 'left',
  },
  modalUserHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  modalAvatar: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    overflow: 'hidden',
    marginRight: '20px',
    border: '2px solid #f0f0f0',
  },
  modalAvatarImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  modalUserName: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#001529',
    margin: '0 0 5px 0',
  },
  modalDetailSection: {
    marginBottom: '20px',
  },
  modalSectionTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#001529',
    margin: '0 0 15px 0',
    borderBottom: '1px solid #f0f0f0',
    paddingBottom: '10px',
  },
  modalDetail: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
    fontSize: '14px',
  },
  modalDetailLabel: {
    color: '#666',
    fontWeight: '500',
  },
  modalDetailValue: {
    color: '#001529',
    fontWeight: '600',
  },
  modalStatusBadge: {
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '500',
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '25px',
    gap: '15px',
  },
  modalDeleteButton: {
    backgroundColor: '#ff4d4f',
    color: '#fff',
    padding: '10px 0',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
    flex: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    fontSize: '14px',
  },
  linkContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  settingsNote: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.7)',
  },
};

export default UserManagement;

