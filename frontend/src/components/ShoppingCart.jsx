import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartAPI } from '../api';

const ShoppingCart = () => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const response = await cartAPI.getCart();
      setCart(response.data);
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
    }
  };

  const removeFromCart = async (id) => {
    try {
      await cartAPI.removeFromCart(id);
      loadCart();
    } catch (error) {
      console.error('Erro ao remover item:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Carrinho de Compras</h2>
      
      {cart.items.length === 0 ? (
        <p>Seu carrinho está vazio</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.items.map(item => (
              <div key={item.id} className="flex justify-between items-center border p-4 rounded">
                <div>
                  <h3 className="font-bold">{item.Product.nome}</h3>
                  <p>Quantidade: {item.quantidade}</p>
                  <p>Preço: R$ {item.Product.preco}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Remover
                </button>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <p className="text-xl font-bold">Total: R$ {cart.total}</p>
            <button
              onClick={() => navigate('/checkout')}
              className="mt-4 w-full bg-green-500 text-white p-3 rounded hover:bg-green-600"
            >
              Finalizar Compra
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
