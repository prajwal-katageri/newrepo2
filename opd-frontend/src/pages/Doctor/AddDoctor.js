import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import doctorService from '../../services/doctorService';
import '../styles/doctor.css';

function AddDoctor() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    email: '',
    phone: '',
    availableTime: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Doctor name is required');
      return false;
    }
    if (!formData.specialization.trim()) {
      setError('Specialization is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email');
      return false;
    }
    if (!formData.phone.trim()) {
      setError('Phone number is required');
      return false;
    }
    if (!formData.availableTime.trim()) {
      setError('Available time is required');
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
      await doctorService.addDoctor(formData);
      navigate('/doctors');
    } catch (err) {
      setError('Failed to add doctor. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-doctor-container">
      <h2>Add New Doctor</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter doctor name"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="specialization">Specialization</label>
          <select
            id="specialization"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="">Select Specialization</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Orthopedic">Orthopedic</option>
            <option value="Pediatrician">Pediatrician</option>
            <option value="Neurologist">Neurologist</option>
            <option value="General Physician">General Physician</option>
            <option value="ENT">ENT</option>
            <option value="Ophthalmologist">Ophthalmologist</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="availableTime">Available Time</label>
          <input
            type="text"
            id="availableTime"
            name="availableTime"
            value={formData.availableTime}
            onChange={handleChange}
            placeholder="e.g., 9:00 AM - 5:00 PM"
            disabled={loading}
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Adding...' : 'Add Doctor'}
          </button>
          <button 
            type="button" 
            className="btn-secondary" 
            onClick={() => navigate('/doctors')}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddDoctor;
