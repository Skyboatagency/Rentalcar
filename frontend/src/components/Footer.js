import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaEnvelope } from 'react-icons/fa';

const Footer = ({ lang }) => {
  const [email, setEmail] = useState('');
  
  const handleSubscribe = () => {
    if (email) {
      alert('Thank you for subscribing!');
      setEmail('');
    }
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.newFooterContainer}>
        <div style={styles.footerColumn}>
          <h3 style={styles.footerTitle}>{lang?.footerAbout || 'About Us'}</h3>
          <p style={styles.footerDescription}>
            Snaibcar is your trusted partner in car rental services across Morocco. We offer a wide range of vehicles with competitive prices and exceptional service.
          </p>
          <div style={styles.socialLinks}>
            <a href="https://www.instagram.com/snaibcar/" target="_blank" rel="noreferrer" style={styles.socialLink}>
              <FaInstagram size={20} />
            </a>
            <a href="https://web.facebook.com/snaibcar/" target="_blank" rel="noreferrer" style={styles.socialLink}>
              <FaFacebook size={20} />
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=snaibcar@gmail.com" target="_blank" rel="noreferrer" style={styles.socialLink}>
              <FaEnvelope size={20} />
            </a>
          </div>
        </div>

        <div style={styles.footerColumn}>
          <h3 style={styles.footerTitle}>{lang?.footerQuickLinks || 'Quick Links'}</h3>
          <ul style={styles.footerList}>
            <li style={styles.footerListItem}>
              <Link to="/" style={styles.footerLink}>{lang?.footerHome || 'Home'}</Link>
            </li>
            <li style={styles.footerListItem}>
              <Link to="/available-cars" style={styles.footerLink}>{lang?.navAvailableCars || 'Available Cars'}</Link>
            </li>
            <li style={styles.footerListItem}>
              <Link to="/contact-us" style={styles.footerLink}>{lang?.footerContact || 'Contact Us'}</Link>
            </li>
            <li style={styles.footerListItem}>
              <Link to="/about-us" style={styles.footerLink}>About Us</Link>
            </li>
          </ul>
        </div>

        <div style={styles.footerColumn}>
          <h3 style={styles.footerTitle}>{lang?.footerLocation || 'Contact Info'}</h3>
          <ul style={styles.footerList}>
            <li style={styles.footerListItem}>
              <span style={styles.contactInfo}>Projet Hassane 2 imm.34 N09 Hay El Mohammadi Casablanca</span>
              <span style={styles.contactInfo}>Casablanca, Morocco</span>
            </li>
            <li style={styles.footerListItem}>
              <span style={styles.contactInfo}>Phone: +212 522 623 462</span>
              <span style={styles.contactInfo}>Email: Snaibcar@gmail.com</span>
            </li>
          </ul>
          <div style={styles.mapWrapper}>
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.9980075513337!2d-7.643954084800436!3d33.59400188082776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7b0e18d23b05f%3A0xc83a0f7ec5a3edc6!2s365%20Boulevard%20Zerktouni%2C%20Casablanca%2C%20Morocco!5e0!3m2!1sen!2sma!4v1678731361201!5m2!1sen!2sma"
              width="100%"
              height="150"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div style={styles.footerColumn}>
          <h3 style={styles.footerTitle}>Newsletter</h3>
          <p style={styles.newsletterText}>Subscribe to our newsletter for updates and exclusive offers.</p>
          <div style={styles.newsletterForm}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              style={styles.newsletterInput} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button style={styles.newsletterButton} onClick={handleSubscribe}>Subscribe</button>
          </div>
        </div>
      </div>
      <div style={styles.footerBottom}>
        <p style={styles.footerCopyright}>{lang?.footerCopyright || '©2024 Snaibcar. All rights reserved'}</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#111",
    color: "#fff",
    padding: "80px 20px 20px",
    marginTop: "auto",
    width: "100%",
    textAlign: "left"
  },
  newFooterContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "40px",
    maxWidth: "1200px",
    margin: "0 auto"
  },
  footerColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  footerTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#fff",
    marginBottom: "10px",
    position: "relative",
    paddingBottom: "10px",
    textAlign: "left"
  },
  footerDescription: {
    fontSize: "14px",
    color: "#999",
    lineHeight: "1.6",
    margin: 0,
    textAlign: "left"
  },
  socialLinks: {
    display: "flex",
    gap: "15px",
    marginTop: "10px"
  },
  socialLink: {
    color: "#fff",
    transition: "color 0.3s ease",
    textDecoration: "none"
  },
  footerList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    textAlign: "left"
  },
  footerListItem: {
    marginBottom: "12px"
  },
  footerLink: {
    color: "#999",
    textDecoration: "none",
    fontSize: "14px",
    transition: "color 0.3s ease"
  },
  contactInfo: {
    display: "block",
    color: "#999",
    fontSize: "14px",
    marginBottom: "5px",
    textAlign: "left"
  },
  mapWrapper: {
    width: "100%",
    borderRadius: "8px",
    overflow: "hidden",
    marginTop: "10px"
  },
  newsletterText: {
    fontSize: "14px",
    color: "#999",
    marginBottom: "15px",
    textAlign: "left"
  },
  newsletterForm: {
    display: "flex",
    gap: "10px",
    flexDirection: "column",
    textAlign: "left",
    "@media (min-width: 480px)": {
      flexDirection: "row"
    }
  },
  newsletterInput: {
    flex: 1,
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #333",
    backgroundColor: "#222",
    color: "#fff",
    fontSize: "14px",
    width: "100%"
  },
  newsletterButton: {
    padding: "10px 20px",
    backgroundColor: "#E31837",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "background-color 0.3s ease"
  },
  footerBottom: {
    textAlign: "left",
    paddingTop: "30px",
    marginTop: "40px",
    borderTop: "1px solid #333"
  },
  footerCopyright: {
    color: "#999",
    fontSize: "14px",
    margin: 0,
  }
};

export default Footer; 