import axios from 'axios'
//Instancia pre configurada para las peticiones al backend
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default api