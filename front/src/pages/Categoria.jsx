import React, { useState, useEffect } from 'react';
import { apiGet, apiPost, apiPut, apiDelete } from '../services/api'; // Importa las funciones
import Navbar from '../nav/Navbar';

const Categoria = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState({ id: '', gwclNombre: '', gwclCategoria: '' });
  const [errorMessage, setErrorMessage] = useState('');

  // Obtener todas las categorías
  const fetchCategorias = async () => {
    try {
      const data = await apiGet('/categoria');
      setCategorias(data);  // Suponiendo que la respuesta es un arreglo de categorías
    } catch (error) {
      setErrorMessage('Error al obtener las categorías.');
      console.error(error);
    }
  };

  // Obtener una categoría por ID
  const fetchCategoriaById = async (id) => {
    try {
      const data = await apiGet(`/categoria/${id}`);
      setCategoria(data);  // Suponiendo que la respuesta es una categoría
    } catch (error) {
      setErrorMessage('Error al obtener la categoría.');
      console.error(error);
    }
  };

  // Crear una nueva categoría
  const createCategoria = async (e) => {
    e.preventDefault();
    try {
      await apiPost('/categoria', {
        gwclNombre: categoria.gwclNombre,
        gwclCategoria: categoria.gwclCategoria,
      });
      fetchCategorias(); // Recargar las categorías
      setCategoria({ id: '', gwclNombre: '', gwclCategoria: '' }); // Limpiar formulario
    } catch (error) {
      setErrorMessage('Error al crear la categoría.');
      console.error(error);
    }
  };

  // Actualizar una categoría
  const updateCategoria = async (e) => {
    e.preventDefault();
    try {
      await apiPut('/categoria', {
        id: categoria.id,
        gwclNombre: categoria.gwclNombre,
        gwclCategoria: categoria.gwclCategoria,
      });
      fetchCategorias(); // Recargar las categorías
      setCategoria({ id: '', gwclNombre: '', gwclCategoria: '' }); // Limpiar formulario
    } catch (error) {
      setErrorMessage('Error al actualizar la categoría.');
      console.error(error);
    }
  };

  // Eliminar una categoría
  const deleteCategoria = async (id) => {
    try {
      await apiDelete(`/categoria/${id}`);
      fetchCategorias(); // Recargar las categorías
    } catch (error) {
      setErrorMessage('Error al eliminar la categoría.');
      console.error(error);
    }
  };

  // Cargar las categorías cuando el componente se monte
  useEffect(() => {
    fetchCategorias();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <Navbar />
      <h1 className="text-3xl font-semibold text-center text-[#1A2D42] mb-8">Categorías</h1>

      {/* Mostrar mensaje de error si ocurre */}
      {errorMessage && (
        <div className="text-red-500 text-center mb-4">{errorMessage}</div>
      )}

      {/* Formulario para crear o actualizar categoría */}
      <form onSubmit={categoria.id ? updateCategoria : createCategoria} className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <div className="mb-6">
          <label htmlFor="gwclNombre" className="block text-sm font-semibold text-[#1A2D42] mb-2">
            Nombre
          </label>
          <input
            type="text"
            id="gwclNombre"
            value={categoria.gwclNombre}
            onChange={(e) => setCategoria({ ...categoria, gwclNombre: e.target.value })}
            className="w-full px-4 py-3 border border-[#AAB7B7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E4156] text-[#1A2D42] placeholder-gray-400"
            placeholder="Nombre de la categoría"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="gwclCategoria" className="block text-sm font-semibold text-[#1A2D42] mb-2">
            Categoría
          </label>
          <input
            type="text"
            id="gwclCategoria"
            value={categoria.gwclCategoria}
            onChange={(e) => setCategoria({ ...categoria, gwclCategoria: e.target.value })}
            className="w-full px-4 py-3 border border-[#AAB7B7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E4156] text-[#1A2D42] placeholder-gray-400"
            placeholder="Descripción de la categoría"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#1A2D42] hover:bg-[#2E4156] text-[#D4D8DD] font-semibold py-3 rounded-md transition duration-300"
        >
          {categoria.id ? 'Actualizar Categoría' : 'Crear Categoría'}
        </button>
      </form>

      {/* Mostrar todas las categorías */}
      <div>
        <h2 className="text-xl font-semibold text-[#1A2D42] mb-5">Lista de Categorías</h2>
        <ul className="space-y-4">
          {categorias.map((cat) => (
            <li key={cat.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
              <div>
                <span className="text-lg font-semibold text-[#1A2D42]">{cat.gwclNombre}</span><br />
                <span className="text-sm text-gray-500">{cat.gwclCategoria}</span>
              </div>
              <div className="space-x-3">
                <button
                  onClick={() => fetchCategoriaById(cat.id)}
                  className="bg-[#2E4156] text-white py-2 px-4 rounded-md hover:bg-[#1A2D42] transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteCategoria(cat.id)}
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

export default Categoria;