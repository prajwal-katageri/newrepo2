import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import appointmentService from '../../services/appointmentService';
import doctorService from '../../services/doctorService';
import patientService from '../../services/patientService';
import '../styles/appointment.css';

function BookAppointment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patientId: '',
    patientName: '',
    doctorId: '',
    doctorName: '',
    appointmentTime: ''
  });
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPatients();
    fetchDoctors();
  }, []);

  const fetchPatients = async () => {
    try {
      const data = await patientService.getPatients();
      setPatients(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching patients:', err);
    }
  };

  const fetchDoctors = async () => {
    try {
      const data = await doctorService.getDoctors();
      setDoctors(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching doctors:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'patientId') {
      const patient = patients.find(p => p.id === value);
      setFormData(prevState => ({
        ...prevState,
        patientId: value,
        patientName: patient ? patient.name : ''
      }));
    } else if (name === 'doctorId') {
      const doctor = doctors.find(d => d.id === value);
      setFormData(prevState => ({
        ...prevState,
        doctorId: value,
        doctorName: doctor ? doctor.name : ''
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    if (!formData.patientId) {
      setError('Please select a patient');
      return false;
    }
    if (!formData.doctorId) {
      setError('Please select a doctor');
      return false;
    }
    if (!formData.appointmentTime) {
      setError('Please select appointment time');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await appointmentService.bookAppointment(formData);
      navigate('/appointments');
    } catch (err) {
      setError('Failed to book appointment. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="book-appointment-container">
      <h2>Book Appointment</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="patientId">Select Patient</label>
          <select
            id="patientId"
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="">Choose a patient</option>
            {patients.map(patient => (
              <option key={patient.id} value={patient.id}>
                {patient.name} - {patient.email}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="doctorId">Select Doctor</label>
          <select
            id="doctorId"
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="">Choose a doctor</option>
            {doctors.map(doctor => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name} - {doctor.specialization}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="appointmentTime">Appointment Date & Time</label>
          <input
            type="datetime-local"
            id="appointmentTime"
            name="appointmentTime"
            value={formData.appointmentTime}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Booking...' : 'Book Appointment'}
          </button>
          <button 
            type="button" 
            className="btn-secondary" 
            onClick={() => navigate('/appointments')}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookAppointment;
