import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api/doctors';

const doctorService = {
  /**
   * Add a new doctor
   */
  addDoctor: async (doctor) => {
    try {
      const response = await axios.post(BASE_URL, doctor);
      return response.data;
    } catch (error) {
      console.error('Error adding doctor:', error);
      throw error;
    }
  },

  /**
   * Get all doctors
   */
  getDoctors: async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching doctors:', error);
      throw error;
    }
  },

  /**
   * Get doctor by ID
   */
  getDoctorById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching doctor:', error);
      throw error;
    }
  },

  /**
   * Get doctors by status
   */
  getDoctorsByStatus: async (status) => {
    try {
      const response = await axios.get(`${BASE_URL}/status/${status}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching doctors by status:', error);
      throw error;
    }
  },

  /**
   * Get doctors by specialization
   */
  getDoctorsBySpecialization: async (specialization) => {
    try {
      const response = await axios.get(`${BASE_URL}/specialization/${specialization}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching doctors by specialization:', error);
      throw error;
    }
  },

  /**
   * Update doctor
   */
  updateDoctor: async (id, doctor) => {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, doctor);
      return response.data;
    } catch (error) {
      console.error('Error updating doctor:', error);
      throw error;
    }
  },

  /**
   * Delete doctor
   */
  deleteDoctor: async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
    } catch (error) {
      console.error('Error deleting doctor:', error);
      throw error;
    }
  }
};

export default doctorService;
