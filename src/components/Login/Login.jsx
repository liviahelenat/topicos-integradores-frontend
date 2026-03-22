import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../Api'; 
import styles from './Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Chamada real preparada para a VM
      const response = await api.login({ email, password });

      if (response.ok) {
        // Se o backend confirmar o login (Status 200)
        console.log("Login autorizado pelo servidor.");
        navigate('/usuarios'); // Redireciona para a lista de usuários
      } else {
        // Se o backend negar (Ex: Senha errada - Status 401)
        alert("Credenciais inválidas. Verifique os dados.");
      }
    } catch (error) {
      // Caso a VM esteja desligada ou o IP esteja inacessível
      console.error("Erro de conexão com a infraestrutura:", error);
      alert("Não foi possível conectar ao servidor na VM.");
      
      // APENAS PARA TESTE EM GRUPO: 
      // Se quiser simular o login sem a VM estar pronta, descomente a linha abaixo:
       navigate('/usuarios');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.loginBox}>
        <h2 className={styles.title}>Acesso Restrito</h2>
        <form onSubmit={handleLogin}>
          <div className={styles.field}>
            <label>Usuário (E-mail)</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              disabled={loading}
            />
          </div>
          <div className={styles.field}>
            <label>Senha</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              disabled={loading}
            />
          </div>
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Autenticando...' : 'Autenticar'}
          </button>
        </form>
      </div>
    </div>
  );
}