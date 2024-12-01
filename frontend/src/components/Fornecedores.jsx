import React, { useState, useEffect } from 'react';
import { fornecedoresAPI } from '../api';

const Fornecedores = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const [newFornecedor, setNewFornecedor] = useState({ nome: '', cnpj: '', email: '', telefone: '', endereco: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingFornecedor, setEditingFornecedor] = useState(null);

  // Carregar fornecedores da API
  useEffect(() => {
    loadFornecedores();
  }, []);

  const loadFornecedores = async () => {
    try {
      const response = await fornecedoresAPI.getAll();
      setFornecedores(response.data);
    } catch (error) {
      console.error('Erro ao carregar fornecedores:', error);
    }
  };

  const handleAddFornecedor = async () => {
    try {
      await fornecedoresAPI.create(newFornecedor);
      loadFornecedores();
      setNewFornecedor({ nome: '', cnpj: '', email: '', telefone: '', endereco: '' });
    } catch (error) {
      console.error('Erro ao adicionar fornecedor:', error);
    }
  };

  const handleDeleteFornecedor = async (id) => {
    try {
      await fornecedoresAPI.delete(id);
      loadFornecedores();
    } catch (error) {
      console.error('Erro ao excluir fornecedor:', error);
    }
  };

  const handleEditFornecedor = async (id) => {
    try {
      const fornecedor = fornecedores.find((f) => f.id === id);
      setEditingFornecedor(fornecedor);
      setIsEditing(true);
    } catch (error) {
      console.error('Erro ao carregar fornecedor para edição:', error);
    }
  };

  const handleUpdateFornecedor = async () => {
    try {
      await fornecedoresAPI.update(editingFornecedor.id, editingFornecedor);
      loadFornecedores();
      setIsEditing(false);
      setEditingFornecedor(null);
    } catch (error) {
      console.error('Erro ao atualizar fornecedor:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Fornecedores</h2>
      
      {isEditing ? (
        <div className="space-y-4">
          <h3 className="text-xl">Editar Fornecedor</h3>
          <input
            type="text"
            value={editingFornecedor.nome}
            onChange={(e) => setEditingFornecedor({ ...editingFornecedor, nome: e.target.value })}
            placeholder="Nome"
            className="border p-2"
          />
          <input
            type="text"
            value={editingFornecedor.cnpj}
            onChange={(e) => setEditingFornecedor({ ...editingFornecedor, cnpj: e.target.value })}
            placeholder="CNPJ"
            className="border p-2"
          />
          <input
            type="email"
            value={editingFornecedor.email}
            onChange={(e) => setEditingFornecedor({ ...editingFornecedor, email: e.target.value })}
            placeholder="Email"
            className="border p-2"
          />
          <input
            type="text"
            value={editingFornecedor.telefone}
            onChange={(e) => setEditingFornecedor({ ...editingFornecedor, telefone: e.target.value })}
            placeholder="Telefone"
            className="border p-2"
          />
          <input
            type="text"
            value={editingFornecedor.endereco}
            onChange={(e) => setEditingFornecedor({ ...editingFornecedor, endereco: e.target.value })}
            placeholder="Endereço"
            className="border p-2"
          />
          <button
            onClick={handleUpdateFornecedor}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Atualizar Fornecedor
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="text-xl">Adicionar Novo Fornecedor</h3>
          <input
            type="text"
            value={newFornecedor.nome}
            onChange={(e) => setNewFornecedor({ ...newFornecedor, nome: e.target.value })}
            placeholder="Nome"
            className="border p-2"
          />
          <input
            type="text"
            value={newFornecedor.cnpj}
            onChange={(e) => setNewFornecedor({ ...newFornecedor, cnpj: e.target.value })}
            placeholder="CNPJ"
            className="border p-2"
          />
          <input
            type="email"
            value={newFornecedor.email}
            onChange={(e) => setNewFornecedor({ ...newFornecedor, email: e.target.value })}
            placeholder="Email"
            className="border p-2"
          />
          <input
            type="text"
            value={newFornecedor.telefone}
            onChange={(e) => setNewFornecedor({ ...newFornecedor, telefone: e.target.value })}
            placeholder="Telefone"
            className="border p-2"
          />
          <input
            type="text"
            value={newFornecedor.endereco}
            onChange={(e) => setNewFornecedor({ ...newFornecedor, endereco: e.target.value })}
            placeholder="Endereço"
            className="border p-2"
          />
          <button
            onClick={handleAddFornecedor}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Adicionar Fornecedor
          </button>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-xl">Lista de Fornecedores</h3>
        {fornecedores.length === 0 ? (
          <p>Não há fornecedores cadastrados.</p>
        ) : (
          fornecedores.map((fornecedor) => (
            <div key={fornecedor.id} className="flex justify-between items-center border p-4 rounded">
              <div>
                <h3 className="font-bold">{fornecedor.nome}</h3>
                <p>CNPJ: {fornecedor.cnpj}</p>
                <p>Email: {fornecedor.email}</p>
                <p>Telefone: {fornecedor.telefone}</p>
                <p>Endereço: {fornecedor.endereco}</p>
              </div>
              <button
                onClick={() => handleEditFornecedor(fornecedor.id)}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => handleDeleteFornecedor(fornecedor.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Excluir
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Fornecedores;
