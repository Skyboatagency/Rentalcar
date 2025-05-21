import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import moment from 'moment';

const BookingModal = ({ isOpen, onClose, car, onConfirm, onCancel }) => {
  const [bookingData, setBookingData] = useState({
    start_date: null,
    end_date: null,
    locataire1: '',
    adresse1: '',
    cin1: '',
    permis1: '',
    locataire2: '',
    adresse2: '',
    cin2: '',
    permis2: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [showTenant2, setShowTenant2] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    if (currentStep === 1 && bookingData.start_date && bookingData.end_date) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      onConfirm(bookingData);
    }
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const calculateTotalDays = () => {
    if (bookingData.start_date && bookingData.end_date) {
      return moment(bookingData.end_date).diff(moment(bookingData.start_date), 'days') + 1;
    }
    return 0;
  };

  const calculateTotalPrice = () => {
    const days = calculateTotalDays();
    return days * car.price_per_day;
  };

  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button style={styles.closeButton} onClick={onClose}>
          <FaTimes />
        </button>

        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>Book {car.name}</h2>
        </div>

        <div style={styles.modalBody}>
          {currentStep === 1 && (
            <div style={styles.dateSelection}>
              <h3 style={styles.stepTitle}>Select Dates</h3>
              <div style={styles.dateInputs}>
                <div style={styles.dateInputGroup}>
                  <label style={styles.label}>Start Date</label>
                  <input
                    type="date"
                    name="start_date"
                    value={bookingData.start_date ? moment(bookingData.start_date).format('YYYY-MM-DD') : ''}
                    onChange={handleInputChange}
                    min={moment().format('YYYY-MM-DD')}
                    style={styles.input}
                  />
                </div>
                <div style={styles.dateInputGroup}>
                  <label style={styles.label}>End Date</label>
                  <input
                    type="date"
                    name="end_date"
                    value={bookingData.end_date ? moment(bookingData.end_date).format('YYYY-MM-DD') : ''}
                    onChange={handleInputChange}
                    min={bookingData.start_date ? moment(bookingData.start_date).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')}
                    style={styles.input}
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div style={styles.tenantInfo}>
              <h3 style={styles.stepTitle}>Tenant Information</h3>
              <div style={styles.inputGroup}>
                <input
                  type="text"
                  name="locataire1"
                  placeholder="Full Name"
                  value={bookingData.locataire1}
                  onChange={handleInputChange}
                  style={styles.input}
                />
                <input
                  type="text"
                  name="adresse1"
                  placeholder="Address"
                  value={bookingData.adresse1}
                  onChange={handleInputChange}
                  style={styles.input}
                />
                <input
                  type="text"
                  name="cin1"
                  placeholder="ID Number"
                  value={bookingData.cin1}
                  onChange={handleInputChange}
                  style={styles.input}
                />
                <input
                  type="text"
                  name="permis1"
                  placeholder="License Number"
                  value={bookingData.permis1}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>

              <button
                style={styles.addTenantButton}
                onClick={() => setShowTenant2(!showTenant2)}
              >
                {showTenant2 ? 'Remove Second Tenant' : 'Add Second Tenant'}
              </button>

              {showTenant2 && (
                <div style={styles.inputGroup}>
                  <input
                    type="text"
                    name="locataire2"
                    placeholder="Full Name"
                    value={bookingData.locataire2}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                  <input
                    type="text"
                    name="adresse2"
                    placeholder="Address"
                    value={bookingData.adresse2}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                  <input
                    type="text"
                    name="cin2"
                    placeholder="ID Number"
                    value={bookingData.cin2}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                  <input
                    type="text"
                    name="permis2"
                    placeholder="License Number"
                    value={bookingData.permis2}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                </div>
              )}
            </div>
          )}

          <div style={styles.bookingSummary}>
            <h3 style={styles.summaryTitle}>Booking Summary</h3>
            <div style={styles.summaryDetails}>
              <p>Total Days: {calculateTotalDays()}</p>
              <p>Price per Day: {car.price_per_day} MAD</p>
              <p style={styles.totalPrice}>Total Price: {calculateTotalPrice()} MAD</p>
            </div>
          </div>
        </div>

        <div style={styles.modalFooter}>
          {currentStep === 2 && (
            <button style={styles.backButton} onClick={handleBack}>
              Back
            </button>
          )}
          <button
            style={styles.confirmButton}
            onClick={handleNext}
            disabled={currentStep === 1 && (!bookingData.start_date || !bookingData.end_date)}
          >
            {currentStep === 1 ? 'Next' : 'Confirm Booking'}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative'
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#666'
  },
  modalHeader: {
    marginBottom: '20px'
  },
  modalTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    margin: 0
  },
  modalBody: {
    marginBottom: '20px'
  },
  stepTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '15px'
  },
  dateSelection: {
    marginBottom: '20px'
  },
  dateInputs: {
    display: 'flex',
    gap: '20px'
  },
  dateInputGroup: {
    flex: 1
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#666'
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginBottom: '10px'
  },
  tenantInfo: {
    marginBottom: '20px'
  },
  inputGroup: {
    marginBottom: '15px'
  },
  addTenantButton: {
    backgroundColor: '#f0f0f0',
    border: '1px solid #ddd',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '15px'
  },
  bookingSummary: {
    backgroundColor: '#f9f9f9',
    padding: '15px',
    borderRadius: '4px',
    marginTop: '20px'
  },
  summaryTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  summaryDetails: {
    color: '#666'
  },
  totalPrice: {
    fontWeight: 'bold',
    color: '#333',
    marginTop: '10px'
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px'
  },
  backButton: {
    backgroundColor: '#f0f0f0',
    border: '1px solid #ddd',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  confirmButton: {
    backgroundColor: '#1890ff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    '&:disabled': {
      backgroundColor: '#ccc',
      cursor: 'not-allowed'
    }
  }
};

export default BookingModal; 