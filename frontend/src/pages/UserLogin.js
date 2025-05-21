import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UserLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);

  // Monitor screen width to conditionally display the image column
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const navigate = useNavigate();

  // Handle window resize
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
      
      .social-button:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
      
      .or-divider::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 1px;
        background-color: rgba(255, 255, 255, 0.2);
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/login`,
        { email: username, password }
      );
      
      if (response.data.success) {
        // Add client role to user object
        const userData = { ...response.data.user, role: "client" };
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("userId", response.data.user.id);
        navigate("/");
      } else {
        setError(response.data.message || "Login failed!");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(
        error.response?.data?.message || "Invalid credentials!"
      );
    } finally {
      setLoading(false);
    }
  };

  const openForgotModal = () => {
    setShowForgotModal(true);
  };

  const closeForgotModal = () => {
    setShowForgotModal(false);
  };

  return (
    <div style={styles.container}>
      {/* FORM SIDE (Left) */}
      <div style={styles.formSide}>
        <div style={styles.formContainer}>
          <h1 style={styles.title}>Sign In</h1>
          <div style={styles.titleUnderline}></div>
          <p style={styles.subtitle}>Enter your credentials to access your account.</p>
          
          {error && <div style={styles.errorBox}>{error}</div>}
          
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={styles.input}
                className="input-field"
                placeholder="example@example.com"
              />
            </div>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                className="input-field"
                placeholder="********"
              />
            </div>
            
            <div style={styles.rememberForgotRow}>
              <div style={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={styles.checkbox}
                />
                <label htmlFor="rememberMe" style={styles.rememberLabel}>
                  Remember me
                </label>
              </div>
              <span onClick={openForgotModal} style={styles.forgotPasswordLink} className="forgot-password">
                Forget Password?
              </span>
            </div>
            
            <button 
              type="submit" 
              style={styles.signInButton} 
              className="sign-in-button"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
          
          <div style={styles.orDivider} className="or-divider">
            <span style={styles.orText}>OR</span>
          </div>
          
          <div style={styles.registerContainer}>
            <p style={styles.registerText}>New user? <Link to="/UserRegister" style={styles.createAccountLink}>Create an Account</Link></p>
          </div>
        </div>
      </div>

      {/* IMAGE SIDE (Right) - Hide on smaller screens */}
      {screenWidth >= 768 && (
        <div style={styles.imageSide}>
          {/* You can add content here if you wish */}
        </div>
      )}

      {/* Forgot Password Modal */}
      {showForgotModal && <ForgotPasswordModal closeModal={closeForgotModal} />}
    </div>
  );
};

// ===================================================================
//                     ForgotPasswordModal
// ===================================================================
const ForgotPasswordModal = ({ closeModal }) => {
  // step = 1: enter email and send code
  // step = 2: enter received code and verify
  // step = 3: enter new password and confirmation
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Step 1: Send code via email
  const handleSendCode = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/forgot-password`,
        { email }
      );
      if (response.data.success) {
        setMessage(response.data.message);
        setStep(2); // Move to code verification step
      } else {
        setError(response.data.message || "Error sending code");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Error sending code"
      );
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify code
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/verify-code`,
        { email, code }
      );
      if (response.data.success) {
        setMessage("Code verified. You can reset your password.");
        setStep(3); // Move to password reset step
      } else {
        setError(response.data.message || "Invalid or expired code");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Error verifying code"
      );
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/reset-password`,
        { email, code, newPassword }
      );
      if (response.data.success) {
        setMessage(response.data.message);
        setTimeout(() => {
          closeModal();
        }, 3000);
      } else {
        setError(response.data.message || "Error resetting password");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Error resetting password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <span style={styles.closeButton} onClick={closeModal}>
          &times;
        </span>
        <h2 style={styles.modalTitle}>Reset Password</h2>
        
        {error && <div style={styles.errorBox}>{error}</div>}
        {message && <div style={styles.successBox}>{message}</div>}
        
        {step === 1 && (
          <form onSubmit={handleSendCode} style={styles.modalForm}>
            <div style={styles.inputGroup}>
              <label style={styles.modalLabel}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.modalInput}
                placeholder="Enter your email"
                required
              />
            </div>
            <button
              type="submit"
              style={styles.modalButton}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Code"}
            </button>
          </form>
        )}
        
        {step === 2 && (
          <form onSubmit={handleVerifyCode} style={styles.modalForm}>
            <div style={styles.inputGroup}>
              <label style={styles.modalLabel}>Verification Code</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                style={styles.modalInput}
                placeholder="Enter the code sent to your email"
                required
              />
            </div>
            <button
              type="submit"
              style={styles.modalButton}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify Code"}
            </button>
          </form>
        )}
        
        {step === 3 && (
          <form onSubmit={handleResetPassword} style={styles.modalForm}>
            <div style={styles.inputGroup}>
              <label style={styles.modalLabel}>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={styles.modalInput}
                placeholder="Enter new password"
                required
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.modalLabel}>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={styles.modalInput}
                placeholder="Confirm new password"
                required
              />
            </div>
            <button
              type="submit"
              style={styles.modalButton}
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
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
  createAccountLink: {
    color: "#1890ff",
    textDecoration: "none",
    fontWeight: "600",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
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
  rememberForgotRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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
  forgotPasswordLink: {
    fontSize: "14px",
    color: "#4096ff",
    textDecoration: "none",
    cursor: "pointer",
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
  orDivider: {
    position: "relative",
    textAlign: "center",
    marginTop: "25px",
    marginBottom: "25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  orText: {
    backgroundColor: "#001529",
    color: "#999",
    padding: "0 15px",
    fontSize: "14px",
    position: "relative",
    zIndex: "1",
  },
  socialLoginContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "16px",
  },
  socialButton: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    backgroundColor: "transparent",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "background-color 0.3s",
    fontSize: "18px",
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
  
  // Right side - Image
  imageSide: {
    flex: "1",
    backgroundImage: 'url("/images/driver.jpg")', // Fallback to Unsplash if local image missing
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  
  // Modal Styles
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "30px",
    width: "90%",
    maxWidth: "400px",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "15px",
    fontSize: "24px",
    cursor: "pointer",
    color: "#333",
  },
  modalTitle: {
    fontSize: "22px",
    marginBottom: "20px",
    textAlign: "center",
    color: "#333",
  },
  modalForm: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  modalLabel: {
    fontSize: "14px",
    color: "#333",
    fontWeight: "500",
  },
  modalInput: {
    padding: "12px 16px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #d9d9d9",
    color: "#333",
    outline: "none",
    transition: "border-color 0.3s",
  },
  modalButton: {
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
  registerContainer: {
    textAlign: "center",
    marginTop: "30px",
  },
  registerText: {
    fontSize: "14px",
    color: "#ccc",
    lineHeight: "1.5",
  },
};

export default UserLogin;
