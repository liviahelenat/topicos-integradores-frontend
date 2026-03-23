import React, { useState, useEffect } from 'react';
import { api } from '../../Api'; 
import styles from './ListaUsuarios.module.css';

export default function ListaUsuarios() {
  // Inicializamos vazio, pois os dados virão do Banco de Dados na VM
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para carregar usuários da API
  const carregarUsuarios = async () => {
    try {
      const response = await api.getUsuarios();
      const data = await response.json();
      setUsuarios(data.content || []);
    } catch (error) {
      console.error("Aguardando conexão com o servidor na VM...");
      // Opcional: manter dados mockados apenas para teste visual enquanto a VM não sobe
      setUsuarios([
        { id: 1, name: 'Admin (Mock)', email: 'admin@projeto.com' },
        { id: 2, name: 'Usuário (Mock)', email: 'user@projeto.com' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Roda assim que a tela abre
  useEffect(() => {
    carregarUsuarios();
  }, []);

  const handleExcluir = async (id) => {
    if(window.confirm("Deseja excluir este usuário permanentemente?")) {
      try {
        await api.excluirUsuario(id);
        alert("Usuário removido no servidor.");
        carregarUsuarios(); // Atualiza a lista vinda do banco
      } catch (error) {
        alert("Erro ao conectar com a VM para excluir.");
      }
    }
  };

  if (loading) return <div className={styles.container}>Carregando dados...</div>;

  return (
    <div className={styles.container}>
      <h1>Gestão de Utilizadores</h1>
      <p>Painel de Controle de Acesso</p>
      
      <div className={styles.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length > 0 ? (
              usuarios.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button className={styles.btnEdit}>Alterar</button>
                    <button 
                      className={styles.btnDelete}
                      onClick={() => handleExcluir(user.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>Nenhum usuário encontrado na VM.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}// ... mesmo JSX abaixo, mas agora consumindo a função handleExcluir atualizada (deixei comentada a versão anterior pra fazer teste)



/*import React, { useState } from 'react';
import styles from './ListaUsuarios.module.css';

export default function ListaUsuarios() {
  // Simulação de dados vindos do Banco de Dados da VM
  const [usuarios, setUsuarios] = useState([
    { id: 1, nome: 'Admin Sistema', email: 'admin@projeto.com' },
    { id: 2, nome: 'Fulano Detal', email: 'fulano@infra.com' },
  ]);

  const handleExcluir = (id) => {
    if(window.confirm("Deseja excluir este usuário? Esta ação será registrada no Log.")) {
      setUsuarios(usuarios.filter(u => u.id !== id));
      console.log(`LOG: Usuário ID ${id} excluído em ${new Date().toLocaleString()}`);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Gestão de Utilizadores</h1>
      <p>Painel de Controle de Acesso - Auditoria de Infraestrutura</p>
      
      <div className={styles.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nome}</td>
                <td>{user.email}</td>
                <td>
                  <button className={styles.btnEdit}>Alterar</button>
                  <button 
                    className={styles.btnDelete}
                    onClick={() => handleExcluir(user.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}*/