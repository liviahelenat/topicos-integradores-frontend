// src/Api.js
const BASE_URL = import.meta.env.VITE_API_URL;

export const api = {
  login: (credentials) => fetch(`${BASE_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  }),
  
  getUsuarios: () => fetch(`${BASE_URL}/users`),
  
  // Usando 'name' no payload de envio
  cadastro: (userData) => fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: userData.nome, // Mapeia o campo do form para o campo do banco
      email: userData.email,
      password: userData.password
    })
  }),
  
  excluirUsuario: (id) => fetch(`${BASE_URL}/users/${id}`, { method: 'DELETE' }),

  // Endpoints de Infraestrutura (Requisitos de Projeto)
  backupSistema: () => fetch(`${BASE_URL}/system/backup`, { method: 'POST' }),
  restoreSistema: () => fetch(`${BASE_URL}/system/restore`, { method: 'POST' })
};