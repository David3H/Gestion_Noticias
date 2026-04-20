import api from './api';

export const newsService = {
  // Obtener todas las noticias
  getAll: async () => {
    const response = await api.get('/noticias');
    return response.data;
  },

  // Obtener una por slug
  getBySlug: async (slug) => {
    const response = await api.get(`/noticias/${slug}`);
    return response.data;
  },

  // Crear noticia
  create: async (newsData) => {
    const response = await api.post('/noticias', newsData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  // Actualizar noticia
  update: async (id, newsData) => {
    const response = await api.put(`/noticias/${id}`, newsData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  // Eliminar noticia
  delete: async (id) => {
    const response = await api.delete(`/noticias/${id}`);
    return response.data;
  }
};