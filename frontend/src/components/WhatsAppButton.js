import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = ({ phoneNumber = "+212659775582", message = "Hello, I'm interested in renting a car." }) => {
  const openWhatsApp = () => {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };

  return (
    <div 
      onClick={openWhatsApp}
      style={{
        position: "fixed",
        right: "20px",
        bottom: "30px",
        width: "60px",
        height: "60px",
        backgroundColor: "#25D366",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        zIndex: 9999,
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
      <FaWhatsapp style={{ fontSize: "30px", color: "#fff" }} />
    </div>
  );
};

export default WhatsAppButton; 