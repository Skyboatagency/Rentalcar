import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

// Add FeedbackStyles component for consistent styling
const FeedbackStyles = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .nav-link:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
      
      .active-link {
        background-color: #1890ff !important;
      }
      
      .feedback-card:hover {
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

const translations = {
  feedbackReviews: {
    fr: "Retour d'information et Avis",
    en: "Feedback and Reviews",
    ar: "الملاحظات والمراجعات"
  },
  pageSubtitle: {
    fr: "Gérez les avis et commentaires des utilisateurs",
    en: "Manage user feedback and reviews",
    ar: "إدارة ملاحظات وتقييمات المستخدمين"
  },
  allFeedback: {
    fr: "Tous les avis",
    en: "All Feedback",
    ar: "جميع الملاحظات"
  },
  filterBy: {
    fr: "Filtrer par :",
    en: "Filter by:",
    ar: "تصفية حسب:"
  },
  reset: {
    fr: "Réinitialiser",
    en: "Reset",
    ar: "إعادة تعيين"
  },
  user: {
    fr: "Utilisateur",
    en: "User",
    ar: "المستخدم"
  },
  car: {
    fr: "Véhicule",
    en: "Vehicle",
    ar: "المركبة"
  },
  startDate: {
    fr: "Date de début",
    en: "Start Date",
    ar: "تاريخ البداية"
  },
  endDate: {
    fr: "Date de fin",
    en: "End Date",
    ar: "تاريخ النهاية"
  }
};

const FeedbackReviews = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [language, setLanguage] = useState('en');
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [contentMarginLeft, setContentMarginLeft] = useState('280px');
  const [filterText, setFilterText] = useState('');

  // Responsive: detect mobile
  const isMobile = windowWidth < 768;

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
    
    fetchFeedbacks();
    
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

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/feedbacks`);
      const data = await response.json();
      setFeedbacks(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const handleReset = () => {
    setFilterText('');
  };

  const filteredFeedbacks = feedbacks.filter(feedback => 
    feedback.description.toLowerCase().includes(filterText.toLowerCase()) ||
    (feedback.User && feedback.User.name.toLowerCase().includes(filterText.toLowerCase())) ||
    (feedback.Car && feedback.Car.name.toLowerCase().includes(filterText.toLowerCase()))
  );

  return (
    <div style={styles.container}>
      <FeedbackStyles />
      <div style={{ 
        ...styles.mainWrapper,
        marginLeft: contentMarginLeft,
        transition: 'all 0.3s ease'
      }}>
        <div
          style={
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
          }
        >
          <div style={isMobile ? { ...styles.pageHeader, marginBottom: 18 } : styles.pageHeader}>
            <h1 style={isMobile ? { ...styles.pageTitle, fontSize: 20, marginBottom: 4, marginTop: 8 } : styles.pageTitle}>
              {translations.feedbackReviews[language]}
            </h1>
            <div style={isMobile ? { ...styles.titleUnderline, marginBottom: 8 } : styles.titleUnderline}></div>
            <p style={isMobile ? { ...styles.pageSubtitle, fontSize: 13, marginBottom: 10 } : styles.pageSubtitle}>
              {translations.pageSubtitle[language]}
            </p>
          </div>

          {/* Action Buttons */}
          <div style={isMobile ? { display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 12 } : styles.actionButtons}>
            <button
              style={isMobile ? { ...styles.primaryButton, width: '100%', maxWidth: 400, alignSelf: 'center', fontSize: 15 } : styles.primaryButton}
              onClick={fetchFeedbacks}
            >
              {translations.allFeedback[language]}
            </button>
          </div>

          {/* Filter */}
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
              value={filterText}
              onChange={handleFilterChange}
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
              onClick={handleReset}
            >
              {translations.reset[language]}
            </button>
          </div>

          {/* Feedback List */}
          <div
            style={
              isMobile
                ? { display: 'flex', flexDirection: 'column', gap: 14 }
                : styles.feedbackList
            }
          >
            {loading ? (
              <div style={styles.loading}>Loading...</div>
            ) : filteredFeedbacks.length === 0 ? (
              <div style={styles.noData}>No feedback available</div>
            ) : (
              filteredFeedbacks.map((feedback) => (
                <div
                  key={feedback.id}
                  style={
                    isMobile
                      ? {
                          ...styles.feedbackCard,
                          padding: '14px 10px',
                          borderRadius: 10,
                          boxShadow: '0 1px 6px rgba(0,0,0,0.07)',
                        }
                      : styles.feedbackCard
                  }
                  className="feedback-card"
                >
                  <div style={styles.feedbackHeader}>
                    <div style={styles.userInfo}>
                      <span style={styles.label}>{translations.user[language]}:</span>
                      <span style={styles.value}>{feedback.User ? feedback.User.name : 'Unknown User'}</span>
                      <span style={styles.email}>{feedback.User ? feedback.User.email : ''}</span>
                    </div>
                    <div style={styles.carInfo}>
                      <span style={styles.label}>{translations.car[language]}:</span>
                      <span style={styles.value}>
                        {feedback.Car ? `${feedback.Car.name} ${feedback.Car.model} (${feedback.Car.year})` : 'Unknown Vehicle'}
                      </span>
                    </div>
                  </div>
                  <div style={isMobile ? { ...styles.rating, fontSize: 16 } : styles.rating}>
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        style={{
                          ...styles.star,
                          color: i < feedback.stars ? '#ffd700' : '#ddd',
                          fontSize: isMobile ? 18 : 20,
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <div style={isMobile ? { ...styles.dates, flexDirection: 'column', gap: 2 } : styles.dates}>
                    <div style={styles.dateItem}>
                      <span style={styles.label}>{translations.startDate[language]}:</span>
                      <span style={styles.value}>{new Date(feedback.start_date).toLocaleDateString()}</span>
                    </div>
                    <div style={styles.dateItem}>
                      <span style={styles.label}>{translations.endDate[language]}:</span>
                      <span style={styles.value}>{new Date(feedback.end_date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div style={styles.description}>
                    <p style={isMobile ? { ...styles.feedbackText, fontSize: 13 } : styles.feedbackText}>{feedback.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
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
  pageSubtitle: {
    fontSize: '14px',
    color: '#666',
    margin: 0,
  },
  actionButtons: {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
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
  filterContainer: {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
  },
  filterInput: {
    flex: 1,
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #d9d9d9',
    fontSize: '14px',
  },
  resetButton: {
    backgroundColor: '#1890ff',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  feedbackList: {
    display: 'grid',
    gap: '20px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  },
  feedbackCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
  },
  loading: {
    textAlign: 'center',
    padding: '40px',
    color: '#666',
  },
  noData: {
    textAlign: 'center',
    padding: '40px',
    color: '#666',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
  },
  feedbackHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  carInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '12px',
    color: '#666',
    marginBottom: '2px',
  },
  value: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#333',
  },
  rating: {
    marginBottom: '10px',
  },
  star: {
    fontSize: '20px',
    marginRight: '2px',
  },
  dates: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  dateItem: {
    display: 'flex',
    flexDirection: 'column',
  },
  description: {
    marginTop: '10px',
  },
  feedbackText: {
    fontSize: '14px',
    color: '#333',
    lineHeight: '1.5',
    margin: 0,
  },
  email: {
    fontSize: '12px',
    color: '#666',
    marginTop: '2px',
  },
};

export default FeedbackReviews;
