import React, { useState, useEffect } from 'react';
import { apiGet } from '../services/api'; // Asumiendo que apiGet es una función que hace la llamada GET

const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Obtener productos cuando el componente se monte
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await apiGet('/producto');
        setProductos(data); // Suponiendo que la respuesta es un arreglo de productos
      } catch (error) {
        setErrorMessage('Error al obtener los productos.');
        console.error(error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-semibold text-center text-[#1A2D42] mb-8">Catálogo de Productos</h1>

      {/* Mostrar mensaje de error si ocurre */}
      {errorMessage && (
        <div className="text-red-500 text-center mb-4">{errorMessage}</div>
      )}

      {/* Mostrar todos los productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productos.map((prod) => (
          <div
            key={prod.id}
            className="bg-[#D4D8DD] p-6 rounded-lg shadow-lg border-2 border-[#AAB7B7] transition duration-300 hover:shadow-xl hover:border-[#2E4156]"
          >
            {/* Nombre del producto */}
            <h2 className="text-xl font-semibold text-[#1A2D42] mb-2">{prod.gwclNombre}</h2>

            {/* Descripción del producto */}
            <p className="text-sm text-[#2E4156] mb-4">{prod.gwclProducto}</p>

            {/* Información de la categoría */}
            {prod.categoriaDto && (
              <div className="text-sm text-[#2E4156] mb-4">
                <strong>Categoría:</strong> {prod.categoriaDto.gwclNombre}
                <br />
                <span className="text-sm text-[#AAB7B7]">({prod.categoriaDto.gwclCategoria})</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalogo;