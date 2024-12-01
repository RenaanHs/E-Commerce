import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from '../api';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    estoque: ''
  });
  const [editingProductId, setEditingProductId] = useState(null); // Para rastrear qual produto está sendo editado

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await productAPI.getAll();
      setProducts(response.data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nome || !formData.descricao || !formData.preco || !formData.estoque) {
      console.log('Por favor, preencha todos os campos.');
      return; // Impede o envio caso algum campo esteja vazio
    }

    try {
      if (editingProductId) {
        // Atualizar produto existente
        await productAPI.update(editingProductId, formData);
        console.log('Produto atualizado com sucesso');
      } else {
        // Criar novo produto
        await productAPI.create(formData);
        console.log('Produto criado com sucesso');
      }

      loadProducts();
      setFormData({ nome: '', descricao: '', preco: '', estoque: '' });
      setEditingProductId(null); // Limpa o ID do produto sendo editado após o envio
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    }
  };

  const handleEdit = (product) => {
    // Preenche os campos do formulário com os dados do produto a ser editado
    setFormData({
      nome: product.nome,
      descricao: product.descricao,
      preco: product.preco,
      estoque: product.estoque
    });
    setEditingProductId(product.id); // Define o ID do produto sendo editado
  };

  const deleteProduct = async (id) => {
    try {
      await productAPI.delete(id);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gerenciamento de Produtos</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Nome do produto"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <textarea
            placeholder="Descrição"
            value={formData.descricao}
            onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Preço"
            value={formData.preco}
            onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Estoque"
            value={formData.estoque}
            onChange={(e) => setFormData({ ...formData, estoque: e.target.value })}
            className="p-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          {editingProductId ? 'Atualizar Produto' : 'Adicionar Produto'}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="border p-4 rounded">
            <h3 className="font-bold">{product.nome}</h3>
            <p>{product.descricao}</p>
            <p>Preço: R$ {product.preco}</p>
            <p>Estoque: {product.estoque}</p>
            <div className="mt-2 space-x-2">
              <button 
                onClick={() => deleteProduct(product.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Deletar
              </button>
              <button 
                onClick={() => handleEdit(product)}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManagement;
