import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8000/v1',
});

export default axiosClient;