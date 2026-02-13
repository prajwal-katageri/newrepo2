import api from './api';

const patientService = {
  /**
   * Get all patients
   */
  getPatients: async () => {
    try {
      const response = await api.get('/patients');
      return response.data;
    } catch (error) {
      console.error('Error fetching patients:', error);
      throw error;
    }
  },

  /**
   * Add a new patient
   */
  addPatient: async (patient) => {
    try {
      const response = await api.post('/patients', patient);
      return response.data;
    } catch (error) {
      console.error('Error adding patient:', error);
      throw error;
    }
  },

  /**
   * Delete a patient by ID
   */
  deletePatient: async (id) => {
    try {
      const response = await api.delete(`/patients/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting patient:', error);
      throw error;
    }
  }
};

export default patientService;
