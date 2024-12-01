import React, { useState, useEffect } from 'react';
import { productAPI, cartAPI } from '../api';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]); // Estado para armazenar os itens do carrinho

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

  const addToCart = async (product) => {
    try {
      const response = await cartAPI.addToCart({ productId: product.id, quantidade: 1 });
      console.log('Produto adicionado ao carrinho:', response.data);

      const updatedCart = await cartAPI.getCart();
      setCart(updatedCart.data.items); // Atualiza o estado com os itens mais recentes do carrinho
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Produtos</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="border p-4 rounded">
            <h3 className="font-bold">{product.nome}</h3>
            <p>{product.descricao}</p>
            <p>Preço: R$ {product.preco}</p>
            <p>Estoque: {product.estoque}</p>
            <div className="mt-2 space-x-2">
              <button 
                onClick={() => addToCart(product)} 
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
