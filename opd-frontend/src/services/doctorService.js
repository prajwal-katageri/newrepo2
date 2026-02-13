import api from './api';

const doctorService = {
  /**
   * Add a new doctor
   */
  addDoctor: async (doctor) => {
    try {
      const response = await api.post('/doctors', doctor);
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
      const response = await api.get('/doctors');
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
      const response = await api.get(`/doctors/${id}`);
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
      const response = await api.get(`/doctors/status/${status}`);
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
      const response = await api.get(`/doctors/specialization/${specialization}`);
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
      const response = await api.put(`/doctors/${id}`, doctor);
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
      await api.delete(`/doctors/${id}`);
    } catch (error) {
      console.error('Error deleting doctor:', error);
      throw error;
    }
  }
};

export default doctorService;
