// src/Api.js

const BASE_URL = "http://localhost:3000"; // Quando a VM estiver pronta, é só muda o IP aqui!

export const api = {
  login: (credentials) => fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  }),
  
  getUsuarios: () => fetch(`${BASE_URL}/usuarios`),
  
  cadastro: (userData) => fetch(`${BASE_URL}/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  }),
  
  excluirUsuario: (id) => fetch(`${BASE_URL}/usuarios/${id}`, { 
    method: 'DELETE' 
  })
};