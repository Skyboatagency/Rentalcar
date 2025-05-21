import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Navbar from '../components/Navbar';

const API_URL = process.env.REACT_APP_API_URL;

// Objet de traductions
const translations = {
  customersTitle: {
    fr: "Clients",
    en: "Customers",
    ar: "العملاء"
  },
  searchPlaceholder: {
    fr: "Rechercher...",
    en: "Search...",
    ar: "ابحث..."
  },
  tableName: {
    fr: "NOM",
    en: "NAME",
    ar: "الاسم"
  },
  tableEmail: {
    fr: "EMAIL",
    en: "EMAIL",
    ar: "البريد الإلكتروني"
  },
  tablePhone: {
    fr: "NUMÉRO DE TÉLÉPHONE",
    en: "PHONE NUMBER",
    ar: "رقم الهاتف"
  },
  tableCreated: {
    fr: "CRÉÉ",
    en: "CREATED",
    ar: "تاريخ الإنشاء"
  },
  tableAction: {
    fr: "ACTION",
    en: "ACTION",
    ar: "الإجراء"
  },
  noUsersFound: {
    fr: "Aucun utilisateur trouvé.",
    en: "No users found.",
    ar: "لم يتم العثور على مستخدمين."
  },
  showing: {
    fr: "Affichage de",
    en: "Showing",
    ar: "عرض"
  },
  of: {
    fr: "sur",
    en: "of",
    ar: "من"
  },
  confirmDelete: {
    fr: "Voulez-vous vraiment supprimer cet utilisateur ?",
    en: "Are you sure you want to delete this user?",
    ar: "هل أنت متأكد أنك تريد حذف هذا المستخدم؟"
  }
};

// Composant LanguageSwitcher
const LanguageSwitcher = ({ language, setLanguage }) => {
  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <div style={styles.languageSwitcher}>
      <button style={styles.langButton} onClick={() => changeLanguage('fr')}>FR</button>
      <button style={styles.langButton} onClick={() => changeLanguage('en')}>EN</button>
      <button style={styles.langButton} onClick={() => changeLanguage('ar')}>AR</button>
    </div>
  );
};

const LocationContact = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  // Pour responsive et navbar
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isOpen, setIsOpen] = useState(true);
  const [contentMarginLeft, setContentMarginLeft] = useState('270px');

  // Gestion de la langue
  const [language, setLanguage] = useState('fr');
  useEffect(() => {
    const lang = localStorage.getItem('language') || 'fr';
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
      setContentMarginLeft(isOpen ? '270px' : '0px');
    }
  }, [isOpen, windowWidth]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/users`);
        setUsers(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
      }
    };
    fetchUsers();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const filteredUsers = users.filter((user) => {
    const fullName = (user.name || "").toLowerCase();
    const email = (user.email || "").toLowerCase();
    return fullName.includes(search.toLowerCase()) || email.includes(search.toLowerCase());
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleEdit = (userId) => {
    console.log("Éditer l'utilisateur :", userId);
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm(translations.confirmDelete[language]);
    if (!confirmDelete) return;
    try {
      await axios.delete(`${API_URL}/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  return (
    <div style={styles.page}>
      <LanguageSwitcher language={language} setLanguage={setLanguage} />
      <Navbar language={language} isOpen={isOpen} setIsOpen={setIsOpen} />
      <div style={{ ...styles.mainContainer, marginLeft: contentMarginLeft }}>
        <h1 style={styles.title}>{translations.customersTitle[language]}</h1>
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder={translations.searchPlaceholder[language]}
            value={search}
            onChange={handleSearchChange}
            style={styles.searchInput}
          />
        </div>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.tableHeader}>{translations.tableName[language]}</th>
                <th style={styles.tableHeader}>{translations.tableEmail[language]}</th>
                <th style={styles.tableHeader}>{translations.tablePhone[language]}</th>
                <th style={styles.tableHeader}>{translations.tableCreated[language]}</th>
                <th style={styles.tableHeader}>{translations.tableAction[language]}</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id} style={styles.tableRow}>
                  <td style={styles.tableCell}>
                    <div style={styles.nameCell}>
                      <img
                        src={`https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(user.name || "User")}`}
                        alt="avatar"
                        style={styles.avatar}
                      />
                      <div>
                        <div style={styles.nameText}>{user.name}</div>
                        <div style={styles.emailText}>{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={styles.tableCell}>{user.email}</td>
                  <td style={styles.tableCell}>{user.phone || "N/A"}</td>
                  <td style={styles.tableCell}>
                    {new Date(user.createdAt).toLocaleDateString('en-GB', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </td>
                  <td style={styles.tableCell}>
                    <button style={styles.iconButton} onClick={() => handleEdit(user.id)}>
                      <FaEdit />
                    </button>
                    <button style={styles.iconButton} onClick={() => handleDelete(user.id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {currentUsers.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                    {translations.noUsersFound[language]}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div style={styles.paginationContainer}>
          <span>
            {translations.showing[language]} {currentUsers.length} {translations.of[language]} {filteredUsers.length}
          </span>
          <div style={styles.pagination}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                style={{
                  ...styles.pageButton,
                  ...(page === currentPage ? styles.activePageButton : {})
                }}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  languageSwitcher: {
    position: 'fixed',
    top: '10px',
    right: '10px',
    zIndex: 1200,
    display: 'flex',
    gap: '5px'
  },
  langButton: {
    padding: '6px 10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#722637',
    color: 'white',
    fontWeight: 'bold'
  },
  page: {
    display: 'flex',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
    flexDirection: 'column'
  },
  mainContainer: {
    margin: '80px auto 20px auto',
    padding: '20px',
    width: '90%',
    maxWidth: '1200px',
    backgroundColor: '#fdfdfd',
    border: '2px solid black',
    borderRadius: '19px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
    textAlign: 'center',
    transition: 'margin-left 0.3s ease'
  },
  searchContainer: {
    marginBottom: '20px'
  },
  searchInput: {
    padding: '10px',
    width: '300px',
    border: '1px solid #ccc',
    borderRadius: '4px'
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    minWidth: '600px',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  tableHeaderRow: {
    backgroundColor: '#f9f9f9'
  },
  tableHeader: {
    textAlign: 'left',
    padding: '12px 16px',
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#666'
  },
  tableRow: {
    borderBottom: '1px solid #eee'
  },
  tableCell: {
    padding: '12px 16px',
    fontSize: '14px',
    color: '#333',
    verticalAlign: 'middle'
  },
  nameCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%'
  },
  nameText: {
    fontWeight: 'bold',
    marginBottom: '4px'
  },
  emailText: {
    fontSize: '12px',
    color: '#777'
  },
  iconButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#666',
    fontSize: '16px',
    marginRight: '8px'
  },
  paginationContainer: {
    marginTop: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  pagination: {
    display: 'flex',
    gap: '6px'
  },
  pageButton: {
    border: '1px solid #ccc',
    background: '#fff',
    color: '#333',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  activePageButton: {
    background: '#722637ED',
    color: '#fff',
    border: '1px solid #722637ED'
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px'
  }
};

export default LocationContact;
