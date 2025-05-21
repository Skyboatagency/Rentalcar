import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL; // Exemple: http://localhost:5000/api

const UserRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: form, 2: verification
  const [verificationCode, setVerificationCode] = useState("");
  const [tempUserId, setTempUserId] = useState(null);
  const [showCodeModal, setShowCodeModal] = useState(false);

  // On suit aussi la taille pour masquer l'image en mobile
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const navigate = useNavigate();

  // Gestion du redimensionnement
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Add CSS for hover states via style element
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .input-field:focus {
        border-color: #4096ff;
      }
      
      .forgot-password:hover {
        text-decoration: underline;
      }
      
      .sign-in-button:hover {
        background-color: #40a9ff;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Gestion des changements d'input
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Vérifications de base
    if (!formData.agree) {
      setErrorMessage("Please agree to our Terms & Conditions.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/users/register`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      console.log("Register response:", response.data);

      if (
        (response.data.success || response.data.tempUserId) ||
        (response.data.message && response.data.message.includes('Code de vérification'))
      ) {
        setSuccessMessage("A verification code has been sent to your email.");
        setTempUserId(response.data.tempUserId);
        setShowCodeModal(true);
      } else {
        setErrorMessage(response.data.message || "Registration failed!");
      }
    } catch (error) {
      console.error("Register error:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "An error occurred during registration."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/users/verify`, {
        email: formData.email,
        code: verificationCode,
      });

      if (response.data.success) {
        setSuccessMessage("Your account has been verified and created!");
        const userData = { ...response.data.user, role: "client" };
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("userId", response.data.user.id);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setErrorMessage(response.data.message || "Verification failed!");
      }
    } catch (error) {
      console.error("Verification error:", error);
      setErrorMessage(
        error.response?.data?.message ||
        "An error occurred during verification."
      );
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => {
    if (step === 1) {
      return (
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              style={styles.input}
              className="input-field"
              required
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              style={styles.input}
              className="input-field"
              required
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your phone number"
              style={styles.input}
              className="input-field"
              required
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              style={styles.input}
              className="input-field"
              required
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              style={styles.input}
              className="input-field"
              required
            />
          </div>
          
          <div style={styles.checkboxContainer}>
            <input
              type="checkbox"
              id="agree"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              style={styles.checkbox}
            />
            <label htmlFor="agree" style={styles.rememberLabel}>
              I agree to the{" "}
              <Link to="/terms-conditions" style={styles.termsLink}>
                Terms & Conditions
              </Link>
            </label>
          </div>
          
          <button
            type="submit"
            style={styles.signInButton}
            className="sign-in-button"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      );
    } else {
      return (
        <form onSubmit={handleVerifyCode} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Verification Code</label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Enter the code sent to your email"
              style={styles.input}
              className="input-field"
              required
            />
          </div>
          
          <button
            type="submit"
            style={styles.signInButton}
            className="sign-in-button"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify Code"}
          </button>
        </form>
      );
    }
  };

  // Ajout du composant modal pour le code de vérification
  const renderCodeModal = () => (
    showCodeModal && (
      <div style={modalStyles.overlay}>
        <div style={modalStyles.modal}>
          <div style={modalStyles.header}>
            <span style={modalStyles.headerTitle}>Vérification Email</span>
            <button onClick={() => setShowCodeModal(false)} style={modalStyles.closeBtn} title="Fermer">&times;</button>
          </div>
          <div style={{marginBottom: 16, color: '#555', textAlign: 'center'}}>Un code a été envoyé à votre email. Veuillez le saisir ci-dessous.</div>
          <form onSubmit={handleVerifyCode} style={{display: 'flex', flexDirection: 'column', gap: 16}}>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Code de vérification"
              style={{...styles.input, textAlign: 'center', fontSize: 18, letterSpacing: 4, background: '#f7faff', color: '#222', border: '1.5px solid #1890ff'}}
              className="input-field"
              required
              autoFocus
            />
            <div style={{display: 'flex', gap: 8, justifyContent: 'flex-end'}}>
              <button type="button" onClick={() => setShowCodeModal(false)} style={{...styles.signInButton, background: '#888', minWidth: 100}}>Annuler</button>
              <button type="submit" style={{...styles.signInButton, background: '#1890ff', minWidth: 120}} disabled={loading}>
                {loading ? "Vérification..." : "Valider"}
              </button>
            </div>
          </form>
          {errorMessage && <div style={styles.errorBox}>{errorMessage}</div>}
          {successMessage && <div style={styles.successBox}>{successMessage}</div>}
        </div>
      </div>
    )
  );

  return (
    <div style={styles.container}>
      {/* FORM SIDE (Left) */}
      <div style={styles.formSide}>
        <div style={styles.formContainer}>
          <h1 style={styles.title}>
            {step === 1 ? "Create an Account" : "Verify Your Email"}
          </h1>
          <div style={styles.titleUnderline}></div>
          <p style={styles.subtitle}>
            {step === 1
              ? "Enter your details to create your account"
              : "Enter the verification code sent to your email"}
          </p>
          
          {errorMessage && <div style={styles.errorBox}>{errorMessage}</div>}
          {successMessage && (
            <div style={styles.successBox}>{successMessage}</div>
          )}
          
          {renderForm()}
          
          {step === 1 && (
            <div style={styles.loginContainer}>
              <p style={styles.loginText}>
                Already have an account?{" "}
                <Link to="/UserLogin" style={styles.loginLink}>
                  Sign In
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* IMAGE SIDE (Right) - Hide on smaller screens */}
      {screenWidth >= 768 && (
        <div style={styles.imageSide}>
          {/* You can add content here if you wish */}
        </div>
      )}
      {renderCodeModal()}
    </div>
  );
};

// ===================================================================
//                         Styles
// ===================================================================
const styles = {
  container: {
    display: "flex",
    width: "100%",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  
  // Left side - Form
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
  checkboxContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  checkbox: {
    accentColor: "#4096ff",
  },
  rememberLabel: {
    fontSize: "14px",
    color: "#fff",
  },
  termsLink: {
    color: "#4096ff",
    textDecoration: "none",
    fontWeight: "500",
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
  
  // Right side - Image
  imageSide: {
    flex: "1",
    backgroundImage: 'url("/images/driver.jpg")', // Fallback to Unsplash if local image missing
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
};

// Styles pour la modal
const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0,0,0,0.45)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modal: {
    background: '#fff',
    borderRadius: 12,
    padding: '32px 28px 24px 28px',
    minWidth: 340,
    maxWidth: 400,
    boxShadow: '0 8px 32px rgba(24,144,255,0.18)',
    color: '#222',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    animation: 'popIn .3s cubic-bezier(.4,2,.6,1)' // animation d'apparition
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderBottom: '1.5px solid #e6f7ff',
    paddingBottom: 8
  },
  headerTitle: {
    fontWeight: 700,
    fontSize: 20,
    color: '#1890ff',
    letterSpacing: 1
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: 28,
    color: '#888',
    cursor: 'pointer',
    lineHeight: 1,
    marginLeft: 8
  }
};

export default UserRegister;
