import api from './api';

const appointmentService = {
  /**
   * Book an appointment
   */
  bookAppointment: async (appointment) => {
    try {
      const response = await api.post('/appointments', appointment);
      return response.data;
    } catch (error) {
      console.error('Error booking appointment:', error);
      throw error;
    }
  },

  /**
   * Get all appointments
   */
  getAppointments: async () => {
    try {
      const response = await api.get('/appointments');
      return response.data;
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }
  },

  /**
   * Get appointment by ID
   */
  getAppointmentById: async (id) => {
    try {
      const response = await api.get(`/appointments/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching appointment:', error);
      throw error;
    }
  },

  /**
   * Get appointments by patient ID
   */
  getAppointmentsByPatientId: async (patientId) => {
    try {
      const response = await api.get(`/appointments/patient/${patientId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching appointments by patient:', error);
      throw error;
    }
  },

  /**
   * Get appointments by doctor ID
   */
  getAppointmentsByDoctorId: async (doctorId) => {
    try {
      const response = await api.get(`/appointments/doctor/${doctorId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching appointments by doctor:', error);
      throw error;
    }
  },

  /**
   * Get appointments by status
   */
  getAppointmentsByStatus: async (status) => {
    try {
      const response = await api.get(`/appointments/status/${status}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching appointments by status:', error);
      throw error;
    }
  },

  /**
   * Complete an appointment
   */
  completeAppointment: async (id) => {
    try {
      const response = await api.put(`/appointments/${id}/complete`);
      return response.data;
    } catch (error) {
      console.error('Error completing appointment:', error);
      throw error;
    }
  },

  /**
   * Cancel an appointment
   */
  cancelAppointment: async (id) => {
    try {
      const response = await api.put(`/appointments/${id}/cancel`);
      return response.data;
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      throw error;
    }
  },

  /**
   * Delete an appointment
   */
  deleteAppointment: async (id) => {
    try {
      await api.delete(`/appointments/${id}`);
    } catch (error) {
      console.error('Error deleting appointment:', error);
      throw error;
    }
  }
};

export default appointmentService;
