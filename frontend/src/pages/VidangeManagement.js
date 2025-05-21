import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaPlus, FaTrash, FaDownload, FaEdit, FaTimes } from 'react-icons/fa';
import { LanguageContext } from '../LanguageContext';

const VidangeManagement = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const [car, setCar] = useState(null);
  const [vidanges, setVidanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState(null);
  const [formData, setFormData] = useState({
    car_id: '',
    car_name: '',
    car_model: '',
    date: '',
    huile: '',
    depart_km: '',
    prochain_km: '',
    filtre_huile_actuel: '',
    filtre_huile_prochain: '',
    filtre_gasoil_actuel: '',
    filtre_gasoil_prochain: '',
    filtre_air_actuel: '',
    filtre_air_prochain: '',
    filtre_habitacle_actuel: '',
    filtre_habitacle_prochain: '',
    plaquette_frein: '',
    disque_frein: '',
    pneus: '',
    radiateur: '',
    huile_boite_vitesse: '',
    huile_frein: '',
    kit_embrayage: '',
    amortisseur_avant: '',
    amortisseur_arriere: '',
    total: 0
  });

  // Responsive: detect mobile
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    console.log('carId:', carId);
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('Fetching data for car:', carId);
        const [carResponse, vidangesResponse] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}/cars/${carId}`),
          axios.get(`${process.env.REACT_APP_API_URL}/vidanges/car/${carId}`)
        ]);
        console.log('Car response:', carResponse.data);
        console.log('Vidanges response:', vidangesResponse.data);
        setCar(carResponse.data);
        setVidanges(vidangesResponse.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Erreur lors du chargement des données');
        setLoading(false);
      }
    };

    if (carId) {
      fetchData();
    }
  }, [carId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/vidanges', {
        ...formData,
        car_id: carId
      });
      setVidanges([...vidanges, response.data]);
      setShowAddModal(false);
      setFormData({
        car_id: '',
        car_name: '',
        car_model: '',
        date: '',
        huile: '',
        depart_km: '',
        prochain_km: '',
        filtre_huile_actuel: '',
        filtre_huile_prochain: '',
        filtre_gasoil_actuel: '',
        filtre_gasoil_prochain: '',
        filtre_air_actuel: '',
        filtre_air_prochain: '',
        filtre_habitacle_actuel: '',
        filtre_habitacle_prochain: '',
        plaquette_frein: '',
        disque_frein: '',
        pneus: '',
        radiateur: '',
        huile_boite_vitesse: '',
        huile_frein: '',
        kit_embrayage: '',
        amortisseur_avant: '',
        amortisseur_arriere: '',
        total: 0
      });
    } catch (error) {
      console.error('Erreur lors de la création de la vidange:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette vidange ?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/vidanges/${id}`);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/vidanges/car/${carId}`);
        setVidanges(response.data);
      } catch (err) {
        console.error('Error:', err);
        setError('Erreur lors de la suppression de la vidange');
      }
    }
  };

  const handleDownloadPDF = async (id) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/vidanges/${id}/pdf`, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `vidange_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Error downloading PDF:', err);
      setError('Erreur lors du téléchargement du PDF');
    }
  };

  const handleEdit = (vidange) => {
    const formattedVidange = {
      ...vidange,
      date: vidange.date ? vidange.date.split('T')[0] : '',
      huile: vidange.huile || ''
    };
    setEditFormData(formattedVidange);
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // S'assurer que toutes les données sont présentes
      const updatedData = {
        ...editFormData,
        car_id: carId,
        car_name: car.name,
        car_model: car.model
      };

      // Envoyer la requête de mise à jour
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/vidanges/${editFormData.id}`, updatedData);

      // Rafraîchir les données
      const updatedVidangesResponse = await axios.get(`${process.env.REACT_APP_API_URL}/vidanges/car/${carId}`);
      setVidanges(updatedVidangesResponse.data);

      // Fermer le modal et réinitialiser le formulaire
      setShowEditModal(false);
      setEditFormData(null);

      // Afficher un message de succès
      alert('Vidange mise à jour avec succès');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la vidange:', error);
      alert('Erreur lors de la mise à jour de la vidange: ' + error.message);
    }
  };

  const styles = {
    container: {
      padding: '20px',
      maxWidth: '1200px',
      margin: window.innerWidth < 768 ? '20px auto' : '100px 350px',
      width: '100%',
      boxSizing: 'border-box'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
      gap: '20px',
      flexDirection: window.innerWidth < 768 ? 'column' : 'row'
    },
    backButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      backgroundColor: '#f0f0f0',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      width: window.innerWidth < 768 ? '120px' : 'auto'
    },
    title: {
      fontSize: window.innerWidth < 768 ? '20px' : '24px',
      color: '#333',
      margin: 0,
      textAlign: window.innerWidth < 768 ? 'center' : 'left'
    },
    actions: {
      marginBottom: '20px',
      display: 'flex',
      justifyContent: window.innerWidth < 768 ? 'center' : 'flex-end'
    },
    addButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 20px',
      backgroundColor: '#1890ff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      width: window.innerWidth < 768 ? '100%' : 'auto'
    },
    tableContainer: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      overflow: 'auto',
      width: '100%'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      minWidth: window.innerWidth < 768 ? '600px' : 'auto'
    },
    tableHeader: {
      backgroundColor: '#f5f5f5',
      padding: '12px',
      textAlign: 'left',
      borderBottom: '1px solid #e8e8e8',
      whiteSpace: 'nowrap'
    },
    tableCell: {
      padding: '12px',
      borderBottom: '1px solid #e8e8e8',
      whiteSpace: 'nowrap'
    },
    actionsCell: {
      display: 'flex',
      gap: '8px',
      justifyContent: window.innerWidth < 768 ? 'center' : 'flex-end',
      flexWrap: 'wrap'
    },
    downloadButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      padding: '6px 12px',
      backgroundColor: '#52c41a',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px'
    },
    editButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      padding: '6px 12px',
      backgroundColor: '#faad14',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px'
    },
    deleteButton: {
      display: 'flex',
      alignItems: 'center',
      padding: '6px 12px',
      backgroundColor: '#ff4d4f',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px'
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    },
    modalContent: {
      backgroundColor: 'white',
      padding: window.innerWidth < 768 ? '15px' : '30px',
      borderRadius: '12px',
      width: window.innerWidth < 768 ? '95%' : '800px',
      maxWidth: '95%',
      maxHeight: '90vh',
      overflowY: 'auto',
      position: 'relative',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    },
    modalHeader: {
      marginBottom: '24px',
      paddingBottom: '16px',
      borderBottom: '1px solid #f0f0f0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    modalTitle: {
      margin: 0,
      fontSize: '20px',
      fontWeight: '600',
      color: '#1a1a1a'
    },
    formSection: {
      marginBottom: '24px',
      padding: window.innerWidth < 768 ? '12px' : '16px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px'
    },
    sectionTitle: {
      fontSize: '16px',
      fontWeight: '600',
      marginBottom: '16px',
      color: '#1a1a1a'
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(2, 1fr)',
      gap: '16px'
    },
    checkboxGroup: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '12px',
      marginBottom: '16px'
    },
    checkboxLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
      fontSize: '14px'
    },
    checkbox: {
      width: '16px',
      height: '16px',
      cursor: 'pointer'
    },
    formGroup: {
      marginBottom: '15px'
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: '500'
    },
    input: {
      width: '100%',
      padding: '8px 12px',
      borderRadius: '6px',
      border: '1px solid #d9d9d9',
      fontSize: '14px',
      transition: 'border-color 0.3s',
      '&:focus': {
        borderColor: '#1890ff',
        outline: 'none'
      }
    },
    textarea: {
      width: '100%',
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #d9d9d9',
      fontSize: '14px',
      minHeight: '100px',
      resize: 'vertical'
    },
    modalButtons: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '12px',
      marginTop: '24px',
      paddingTop: '16px',
      borderTop: '1px solid #f0f0f0',
      flexDirection: window.innerWidth < 768 ? 'column' : 'row'
    },
    cancelButton: {
      padding: '8px 16px',
      borderRadius: '6px',
      border: '1px solid #d9d9d9',
      backgroundColor: 'white',
      color: '#666',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'all 0.3s',
      width: window.innerWidth < 768 ? '100%' : 'auto',
      '&:hover': {
        backgroundColor: '#f5f5f5'
      }
    },
    submitButton: {
      padding: '8px 24px',
      borderRadius: '6px',
      border: 'none',
      backgroundColor: '#1890ff',
      color: 'white',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'all 0.3s',
      width: window.innerWidth < 768 ? '100%' : 'auto',
      '&:hover': {
        backgroundColor: '#40a9ff'
      }
    },
    closeButton: {
      position: 'absolute',
      top: '16px',
      right: '16px',
      background: 'none',
      border: 'none',
      fontSize: '20px',
      cursor: 'pointer',
      color: '#666',
      padding: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&:hover': {
        color: '#333'
      }
    }
  };

  if (loading) {
    return <div style={styles.container}>Chargement...</div>;
  }

  if (error) {
    return <div style={styles.container}>{error}</div>;
  }

  return (
    <div style={styles.container}>
      {isMobile ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <button style={styles.backButton} onClick={() => navigate(-1)}>
            <FaArrowLeft /> Retour
          </button>
          <h1 style={{ ...styles.title, margin: 0, fontSize: 18, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {car ? `Vidanges - ${car.name} ${car.model}` : 'Vidanges'}
          </h1>
        </div>
      ) : (
        <div style={styles.header}>
          <button style={styles.backButton} onClick={() => navigate(-1)}>
            <FaArrowLeft /> Retour
          </button>
          <h1 style={styles.title}>
            {car ? `Vidanges - ${car.name} ${car.model}` : 'Vidanges'}
          </h1>
        </div>
      )}

      <div style={styles.actions}>
        <button style={styles.addButton} onClick={() => setShowAddModal(true)}>
          <FaPlus /> Ajouter une vidange
        </button>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Date</th>
              <th style={styles.tableHeader}>Huile</th>
              <th style={styles.tableHeader}>Kilométrage</th>
              <th style={styles.tableHeader}>Total (MAD)</th>
              <th style={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vidanges.map((vidange) => (
              <tr key={vidange.id}>
                <td style={styles.tableCell}>{new Date(vidange.date).toLocaleDateString()}</td>
                <td style={styles.tableCell}>{vidange.huile || '-'}</td>
                <td style={styles.tableCell}>
                  {vidange.depart_km} km / {vidange.prochain_km} km
                </td>
                <td style={styles.tableCell}>
                  {vidange.total ? `${parseFloat(vidange.total).toFixed(2)} MAD` : '0.00 MAD'}
                </td>
                <td style={styles.tableCell}>
                  <div style={styles.actionsCell}>
                    <button style={styles.downloadButton} onClick={() => handleDownloadPDF(vidange.id)}>
                      <FaDownload /> PDF
                    </button>
                    <button style={styles.editButton} onClick={() => handleEdit(vidange)}>
                      <FaEdit /> Modifier
                    </button>
                    <button style={styles.deleteButton} onClick={() => handleDelete(vidange.id)}>
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Ajouter une vidange</h2>
              <button 
                style={styles.closeButton}
                onClick={() => setShowAddModal(false)}
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div style={styles.formSection}>
                <h3 style={styles.sectionTitle}>Informations principales</h3>
                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Date</label>
                    <input
                      type="date"
                      style={styles.input}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Type d'huile</label>
                    <input
                      type="text"
                      style={styles.input}
                      value={formData.huile}
                      onChange={(e) => setFormData({ ...formData, huile: e.target.value })}
                      placeholder="Entrez le type d'huile"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Kilométrage actuel</label>
                    <input
                      type="number"
                      step="0.01"
                      style={styles.input}
                      value={formData.depart_km}
                      onChange={(e) => setFormData({ ...formData, depart_km: e.target.value })}
                      placeholder="Entrez le kilométrage"
                      required
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Prochain kilométrage</label>
                    <input
                      type="number"
                      step="0.01"
                      style={styles.input}
                      value={formData.prochain_km}
                      onChange={(e) => setFormData({ ...formData, prochain_km: e.target.value })}
                      placeholder="Entrez le prochain kilométrage"
                      required
                    />
                  </div>
                </div>
              </div>

              <div style={styles.formSection}>
                <h3 style={styles.sectionTitle}>Filtres</h3>
                <div style={{ display: 'flex', gap: '24px' }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ marginBottom: '16px', color: '#1a1a1a', fontSize: '14px', fontWeight: '600' }}>État actuel</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          style={styles.checkbox}
                          checked={formData.filtre_huile_actuel}
                          onChange={(e) => setFormData({ ...formData, filtre_huile_actuel: e.target.checked })}
                        />
                        Filtre à huile
                      </label>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          style={styles.checkbox}
                          checked={formData.filtre_gasoil_actuel}
                          onChange={(e) => setFormData({ ...formData, filtre_gasoil_actuel: e.target.checked })}
                        />
                        Filtre à gasoil
                      </label>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          style={styles.checkbox}
                          checked={formData.filtre_air_actuel}
                          onChange={(e) => setFormData({ ...formData, filtre_air_actuel: e.target.checked })}
                        />
                        Filtre à air
                      </label>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          style={styles.checkbox}
                          checked={formData.filtre_habitacle_actuel}
                          onChange={(e) => setFormData({ ...formData, filtre_habitacle_actuel: e.target.checked })}
                        />
                        Filtre à habitacle
                      </label>
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ marginBottom: '16px', color: '#1a1a1a', fontSize: '14px', fontWeight: '600' }}>Prochain changement</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          style={styles.checkbox}
                          checked={formData.filtre_huile_prochain}
                          onChange={(e) => setFormData({ ...formData, filtre_huile_prochain: e.target.checked })}
                        />
                        Filtre à huile
                      </label>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          style={styles.checkbox}
                          checked={formData.filtre_gasoil_prochain}
                          onChange={(e) => setFormData({ ...formData, filtre_gasoil_prochain: e.target.checked })}
                        />
                        Filtre à gasoil
                      </label>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          style={styles.checkbox}
                          checked={formData.filtre_air_prochain}
                          onChange={(e) => setFormData({ ...formData, filtre_air_prochain: e.target.checked })}
                        />
                        Filtre à air
                      </label>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          style={styles.checkbox}
                          checked={formData.filtre_habitacle_prochain}
                          onChange={(e) => setFormData({ ...formData, filtre_habitacle_prochain: e.target.checked })}
                        />
                        Filtre à habitacle
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div style={styles.formSection}>
                <h3 style={styles.sectionTitle}>Mesures (en km)</h3>
                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Plaquettes de frein</label>
                    <input
                      type="number"
                      step="0.01"
                      style={styles.input}
                      value={formData.plaquette_frein}
                      onChange={(e) => setFormData({ ...formData, plaquette_frein: e.target.value })}
                      placeholder="Entrez le kilométrage"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Disques de frein</label>
                    <input
                      type="number"
                      step="0.01"
                      style={styles.input}
                      value={formData.disque_frein}
                      onChange={(e) => setFormData({ ...formData, disque_frein: e.target.value })}
                      placeholder="Entrez le kilométrage"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Pneus</label>
                    <input
                      type="number"
                      step="0.01"
                      style={styles.input}
                      value={formData.pneus}
                      onChange={(e) => setFormData({ ...formData, pneus: e.target.value })}
                      placeholder="Entrez le kilométrage"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Radiateur</label>
                    <input
                      type="number"
                      step="0.01"
                      style={styles.input}
                      value={formData.radiateur}
                      onChange={(e) => setFormData({ ...formData, radiateur: e.target.value })}
                      placeholder="Entrez le kilométrage"
                    />
                  </div>
                </div>
              </div>

              <div style={styles.formSection}>
                <h3 style={styles.sectionTitle}>Huiles et composants (en km)</h3>
                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Huile de frein</label>
                    <input
                      type="number"
                      step="0.01"
                      style={styles.input}
                      value={formData.huile_frein}
                      onChange={(e) => setFormData({ ...formData, huile_frein: e.target.value })}
                      placeholder="Entrez le kilométrage"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Kit d'embrayage</label>
                    <input
                      type="number"
                      step="0.01"
                      style={styles.input}
                      value={formData.kit_embrayage}
                      onChange={(e) => setFormData({ ...formData, kit_embrayage: e.target.value })}
                      placeholder="Entrez le kilométrage"
                    />
                  </div>
                </div>
              </div>

              <div style={styles.formSection}>
                <h3 style={styles.sectionTitle}>Amortisseurs (en km)</h3>
                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Amortisseur avant</label>
                    <input
                      type="number"
                      step="0.01"
                      style={styles.input}
                      value={formData.amortisseur_avant}
                      onChange={(e) => setFormData({ ...formData, amortisseur_avant: e.target.value })}
                      placeholder="Entrez le kilométrage"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Amortisseur arrière</label>
                    <input
                      type="number"
                      step="0.01"
                      style={styles.input}
                      value={formData.amortisseur_arriere}
                      onChange={(e) => setFormData({ ...formData, amortisseur_arriere: e.target.value })}
                      placeholder="Entrez le kilométrage"
                    />
                  </div>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Total (MAD)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.total}
                  onChange={(e) => setFormData({ ...formData, total: parseFloat(e.target.value) })}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.modalButtons}>
                <button
                  type="button"
                  style={styles.cancelButton}
                  onClick={() => setShowAddModal(false)}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  style={styles.submitButton}
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditModal && editFormData && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Modifier la vidange</h2>
              <button 
                style={styles.closeButton}
                onClick={() => {
                  setShowEditModal(false);
                  setEditFormData(null);
                }}
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleUpdate}>
              <div style={styles.formSection}>
                <h3 style={styles.sectionTitle}>Informations principales</h3>
                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Date</label>
                    <input
                      type="date"
                      style={styles.input}
                      value={editFormData.date}
                      onChange={(e) => setEditFormData({ ...editFormData, date: e.target.value })}
                      required
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Type d'huile</label>
                    <input
                      type="text"
                      style={styles.input}
                      value={editFormData.huile}
                      onChange={(e) => setEditFormData({ ...editFormData, huile: e.target.value })}
                      placeholder="Entrez le type d'huile"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Kilométrage actuel</label>
                    <input
                      type="number"
                      step="0.01"
                      style={styles.input}
                      value={editFormData.depart_km}
                      onChange={(e) => setEditFormData({ ...editFormData, depart_km: e.target.value })}
                      placeholder="Entrez le kilométrage"
                      required
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Prochain kilométrage</label>
                    <input
                      type="number"
                      step="0.01"
                      style={styles.input}
                      value={editFormData.prochain_km}
                      onChange={(e) => setEditFormData({ ...editFormData, prochain_km: e.target.value })}
                      placeholder="Entrez le prochain kilométrage"
                      required
                    />
                  </div>
                </div>
              </div>

              <div style={styles.formSection}>
                <h3 style={styles.sectionTitle}>Filtres</h3>
                <div style={{ display: 'flex', gap: '24px' }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ marginBottom: '16px', color: '#1a1a1a', fontSize: '14px', fontWeight: '600' }}>État actuel</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          style={styles.checkbox}
                          checked={editFormData.filtre_huile_actuel}
                          onChange={(e) => setEditFormData({ ...editFormData, filtre_huile_actuel: e.target.checked })}
                        />
                        Filtre à huile
                      </label>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          style={styles.checkbox}
                          checked={editFormData.filtre_gasoil_actuel}
                          onChange={(e) => setEditFormData({ ...editFormData, filtre_gasoil_actuel: e.target.checked })}
                        />
                        Filtre à gasoil
                      </label>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          style={styles.checkbox}
                          checked={editFormData.filtre_air_actuel}
                          onChange={(e) => setEditFormData({ ...editFormData, filtre_air_actuel: e.target.checked })}
                        />
                        Filtre à air
                      </label>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          style={styles.checkbox}
                          checked={editFormData.filtre_habitacle_actuel}
                          onChange={(e) => setEditFormData({ ...editFormData, filtre_habitacle_actuel: e.target.checked })}
                        />
                        Filtre à habitacle
                      </label>
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ marginBottom: '16px', color: '#1a1a1a', fontSize: '14px', fontWeight: '600' }}>Prochain changement</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          style={styles.checkbox}
                          checked={editFormData.filtre_huile_prochain}
                          onChange={(e) => setEditFormData({ ...editFormData, filtre_huile_prochain: e.target.checked })}
                        />
                        Filtre à huile
                      </label>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          style={styles.checkbox}
                          checked={editFormData.filtre_gasoil_prochain}
                          onChange={(e) => setEditFormData({ ...editFormData, filtre_gasoil_prochain: e.target.checked })}
                        />
                        Filtre à gasoil
                      </label>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          style={styles.checkbox}
                          checked={editFormData.filtre_air_prochain}
                          onChange={(e) => setEditFormData({ ...editFormData, filtre_air_prochain: e.target.checked })}
                        />
                        Filtre à air
                      </label>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          style={styles.checkbox}
                          checked={editFormData.filtre_habitacle_prochain}
                          onChange={(e) => setEditFormData({ ...editFormData, filtre_habitacle_prochain: e.target.checked })}
                        />
                        Filtre à habitacle
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div style={styles.formSection}>
                <h3 style={styles.sectionTitle}>Mesures (en km)</h3>
                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Plaquettes de frein</label>
                    <input
                      type="number"
                      step="0.01"
                      style={styles.input}
                      value={editFormData.plaquette_frein}
                      onChange={(e) => setEditFormData({ ...editFormData, plaquette_frein: e.target.value })}
                      placeholder="Entrez le kilométrage"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Disques de frein</label>
                    <input
                      type="number"
                      step="0.01"
                      style={styles.input}
                      value={editFormData.disque_frein}
                      onChange={(e) => setEditFormData({ ...editFormData, disque_frein: e.target.value })}
                      placeholder="Entrez le kilométrage"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Pneus</label>
                    <input
                      type="number"
                      step="0.01"
                      style={styles.input}
                      value={editFormData.pneus}
                      onChange={(e) => setEditFormData({ ...editFormData, pneus: e.target.value })}
                      placeholder="Entrez le kilométrage"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Radiateur</label>
                    <input
                      type="number"
                      step="0.01"
                      style={styles.input}
                      value={editFormData.radiateur}
                      onChange={(e) => setEditFormData({ ...editFormData, radiateur: e.target.value })}
                      placeholder="Entrez le kilométrage"
                    />
                  </div>
                </div>
              </div>

              <div style={styles.formSection}>
                <h3 style={styles.sectionTitle}>Huiles et composants (en km)</h3>
                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Huile de frein</label>
                    <input
                      type="number"
                      step="0.01"
                      style={styles.input}
                      value={editFormData.huile_frein}
                      onChange={(e) => setEditFormData({ ...editFormData, huile_frein: e.target.value })}
                      placeholder="Entrez le kilométrage"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Kit d'embrayage</label>
                    <input
                      type="number"
                      step="0.01"
                      style={styles.input}
                      value={editFormData.kit_embrayage}
                      onChange={(e) => setEditFormData({ ...editFormData, kit_embrayage: e.target.value })}
                      placeholder="Entrez le kilométrage"
                    />
                  </div>
                </div>
              </div>

              <div style={styles.formSection}>
                <h3 style={styles.sectionTitle}>Amortisseurs (en km)</h3>
                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Amortisseur avant</label>
                    <input
                      type="number"
                      step="0.01"
                      style={styles.input}
                      value={editFormData.amortisseur_avant}
                      onChange={(e) => setEditFormData({ ...editFormData, amortisseur_avant: e.target.value })}
                      placeholder="Entrez le kilométrage"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Amortisseur arrière</label>
                    <input
                      type="number"
                      step="0.01"
                      style={styles.input}
                      value={editFormData.amortisseur_arriere}
                      onChange={(e) => setEditFormData({ ...editFormData, amortisseur_arriere: e.target.value })}
                      placeholder="Entrez le kilométrage"
                    />
                  </div>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Total (MAD)</label>
                <input
                  type="number"
                  step="0.01"
                  value={editFormData.total}
                  onChange={(e) => setEditFormData({ ...editFormData, total: parseFloat(e.target.value) })}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.modalButtons}>
                <button
                  type="button"
                  style={styles.cancelButton}
                  onClick={() => {
                    setShowEditModal(false);
                    setEditFormData(null);
                  }}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  style={styles.submitButton}
                >
                  Modifier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VidangeManagement; 