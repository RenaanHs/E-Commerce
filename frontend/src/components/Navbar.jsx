import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Package, CreditCard, Settings } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'text-blue-500' : 'text-gray-600 hover:text-blue-500';
  };

  return (
    <nav className="bg-white shadow-md mb-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-blue-500">
            E-Commerce
          </Link>

          <div className="flex space-x-6">
            {/* Página de Produtos (exibição geral) */}
            <Link 
              to="/" 
              className={`flex items-center space-x-1 ${isActive('/products')}`}
            >
              <Package size={20} />
              <span>Produtos</span>
            </Link>

            {/* Carrinho */}
            <Link 
              to="/cart" 
              className={`flex items-center space-x-1 ${isActive('/cart')}`}
            >
              <ShoppingCart size={20} />
              <span>Carrinho</span>
            </Link>

            {/* Checkout */}
            <Link 
              to="/checkout" 
              className={`flex items-center space-x-1 ${isActive('/checkout')}`}
            >
              <CreditCard size={20} />
              <span>Checkout</span>
            </Link>

            {/* Gerenciamento de Produtos (apenas disponível para admins) */}
            <Link 
              to="/manage" 
              className={`flex items-center space-x-1 ${isActive('/manage')}`}
            >
              <Settings size={20} />
              <span>Gerenciar Produtos</span>
            </Link>
            <Link 
              to="/fornecedores" 
              className={`flex items-center space-x-1 ${isActive('/cart')}`}
            >
              <ShoppingCart size={20} />
              <span>Fornecedores</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
