import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminRegister = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Form, 2: Verification
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    nomLocation: "",
    adresse: "",
    telephone: "",
    email: "",
    ville: "",
    password: "",
    confirmPassword: ""
  });
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [tempUserId, setTempUserId] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...dataToSend } = formData;
      
      const response = await axios.post("http://localhost:5000/api/admins/register", dataToSend);
      
      if (response.data.success) {
        setSuccess("Un code de vérification a été envoyé à votre email.");
        setTempUserId(response.data.tempUserId);
        setStep(2);
      } else {
        setError(response.data.message || "Une erreur est survenue lors de l'inscription");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.response?.data?.message || "Une erreur est survenue lors de l'inscription");
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:5000/api/admins/verify", {
        userId: tempUserId,
        code: verificationCode,
      });

      if (response.data.success) {
        setSuccess("Inscription réussie !");
        // Store user data and token
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setError(response.data.message || "Code de vérification invalide");
      }
    } catch (error) {
      console.error("Verification error:", error);
      setError(error.response?.data?.message || "Une erreur est survenue lors de la vérification");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.title}>Inscription Administrateur</h1>
        <div style={styles.titleUnderline}></div>

        {error && <div style={styles.errorBox}>{error}</div>}
        {success && <div style={styles.successBox}>{success}</div>}

        {step === 1 ? (
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Nom</label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Prénom</label>
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Nom de la Location</label>
              <input
                type="text"
                name="nomLocation"
                value={formData.nomLocation}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Adresse</label>
              <input
                type="text"
                name="adresse"
                value={formData.adresse}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Téléphone</label>
              <input
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Ville</label>
              <input
                type="text"
                name="ville"
                value={formData.ville}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Mot de passe</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                style={styles.input}
                required
                minLength="6"
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Confirmer le mot de passe</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                style={styles.input}
                required
                minLength="6"
              />
            </div>

            <button type="submit" style={styles.submitButton}>
              S'inscrire
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerification} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Code de Vérification</label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                style={styles.input}
                required
              />
            </div>
            <button type="submit" style={styles.submitButton}>
              Vérifier
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
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    padding: "20px",
  },
  formContainer: {
    width: "100%",
    maxWidth: "500px",
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "10px",
    color: "#333",
    textAlign: "center",
  },
  titleUnderline: {
    height: "3px",
    width: "60px",
    background: "linear-gradient(90deg, #1890ff, #40a9ff)",
    margin: "0 auto",
    marginBottom: "20px",
    borderRadius: "2px",
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
    color: "#333",
    fontWeight: "500",
  },
  input: {
    padding: "12px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #d9d9d9",
    outline: "none",
    transition: "border-color 0.3s",
  },
  submitButton: {
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
    backgroundColor: "#fff2f0",
    border: "1px solid #ffccc7",
    color: "#ff4d4f",
    padding: "10px",
    borderRadius: "4px",
    marginBottom: "20px",
  },
  successBox: {
    backgroundColor: "#f6ffed",
    border: "1px solid #b7eb8f",
    color: "#52c41a",
    padding: "10px",
    borderRadius: "4px",
    marginBottom: "20px",
  },
};

export default AdminRegister; 