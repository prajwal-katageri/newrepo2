import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import doctorService from '../../services/doctorService';
import '../styles/doctor.css';

function DoctorList() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await doctorService.getDoctors();
      setDoctors(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to fetch doctors');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        await doctorService.deleteDoctor(id);
        setDoctors(doctors.filter(doctor => doctor.id !== id));
      } catch (err) {
        setError('Failed to delete doctor');
        console.error('Error:', err);
      }
    }
  };

  const filteredDoctors = filterStatus === 'all' 
    ? doctors 
    : doctors.filter(doctor => doctor.status === filterStatus);

  if (loading) return <div className="doctor-list-container"><p>Loading doctors...</p></div>;

  return (
    <div className="doctor-list-container">
      <div className="doctor-list-header">
        <h2>Doctors</h2>
        <button 
          className="btn-primary"
          onClick={() => navigate('/doctors/add')}
        >
          Add Doctor
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="filter-section">
        <label htmlFor="filterStatus">Filter by Status:</label>
        <select 
          id="filterStatus"
          value={filterStatus} 
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="busy">Busy</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {filteredDoctors.length === 0 ? (
        <p className="no-data">No doctors found</p>
      ) : (
        <table className="doctor-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Specialization</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Available Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.map((doctor) => (
              <tr key={doctor.id}>
                <td>{doctor.name}</td>
                <td>{doctor.specialization}</td>
                <td>{doctor.email}</td>
                <td>{doctor.phone}</td>
                <td>{doctor.availableTime}</td>
                <td>
                  <span className={`status-badge status-${doctor.status}`}>
                    {doctor.status}
                  </span>
                </td>
                <td className="action-buttons">
                  <button 
                    className="btn-sm btn-danger"
                    onClick={() => handleDelete(doctor.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DoctorList;
