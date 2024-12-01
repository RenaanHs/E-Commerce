import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export const productAPI = {
  getAll: () => api.get('/products'),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`)
};

export const cartAPI = {
  addToCart: (data) => api.post('/cart/', data), 
  removeFromCart: (id) => api.delete(`/cart/${id}`),
  getCart: () => api.get('/cart')
};


export const paymentAPI = {
  processCard: (data) => api.post('/payment/card', data),
  processPix: (data) => api.post('/payment/pix', data),
  getStatus: (id) => api.get(`/payment/status/${id}`)
};

export const fornecedoresAPI = {
  getAll: () => api.get('/fornecedores'),
  create: (data) => api.post('/fornecedores', data),
  update: (id, data) => api.put(`/fornecedores/${id}`, data),
  delete: (id) => api.delete(`/fornecedores/${id}`)
};
