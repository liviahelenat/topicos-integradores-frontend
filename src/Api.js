// src/Api.js

const BASE_URL = import.meta.env.VITE_API_URL;

export const api = {
  login: (credentials) => fetch(`${BASE_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  }),
  
  getUsuarios: () => fetch(`${BASE_URL}/users`),
  
  cadastro: (userData) => fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  }),
  
  excluirUsuario: (id) => fetch(`${BASE_URL}/users/${id}`, { 
    method: 'DELETE' 
  })
};