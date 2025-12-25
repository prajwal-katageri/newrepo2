import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import appointmentService from '../../services/appointmentService';
import '../styles/appointment.css';

function AppointmentList() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await appointmentService.getAppointments();
      setAppointments(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to fetch appointments');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (id) => {
    try {
      await appointmentService.completeAppointment(id);
      setAppointments(appointments.map(apt => 
        apt.id === id ? { ...apt, status: 'completed' } : apt
      ));
    } catch (err) {
      setError('Failed to complete appointment');
      console.error('Error:', err);
    }
  };

  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await appointmentService.cancelAppointment(id);
        setAppointments(appointments.map(apt => 
          apt.id === id ? { ...apt, status: 'cancelled' } : apt
        ));
      } catch (err) {
        setError('Failed to cancel appointment');
        console.error('Error:', err);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await appointmentService.deleteAppointment(id);
        setAppointments(appointments.filter(apt => apt.id !== id));
      } catch (err) {
        setError('Failed to delete appointment');
        console.error('Error:', err);
      }
    }
  };

  const filteredAppointments = filterStatus === 'all'
    ? appointments
    : appointments.filter(apt => apt.status === filterStatus);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) return <div className="appointment-list-container"><p>Loading appointments...</p></div>;

  return (
    <div className="appointment-list-container">
      <div className="appointment-list-header">
        <h2>Appointments</h2>
        <button 
          className="btn-primary"
          onClick={() => navigate('/appointments/book')}
        >
          Book Appointment
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
          <option value="booked">Booked</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {filteredAppointments.length === 0 ? (
        <p className="no-data">No appointments found</p>
      ) : (
        <table className="appointment-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Doctor Name</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.patientName}</td>
                <td>{appointment.doctorName}</td>
                <td>{formatDateTime(appointment.appointmentTime)}</td>
                <td>
                  <span className={`status-badge status-${appointment.status}`}>
                    {appointment.status}
                  </span>
                </td>
                <td className="action-buttons">
                  {appointment.status === 'booked' && (
                    <>
                      <button 
                        className="btn-sm btn-success"
                        onClick={() => handleComplete(appointment.id)}
                      >
                        Complete
                      </button>
                      <button 
                        className="btn-sm btn-warning"
                        onClick={() => handleCancel(appointment.id)}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  <button 
                    className="btn-sm btn-danger"
                    onClick={() => handleDelete(appointment.id)}
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

export default AppointmentList;
