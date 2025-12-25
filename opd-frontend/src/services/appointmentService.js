import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api/appointments';

const appointmentService = {
  /**
   * Book an appointment
   */
  bookAppointment: async (appointment) => {
    try {
      const response = await axios.post(BASE_URL, appointment);
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
      const response = await axios.get(BASE_URL);
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
      const response = await axios.get(`${BASE_URL}/${id}`);
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
      const response = await axios.get(`${BASE_URL}/patient/${patientId}`);
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
      const response = await axios.get(`${BASE_URL}/doctor/${doctorId}`);
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
      const response = await axios.get(`${BASE_URL}/status/${status}`);
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
      const response = await axios.put(`${BASE_URL}/${id}/complete`);
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
      const response = await axios.put(`${BASE_URL}/${id}/cancel`);
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
      await axios.delete(`${BASE_URL}/${id}`);
    } catch (error) {
      console.error('Error deleting appointment:', error);
      throw error;
    }
  }
};

export default appointmentService;
