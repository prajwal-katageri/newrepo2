import axios from 'axios';

const API_URL = 'http://localhost:8081/api/patients';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPatients = () => axiosInstance.get('/');

export const createPatient = (patientData) => axiosInstance.post('/', patientData);

export default axiosInstance;
