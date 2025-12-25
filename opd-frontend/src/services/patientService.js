import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api/patients';

const patientService = {
  /**
   * Get all patients
   */
  getPatients: async () => {
    try {
      const response = await axios.get(BASE_URL);
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
      const response = await axios.post(BASE_URL, patient);
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
      const response = await axios.delete(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting patient:', error);
      throw error;
    }
  }
};

export default patientService;
