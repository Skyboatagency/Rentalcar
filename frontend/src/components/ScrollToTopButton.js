import React, { useState, useEffect } from 'react';
import { FaChevronUp } from 'react-icons/fa';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScrollPercentage = Math.round((window.scrollY / scrollHeight) * 100);
      setScrollPercentage(currentScrollPercentage);
      setIsVisible(currentScrollPercentage > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <div
      onClick={scrollToTop}
      style={{
        position: "fixed",
        right: "20px",
        bottom: "100px",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        zIndex: 9999,
        background: `conic-gradient(#722637 ${scrollPercentage}%, #f5f5f5 0%)`,
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.boxShadow = '0 6px 15px rgba(0,0,0,0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
      }}
    >
      <div style={{
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        backgroundColor: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <FaChevronUp style={{ color: "#333", fontSize: "25px" }} />
      </div>
    </div>
  );
};

export default ScrollToTopButton; 