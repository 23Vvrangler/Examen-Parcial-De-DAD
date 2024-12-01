import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Categoria from './pages/Categoria';
import Producto from './pages/Producto';
import Catalogo from './pages/Catalogo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/categoria' element={<Categoria />}/>
        <Route path='/producto' element={<Producto />}/>
        <Route path='/catalogo' element={<Catalogo />}/>
      </Routes>
    </Router>
  );
}

export default App;