import React, { useState, useEffect } from 'react';
import { apiGet, apiPost, apiPut, apiDelete } from '../services/api'; // Importar las funciones de api
import Navbar from '../nav/Navbar';

const Producto = () => {
  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState({ id: '', gwclNombre: '', gwclProducto: '', categoriaId: '' });
  const [categorias, setCategorias] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Obtener todos los productos
  const fetchProductos = async () => {
    try {
      const data = await apiGet('/producto');
      setProductos(data); // Suponiendo que la respuesta es un arreglo de productos
    } catch (error) {
      setErrorMessage('Error al obtener los productos.');
      console.error(error);
    }
  };

  // Obtener todas las categorías
  const fetchCategorias = async () => {
    try {
      const data = await apiGet('/categoria');
      setCategorias(data); // Suponiendo que la respuesta es un arreglo de categorías
    } catch (error) {
      setErrorMessage('Error al obtener las categorías.');
      console.error(error);
    }
  };

  // Obtener un producto por ID
  const fetchProductoById = async (id) => {
    try {
      const data = await apiGet(`/producto/${id}`);
      setProducto(data); // Suponiendo que la respuesta es un producto
    } catch (error) {
      setErrorMessage('Error al obtener el producto.');
      console.error(error);
    }
  };

  // Crear un nuevo producto
  const createProducto = async (e) => {
    e.preventDefault();
    try {
      await apiPost('/producto', {
        gwclNombre: producto.gwclNombre,
        gwclProducto: producto.gwclProducto,
        categoriaId: producto.categoriaId,
      });
      fetchProductos(); // Recargar los productos
      setProducto({ id: '', gwclNombre: '', gwclProducto: '', categoriaId: '' }); // Limpiar formulario
    } catch (error) {
      setErrorMessage('Error al crear el producto.');
      console.error(error);
    }
  };

  // Actualizar un producto
  const updateProducto = async (e) => {
    e.preventDefault();
    try {
      await apiPut('/producto', {
        id: producto.id,
        gwclNombre: producto.gwclNombre,
        gwclProducto: producto.gwclProducto,
        categoriaId: producto.categoriaId,
      });
      fetchProductos(); // Recargar los productos
      setProducto({ id: '', gwclNombre: '', gwclProducto: '', categoriaId: '' }); // Limpiar formulario
    } catch (error) {
      setErrorMessage('Error al actualizar el producto.');
      console.error(error);
    }
  };

  // Eliminar un producto
  const deleteProducto = async (id) => {
    try {
      await apiDelete(`/producto/${id}`);
      fetchProductos(); // Recargar los productos
    } catch (error) {
      setErrorMessage('Error al eliminar el producto.');
      console.error(error);
    }
  };

  // Cargar productos y categorías cuando el componente se monte
  useEffect(() => {
    fetchProductos();
    fetchCategorias();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <Navbar />
      <h1 className="text-3xl font-semibold text-center text-[#1A2D42] mb-6">Productos</h1>

      {/* Mostrar mensaje de error si ocurre */}
      {errorMessage && (
        <div className="text-red-500 text-center mb-4">{errorMessage}</div>
      )}

      {/* Formulario para crear o actualizar producto */}
      <form onSubmit={producto.id ? updateProducto : createProducto} className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-5">
          <label htmlFor="gwclNombre" className="block text-sm font-medium text-[#1A2D42] mb-2">
            Nombre del Producto
          </label>
          <input
            type="text"
            id="gwclNombre"
            value={producto.gwclNombre}
            onChange={(e) => setProducto({ ...producto, gwclNombre: e.target.value })}
            className="w-full px-4 py-3 border border-[#AAB7B7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E4156] text-[#1A2D42] placeholder-gray-400"
            placeholder="Nombre del producto"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="gwclProducto" className="block text-sm font-medium text-[#1A2D42] mb-2">
            Descripción del Producto
          </label>
          <input
            type="text"
            id="gwclProducto"
            value={producto.gwclProducto}
            onChange={(e) => setProducto({ ...producto, gwclProducto: e.target.value })}
            className="w-full px-4 py-3 border border-[#AAB7B7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E4156] text-[#1A2D42] placeholder-gray-400"
            placeholder="Descripción del producto"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="categoriaId" className="block text-sm font-medium text-[#1A2D42] mb-2">
            Categoría
          </label>
          <select
            id="categoriaId"
            value={producto.categoriaId}
            onChange={(e) => setProducto({ ...producto, categoriaId: e.target.value })}
            className="w-full px-4 py-3 border border-[#AAB7B7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E4156] text-[#1A2D42]"
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.gwclNombre} - {cat.gwclCategoria}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-[#1A2D42] hover:bg-[#2E4156] text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          {producto.id ? 'Actualizar Producto' : 'Crear Producto'}
        </button>
      </form>

      {/* Mostrar todos los productos */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-5">Lista de Productos</h2>
        <ul className="space-y-4">
          {productos.map((prod) => (
            <li key={prod.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
              <div>
                <span className="text-lg font-semibold text-[#1A2D42]">{prod.gwclNombre}</span><br />
                <span className="text-sm text-gray-500">{prod.gwclProducto}</span><br />
                <span className="text-sm text-gray-400">Categoría: {prod.categoriaDto?.gwclNombre || 'Sin categoría'}</span>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => fetchProductoById(prod.id)}
                  className="bg-[#2E4156] text-white py-2 px-4 rounded-md hover:bg-[#1A2D42] transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteProducto(prod.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Producto;