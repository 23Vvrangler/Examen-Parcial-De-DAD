import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link para navegación

const Navbar = () => {
  return (
    <div className="bg-[#1A2D42] p-4 shadow-lg">
      {/* Contenedor de la barra de navegación */}
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo o título */}
        <div className="text-white text-xl font-semibold">
          <Link to="/">Mi App</Link>
        </div>

        {/* Enlaces de navegación */}
        <div className="space-x-4">
          <Link
            to="/producto" // Ruta a la página de Producto
            className="text-white mr-5 hover:text-[#D4D8DD] transition duration-300"
          >
            Productos
          </Link>
          <Link
            to="/categoria" // Ruta a la página de Categoria
            className="text-white hover:text-[#D4D8DD] transition duration-300"
          >
            Categorias
          </Link>
          <Link
            to="/" // Ruta a la página de Categoria
            className="text-white hover:text-[#D4D8DD] transition duration-300"
          >
            Salir
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;