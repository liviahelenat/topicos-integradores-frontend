import { Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login/Login';
import Cadastro from './components/Cadastro/Cadastro';
import ListaUsuarios from './components/ListaUsuarios/ListaUsuarios';

function App() {
  return (
    <div>
      {/* Menu de Navegação Temporário (Útil para o desenvolvimento) */}
      <nav style={{ 
        padding: '10px', 
        background: '#161b22', 
        borderBottom: '1px solid #30363d',
        display: 'flex',
        gap: '15px' 
      }}>
        <Link to="/" style={{ color: '#58a6ff', textDecoration: 'none' }}>Login</Link>
        <Link to="/cadastro" style={{ color: '#58a6ff', textDecoration: 'none' }}>Cadastro</Link>
        <Link to="/usuarios" style={{ color: '#58a6ff', textDecoration: 'none' }}>Gestão (Admin)</Link>
      </nav>

      {/* Definição das Rotas */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/usuarios" element={<ListaUsuarios />} />
      </Routes>
    </div>
  );
}

export default App;